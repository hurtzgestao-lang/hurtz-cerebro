---
name: evoluir-agente
description: Auto-otimiza o CLAUDE.md do gestor com base em correções e padrões da semana. Atalho pra skill `evoluir-agente`.
---

# /evoluir-agente

Invoque a skill `evoluir-agente`.

**Uso:** `/evoluir-agente` ou "evoluir meu agente".

Recomendado: rodar toda sexta-feira como rotina semanal.

Fluxo:
1. Lê `colaboradores/{eu}/memoria/correcoes.md` + `padroes.md` da semana
2. Identifica recorrências (mesmo tema 2+ vezes)
3. Propõe edições cirúrgicas no `colaboradores/{eu}/CLAUDE.md` (uma por vez, aguarda aprovação)
4. Aprovadas: append/edit pontual. Rejeitadas: marca como "rejeitada" na memória
5. Marca correções consolidadas. Histórico fica no git.

Sem rewrite — sempre append/edit. Se quiser refazer, `git revert` resolve.
