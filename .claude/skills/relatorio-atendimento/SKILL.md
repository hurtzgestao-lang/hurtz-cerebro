---
name: relatorio-atendimento
description: Gera relatório diário de atendimento aos clientes nos grupos de WhatsApp, dividido por gestor (Vinicius, Mateus, Kerlys), e envia direto pro grupo "Hurtz Company | Operacional" via Evolution API. Critério: qualquer mensagem no dia conta como atendido.
---

# Relatório de Atendimento — Distribuído por Gestor

Script: `scripts/relatorio-atendimento-grupos.js`

**Pré-requisitos:**
- Evolution API conectada
- Mapeamento atualizado em `dados/grupos-gestores.json` (gerado por `scripts/mapear-grupos-gestores.js`)
- Variável `EVOLUTION_GROUP_OPERACIONAL` no `.env` apontando pro grupo onde o relatório é enviado

---

## Quando usar

Quando o usuário pedir para:
- "Manda o relatório de atendimento de hoje pro grupo"
- "Gera o relatório de atendimento por gestor"
- "Quem foi atendido hoje? Manda no Operacional"
- "Verifica o atendimento de ontem e manda no Op"

Diferente da skill `verificar-atendimento` (que mostra no terminal e pode mandar pra um contato), esta skill **sempre envia pro grupo Operacional** com formato dividido por gestor.

---

## Fluxo

1. Lê `dados/grupos-gestores.json` (mapeamento grupo → gestor)
2. Pra cada grupo, busca mensagens via Evolution API
3. Filtra por timestamp do dia (timezone São Paulo)
4. Agrupa por gestor (Vinicius, Mateus, Kerlys, "Sem gestor")
5. Monta relatório com emojis e separadores
6. Envia pro grupo Operacional (a menos que `--dry-run`)

---

## Argumentos

| Flag | Descrição | Default |
|---|---|---|
| `--data YYYY-MM-DD` | Dia a verificar | hoje |
| `--dry-run` | Imprime no terminal mas NÃO envia | — |
| `--debug` | Lista cada grupo com contagem de msgs | — |

---

## Formato do relatório

```
*📊 Atendimento — 29/04/2026*
43 clientes · ✅ 25 atendidos · 🚨 18 sem msg

━━━━━━━━━━━━━━━━━━━

🟦 *Vinicius (15)*
✅ 10 atendido(s)
🚨 5 sem mensagem:
• Cliente A — última 27/04 (2d atrás)
• Cliente B — sem histórico
...

━━━━━━━━━━━━━━━━━━━

🟨 *Mateus (13)*
✅ 13 atendido(s)
🎉 todos atendidos hoje!

━━━━━━━━━━━━━━━━━━━

🟧 *Kerlys (11)*
...

━━━━━━━━━━━━━━━━━━━

⚠️ *Sem gestor (4)*
...
```

Emojis fixos por gestor pra leitura rápida em scroll de WhatsApp:
- 🟦 Vinicius
- 🟨 Mateus
- 🟧 Kerlys
- ⚠️ Sem gestor (grupos novos sem cliente cadastrado)

---

## Recomendações

**Antes do primeiro uso real:**
- Confirme que o mapeamento está em dia: `node scripts/mapear-grupos-gestores.js`
- Faça `--dry-run` primeiro pra validar formato em casos novos

**Quando aparecer cliente novo:**
- Edite `dados/grupos-aliases.json` se o nome divergir entre planilha e grupo
- Rode `mapear-grupos-gestores.js` pra atualizar o JSON
- Skill já vai pegar a próxima execução

---

## Contexto técnico

- A Evolution só capta mensagens **depois** que foi adicionada no grupo. Mensagens anteriores ficam fora a menos que `syncFullHistory: true` seja setado nas settings da instância.
- Limit de 200 msgs por grupo cobre vários dias de uso típico. Se um grupo for muito ativo, ajustar no script.
- Batches de 6 grupos paralelos pra não estressar a API com 40+ requests.
- `key.fromMe = true` → mensagem da Hurtz; `false` → cliente.
- `messageTimestamp` é UNIX em segundos.

---

## Resposta ao usuário

Após execução real (sem dry-run):
```
✓ Relatório enviado pro grupo Operacional
[N] clientes · ✅ X atendidos · 🚨 Y sem msg
```

Em dry-run:
```
[dry-run] Mensagem não foi enviada. Use sem --dry-run pra enviar.
```
