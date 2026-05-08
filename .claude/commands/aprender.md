---
name: aprender
description: Registra um aprendizado coletivo (cliente-específico ou padrão da empresa). Atalho pra skill `aprender-com-cliente`.
---

# /aprender

Invoque a skill `aprender-com-cliente`.

**Uso:** `/aprender {descrição}` ou simplesmente "aprendi que X" no chat.

A skill:
1. Captura título, contexto, aprendizado, gatilho
2. Pergunta: específico do cliente ou padrão da empresa?
3. Append no arquivo certo (`clientes/{X}/aprendizados.md` ou `base-conhecimento/aprendizados/learnings-{mês}.md`)
4. Notifica grupo Hurtz Operacional via WhatsApp (se padrão)
