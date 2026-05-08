#!/bin/bash
# Helper para Google Drive API v3 usando credenciais do .env

ENV_FILE="$(git rev-parse --show-toplevel 2>/dev/null || pwd)/.env"

env_get() {
    grep "^$1=" "$ENV_FILE" 2>/dev/null | cut -d= -f2- | tr -d "'" | tr -d '"'
}

get_access_token() {
    local refresh_token=$(env_get "GOOGLE_REFRESH_TOKEN")
    local client_id=$(env_get "GOOGLE_CLIENT_ID")
    local client_secret=$(env_get "GOOGLE_CLIENT_SECRET")

    if [ -z "$refresh_token" ] || [ -z "$client_id" ] || [ -z "$client_secret" ]; then
        echo "ERROR: Credenciais Google não encontradas no .env" >&2
        return 1
    fi

    local token=$(curl -s -X POST "https://oauth2.googleapis.com/token" \
        -d "client_id=$client_id" \
        -d "client_secret=$client_secret" \
        -d "refresh_token=$refresh_token" \
        -d "grant_type=refresh_token" | jq -r '.access_token')

    if [ -z "$token" ] || [ "$token" = "null" ]; then
        echo "ERROR: Falha ao obter access token. Verifique as credenciais." >&2
        return 1
    fi

    echo "$token"
}

drive_api() {
    local method="$1"
    local endpoint="$2"
    local data="$3"
    local token=$(get_access_token)

    [ -z "$token" ] && return 1

    local base_url="https://www.googleapis.com/drive/v3"

    if [ -n "$data" ]; then
        curl -s -X "$method" "${base_url}${endpoint}" \
            -H "Authorization: Bearer $token" \
            -H "Content-Type: application/json" \
            -d "$data"
    else
        curl -s -X "$method" "${base_url}${endpoint}" \
            -H "Authorization: Bearer $token"
    fi
}

# ── ABOUT ──────────────────────────────────────────────────────────────────────

drive_about() {
    drive_api GET "/about?fields=user,storageQuota"
}

# ── LISTAR ARQUIVOS / PASTAS ────────────────────────────────────────────────────

drive_list() {
    local query="${1:-}"
    local page_size="${2:-50}"
    local fields="files(id,name,mimeType,parents,size,modifiedTime,owners,shared,webViewLink)"

    local url="/files?pageSize=$page_size&fields=nextPageToken,$fields&orderBy=name"
    [ -n "$query" ] && url="${url}&q=$(python3 -c "import urllib.parse; print(urllib.parse.quote('''$query'''))")"

    drive_api GET "$url"
}

# Lista conteúdo de uma pasta específica
drive_list_folder() {
    local folder_id="$1"
    local page_size="${2:-100}"
    local query="'$folder_id' in parents and trashed=false"
    drive_list "$query" "$page_size"
}

# Busca por nome
drive_search() {
    local name="$1"
    local mime_type="${2:-}"
    local query="name contains '$name' and trashed=false"
    [ -n "$mime_type" ] && query="$query and mimeType='$mime_type'"
    drive_list "$query" 50
}

# ── GET METADATA ────────────────────────────────────────────────────────────────

drive_get() {
    local file_id="$1"
    local fields="${2:-id,name,mimeType,parents,size,modifiedTime,owners,shared,webViewLink,permissions}"
    drive_api GET "/files/$file_id?fields=$fields"
}

# ── CRIAR PASTA ─────────────────────────────────────────────────────────────────

drive_create_folder() {
    local name="$1"
    local parent_id="${2:-}"
    local body

    if [ -n "$parent_id" ]; then
        body=$(jq -n --arg name "$name" --arg pid "$parent_id" \
            '{name: $name, mimeType: "application/vnd.google-apps.folder", parents: [$pid]}')
    else
        body=$(jq -n --arg name "$name" \
            '{name: $name, mimeType: "application/vnd.google-apps.folder"}')
    fi

    drive_api POST "/files?fields=id,name,webViewLink" "$body"
}

# ── CRIAR ARQUIVO (metadata only — sem conteúdo binário) ───────────────────────

drive_create_file() {
    local name="$1"
    local mime_type="${2:-application/octet-stream}"
    local parent_id="${3:-}"
    local body

    if [ -n "$parent_id" ]; then
        body=$(jq -n --arg name "$name" --arg mime "$mime_type" --arg pid "$parent_id" \
            '{name: $name, mimeType: $mime, parents: [$pid]}')
    else
        body=$(jq -n --arg name "$name" --arg mime "$mime_type" \
            '{name: $name, mimeType: $mime}')
    fi

    drive_api POST "/files?fields=id,name,webViewLink" "$body"
}

# ── RENOMEAR / MOVER ────────────────────────────────────────────────────────────

drive_rename() {
    local file_id="$1"
    local new_name="$2"
    local body=$(jq -n --arg name "$new_name" '{name: $name}')
    drive_api PATCH "/files/$file_id?fields=id,name" "$body"
}

