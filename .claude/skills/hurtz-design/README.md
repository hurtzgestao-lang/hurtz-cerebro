# Hurtz Design System

> **Hurtz Company** — assessoria de marketing premium exclusiva para representantes de consórcio.
> Operação de aquisição (Meta Ads · SDR · Closer). Arquétipo: **The Ruler**.
> Versão 1.0 — Abril 2026.

---

## Sources

This design system was built from the following uploaded materials (kept under `reference/`):

- `reference/hurtz_brand_guide.md` — Brand Guide v1.0 (essência, arquétipo, tom, logo, cores, tipografia, regras de aplicação).
- `reference/design-guide.md` — Design Guide derivado do Brand Guide.
- `assets/brand-guide-page-*.png` — páginas do PDF de marca (paleta, tipografia, aplicações).
- `assets/logo.png` — logotipo final fornecido pela marca.

The brand books are in **Portuguese (Brazil)**. All copy in this system follows that language.

---

## What's in here

### Root files
- `README.md` — this file.
- `SKILL.md` — agent skill manifest (compatible with Claude Code).
- `colors_and_type.css` — CSS variables for colors, type, spacing, radii, semantic tokens, and base components (`.btn`, `.badge`, `.card`, …).

### Folders
- `assets/` — logos (SVG lockups + symbol), brand guide reference PNGs, original logo PNG.
- `reference/` — original brand & design guides (Markdown).
- `preview/` — atomic design-system cards rendered for the Design System tab.
- `ui_kits/` — fully-styled components grouped by surface:
  - `meta-ads/` — three creative templates (1:1).
  - `whatsapp-crm/` — lead card + WhatsApp flow.
  - `proposal/` — 4-page commercial proposal.
- `slides/` — sales deck (Title · Big Quote · Stats · Comparison · CTA).

---

## Visual foundations

### Colors

**Primary — Brasa Viva** `#C06018`. Burnt orange. Used for CTAs, accent rules (the 2-px brand bar), small numerical suffixes (`M`, `%`), and the `|` divider in the logo lockup. **Never** dilute as a gradient; **never** stretch coverage past ~5% of any surface.

Full Brasa scale: 50 (`#F9EDE3`) → 100 → 200 (`#E2A87A`) → 300 → **400 (`#C06018`)** → 600 (`#974A12`, hover) → 700 → 800 → 900. No intermediate stops invented.

**Neutrals** — Carvão `#181614`, Grafite `#3D3A36`, Pedra `#8C8880`, Areia `#E8E4DC`, Off-white `#F5F2EC`. **Off-white is the default canvas** — pure white `#FFFFFF` and pure black `#000000` are explicitly forbidden as backgrounds.

**Functional (CRM)** — Resultado `#1A7A4A` (quente), Atenção `#C06018` (morno), Informação `#3A6FBF` (frio), Crítico `#B52A2A` (perdido). Functional colors only show up in dashboards, lead cards, and CRM views — never in marketing materials.

**Hard rule:** ≤ 3 colors per material. ≤ 2 in Meta Ads creatives.

### Typography

**Inter** is the only typeface — Bold (700) for headings, numbers, and ênfase; Regular (400) for body and captions. Maximum 2 weights per piece. No display, script, or decorative fonts ever. Numerals stay in the same family as body text (no monospace swap for tabular display).

Scale: H1 28pt / H2 20pt / H3 14pt / Body 11pt / Caption 8pt. Tracking widens slightly on headings (+1–2 %) and aggressively on captions/eyebrows (+12 %).

**Numbers are 2× body** and Bold — "prova antes do adjetivo." A number always carries a 28-px Brasa rule above it (`width: 32px–96px; height: 2–3px`), the brand's signature accent.

### Spacing & layout

Base scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 px. Slide and proposal padding uses 96 px; cards use 24–32 px. Generous negative space — "respiro é autoridade."

### Borders, corners, elevation

- Radii: 0, 2, 4, 8 px max (`pill` only for badges/tags).
- Borders: 1 px Areia for cards; 1.5 px Carvão for ghost buttons; 2 px Brasa for accent rules.
- **No shadows. No gradients. No glow. No blur.** Cards are separated by **borders**, not by elevation.

### Backgrounds & imagery

- **Off-white 80%** of surfaces · **Carvão 15%** · **Brasa Viva 5%** (CTA slide / button only).
- Brasa Mínima `#F9EDE3` is used very sparingly for tinted "respiro" sections.
- No textured backgrounds, no patterns, no full-bleed photography in the current system. (Brand guide hints at "fundo textura" for one logo treatment but production materials remain solid.)
- No transparency or backdrop blur — Hurtz is opaque and definitive.

### Animation, hover & press

- Animations: 120 ms `ease` color/background transitions only. No bounces, no slide-ins, no parallax.
- Hover (primary): Brasa 400 → Brasa 600.
- Hover (ghost): transparent + 1.5 px Carvão → fill Carvão + Off-white text.
- Press: Brasa 600 → Brasa 900. No scale-down, no shadow inset.
- Focus: 1 px Areia → 1 px Carvão on the input border. No outline ring.

### Cards

