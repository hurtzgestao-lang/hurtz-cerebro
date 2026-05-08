---
name: meta-leads
description: Extrai leads do Meta Lead Ads (formulário nativo) e grava no Google Sheets. Suporta nova planilha por mês, append e filtro por data.
---

# Meta Leads — Extração de Leads do Meta Ads

Script: `scripts/meta-leads.js`

**Variáveis de ambiente (.env):**
- `META_PAGE_TOKEN` — Page Access Token com `pages_manage_ads` + `leads_retrieval`
- `META_FORM_ID` — ID do formulário (padrão: `3364141997087026`)
- `META_PAGE_ID` — ID da página (padrão: `380261135178493`)
- `META_SHEET_ID` — ID da planilha padrão para append

---

## Quando usar

Quando o usuário pedir para:
- Extrair leads do Meta / Facebook
- Puxar leads do formulário de captação
- Criar planilha de leads do mês
- Ver quantos leads vieram no período
- Atualizar banco de dados de leads

---

## Interpretação do pedido

| O usuário diz | Comando a rodar |
|---|---|
| "extrai os leads de abril" | `--since 2026-04-01 --new-sheet` |
| "cria planilha do mês" | `--since YYYY-MM-01 --new-sheet` (mês atual) |
| "atualiza a planilha de abril" | `--update 1_PeEPw-0SJjmJHWUe_2P47eayqnQmU3ZMgWG-j3w4WM --since 2026-04-01` |
| "atualiza a planilha com os leads novos" | `--update SHEET_ID` (sem `--since` pega todos e deduplica) |
| "quantos leads vieram essa semana" | `--since YYYY-MM-DD --debug` (segunda-feira da semana) |
| "adiciona os leads novos na planilha padrão" | `--since ONTEM` (sem `--update`, sem `--new-sheet`) |
| "pega todos os leads" | sem filtro, sem `--new-sheet` |
| "extrai leads desde [data]" | `--since [data]` |

Sempre calcular as datas com base em `currentDate` do contexto. Nunca pedir confirmação de data se estiver claro no pedido.

Quando o usuário disser "atualiza a planilha" sem especificar qual, usar a planilha do mês corrente se existir (ver `.env` para IDs salvos como `META_SHEET_MES_ANO`).

---

## Planilhas salvas (.env)

| Variável | Planilha |
|---|---|
| `META_SHEET_ABRIL_2026` | `1_PeEPw-0SJjmJHWUe_2P47eayqnQmU3ZMgWG-j3w4WM` — Leads \| Consórcio \| Abril 2026 |
| `META_SHEET_ID` | `1n5Kr09_fNTjN4nLUqZNeNjG4H6qGtXtscnGXN8a-AFc` — Planilha original do n8n |

Ao criar planilha nova, orientar o usuário a salvar o ID no `.env` como `META_SHEET_MES_ANO`.

---

## Fluxo de execução

### 1. Nova planilha mensal

```bash
node scripts/meta-leads.js --since YYYY-MM-01 --new-sheet
```

Cria planilha nova com:
- Título: `Leads | Consórcio | [Mês] [Ano]`
- Cabeçalho formatado (fundo escuro, texto Brasa Viva, negrito)
- Colunas: Data, Nome, Telefone, E-mail, Como Atua, Média de Vendas, Time de Vendas, Como Capta, Administradora, Cidade, Instagram
- Telefones no formato `(XX) XXXXX-XXXX`
- Linha 1 congelada

### 2. Atualizar planilha existente (sem duplicar)

```bash
node scripts/meta-leads.js --update SHEET_ID --since YYYY-MM-DD
```

- Lê os telefones já existentes na planilha (coluna C)
- Busca leads no Meta
- Insere **apenas os leads novos** (deduplicação por telefone)
- Informa quantos eram duplicados e quantos foram adicionados

### 3. Append simples na planilha padrão

```bash
node scripts/meta-leads.js --since YYYY-MM-DD
```

### 4. Todos os leads

```bash
node scripts/meta-leads.js
```

### 5. Apenas visualizar (sem gravar)

