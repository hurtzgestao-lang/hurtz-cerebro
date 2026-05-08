---
name: criar-tarefa
description: Cria uma tarefa pra outro gestor (ou pra si mesmo). Atalho pra skill `criar-tarefa-para`.
---

# /criar-tarefa

Invoque a skill `criar-tarefa-para`.

**Uso:** `/criar-tarefa @{slug-destinatario} {descrição da tarefa}`

Exemplos:
- `/criar-tarefa @kerlys revisar campanha Dr. Alan, P1, prazo amanhã`
- `/criar-tarefa @vinicius ajustar copy do anúncio Dominar, urgente`

Se faltar info (destinatário, prazo), a skill pergunta.

Fluxo: parsing → append no inbox do destinatário → commit/push → WhatsApp pelo evolution-api.