drive_move() {
    local file_id="$1"
    local new_parent_id="$2"
    local token=$(get_access_token)

    [ -z "$token" ] && return 1

    # Obtém parents atuais
    local current_parents=$(curl -s \
        "https://www.googleapis.com/drive/v3/files/$file_id?fields=parents" \
        -H "Authorization: Bearer $token" | jq -r '.parents[]' | tr '\n' ',' | sed 's/,$//')

    curl -s -X PATCH \
        "https://www.googleapis.com/drive/v3/files/$file_id?addParents=$new_parent_id&removeParents=$current_parents&fields=id,name,parents" \
        -H "Authorization: Bearer $token" \
        -H "Content-Type: application/json"
}

# Renomear E mover ao mesmo tempo
drive_update() {
    local file_id="$1"
    local new_name="${2:-}"
    local new_parent_id="${3:-}"
    local token=$(get_access_token)

    [ -z "$token" ] && return 1

    local url="https://www.googleapis.com/drive/v3/files/$file_id?fields=id,name,parents"
    local body="{}"
    [ -n "$new_name" ] && body=$(jq -n --arg name "$new_name" '{name: $name}')

    if [ -n "$new_parent_id" ]; then
        local current_parents=$(curl -s \
            "https://www.googleapis.com/drive/v3/files/$file_id?fields=parents" \
            -H "Authorization: Bearer $token" | jq -r '.parents[]' | tr '\n' ',' | sed 's/,$//')
        url="${url}&addParents=$new_parent_id&removeParents=$current_parents"
    fi

    curl -s -X PATCH "$url" \
        -H "Authorization: Bearer $token" \
        -H "Content-Type: application/json" \
        -d "$body"
}

# ── COPIAR ──────────────────────────────────────────────────────────────────────

drive_copy() {
    local file_id="$1"
    local new_name="${2:-}"
    local parent_id="${3:-}"
    local body="{}"

    if [ -n "$new_name" ] && [ -n "$parent_id" ]; then
        body=$(jq -n --arg name "$new_name" --arg pid "$parent_id" \
            '{name: $name, parents: [$pid]}')
    elif [ -n "$new_name" ]; then
        body=$(jq -n --arg name "$new_name" '{name: $name}')
    elif [ -n "$parent_id" ]; then
        body=$(jq -n --arg pid "$parent_id" '{parents: [$pid]}')
    fi

    drive_api POST "/files/$file_id/copy?fields=id,name,webViewLink" "$body"
}

# ── DELETAR / MOVER PRA LIXEIRA ────────────────────────────────────────────────

drive_trash() {
    local file_id="$1"
    local body='{"trashed": true}'
    drive_api PATCH "/files/$file_id?fields=id,name,trashed" "$body"
}

drive_delete() {
    local file_id="$1"
    drive_api DELETE "/files/$file_id"
}

drive_untrash() {
    local file_id="$1"
    local body='{"trashed": false}'
    drive_api PATCH "/files/$file_id?fields=id,name,trashed" "$body"
}

# Esvaziar lixeira
drive_empty_trash() {
    local token=$(get_access_token)
    [ -z "$token" ] && return 1
    curl -s -X DELETE "https://www.googleapis.com/drive/v3/files/trash" \
        -H "Authorization: Bearer $token"
}

# ── PERMISSÕES ──────────────────────────────────────────────────────────────────

drive_list_permissions() {
    local file_id="$1"
    drive_api GET "/files/$file_id/permissions?fields=permissions(id,type,role,emailAddress,displayName)"
}

# Adicionar usuário/grupo com role
# role: reader | commenter | writer | fileOrganizer | organizer | owner
# type: user | group | domain | anyone
drive_add_permission() {
    local file_id="$1"
    local email="$2"
    local role="${3:-reader}"
    local type="${4:-user}"
    local send_notification="${5:-true}"

    local body=$(jq -n \
        --arg role "$role" \
        --arg type "$type" \
        --arg email "$email" \
        '{role: $role, type: $type, emailAddress: $email}')

    local token=$(get_access_token)
    [ -z "$token" ] && return 1

    curl -s -X POST \
        "https://www.googleapis.com/drive/v3/files/$file_id/permissions?sendNotificationEmail=$send_notification&fields=id,role,type,emailAddress" \
        -H "Authorization: Bearer $token" \
        -H "Content-Type: application/json" \
        -d "$body"
}

# Compartilhar com domínio inteiro
drive_share_domain() {
    local file_id="$1"
    local domain="$2"
    local role="${3:-reader}"
    local body=$(jq -n --arg role "$role" --arg domain "$domain" \
        '{role: $role, type: "domain", domain: $domain}')

    drive_api POST "/files/$file_id/permissions?fields=id,role,type" "$body"
}

# Tornar público (qualquer pessoa com link)
drive_make_public() {
    local file_id="$1"
    local role="${2:-reader}"
    local body=$(jq -n --arg role "$role" \
        '{role: $role, type: "anyone"}')
    drive_api POST "/files/$file_id/permissions?fields=id,role,type" "$body"
}

# Remover permissão
drive_remove_permission() {
    local file_id="$1"
    local permission_id="$2"
    drive_api DELETE "/files/$file_id/permissions/$permission_id"
}

