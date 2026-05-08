---
name: meta-ads-insights
description: Extrai dados de tráfego do Meta Ads (gasto, impressões, cliques, leads, vídeo, conversões pixel) por dia × anúncio. Salva em aba única no Google Sheets pra alimentar dashboards e mantém JSON local nos 4 níveis hierárquicos.
---

# Meta Ads Insights — Extração de Dados de Tráfego

Script: `scripts/meta-ads-insights.js`

**Variáveis de ambiente (.env):**
- `META_PAGE_TOKEN` — User token com `ads_management` + `business_management`
- `META_ADS_HURTZ_01` — `1187686609470801` — CA - HURTZ CONSORCIOS 01
- `META_ADS_HURTZ_02` — `1280285297039435` — CA - HURTZ CONSORCIOS 02
- `META_ADS_SHEET_ABRIL_2026` — planilha mensal corrente (atualize ao criar nova)

Por padrão a skill consulta as duas contas Hurtz Consórcio. Outras contas precisam ser passadas via `--account act_ID`.

---

## Quando usar

Quando o usuário pedir para:
- Ver gasto / investimento em Meta Ads
- Comparar performance de anúncios
- Calcular CPL, CTR, taxa de view de vídeo, conversões pixel
- Atualizar dashboard de tráfego
- Ver quanto custou X leads
- Snapshot mensal de performance

---

## Interpretação do pedido

| O usuário diz | Comando |
|---|---|
| "puxa o tráfego de abril" | `--since 2026-04-01 --new-sheet` |
| "atualiza o dashboard de tráfego" | `--update $META_ADS_SHEET_ABRIL_2026 --since 2026-04-01` |
| "quanto investimos essa semana" | `--date-preset last_7d --debug` |
| "performance dos últimos 30 dias" | `--date-preset last_30d --debug` |
| "performance da conta CA - HURTZ CONSORCIOS 01" | `--account act_1187686609470801 --since YYYY-MM-DD` |
| "qual anúncio gerou mais lead em abril" | `--since 2026-04-01 --debug` (depois ler o JSON em `dados/`) |

Sempre calcular as datas com base em `currentDate` do contexto.

---

## Date presets aceitos

`today`, `yesterday`, `this_week_mon_today`, `last_7d`, `last_14d`, `last_28d`, `last_30d`, `last_90d`, `this_month`, `last_month`, `maximum`. Use `--date-preset NOME` em vez de `--since/--until`.

---

## Layout da planilha (aba única)

Uma planilha por mês: `Tráfego | Meta Ads | [Mês] [Ano]` — uma única aba `Anúncios` com granularidade dia × anúncio.

**Colunas (na ordem):**

1. Date
2. Ad Name
3. Adset Name
4. Campaign Name
5. Spend (Cost, Amount Spent)
6. Action Leads
7. Action Link Clicks
8. Action Landing Page View
9. Impressions
10. Action 3s Video Views
11. Video 50 Percent Watched Actions
12. Video 75 Percent Watched Actions
13. Video 95 Percent Watched Actions
14. Instagram Permalink URL
15. Action FB Pixel Purchase (Offsite Conversion)
16. Action FB Pixel Initiate Checkout (Offsite Conversion)
17. Thumbnail URL 02

Pra agregar pra campanha/adset/conta no Sheets, usar pivot table ou `SUMIF`/`QUERY` sobre `Campaign Name`/`Adset Name`/etc.

Cabeçalho formatado (fundo escuro, texto Brasa Viva, negrito), linha 1 congelada, colunas auto-ajustadas.

---

## Fluxo de execução

### 1. Snapshot mensal (planilha nova)

```bash
node scripts/meta-ads-insights.js --since 2026-04-01 --new-sheet
```

Cria planilha `Tráfego | Meta Ads | [Mês] [Ano]`. Ao final, imprime um `META_ADS_SHEET_MES_ANO=...` pra adicionar no `.env`.

### 2. Atualizar planilha existente (sem duplicar)

```bash
node scripts/meta-ads-insights.js --update SHEET_ID --since 2026-04-01
```

