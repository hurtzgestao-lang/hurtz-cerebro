---
name: google-calendar
description: Gerencia Google Calendar via API v3 REST usando credenciais do .env
type: local
---

# Google Calendar - API REST v3

Gerencia eventos, convites e calendários usando Google Calendar API v3 diretamente.

## Configuração

Credenciais no `.env` (já configuradas):

```bash
GOOGLE_REFRESH_TOKEN=1//0hqvnG9rmAfP4CgYIARAAGBESNwF...
GOOGLE_CLIENT_ID=48652688131-8kcas08lbv1adrrp7jhv3k8bq1sas5ta.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GOOGLE_CREDENTIALS='{"type":"service_account",...}' # opcional
```

## Comandos (/calendar)

### Listar calendários
```bash
/calendar listar-calendarios
```

### Listar eventos
```bash
/calendar listar [calendário] [opções]
```

Opções:
- `--hoje` - Eventos de hoje
- `--dias N` - Próximos N dias
- `--semana` - Esta semana

Exemplos:
```bash
/calendar listar primary --hoje
/calendar listar --dias 7
```

### Criar evento
```bash
/calendar criar <calendário> <título> <inicio> <fim> [opções]
```

Opções:
- `--descricao <texto>`
- `--convidados <email1,email2>`
- `--meet` - Incluir Google Meet

Exemplos:
```bash
/calendar criar primary "Daily Sócio" 2026-05-01T09:00:00-03:00 2026-05-01T09:30:00-03:00
/calendar criar primary "Reunião" 2026-05-02T14:00:00-03:00 2026-05-02T15:00:00-03:00 --convidados cliente@empresa.com --meet
```

### Alterar evento
```bash
/calendar alterar <calendário> <evento-id> [opções]
```

Opções:
- `--título <novo-título>`
- `--inicio <ISO8601>`
- `--fim <ISO8601>`

Exemplo:
```bash
/calendar alterar primary EVENT_ID_HERE --título "Novo Título"
```

### Responder convite
```bash
/calendar responder <calendário> <evento-id> <status>
```

Status: `accepted`, `declined`, `tentative`

Exemplo:
```bash
/calendar responder primary EVENT_ID_HERE accepted
```

### Deletar evento
```bash
/calendar deletar <calendário> <evento-id>
```

Exemplo:
```bash
/calendar deletar primary EVENT_ID_HERE
```

### Criar evento dia inteiro
```bash
/calendar criar-dia <calendário> <título> <data>
```

Exemplo:
```bash
/calendar criar-dia primary "Workshop" 2026-05-03
```

## Implementação

Helper em [.claude/skills/google-calendar/calendar-api.sh](calendar-api.sh) que:
1. Busca credenciais do `.env`
2. Obtém access token via OAuth refresh
3. Faz chamadas REST à API v3

Horários: ISO 8601 com timezone (`-03:00`)

## Referência API

- [Overview](https://developers.google.com/workspace/calendar/api/guides/overview)
- [Events](https://developers.google.com/workspace/calendar/api/v3/reference/events)
- [CalendarList](https://developers.google.com/workspace/calendar/api/v3/reference/calendarList)