# Alterar role de uma permissão existente
drive_update_permission() {
    local file_id="$1"
    local permission_id="$2"
    local new_role="$3"
    local body=$(jq -n --arg role "$new_role" '{role: $role}')
    drive_api PATCH "/files/$file_id/permissions/$permission_id?fields=id,role" "$body"
}

# ── SHARED DRIVES (DRIVES COMPARTILHADOS) ──────────────────────────────────────

drive_list_drives() {
    drive_api GET "/drives?pageSize=50&fields=drives(id,name,kind)"
}

drive_get_drive() {
    local drive_id="$1"
    drive_api GET "/drives/$drive_id"
}

# ── UPLOAD DE ARQUIVO (MULTIPART) ──────────────────────────────────────────────
# Faz upload de arquivo local pro Drive
drive_upload() {
    local file_path="$1"
    local name="${2:-$(basename "$file_path")}"
    local parent_id="${3:-}"
    local mime_type="${4:-$(file --mime-type -b "$file_path" 2>/dev/null || echo 'application/octet-stream')}"
    local token=$(get_access_token)

    [ -z "$token" ] && return 1
    [ ! -f "$file_path" ] && echo "ERROR: Arquivo não encontrado: $file_path" >&2 && return 1

    local metadata
    if [ -n "$parent_id" ]; then
        metadata=$(jq -n --arg name "$name" --arg mime "$mime_type" --arg pid "$parent_id" \
            '{name: $name, mimeType: $mime, parents: [$pid]}')
    else
        metadata=$(jq -n --arg name "$name" --arg mime "$mime_type" \
            '{name: $name, mimeType: $mime}')
    fi

    curl -s -X POST \
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink" \
        -H "Authorization: Bearer $token" \
        -F "metadata=$metadata;type=application/json" \
        -F "file=@$file_path;type=$mime_type"
}

# ── DOWNLOAD ────────────────────────────────────────────────────────────────────

drive_download() {
    local file_id="$1"
    local output_path="$2"
    local token=$(get_access_token)

    [ -z "$token" ] && return 1

    curl -s -L \
        "https://www.googleapis.com/drive/v3/files/$file_id?alt=media" \
        -H "Authorization: Bearer $token" \
        -o "$output_path"

    echo "Arquivo salvo em: $output_path"
}

# Exportar Google Docs/Sheets/Slides como PDF ou outro formato
drive_export() {
    local file_id="$1"
    local output_path="$2"
    local mime_type="${3:-application/pdf}"
    local token=$(get_access_token)

    [ -z "$token" ] && return 1

    local encoded_mime=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$mime_type'))")
    curl -s -L \
        "https://www.googleapis.com/drive/v3/files/$file_id/export?mimeType=$encoded_mime" \
        -H "Authorization: Bearer $token" \
        -o "$output_path"

    echo "Exportado para: $output_path"
}

# ── GERAR LINK DE COMPARTILHAMENTO ────────────────────────────────────────────

drive_get_link() {
    local file_id="$1"
    drive_api GET "/files/$file_id?fields=webViewLink,webContentLink"
}

# ── SHORTCUTS ───────────────────────────────────────────────────────────────────

# Cria um atalho (shortcut) apontando pra outro arquivo
drive_create_shortcut() {
    local target_id="$1"
    local shortcut_name="$2"
    local parent_id="${3:-}"

    local body
    if [ -n "$parent_id" ]; then
        body=$(jq -n --arg name "$shortcut_name" --arg tid "$target_id" --arg pid "$parent_id" \
            '{name: $name, mimeType: "application/vnd.google-apps.shortcut", parents: [$pid], shortcutDetails: {targetId: $tid}}')
    else
        body=$(jq -n --arg name "$shortcut_name" --arg tid "$target_id" \
            '{name: $name, mimeType: "application/vnd.google-apps.shortcut", shortcutDetails: {targetId: $tid}}')
    fi

    drive_api POST "/files?fields=id,name,webViewLink" "$body"
}

# ── WATCH / NOTIFICATIONS ───────────────────────────────────────────────────────

drive_watch_file() {
    local file_id="$1"
    local webhook_url="$2"
    local channel_id="${3:-$(uuidgen | tr '[:upper:]' '[:lower:]')}"
    local body=$(jq -n \
        --arg id "$channel_id" \
        --arg url "$webhook_url" \
        '{id: $id, type: "web_hook", address: $url}')
    drive_api POST "/files/$file_id/watch" "$body"
}

# ── EXPORT DE MIMEYPES ÚTEIS ───────────────────────────────────────────────────

# Retorna o mimeType correto pra criar docs nativos do Google
google_mime() {
    case "$1" in
        doc|docs)     echo "application/vnd.google-apps.document" ;;
        sheet|sheets) echo "application/vnd.google-apps.spreadsheet" ;;
        slide|slides) echo "application/vnd.google-apps.presentation" ;;
        form)         echo "application/vnd.google-apps.form" ;;
        folder)       echo "application/vnd.google-apps.folder" ;;
        *)            echo "$1" ;;
    esac
}
