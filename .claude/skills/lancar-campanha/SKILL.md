---
name: lancar-campanha
description: Orquestra o lançamento completo de uma campanha de Meta Ads pra um cliente — entrevista briefing, gera criativo (copy + imagem), sobe no Meta via MCP oficial, agenda revisão, notifica cliente no WhatsApp e registra no histórico. Aciona ao "lança campanha pro X", "vamos subir anúncio do Y", "/lancar-campanha", "monta e sobe campanha".
---

# lancar-campanha — Lançamento End-to-End de Campanha Meta Ads

Comando integrador que substitui ~3h de trabalho manual por uma conversa de ~10min. Orquestra:

1. Identidade do gestor
2. Cliente + briefing
3. Geração de criativo (chama `gerar-criativo`)
4. Subida no Meta Ads (via MCP oficial `mcp.facebook.com/ads`)
5. Tarefa de revisão em 48h (chama `criar-tarefa-para`)
6. Notificação no grupo do cliente (chama `evolution-api`)
7. Registro em `clientes/{slug}/historico.md`

---

## Pré-requisito: instalar MCP oficial Meta Ads

A Meta lançou em abril/2026 o servidor MCP oficial pra gestão de anúncios via IA: `https://mcp.facebook.com/ads`. 29 ferramentas em 4 áreas (reporting, campaign management, catalog management, signal diagnostics). Autenticação via OAuth Business — **não precisa configurar token**.

### Detectar se está instalado

Antes de seguir, checar se as tools `mcp__meta-ads__*` existem na sessão. Se não existirem:

```
Pra usar o /lancar-campanha você precisa instalar o MCP oficial da Meta uma vez.

Roda isso no terminal (fora do Claude Code):

  claude mcp add --transport http meta-ads https://mcp.facebook.com/ads

Depois de instalar, abra de novo o Claude Code, autorize sua conta Meta Business no fluxo OAuth e pronto.

Documentação: https://www.facebook.com/business/help/1456422242197840

Quer que eu siga só gerando o criativo (sem subir no Meta) por enquanto?
```

Se gestor disse sim → seguir até o passo 4 e parar. Salvar criativo, mas não subir.

---

## Quando usar

- "lança campanha pro Dr. Alan, captação de lead, R$ 100/dia"
- "vamos subir anúncio novo pro Dr. Wanderson"
- "monta e sobe a campanha de consórcio imobiliário do Dr. Alan"
- `/lancar-campanha dr-alan-andrade`
- "preciso testar 3 ângulos diferentes pra Dr. Wanderson"

---

## Inputs necessários (entrevistar se faltar)

```
1. Cliente — slug em clientes/{slug}/
2. Objetivo — leads | conversões | tráfego | engajamento | reconhecimento
3. Budget — R$/dia (padrão: R$ 50/dia)
4. Duração inicial — quantos dias rodar antes de revisar (padrão: 2 dias)
5. Público — usar público salvo do cliente OU criar novo (perguntar idade, localização, interesses)
6. Ângulo principal — qual dor/desejo mexer
7. Imagem — gerar nova OU usar existente (path)
```

Se gestor já trouxe alguns no pedido inicial, não perguntar de novo. Pedir só o que falta.

---

## Fluxo

### 1. Identidade + cliente

```
chamar skill quem-sou-eu  →  {gestor}
ler clientes/{slug}/CLAUDE.md + briefing.md + aprendizados.md
ler clientes/{slug}/historico.md (últimas 10 entradas pra ter contexto)
```

Se cliente não existe → avisar e oferecer `/novo-projeto`.

### 2. Briefing rápido (entrevista)

Perguntar só o que faltou. Formato direto:

```
Lançar campanha pro {cliente}. Preciso confirmar:

- Objetivo: {default sugerido baseado em histórico} ?
- Budget/dia: R$ {default}?
- Ângulo: {sugerir 3 baseados em briefing+aprendizados}
- Público: usar {público X salvo} OU criar novo?
- Imagem: gerar nova OU tem alguma já aprovada?

Confirma ou ajusta.
```

### 3. Gerar criativo

Chamar skill `gerar-criativo` passando:
- cliente, objetivo, ângulo, público
- variações: 3 (não 5 — pra teste rápido)
- imagem: sim/não conforme gestor

Esperar output em `clientes/{slug}/criativos/{data}-{tema}.md`.

### 4. Mostrar pro gestor antes de subir

```
Criativo gerado:

COMBINAÇÃO A (a que vou subir como principal):
- Headline: ...
- Body: ...
- CTA: ...
- Imagem: clientes/{slug}/criativos/imagens/{arquivo}.png

VARIAÇÕES B e C (vão subir como ad set de teste):
- B: Headline {N} + Body {N} + CTA {N}
- C: Headline {N} + Body {N} + CTA {N}

Configuração da campanha:
- Conta: {auto-detectar do cliente — ver clientes/{slug}/CLAUDE.md ou pedir}
- Budget: R$ {X}/dia × 3 anúncios = R$ {3X}/dia total
- Objetivo: {OUTCOME_LEADS|OUTCOME_SALES|etc}
- Público: {salvo X | novo descrito}
- Duração: {N} dias

Subo? (sim / ajustar / cancelar)
```

**Esperar confirmação explícita do gestor antes de subir.** Não subir automaticamente — campanha rodando custa dinheiro de cliente.

### 5. Subir no Meta Ads (via MCP oficial)

Se gestor confirmou, chamar tools do MCP `meta-ads` na ordem:

