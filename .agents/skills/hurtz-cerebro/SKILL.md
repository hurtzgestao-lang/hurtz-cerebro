---
name: hurtz-cerebro
description: Roteia qualquer trabalho operacional da Hurtz Cérebro para a base de conhecimento, clientes, gestores, tarefas e skills canônicas do repo. Use para campanhas Meta Ads, criativos, WhatsApp, Google APIs, propostas, social selling, tarefas, relatórios, aprendizados, design Hurtz e dúvidas operacionais sobre a empresa.
---

# Hurtz Cérebro — Skill ponte para OpenClaw

Use esta skill sempre que a demanda envolver a Hurtz Company, a operação de consórcio, clientes, gestores, tarefas, campanhas, criativos, relatórios, aprendizados, propostas, social selling, design ou APIs já documentadas neste repo.

## Fluxo obrigatório

1. Leia `AGENTS.md`.
2. Leia `CLAUDE.md`.
3. Resolva o gestor ativo usando `USER.md`:
   - `.env` → `HURTZ_GESTOR`, quando disponível.
   - `colaboradores/{slug}/quem-sou-eu.md`.
   - `colaboradores/{slug}/CLAUDE.md`.
4. Leia a base mínima:
   - `base-conhecimento/empresa/empresa.md`
   - `base-conhecimento/empresa/preferencias.md`
   - `base-conhecimento/empresa/estrategia.md`
5. Identifique se existe uma skill canônica em `.claude/skills/`.
6. Antes de executar, leia o `SKILL.md` canônico correspondente e siga o fluxo dele.

## Roteador de skills canônicas

| Pedido | Skill canônica |
|---|---|
| Quem sou eu / contexto do gestor | `.claude/skills/quem-sou-eu/SKILL.md` |
| Minhas tarefas / demandas | `.claude/skills/minhas-demandas/SKILL.md` |
| Planejar dia | `.claude/skills/planejar-dia/SKILL.md` |
| Criar tarefa para gestor | `.claude/skills/criar-tarefa-para/SKILL.md` |
| Concluir ou cancelar tarefa | `.claude/skills/concluir-tarefa/SKILL.md` |
| Aprendizado de cliente ou empresa | `.claude/skills/aprender-com-cliente/SKILL.md` |
| Evoluir agente pessoal | `.claude/skills/evoluir-agente/SKILL.md` |
| Relatório de equipe | `.claude/skills/relatorio-equipe/SKILL.md` |
| Mover cliente entre gestores | `.claude/skills/mover-cliente/SKILL.md` |
| WhatsApp / mensagem / aviso | `.claude/skills/evolution-api/SKILL.md` |
| Verificar atendimento em grupos | `.claude/skills/verificar-atendimento/SKILL.md` |
| Relatório de atendimento | `.claude/skills/relatorio-atendimento/SKILL.md` |
| Extrair leads Meta | `.claude/skills/meta-leads/SKILL.md` |
| Insights Meta Ads | `.claude/skills/meta-ads-insights/SKILL.md` |
| Gerar criativo / anúncio | `.claude/skills/gerar-criativo/SKILL.md` |
| Lançar campanha | `.claude/skills/lancar-campanha/SKILL.md` |
| Google Calendar | `.claude/skills/google-calendar/SKILL.md` |
| Google Sheets | `.claude/skills/google-sheets/SKILL.md` |
| Google Docs | `.claude/skills/google-docs/SKILL.md` |
| Google Drive | `.claude/skills/google-drive/SKILL.md` |
| Social selling | `.claude/skills/social-selling/SKILL.md` |
| Design Hurtz | `.claude/skills/hurtz-design/SKILL.md` |
| Geração de imagem | `.claude/skills/generate-image/SKILL.md` |
| Publicar página | `.claude/skills/cloudflare-pages/SKILL.md` |
| Onboarding de gestor | `.claude/skills/onboarding-gestor/SKILL.md` |

## Regras de execução

- Leia só os arquivos necessários para a demanda.
- Nunca use credenciais de outro contexto.
- Nunca escreva `.env`.
- Antes de alterar cliente, campanha, cobrança, publicação ou WhatsApp, garanta que a intenção esteja clara.
- Se a tarefa mexer em arquivo versionado, preserve mudanças já existentes e descreva os arquivos alterados ao final.
- Se a execução gerar aprendizado reutilizável, proponha registrar em `base-conhecimento/aprendizados/` ou na pasta do cliente.