White (`#FFFFFF`) on the Off-white canvas, 1 px Areia border, 4 px radius, 24–32 px padding. Lead cards add a 3 px left border in the temperature color (Resultado / Brasa / Informação / Crítico). No drop shadow ever.

---

## Content fundamentals

**Language:** Portuguese (Brasil). Tom direto, sem enrolação, ancorado em número real.

### The four pillars

1. **Confiança** — afirma sem pedir licença. Sem "talvez", "pode ser", "acreditamos".
2. **Clareza** — direto ao ponto. Cliente entende na primeira leitura.
3. **Proximidade** — fala como sócio, não como fornecedor.
4. **Prova** — número antes do adjetivo. "R$14M/mês", não "resultados expressivos".

### Voice rules

- **Casing:** sentence case em headlines longas; CAPS apenas em eyebrows curtos (≤ 4 palavras) e em CTAs com letter-spacing > 4 %.
- **You vs. nós:** "a Hurtz" (terceira pessoa para autoridade) ou "vamos operar juntos" (primeira do plural para proximidade). Evitar "você precisa", preferir "Klebson, novo lead".
- **Emoji:** **não usar.** Apenas o seletor `✓` em listas internas e `→` em CTAs. Em CRM/WhatsApp, emoji aparece apenas em mensagens humanas (ex.: confirmação de contrato).
- **Números:** sempre concretos. R$ com espaço, sufixos `M` ou `k` em Brasa.
- **Punctuation:** preferir hífen ou bullet de 6 px Brasa em vez de bullet circular.

### Examples

| Certo | Errado |
|---|---|
| "50 leads qualificados por dia. Cada um com ficha completa." | "Oferecemos um serviço de geração de leads altamente qualificados…" |
| "Gabriela vende R$14M/mês com a gente. Recorde nacional." | "Temos cases de sucesso com resultados expressivos." |
| "Investimento: R$ 1.500/mês. Sem taxa escondida." | "Entre em contato para conhecer nossos planos." |
| "Cirurgiões, não generalistas." | "Soluções inovadoras de marketing." |

---

## Iconography

**Hurtz não tem um sistema próprio de ícones.** A marca é deliberadamente sem ornamento — a hierarquia é construída por tipo, número, e a regra Brasa de 2 px.

### What's used

- **Logo symbol** — three diagonal parallel bars (the "H" reinterpretado). Files in `assets/`: `logo-symbol.svg`, `logo-lockup-light.svg`, `logo-lockup-dark.svg`, `logo-lockup-mono.svg`.
- **Accent bar** — `width: 28–96 px; height: 2–3 px; background: #C06018;` precede números, eyebrows e títulos. É o "ícone" do sistema.
- **Functional pills** — bolinha colorida (6 px) + label em caps (Lead Quente, etc).
- **Glyphs ASCII** — `→` (CTAs, "próximo passo"), `✓` (listas de inclusos), `›` / `‹` (navegação leve), `▲` / `▼` (deltas em métricas, em verde Resultado ou vermelho Crítico).

### What's NOT used

- Sem icon font (Material, FontAwesome, Heroicons, Lucide, etc).
- Sem emoji decorativo.
- Sem ícones em SVG ilustrativos (ex.: setinhas estilizadas, "lâmpadas de ideia", checkmarks ornamentados).
- Sem ilustrações vetoriais (personagens, isométricos).

### When you need an icon

Substitua por: (a) o accent bar Brasa, (b) um número grande, (c) o símbolo Hurtz reduzido, ou (d) caps eyebrow. Se algum material *exige* iconografia (ex.: dashboard com 12 categorias), o documento **Design Guide** deve ser atualizado primeiro — não improvise.

> ⚠️ **Substituições / faltas neste design system:**
> - **Logo SVG**: o `logo.png` original foi convertido para SVG vectorial baseado nas três barras diagonais visíveis. Se o estúdio entregar um SVG oficial, substituir os arquivos em `assets/logo-lockup-*.svg`.
> - **Fonte Inter**: carregada via Google Fonts CDN (não há `.woff2` local). Se precisar de operação offline, baixar Inter Bold + Regular para `fonts/`.

---

## Index of cards (Design System tab)

**Brand** — Logo lockups · Logo symbol · Tom de voz · Fundos da marca
**Colors** — Brasa Viva escala · Neutros · Cores funcionais · Regras de cor
**Type** — Escala tipográfica · Pesos · Números em destaque
**Spacing** — Escala de espaçamento · Raios · Elevação (sem sombras)
**Components** — Botões · Badges · Lead card · Inputs · Bloco de métrica · UI kits (Meta Ads, WhatsApp, Proposta) · Slides (5)

---

## Quickstart

```html
<link rel="stylesheet" href="colors_and_type.css">

<button class="btn btn-primary">Quero a proposta</button>

<div class="card">
  <span class="eyebrow">Operação · Abril 2026</span>
  <hr class="divider-accent" />
  <p class="metric">R$34<span style="color:var(--brasa); font-size:.5em">M</span></p>
  <p>em vendas/mês — clientes ativos.</p>
</div>
```

---

*Hurtz Design System v1.0 — baseado no Brand Guide v1.0 / Abril 2026.*
