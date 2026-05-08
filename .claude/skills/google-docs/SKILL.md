---
name: google-docs
description: Cria, lê, edita, copia e compartilha Google Docs via API REST usando credenciais do .env
type: implementation
---

# Google Docs API Skill

Usa OAuth2 do .env (refresh token) pra operar documentos Google Docs e permissões via Drive API.

## Quando usar

- Criar documento novo
- Ler conteúdo de um documento
- Escrever/inserir texto em documento existente
- Copiar documento (a partir de template)
- Compartilhar documento (link público ou por e-mail)
- Listar documentos do Drive

## Pré-requisitos

- `GOOGLE_REFRESH_TOKEN`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` no `.env` (já configurados)
- `npm install googleapis` (se usar Node.js)

## Scopes necessários

A conta já autoriza `drive` scope, que cobre tudo do Docs:
- `https://www.googleapis.com/auth/documents`
- `https://www.googleapis.com/auth/drive`
- `https://www.googleapis.com/auth/drive.file`

---

## Operações disponíveis

### Criar documento

```
POST https://docs.googleapis.com/v1/documents
Body: { "title": "Título do Documento" }
```

Retorna o objeto Document com `documentId` gerado automaticamente.

### Ler documento

```
GET https://docs.googleapis.com/v1/documents/{documentId}
```

Retorna conteúdo completo: título, body, parágrafos, tabelas, listas.

### Escrever texto no documento (batchUpdate)

```
POST https://docs.googleapis.com/v1/documents/{documentId}:batchUpdate
Body: {
  "requests": [
    {
      "insertText": {
        "location": { "index": 1 },
        "text": "Texto a inserir\n"
      }
    }
  ]
}
```

O `index: 1` insere no início do documento. Para inserir ao final, usar o endIndex do último elemento.

### Copiar documento (via Drive API)

```
POST https://www.googleapis.com/drive/v3/files/{fileId}/copy
Body: { "name": "Nome da Cópia" }
```

Retorna o novo arquivo com o `id` (que é o `documentId` do Docs).

### Compartilhar com link público

```
POST https://www.googleapis.com/drive/v3/files/{fileId}/permissions
Body: {
  "role": "reader",
  "type": "anyone"
}
```

Para liberar edição pública: `"role": "writer"`.

### Compartilhar com e-mail específico

```
POST https://www.googleapis.com/drive/v3/files/{fileId}/permissions
Body: {
  "role": "writer",
  "type": "user",
  "emailAddress": "pessoa@email.com"
}
```

Roles disponíveis: `reader`, `commenter`, `writer`, `owner`.

### Listar documentos do Drive

```
GET https://www.googleapis.com/drive/v3/files
  ?q=mimeType='application/vnd.google-apps.document'
  &fields=files(id,name,createdTime,modifiedTime,webViewLink)
  &orderBy=modifiedTime desc
```

---

## Exemplo de uso (Node.js)

```javascript
const { google } = require('googleapis');
require('dotenv').config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

const docs = google.docs({ version: 'v1', auth: oauth2Client });
const drive = google.drive({ version: 'v3', auth: oauth2Client });

// Criar documento
const { data: doc } = await docs.documents.create({
  requestBody: { title: 'Meu Documento' }
});
console.log('ID:', doc.documentId);
console.log('URL:', `https://docs.google.com/document/d/${doc.documentId}/edit`);

// Ler documento
const { data: content } = await docs.documents.get({
  documentId: 'ID_DO_DOCUMENTO'
});
console.log('Título:', content.title);

// Escrever texto
await docs.documents.batchUpdate({
  documentId: 'ID_DO_DOCUMENTO',
  requestBody: {
    requests: [
      {
        insertText: {
          location: { index: 1 },
          text: 'Texto inserido via API\n'
        }
      }
    ]
  }
});

// Copiar documento
const { data: copia } = await drive.files.copy({
  fileId: 'ID_DO_ORIGINAL',
  requestBody: { name: 'Cópia do Documento' }
});
console.log('ID da cópia:', copia.id);

// Compartilhar com link público (somente leitura)
await drive.permissions.create({
  fileId: 'ID_DO_DOCUMENTO',
  requestBody: { role: 'reader', type: 'anyone' }
});

// Compartilhar com e-mail
await drive.permissions.create({
  fileId: 'ID_DO_DOCUMENTO',
  requestBody: {
    role: 'writer',
    type: 'user',
    emailAddress: 'colaborador@email.com'
  },
  sendNotificationEmail: true
});

// Listar docs
const { data: lista } = await drive.files.list({
  q: "mimeType='application/vnd.google-apps.document'",
  fields: 'files(id,name,createdTime,modifiedTime,webViewLink)',
  orderBy: 'modifiedTime desc',
  pageSize: 20
});
lista.files.forEach(f => console.log(f.name, f.webViewLink));
```

---

## Script de execução rápida (Bash via curl)

```bash
# Obter access token a partir do refresh token
ACCESS_TOKEN=$(curl -s -X POST https://oauth2.googleapis.com/token \
  -d "client_id=$GOOGLE_CLIENT_ID" \
  -d "client_secret=$GOOGLE_CLIENT_SECRET" \
  -d "refresh_token=$GOOGLE_REFRESH_TOKEN" \
  -d "grant_type=refresh_token" | jq -r '.access_token')

# Criar documento
curl -s -X POST "https://docs.googleapis.com/v1/documents" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Meu Documento"}' | jq '{documentId, title}'

# Ler documento
curl -s "https://docs.googleapis.com/v1/documents/ID_DO_DOCUMENTO" \
  -H "Authorization: Bearer $ACCESS_TOKEN" | jq '.title'

# Copiar via Drive
curl -s -X POST "https://www.googleapis.com/drive/v3/files/ID_DO_DOCUMENTO/copy" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "Cópia"}' | jq '{id, name}'

# Compartilhar publicamente
curl -s -X POST "https://www.googleapis.com/drive/v3/files/ID_DO_DOCUMENTO/permissions" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"role": "reader", "type": "anyone"}' | jq .
```

---

## Importante

- OAuth2 usa conta de usuário (não service account) — acessa apenas documentos da sua conta ou compartilhados com você
- `documentId` é a parte da URL entre `/d/` e `/edit`: `docs.google.com/document/d/**{documentId}**/edit`
- `batchUpdate` com `insertText` em `index: 1` sempre insere no início; para append, buscar o `endIndex` do body via `get` primeiro
- Copiar documento preserva formatação, imagens e estilos do original — ideal para templates
- Permissão `anyone + reader` = link público somente leitura; `anyone + writer` = link público com edição (cuidado)
- Drive API e Docs API compartilham o mesmo `fileId` / `documentId`

## Referência

- [Google Docs REST API](https://developers.google.com/workspace/docs)
- [documents.create](https://developers.google.com/docs/api/reference/rest/v1/documents/create)
- [documents.batchUpdate](https://developers.google.com/docs/api/reference/rest/v1/documents/batchUpdate)
- [Drive files.copy](https://developers.google.com/drive/api/reference/rest/v3/files/copy)
- [Drive permissions.create](https://developers.google.com/drive/api/reference/rest/v3/permissions/create)