Lê chaves `Date + Ad Name` existentes na planilha e adiciona só linhas novas. Ideal pra rodar diariamente/semanalmente.

### 3. Só JSON local (sem Sheets)

```bash
node scripts/meta-ads-insights.js --since 2026-04-01
```

Salva em `dados/ads-insights-{mes}-{ano}.json` mantendo os 4 níveis hierárquicos.

### 4. Só visualizar (sem gravar)

```bash
node scripts/meta-ads-insights.js --since 2026-04-22 --debug
```

Mostra contagens por nível, totais agregados e amostra das primeiras 3 linhas da planilha.

### 5. Conta específica

```bash
node scripts/meta-ads-insights.js --account act_1187686609470801 --since 2026-04-01

# Várias contas (uma flag por conta)
node scripts/meta-ads-insights.js --account act_1187686609470801 --account act_1280285297039435 --since 2026-04-01
```

---

## Estrutura do JSON local

JSON local mantém **todos os 4 níveis** (account, campaign, adset, ad) — útil pra análise programática sem precisar agregar na mão:

```json
{
  "meta": {
    "periodo": "Abril 2026",
    "atualizado_em": "2026-04-29 12:00:00",
    "contas": ["act_1187686609470801", "act_1280285297039435"],
    "totais": { "spend": 1492.55, "impressions": 100526, "clicks": 2204, "leads": 1020, "conversas_whatsapp": 14 }
  },
  "linhas": {
    "account":  [...],
    "campaign": [...],
    "adset":    [...],
    "ad":       [...]
  }
}
```

Cada linha tem: `data` (YYYY-MM-DD), IDs/nomes do hierárquico, `spend`, `impressions`, `clicks`, `reach`, `frequency`, `ctr`, `cpc`, `cpm`, `leads`, `conversas_whatsapp`, `link_clicks`, `landing_page_views`, `video_views_3s`, `purchases`, `initiate_checkouts`, `custo_por_lead`, e (no nível ad) `video_p50_watched`, `video_p75_watched`, `video_p95_watched`.

Dedup automática por `data + entity_id`.

---

## Resposta ao usuário

```
✓ [N] linhas — [período] — R$ [GASTO] / [LEADS] leads / R$ [CPL]/lead
Local: dados/ads-insights-[mes]-[ano].json
Planilha: [URL clicável]  (se houver operação de sheet)
```

Se erro de token, orientar:
> O token expirou. Gere um novo em developers.facebook.com/tools/explorer com `ads_management` + `business_management` e atualize `META_PAGE_TOKEN` no `.env`.

---

## Detalhes técnicos

- API: Meta Marketing API v21.0
- Endpoint principal: `GET /{account_id}/insights?level=ad&time_increment=1&fields=...`
- Endpoint creative: `GET /?ids=ad_id_1,ad_id_2,...&fields=creative{thumbnail_url,instagram_permalink_url}` (batch de 50)
- `time_increment=1` traz uma linha por dia × anúncio (essencial pra dashboards temporais)
- Token expira em ~60 dias — se der erro 190, renovar

### Mapeamento de actions extraídas

| Coluna da planilha | Origem |
|---|---|
| Action Leads | `actions[].action_type` em `lead`, `offsite_complete_registration_add_meta_leads`, `onsite_conversion.lead_grouped` |
| Action Link Clicks | `actions[].action_type=link_click` |
| Action Landing Page View | `actions[].action_type=landing_page_view` |
| Action 3s Video Views | `actions[].action_type=video_view` (3s+ por padrão) |
| Video 50/75/95 % Watched | fields top-level `video_p50_watched_actions`, `video_p75_watched_actions`, `video_p95_watched_actions` |
| FB Pixel Purchase | `actions[].action_type=offsite_conversion.fb_pixel_purchase` |
| FB Pixel Initiate Checkout | `actions[].action_type=offsite_conversion.fb_pixel_initiate_checkout` |
| Instagram Permalink URL | `creative.instagram_permalink_url` |
| Thumbnail URL 02 | `creative.thumbnail_url` (fallback `creative.image_url`) |

Se aparecer um novo action_type relevante, adicionar no Set correspondente do script.