```
a) Criar campanha:
   mcp__meta-ads__create_campaign({
     account_id: "act_{ID_CONTA}",
     name: "{Cliente} | {Objetivo} | {Tema} | {YYYY-MM-DD}",
     objective: "{OUTCOME_LEADS|...}",
     status: "PAUSED",  // sempre subir pausada e revisar
     special_ad_categories: []
   })

b) Criar ad set (1 por variação se for teste A/B/B):
   mcp__meta-ads__create_adset({
     campaign_id, name, daily_budget, targeting, ...
   })

c) Criar criativo (image + copy):
   mcp__meta-ads__create_ad_creative({
     image_url, headline, body, cta_type, link_url, ...
   })

d) Criar ad:
   mcp__meta-ads__create_ad({
     adset_id, creative_id, name, status: "PAUSED"
   })

e) Mostrar IDs criados e link pro Ads Manager:
   "Campanha {ID} criada PAUSADA. Revisa em: https://business.facebook.com/adsmanager/manage/campaigns?act={conta}&selected_campaign_ids={ID}"
```

**Notas:**
- Sempre subir com `status: PAUSED`. Gestor ativa manualmente após revisar no Ads Manager.
- Se MCP não tiver tool exata, listar tools disponíveis (`mcp__meta-ads__*`) e adaptar.
- Se OAuth ainda não foi feito, MCP vai pedir — só seguir o fluxo.

### 6. Agendar tarefa de revisão (48h)

Chamar skill `criar-tarefa-para` com:
- destinatário: gestor que rodou
- descrição: "Revisar campanha {Cliente} | {Tema} — verificar CPL, ajustar budget se positivo, pausar se negativo. Link Ads Manager: {url}"
- prazo: hoje + 2 dias

### 7. Registrar no histórico do cliente

Append em `clientes/{slug}/historico.md`:

```markdown
## {YYYY-MM-DD} — Campanha lançada: {Tema}

- Gestor: {nome}
- Objetivo: {objetivo}
- Budget: R$ {X}/dia
- Variações: 3 (A/B/C)
- Ângulo: {ângulo}
- Status: PAUSADA aguardando ativação
- Campaign ID: {ID}
- Criativo: [clientes/{slug}/criativos/{arquivo}.md](criativos/{arquivo}.md)
```

Histórico é append-only via `.gitattributes merge=union` — múltiplos gestores podem editar sem conflito.

### 8. Notificar cliente no grupo WhatsApp

Chamar skill `evolution-api`. Mensagem padrão:

```
Boa tarde, {Cliente}!

Acabei de subir uma nova campanha pra você no Meta Ads:

📌 Tema: {tema}
🎯 Objetivo: {objetivo em PT-BR}
💰 Budget de teste: R$ {X}/dia

Tá pausada esperando revisão final. Em 48h reviso a performance e te mando o resultado.

Qualquer coisa, é só chamar.
— {Nome do gestor}
```

Gestor pode editar antes de mandar (perguntar "envio essa mensagem ou ajusta?").

### 9. Resumo final

```
✓ Campanha lançada (PAUSADA)

- Campanha: {ID}
- 3 ads (A/B/C) prontos
- Tarefa de revisão criada pra {data + 2}
- Histórico atualizado em clientes/{slug}/historico.md
- Cliente notificado no grupo

Próximo passo: você ativa no Ads Manager → https://business.facebook.com/adsmanager/manage/campaigns?act={conta}&selected_campaign_ids={ID}
```

---

## Edge cases

- **Cliente sem CLAUDE.md/briefing:** parar antes do passo 3, oferecer `/novo-projeto` ou entrevista rápida.
- **MCP Meta não instalado:** mostrar comando de instalação (ver topo). Oferecer continuar só com geração de criativo.
- **OAuth Meta expirado:** o MCP avisa, gestor reautoriza no navegador.
- **Conta de anúncio não identificada:** perguntar qual conta (`act_1187686609470801` Hurtz 01 ou `act_1280285297039435` Hurtz 02).
- **Erro ao criar criativo no Meta:** mostrar erro, salvar criativo localmente mesmo assim, sugerir subir manual.
- **Cliente sem grupo WhatsApp configurado:** pular passo 8, avisar gestor.
- **Imagem gerada não bateu com a marca:** oferecer regenerar (volta pra `gerar-criativo` com prompt ajustado).

---

## Variáveis de ambiente

| Variável | Uso |
|---|---|
| `HURTZ_GESTOR` | Identidade do gestor (já existe) |
| `META_ADS_HURTZ_01` | Conta padrão Hurtz 01 (já existe) |
| `META_ADS_HURTZ_02` | Conta padrão Hurtz 02 (já existe) |
| OAuth Meta | Gerenciado pelo MCP, não vai no .env |

Sem novas variáveis. O MCP oficial cuida de auth via OAuth.

---

## Custo de erro (importante)

Essa skill **gasta dinheiro de cliente**. Sempre:

1. Subir com `status: PAUSED`
2. Confirmar com gestor antes de subir
3. Mostrar budget total (R$ X/dia × N anúncios) explicitamente
4. Nunca ativar a campanha automaticamente — gestor ativa manual no Ads Manager

Se houver dúvida, parar e perguntar. Custo de pausar é zero. Custo de subir errado pode ser R$ centenas.

---

## Não faz parte dessa skill

- Otimizar campanha já rodando — isso é outra skill futura (`turbinar`)
- Pausar/duplicar anúncio existente — chamar tools do MCP direto
- Gerar copy isolado — usar `gerar-criativo`
- Relatório de performance — usar `meta-ads-insights`
