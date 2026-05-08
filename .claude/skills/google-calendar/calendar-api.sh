#!/bin/bash
# Helper para Google Calendar API v3 usando credenciais do .env

# Busca .env na raiz do projeto
ENV_FILE="$(git rev-parse --show-toplevel 2>/dev/null || pwd)/.env"

# Função para ler do .env
env_get() {
    grep "^$1=" "$ENV_FILE" 2>/dev/null | cut -d= -f2- | tr -d "'" | tr -d '"'
}

# Obtém access token (OAuth ou Service Account)
get_access_token() {
    # Tenta OAuth refresh token primeiro
    local refresh_token=$(env_get "GOOGLE_REFRESH_TOKEN")
    local client_id=$(env_get "GOOGLE_CLIENT_ID")
    local client_secret=$(env_get "GOOGLE_CLIENT_SECRET")

    if [ -n "$refresh_token" ] && [ -n "$client_id" ] && [ -n "$client_secret" ]; then
        curl -s -X POST "https://oauth2.googleapis.com/token" \
            -d "client_id=$client_id" \
            -d "client_secret=$client_secret" \
            -d "refresh_token=$refresh_token" \
            -d "grant_type=refresh_token" | jq -r '.access_token'
        return
    fi

    # Tenta Service Account (JWT)
    local service_account=$(env_get "GOOGLE_CREDENTIALS")
    if [ -n "$service_account" ]; then
        # Cria JWT claimset
        local header=$(echo -n '{"alg":"RS256","typ":"JWT"}' | base64 -w0 | tr -d '=' | tr '/+' '_-' | tr -d '\n')
        local now=$(date +%s)
        local exp=$((now + 3600))
        local claimset=$(echo -n "{\"iss\":\"$(echo "$service_account" | jq -r '.client_email')\",\"scope\":\"https://www.googleapis.com/auth/calendar\",\"aud\":\"https://oauth2.googleapis.com/token\",\"exp\":$exp,\"iat\":$now}" | base64 -w0 | tr -d '=' | tr '/+' '_-' | tr -d '\n')

        local signing_input="${header}.${claimset}"
        local signature=$(echo -n "$signing_input" | openssl dgst -sha256 -sign <(echo "$service_account" | jq -r '.private_key' | sed 's/\\n/\n/g') | base64 -w0 | tr -d '=' | tr '/+' '_-' | tr -d '\n')

        local jwt="${signing_input}.${signature}"

        curl -s -X POST "https://oauth2.googleapis.com/token" \
            -H "Content-Type: application/x-www-form-urlencoded" \
            -d "grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=$jwt" | jq -r '.access_token'
        return
    fi

    echo "ERROR: No credentials found in .env" >&2
    return 1
}
