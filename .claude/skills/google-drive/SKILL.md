---
name: google-drive
description: Gerencia Google Drive via API v3 REST — pastas, arquivos, permissões, upload, download, busca e drives compartilhados. Usa credenciais do .env.
type: local
---

# Google Drive API v3

Gerencia o Google Drive completo: pastas, arquivos, permissões, compartilhamento, upload, download, busca e drives compartilhados.

## Configuração

Usa as mesmas credenciais já configuradas no `.env`:

```
GOOGLE_REFRESH_TOKEN=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

**Importante — escopo Drive:** Se a primeira chamada retornar erro 403, o token atual pode não ter o escopo `drive`. Para adicionar, acesse o OAuth Playground ou re-autentique adicionando `https://www.googleapis.com/auth/drive` aos escopos.

## Helper

Todas as funções estão em [drive-api.sh](drive-api.sh). Para usar em um script:

```bash
source .claude/skills/google-drive/drive-api.sh
```

---

## Operações disponíveis

### Informações da conta

```bash
drive_about
# Retorna: nome do usuário, email, quota usada/disponível
```

### Listar e buscar

```bash
# Listar arquivos (todos, paginado)
drive_list

# Listar conteúdo de uma pasta
drive_list_folder "FOLDER_ID"
drive_list_folder "FOLDER_ID" 200   # até 200 itens

# Buscar por nome
drive_search "relatório"
drive_search "proposta" "application/pdf"   # filtrar por tipo

# Listagem com query customizada (sintaxe Drive API)
drive_list "name contains 'cliente' and trashed=false"
```

Queries úteis:
- `mimeType='application/vnd.google-apps.folder'` — só pastas
- `mimeType='application/pdf'` — só PDFs
- `'ID_PASTA' in parents` — filhos de uma pasta
- `modifiedTime > '2026-01-01T00:00:00'` — modificados depois de data
- `starred=true` — marcados com estrela
- `sharedWithMe=true` — compartilhados comigo

### Obter metadados de um arquivo

```bash
drive_get "FILE_ID"
drive_get "FILE_ID" "id,name,size,webViewLink"   # campos específicos
```

### Criar pasta

```bash
# Na raiz do Drive
drive_create_folder "Clientes 2026"

# Dentro de outra pasta
drive_create_folder "Subpasta" "ID_DA_PASTA_PAI"
```

### Criar arquivo (metadata)

```bash
# Cria arquivo sem conteúdo (útil pra Google Docs nativos)
drive_create_file "Novo Doc" "application/vnd.google-apps.document" "PARENT_ID"
drive_create_file "Planilha" "application/vnd.google-apps.spreadsheet"

# Helper de mimeType
google_mime docs    # application/vnd.google-apps.document
google_mime sheets  # application/vnd.google-apps.spreadsheet
google_mime slides  # application/vnd.google-apps.presentation
google_mime folder  # application/vnd.google-apps.folder
```

### Renomear e mover

```bash
# Renomear
drive_rename "FILE_ID" "Novo Nome"

# Mover para outra pasta
drive_move "FILE_ID" "ID_PASTA_DESTINO"

# Renomear e mover ao mesmo tempo
drive_update "FILE_ID" "Novo Nome" "ID_PASTA_DESTINO"
```

### Copiar

```bash
# Copia com novo nome
drive_copy "FILE_ID" "Cópia do Arquivo"

# Copia para outra pasta
drive_copy "FILE_ID" "Cópia" "ID_PASTA_DESTINO"
```

### Lixeira e exclusão

```bash
# Mover pra lixeira (reversível)
drive_trash "FILE_ID"

# Restaurar da lixeira
drive_untrash "FILE_ID"

# Deletar permanentemente
drive_delete "FILE_ID"

# Esvaziar lixeira
drive_empty_trash
```

### Upload de arquivo local

```bash
# Upload simples (detecta mime automaticamente)
drive_upload "/caminho/para/arquivo.pdf"

# Com nome personalizado
drive_upload "/caminho/arquivo.pdf" "Proposta Cliente XYZ.pdf"

# Para pasta específica
drive_upload "/caminho/arquivo.pdf" "Proposta.pdf" "ID_DA_PASTA"

# Com mime explícito
drive_upload "/caminho/arquivo.pdf" "Proposta.pdf" "ID_DA_PASTA" "application/pdf"
```

### Download e exportação

