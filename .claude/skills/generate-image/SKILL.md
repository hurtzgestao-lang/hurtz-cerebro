---
name: generate-image
description: Gera imagens usando OpenRouter com o modelo GPT Image (GPT-5 Image). Lê token do .env, gera imagem e salva em arquivo.
type: local
---

# Gerador de Imagens com OpenRouter

## Quando usar
- Usuário pedir para "criar imagem", "gerar imagem", "desenhar", "fazer ilustração"
- Usuário pedir algo visual: logo, banner, ícone, ilustração
- Usuário pedir para "criar arte", "fazer design visual"

## Como funciona

### 1. Lê token do .env
```javascript
const fs = require('fs');
const env = fs.readFileSync('.env', 'utf8');
const match = env.match(/OPENROUTER_API_KEY=([^\s]+)/);
const token = match ? match[1] : null;
```

### 2. Faz request para OpenRouter
```
POST https://openrouter.ai/api/v1/chat/completions
Authorization: Bearer <token>
Content-Type: application/json

{
  "model": "google/gemini-2.5-flash-image",
  "messages": [{"role": "user", "content": "<prompt do usuário>"}]
}
```

**Nota:** Modelo usado: `google/gemini-2.5-flash-image` (rápido e eficiente). Timeout: 60s mínimo.

### 3. Extrai imagem base64 da resposta
```javascript
const imageBase64 = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
const base64Data = imageBase64.split(',')[1];
```

### 4. Salva imagem em arquivo
```javascript
const filename = `imagem_${Date.now()}.png`;
const path = `./${filename}`;
fs.writeFileSync(path, base64Data, 'base64');
```

### 5. Mostra imagem para usuário
Use Read tool para ler e exibir a imagem.

## Prompt padrão
O prompt do usuário já é suficiente. Não modifique a menos que solicitado.

## Nome do arquivo
Use formato: `imagem_<timestamp>.png`
Exemplo: `imagem_1777142363.png`

## Localização
Salvar na raiz do workspace atual.

## Erros
- Token não encontrado: pedir para verificar .env
- Request falhou: mostrar status e mensagem
- Resposta sem imagem: informar usuário
