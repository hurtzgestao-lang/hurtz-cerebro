---
name: planejar-dia
description: Move 3-5 tarefas de inbox.md/semana.md para hoje.md, ajudando o gestor a planejar o dia. Aciona ao "planejar meu dia", "/planejar-dia", "monta meu dia".
---

# Skill: planejar-dia

Ajuda o gestor a escolher o que fazer hoje. Lê inbox + semana, sugere 3-5 itens, move pra `hoje.md`.

## Quando usar

Prompts típicos:
- "planejar meu dia"
- "monta meu dia"
- "/planejar-dia"
- "/plan"
- "o que faço hoje?" (variante de minhas-demandas + planejar)

## Fluxo

### 1. Identificar gestor

Chamar `quem-sou-eu`.

### 2. Ler inbox.md e semana.md

Parsear blocos de tarefa (mesmo formato definido em `templates/tarefa.md`).

### 3. Sugerir 3-5 itens

Critério de seleção:
- Todas as P0 com prazo hoje ou atrasado (obrigatórias)
- Depois P1 com prazo nos próximos 2 dias
- Depois P2 só se sobrar espaço (max 5 total)

Apresentar:

```
{Nome}, sugestão pra hoje ({data}):

🔴 P0
1. [bloco da tarefa] (do inbox)

🟡 P1
2. [bloco] (do inbox)
3. [bloco] (do semana)

Total sugerido: 3 tarefas. Confirma ou ajusta?
```

### 4. Aguardar confirmação

Gestor pode:
- "ok" → mover todos pra hoje.md
- "tira a 2, adiciona X" → ajustar seleção
- "não, deixa só a 1 e a 3" → mover só essas

### 5. Mover blocos

Pra cada tarefa selecionada:

```javascript
// 1. Localizar bloco em inbox.md ou semana.md (pelo ^id-...)
// 2. Remover do arquivo de origem
// 3. Append em hoje.md
// 4. Atualizar frontmatter de hoje.md (data, ultima_atualizacao)
```

### 6. Confirmar

```
Hoje pra @{gestor}:
1. [P0] {título}
2. [P1] {título}
3. [P1] {título}

Movido de inbox/semana → hoje.md ({N} blocos).
Bom trabalho. /minhas-tarefas pra ver completo.
```

### 7. Sync (delegado ao Stop hook)

Não fazer commit aqui — Stop hook cuida. Mas se o gestor pedir explicitamente, chamar `/syncar`.

## Edge cases

- **Nenhum P0/P1 disponível:** sugerir só P2 ou perguntar "Quer revisar o backlog?"
- **Mais de 5 P0:** alertar sobrecarga, sugerir delegação ("vc tem 7 P0 — vale repassar pro Klebson decidir prioridade?")
- **hoje.md já tem tarefas:** perguntar se substitui ou adiciona

## Não fazer

- Não criar tarefas novas — só mover existentes
- Não arquivar/cancelar — só mover entre arquivos
- Não tocar em concluidas.md