```bash
# Baixar arquivo binário
drive_download "FILE_ID" "/caminho/destino/arquivo.pdf"

# Exportar Google Docs como PDF
drive_export "DOC_ID" "/caminho/saida.pdf"

# Exportar como DOCX
drive_export "DOC_ID" "/caminho/saida.docx" "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

# Exportar Google Sheets como XLSX
drive_export "SHEET_ID" "/caminho/saida.xlsx" "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
```

### Permissões (compartilhamento)

```bash
# Listar quem tem acesso
drive_list_permissions "FILE_ID"

# Adicionar usuário como leitor
drive_add_permission "FILE_ID" "usuario@email.com"

# Adicionar como editor
drive_add_permission "FILE_ID" "usuario@email.com" "writer"

# Adicionar como comentador
drive_add_permission "FILE_ID" "usuario@email.com" "commenter"

# Adicionar grupo
drive_add_permission "FILE_ID" "grupo@dominio.com" "writer" "group"

# Compartilhar sem enviar notificação por email
drive_add_permission "FILE_ID" "usuario@email.com" "reader" "user" "false"

# Compartilhar com domínio inteiro
drive_share_domain "FILE_ID" "empresa.com" "reader"

# Tornar público (qualquer pessoa com link pode ver)
drive_make_public "FILE_ID"

# Tornar público como editor
drive_make_public "FILE_ID" "writer"

# Alterar role de uma permissão existente
drive_update_permission "FILE_ID" "PERMISSION_ID" "writer"

# Remover acesso
drive_remove_permission "FILE_ID" "PERMISSION_ID"
```

Roles disponíveis: `reader` | `commenter` | `writer` | `fileOrganizer` | `organizer` | `owner`
Types disponíveis: `user` | `group` | `domain` | `anyone`

### Obter link de compartilhamento

```bash
drive_get_link "FILE_ID"
# Retorna: webViewLink (abrir no browser), webContentLink (download direto)
```

### Drives compartilhados (Shared Drives)

```bash
# Listar todos os drives compartilhados
drive_list_drives

# Detalhes de um drive
drive_get_drive "DRIVE_ID"

# Listar arquivos dentro de um Shared Drive
drive_list "'DRIVE_ID' in parents" 100
```

### Atalhos (Shortcuts)

```bash
# Criar atalho pra um arquivo em outra pasta
drive_create_shortcut "TARGET_FILE_ID" "Nome do Atalho"

# Criar atalho dentro de pasta específica
drive_create_shortcut "TARGET_FILE_ID" "Nome do Atalho" "PARENT_FOLDER_ID"
```

### Notificações webhook

```bash
# Monitorar mudanças em um arquivo via webhook
drive_watch_file "FILE_ID" "https://seu-webhook.com/endpoint"
```

---

## Exemplos práticos

### Criar estrutura de pasta para novo cliente

```bash
source .claude/skills/google-drive/drive-api.sh

# Criar pasta principal
CLIENTE=$(drive_create_folder "Cliente XYZ" | jq -r '.id')

# Subpastas
drive_create_folder "Propostas" "$CLIENTE"
drive_create_folder "Criativos" "$CLIENTE"
drive_create_folder "Relatórios" "$CLIENTE"

# Compartilhar com o cliente
drive_add_permission "$CLIENTE" "cliente@empresa.com" "reader"
```

### Buscar e mover arquivos

```bash
source .claude/skills/google-drive/drive-api.sh

# Buscar PDFs com "proposta" no nome
drive_search "proposta" "application/pdf" | jq '.files[] | {id, name}'

# Mover arquivo encontrado
drive_move "FILE_ID_ENCONTRADO" "ID_PASTA_PROPOSTAS"
```

### Upload e compartilhamento em sequência

```bash
source .claude/skills/google-drive/drive-api.sh

FILE=$(drive_upload "/tmp/proposta.pdf" "Proposta Comercial Q2.pdf" "PASTA_ID" | jq -r '.id')
drive_make_public "$FILE"
drive_get_link "$FILE" | jq -r '.webViewLink'
```

---

## Referência API

- [Drive API v3 Overview](https://developers.google.com/workspace/drive/api/guides/about-sdk?hl=pt_BR)
- [Files resource](https://developers.google.com/workspace/drive/api/reference/rest/v3/files)
- [Permissions resource](https://developers.google.com/workspace/drive/api/reference/rest/v3/permissions)
- [Drives resource](https://developers.google.com/workspace/drive/api/reference/rest/v3/drives)
- [Search query syntax](https://developers.google.com/workspace/drive/api/guides/search-files)
