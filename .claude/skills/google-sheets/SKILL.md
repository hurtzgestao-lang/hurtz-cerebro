---
name: google-sheets
description: Intera com Google Sheets API usando credenciais do .env. Ler, escrever, criar planilhas.
type: implementation
---

# Google Sheets API Skill

Usa OAuth2 do .env (refresh token) pra operar planilhas.

## Quando usar

- Ler dados de planilha
- Escrever/atualizar células
- Criar nova planilha
- Adicionar linhas (append)
- Consultar metadados

## Pré-requisitos

- `GOOGLE_REFRESH_TOKEN`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` no .env
- `npm install googleapis` (se usar Node.js)

## Operações disponíveis

### Ler dados
```
GET /v4/spreadsheets/{spreadsheetId}/values/{range}
```
Range: "Página1!A1:Z100" ou "A1:Z100"

### Escrever/Atualizar
```
PUT /v4/spreadsheets/{spreadsheetId}/values/{range}?valueInputOption=USER_ENTERED
```
Body: `{ "values": [["valor1", "valor2"], ["valor3", "valor4"]] }`

### Append (adicionar linhas)
```
POST /v4/spreadsheets/{spreadsheetId}/values/{range}:append?valueInputOption=USER_ENTERED
```
Body: `{ "values": [["novo1", "novo2"]] }`

### Criar planilha
```
POST /v4/spreadsheets
```
Body: `{ "properties": { "title": "Nome da Planilha" } }`

## Exemplo de uso (Node.js)

```javascript
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

const sheets = google.sheets({ version: 'v4', auth: oauth2Client });

// Ler
const res = await sheets.spreadsheets.values.get({
  spreadsheetId: 'ID_DA_PLANILHA',
  range: 'Página1!A1:Z100'
});

// Escrever
await sheets.spreadsheets.values.update({
  spreadsheetId: 'ID_DA_PLANILHA',
  range: 'Página1!A1',
  valueInputOption: 'USER_ENTERED',
  requestBody: { values: [['valor']] }
});

// Append
await sheets.spreadsheets.values.append({
  spreadsheetId: 'ID_DA_PLANILHA',
  range: 'Página1!A',
  valueInputOption: 'USER_ENTERED',
  requestBody: { values: [['novo']] }
});

// Criar
await sheets.spreadsheets.create({
  requestBody: { properties: { title: 'Nova Planilha' } }
});
```

## Importante

- OAuth2 usa conta de usuário (não service account)
- Acessa planilhas que você tem permissão
- Range usa formato A1 (ex: "Página1!A1:C10")
- `valueInputOption: USER_ENTERED` interpreta números/fórmulas como no Sheets
