---
name: lancar-campanha
description: Lança campanha completa de Meta Ads pra um cliente — gera criativo, sobe via MCP oficial Meta, agenda revisão, notifica cliente. Atalho pra skill `lancar-campanha`.
---

# /lancar-campanha

Invoque a skill `lancar-campanha`.

**Uso:**

```
/lancar-campanha {slug-cliente} [parâmetros opcionais]
```

Exemplos:
- `/lancar-campanha dr-alan-andrade`
- `/lancar-campanha dr-wanderson-nunes captação R$80/dia`
- `/lancar-campanha dr-alan-andrade leads, ângulo "medo de perder reserva"`

Se faltar info (cliente, objetivo, budget, ângulo, público, imagem), a skill entrevista.

**Pré-requisito:** MCP oficial Meta Ads instalado. Se não tiver, a skill mostra o comando de instalação:

```
claude mcp add --transport http meta-ads https://mcp.facebook.com/ads
```

Fluxo: identidade → briefing rápido → gera criativo (chama `gerar-criativo`) → confirma com gestor → sobe PAUSADO no Meta → cria tarefa de revisão pra +48h → registra histórico → notifica cliente no grupo WhatsApp.

**Importante:** sempre sobe a campanha como `PAUSED`. Gestor ativa manualmente no Ads Manager após revisar. Custo de subir errado é R$ centenas — o erro de cuidado vale a pena.
