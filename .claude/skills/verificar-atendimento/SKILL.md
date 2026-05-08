---
name: verificar-atendimento
description: Verifica o atendimento diário nos grupos de WhatsApp dos clientes via Evolution API. Lista quais grupos tiveram mensagem no dia e quais ficaram sem mensagem (alerta de silêncio). Critério: qualquer mensagem conta como atendido — relatório distingue mensagens da Hurtz vs do cliente.
---

# Verificar Atendimento — Monitoramento de Grupos de Cliente

Script: `scripts/verificar-atendimento.js`

**Pré-requisitos:**
- Evolution API conectada (mesmas variáveis da skill `evolution-api`)
- Número da Evolution adicionado nos grupos de WhatsApp dos clientes que deseja monitorar

---

## Quando usar

Quando o usuário pedir para:
- "Verifica o atendimento de hoje"
- "Quais grupos não tiveram mensagem?"
- "Cliente X foi atendido?"
- "Lista os clientes sem resposta"
- "Manda o relatório de atendimento pro Marcos / Matheus"

---

## Critério de "atendido"

Um grupo é considerado **atendido** se houve **qualquer mensagem** nele no dia (cliente OU Hurtz). O relatório separa o número de mensagens da Hurtz e do cliente, então fica fácil identificar:

- **Cliente falou e Hurtz respondeu** (saudável)
- **Só Hurtz falou** (proativo, ok)
- **Só cliente falou** (Hurtz precisa responder — pode ser usado como alerta no debug)
- **Ninguém falou** (silencioso — listado no bloco 🚨)

---

## Interpretação do pedido

| O usuário diz | Comando |
|---|---|
| "verifica o atendimento de hoje" | (sem flags) |
| "lista os grupos sem mensagem hoje" | `--silenciosos` |
| "quais grupos não foram atendidos ontem" | `--data 2026-04-28 --silenciosos` |
| "manda o relatório pro Marcos" | `--enviar Marcos` |
| "manda o resumo pro Matheus" | `--enviar Matheus` |
| "verifica o atendimento de 25/04" | `--data 2026-04-25` |

Sempre converter datas relativas com base em `currentDate` do contexto. "Hoje" = sem flag.

---

## Argumentos

| Flag | Descrição | Default |
|---|---|---|
| `--data YYYY-MM-DD` | Dia a verificar (timezone São Paulo) | hoje |
| `--enviar NOME` | Envia relatório por WhatsApp para o contato (resolve via `dados/contatos.json`) | — |
| `--silenciosos` | Mostra apenas os grupos sem mensagem no dia (omite a lista de "com mensagem") | — |
| `--debug` | Acrescenta IDs dos grupos no final do output | — |

---

## Fluxo de execução

1. Lista grupos via `GET /group/fetchAllGroups/{instance}` (Evolution API)
2. Para cada grupo, busca últimas 200 mensagens via `POST /chat/findMessages/{instance}`
3. Filtra por `messageTimestamp` no range do dia escolhido (00:00 → 24:00 UTC-3)
4. Classifica em **com mensagem** vs **sem mensagem**
5. Para os silenciosos, mostra a última atividade conhecida (data/hora + quem falou)
6. Imprime no terminal e, se `--enviar`, manda via WhatsApp

---

## Formato do relatório

```
*Atendimento de 29/04/2026*
12 grupos · 8 com msg · 4 sem msg

✅ *COM mensagem (8)*
1. Cliente A
   14 msgs (5 Hurtz / 9 cliente) · última 14:32 (cliente)
2. Cliente B
   3 msgs (3 Hurtz / 0 cliente) · última 09:15 (Hurtz)
...

🚨 *SEM mensagem (4)*
1. Cliente C
   última atividade: 27/04/2026 11:42 (cliente)
2. Cliente D
   sem histórico de mensagens
...
```

Ao mandar via `--enviar`, o mesmo texto vai pro WhatsApp (asteriscos viram negrito no app).

---

## Resposta ao usuário

Após executar, devolver o resultado direto. Se houver muitos grupos silenciosos, destacar como atenção.

Se Evolution offline, orientar:
> A instância da Evolution está desconectada. Confira em http://evolutionb.hurtzcompany.com.br/manager se a sessão está aberta.

---

## Detalhes técnicos

- API: Evolution v2.3.7
- Endpoints usados:
  - `GET /group/fetchAllGroups/{instance}?getParticipants=false` — lista de grupos (id, subject, size)
  - `POST /chat/findMessages/{instance}` body `{ where: { key: { remoteJid } }, limit: 200 }` — últimas mensagens
  - `POST /message/sendText/{instance}` — envia o relatório (apenas se `--enviar`)
- Timestamp: `messageTimestamp` em segundos UNIX. Filtro de dia usa offset `-03:00` (São Paulo).
- Limite de 200 msgs por grupo cobre vários dias mesmo em grupos ativos. Se um grupo for muito ativo e ultrapassar, ajustar `limit` no script.
- `key.fromMe = true` → mensagem da Hurtz. `false` → cliente ou outro membro do grupo.
