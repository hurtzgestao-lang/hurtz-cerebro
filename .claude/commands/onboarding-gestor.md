---
name: onboarding-gestor
description: Cria o workspace de um novo gestor a partir do template. Atalho pra skill `onboarding-gestor`.
---

# /onboarding-gestor

Invoque a skill `onboarding-gestor`.

**Uso:** `/onboarding-gestor` (a skill entrevista o usuário) ou `/onboarding-gestor nome=Kerlys slug=kerlys papel=gestor-trafego telefone=5594...`

A skill:
1. Coleta slug, nome, papel, telefone, email
2. Copia `colaboradores/_template/` → `colaboradores/{slug}/`
3. Substitui placeholders nos arquivos
4. Atualiza `dados/contatos.json`
5. Faz commit + push inicial
