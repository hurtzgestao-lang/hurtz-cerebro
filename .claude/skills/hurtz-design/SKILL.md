---
name: hurtz-design
description: Use this skill to generate well-branded interfaces and assets for Hurtz Company (assessoria de marketing premium para representantes de consórcio · arquétipo The Ruler), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors (Brasa Viva #C06018, Carvão #181614, Off-white #F5F2EC), type (Inter), fonts, assets, and UI kit components for prototyping decks, propostas comerciais, criativos Meta Ads, e CRM cards via WhatsApp.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files. Pay particular attention to:

- `colors_and_type.css` — drop-in CSS variables and base components.
- `assets/` — logo SVGs (use `logo-lockup-light.svg` on off-white, `logo-lockup-dark.svg` on Carvão, `logo-lockup-mono.svg` on Brasa Viva).
- `ui_kits/meta-ads/`, `ui_kits/whatsapp-crm/`, `ui_kits/proposal/` — reference React components for the four core surfaces.
- `slides/` — sales deck templates (Title, Big Quote, Stats, Comparison, CTA).
- `reference/hurtz_brand_guide.md` — full brand guide in Portuguese.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

**Non-negotiable brand rules:**
- Backgrounds: Off-white `#F5F2EC` (default) or Carvão `#181614`. Never `#FFFFFF` or `#000000`.
- Maximum 3 colors per material (2 for Meta Ads).
- Inter Bold + Regular only — no other weights, no decorative fonts.
- No shadows, no gradients, no glow, no blur.
- Numbers before adjectives — "R$14M/mês", not "resultados expressivos".
- Borders separate cards, not elevation.
- Tone: direct, in Portuguese, anchored in real numbers. No emoji decorativo.

If the user invokes this skill without any other guidance, ask them what they want to build or design (criativo Meta? proposta? slide deck? CRM card? landing?), ask follow-up questions about audience and the specific number/proof to anchor the piece around, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
