---
name: minhas-tarefas
description: Mostra as demandas do gestor ativo. Atalho pra skill `minhas-demandas`.
---

# /minhas-tarefas

Invoque a skill `minhas-demandas`. Ela cuida de:
1. Identificar gestor via `quem-sou-eu`
2. Ler `colaboradores/{eu}/tarefas/hoje.md` + `inbox.md`
3. Ordenar por P0 > P1 > P2, depois prazo
4. Apresentar com sugestão de próxima ação

Sem argumentos. Read-only.
