---
name: gerar-criativo
description: Gera copy de anúncio (headlines, bodies, CTAs) e opcionalmente imagens pra um cliente. Atalho pra skill `gerar-criativo`.
---

# /gerar-criativo

Invoque a skill `gerar-criativo`.

**Uso:**

```
/gerar-criativo {slug-cliente} [ângulo / tema opcional]
```

Exemplos:
- `/gerar-criativo dr-alan-andrade`
- `/gerar-criativo dr-wanderson-nunes ângulo "medo de perder reserva"`
- `/gerar-criativo dr-alan-andrade autoridade médica`

Se faltar info (cliente, objetivo, ângulo, público), a skill entrevista. Output: arquivo em `clientes/{slug}/criativos/{data}-{tema}.md` com 5 headlines + 3 bodies + 3 CTAs + (opcional) imagens.

Use isolado pra ter copy pronto pra colar no Ads Manager, ou como passo do `/lancar-campanha` (que orquestra tudo até subir no Meta).