```bash
node scripts/meta-leads.js --since YYYY-MM-DD --debug
```

---

## Arquivo local (automático)

Em **toda extração** (exceto `--debug`), o script salva ou atualiza automaticamente um JSON em `dados/`:

| `--since` | Arquivo gerado |
|---|---|
| `2026-04-01` | `dados/leads-abril-2026.json` |
| `2026-05-01` | `dados/leads-maio-2026.json` |
| sem filtro | `dados/leads-todos.json` |

O JSON tem deduplicação por telefone — rodar duas vezes não duplica. Estrutura:

```json
{
  "meta": { "periodo": "Abril 2026", "atualizado_em": "...", "total": 324 },
  "leads": [
    {
      "data": "27/04/2026",
      "nome": "...",
      "telefone": "(XX) XXXXX-XXXX",
      "email": "...",
      "como_atua": "...",
      "media_vendas": "...",
      "time_vendas": "...",
      "como_capta": "...",
      "administradora": "...",
      "cidade": "...",
      "instagram": "..."
    }
  ]
}
```

Para análises aqui no projeto, sempre ler `dados/leads-{mes}-{ano}.json` — sem precisar fazer requisição externa.

## Filtro de MQL

O script `meta-leads.js` salva **todos os leads brutos** (sem filtro) — isso é intencional para manter histórico completo.

Quando o usuário pedir especificamente uma **planilha ou lista de MQLs**, usar `scripts/mql-criteria.js` para filtrar:

```js
const { filtrarMqls } = require('./mql-criteria');
const mqls = filtrarMqls(leads);
```

Critérios aplicados automaticamente pelo módulo (fonte: `_contexto/mql.md`):
1. Remove `como_atua == "consultor(a) de vendas"`
2. Remove time de vendas < 2 pessoas
3. Remove administradoras **não-independentes**: bancos (BB, Santander, Bradesco, Itaú, Caixa, VW Banco), seguradoras (Porto Seguro), montadoras (Honda, Yamaha, VW, Ford, Fiat, etc.) — descarta só quando a administradora for **exclusivamente** dessas categorias.

Para adicionar novos casos identificados em campo, editar apenas `scripts/mql-criteria.js` (array `NAO_INDEPENDENTES`).

---

## Resposta ao usuário

Após executar, responder com:

```
✓ [N] leads — [período]
Local: dados/leads-[mes]-[ano].json
Planilha: [URL clicável]  (se houver operação de sheet)
```

Se `--debug`, mostrar contagem e amostra dos dados sem link de planilha.

Se erro de token, orientar:
> O token expirou. Acesse developers.facebook.com/tools/explorer, gere um novo Page Access Token para a página Marcos Hurtz com permissões `pages_manage_ads` e `leads_retrieval`, e atualize `META_PAGE_TOKEN` no `.env`.

---

## Detalhes técnicos

- API: Meta Graph API v21.0
- Endpoint: `GET /{form_id}/leads?fields=field_data,created_time`
- Paginação automática (cursor-based)
- Filtro por data usa `filtering=[{"field":"time_created","operator":"GREATER_THAN","value":TIMESTAMP}]`
- Token tipo PAGE (não user token)
- Token expira em ~60 dias — se der erro 190, precisa renovar

### Mapeamento de campos do formulário

| Coluna | Campo Meta | Busca por substring |
|---|---|---|
| Como Atua | `como_você_atua_hoje...` | `como_você_atua` |
| Média de Vendas | `qual_a_média_de_vendas...` | `média_de_vendas` |
| Time de Vendas | `quantas_pessoas_você_tem_no_seu_time_de_vendas` | `time_de_vendas` |
| Como Capta | `como_você_capta_clientes...` | `como_você_capta` |
| Administradora | `qual_administradora_você_atua` | `administradora` |
| Cidade | `qual_cidade_fica_localizado...` | `cidade` |
| Instagram | `qual_o_@_do_instagram...` | `instagram` |
| Nome | `full_name` | `full_name` |
| Telefone | `phone_number` | `phone_number` |
| E-mail | `email` | `email` |
