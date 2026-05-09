---
name: gerar-criativo
description: Gera copy de anúncio (headlines, bodies, CTAs) e opcionalmente imagens pra um cliente, baseado no briefing dele e no tom de voz Hurtz. Salva variações em clientes/{slug}/criativos/. Aciona ao "gera criativo pro X", "monta anúncio do Y", "/gerar-criativo", ou como passo do /lancar-campanha.
---

# gerar-criativo — Geração de Copy e Imagem pra Anúncio

Gera N variações de copy (headline + body + CTA) e, opcionalmente, imagens pra um cliente. Output salvo em `clientes/{slug-cliente}/criativos/{YYYY-MM-DD}-{tema}.md`.

Usado standalone (gestor pede "gera 5 headlines pro Dr. Alan") ou como passo do `lancar-campanha`.

---

## Quando usar

- "gera 5 headlines pro Dr. Alan focando em medo de perder a parcela"
- "monta criativo de captação pro Dr. Wanderson"
- "preciso de copy nova pro anúncio do consórcio imobiliário do Dr. Alan"
- "/gerar-criativo dr-alan-andrade"
- Chamada interna pelo `lancar-campanha`

---

## Inputs necessários

Antes de gerar, precisa de:

1. **Cliente** — slug em `clientes/{slug}/`. Se gestor não passou, listar opções e perguntar.
2. **Objetivo da campanha** — captação de lead | venda direta | reativação | autoridade. Se vago, perguntar.
3. **Público-alvo** — quem é (idade, dor, momento de compra). Pode vir do briefing.
4. **Ângulo / tema** — qual gancho usar (ex: "medo de ficar sem reserva", "sonho da casa própria"). Se gestor não disse, sugerir 3 ângulos baseados no briefing e pedir pra escolher.
5. **Quantas variações** — padrão 5 headlines × 3 bodies × 3 CTAs. Gestor pode pedir mais.
6. **Imagem?** — perguntar "quer que eu gere imagem também?" (sim → chama `generate-image`)

---

## Fluxo

### 1. Identidade + cliente

```
quem-sou-eu  →  {gestor ativo}
ler clientes/{slug}/CLAUDE.md (se existir) + briefing.md
ler clientes/{slug}/aprendizados.md (objeções já mapeadas)
```

### 2. Tom de voz e marca

```
ler base-conhecimento/empresa/preferencias.md  →  tom Hurtz
ler marca/design-guide.md ou hurtz_brand_guide.md  →  identidade visual (pra imagens)
```

### 3. Briefing rápido (se faltar info)

Se o gestor não trouxe ângulo/objetivo, perguntar de forma direta:

```
Pra montar o criativo do {cliente}, preciso de:

1. Objetivo: captação de lead | venda direta | reativação | autoridade?
2. Ângulo principal: qual dor/desejo mexer?
3. Promessa específica: o que vai entregar (ex: "consórcio com parcela 30% menor que financiamento")?

Se não tiver clareza, sugiro {3 opções baseadas no briefing}.
```

### 4. Geração de copy

Gerar:

- **5 headlines** — curtas (até 40 caracteres), gancho forte, sem clickbait barato. Tom Hurtz: direto, sem enrolação, sem travessão.
- **3 bodies** — 2-4 linhas cada, conectando dor → promessa → prova → CTA. Variações: emocional, racional, social-proof.
- **3 CTAs** — verbos diretos ("Quero meu plano", "Falar com especialista", "Receber simulação"). Sem "clique aqui".

**Regras de tom (não negociar):**
- Sem travessão no começo de frase
- Sem "no mundo de hoje", "atualmente", "cada vez mais"
- Sem emojis excessivos (no máx 1 por copy, e só se a marca permitir)
- Falar com o cliente final, não com agência
- Promessa específica > promessa genérica ("R$ 3.500/mês" > "parcela acessível")

### 5. Imagem (opcional)

Se gestor pediu imagem:

```
chamar skill generate-image com prompt:
"{descrição visual} no estilo Hurtz: {extrair de marca/design-guide.md} — Brasa Viva (#cor), tipografia, mood {mood do anúncio}"
```

Gerar 1-3 variações. Salvar em `clientes/{slug}/criativos/imagens/`.

### 6. Salvar output

Criar arquivo `clientes/{slug}/criativos/{YYYY-MM-DD}-{tema-slugificado}.md`:

```markdown
---
cliente: {slug}
data: {YYYY-MM-DD}
gestor: {slug-gestor}
objetivo: {captacao|venda|reativacao|autoridade}
angulo: {ângulo principal}
publico: {breve descrição}
status: rascunho
---

# Criativo — {Cliente} — {Tema}

## Headlines (5)
1. ...
2. ...
...

## Bodies (3)

### V1 — Emocional
...

### V2 — Racional
...

### V3 — Prova social
...

## CTAs (3)
1. ...
2. ...
3. ...

## Imagens
- ![v1](imagens/{arquivo}.png)
- ![v2](...)

## Combinações sugeridas
- A: Headline 1 + Body V1 + CTA 1 (mais emocional)
- B: Headline 3 + Body V2 + CTA 2 (mais racional)
- C: Headline 5 + Body V3 + CTA 1 (prova social)
```

### 7. Mostrar pro gestor

Imprimir as variações no terminal, não só salvar. Formato curto:

```
✓ Criativo salvo em clientes/{slug}/criativos/{arquivo}.md

HEADLINES:
1. ...
2. ...
[...]

BODIES (3):
[V1, V2, V3 resumidos]

CTAs:
1. ... | 2. ... | 3. ...

3 combinações sugeridas pra rodar como teste A/B/C.

Próximo passo: revisar, ajustar, e usar /lancar-campanha pra subir no Meta Ads.
```

---

## Edge cases

- **Cliente sem briefing.md preenchido:** avisar gestor e oferecer entrevista rápida (5 perguntas) pra preencher antes.
- **Cliente sem aprendizados.md:** seguir só com briefing, mas sugerir começar a registrar objeções via `/aprender`.
- **Marca sem design-guide.md:** usar fallback genérico Hurtz (Brasa Viva, fundo escuro, tom premium).
- **Sem OpenRouter token (.env):** gerar só copy, avisar que imagem precisa de token configurado.

---

## Onde isso encaixa

- **Standalone:** gestor pede e tem o output em 2 min.
- **Como passo do `lancar-campanha`:** o orquestrador chama essa skill antes de subir no Meta.
- **Histórico de cliente:** cada criativo gerado vira referência futura (gestor consegue ver evolução do que rodou).

---

## Não faz parte dessa skill

- Subir o anúncio no Meta — isso é `lancar-campanha`
- Gerar imagem (chama `generate-image`, não duplica lógica)
- Aprovar criativo com cliente — isso é decisão humana
