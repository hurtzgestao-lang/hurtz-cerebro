---
name: minhas-demandas
description: Lista as demandas do gestor ativo — lê tarefas/hoje.md e tarefas/inbox.md, ordena por prioridade e prazo, mostra resumo executivo. Aciona ao "quais minhas demandas hoje?", "minhas tarefas", "/minhas-tarefas".
---

# Skill: minhas-demandas

Mostra o que o gestor ativo precisa fazer hoje. Foco operacional: ler, ordenar, apresentar.

## Quando usar

Prompts típicos:
- "quais minhas demandas hoje?"
- "minhas tarefas"
- "o que tenho pra fazer?"
- "/minhas-tarefas"
- "/minhas-demandas"

## Fluxo

### 1. Identificar gestor ativo

Chamar skill `quem-sou-eu`. Se não conseguir resolver, abortar e direcionar pra `/onboarding-gestor`.

### 2. Ler arquivos do gestor

```javascript
const fs = require('fs');
const slug = identidade.slug;

const hoje = fs.readFileSync(`colaboradores/${slug}/tarefas/hoje.md`, 'utf8');
const inbox = fs.readFileSync(`colaboradores/${slug}/tarefas/inbox.md`, 'utf8');
```

### 3. Parsear blocos de tarefa

Cada tarefa segue formato definido em `templates/tarefa.md`. Regex sugerido pra capturar:

```javascript
// Captura linha do checkbox + bloco de metadados subsequente até linha em branco ou próximo checkbox
const regex = /^- \[(.)\] \[(P\d)\] (.+?)\n((?:  .+\n)*)/gm;
```

Pra cada match, extrair:
- estado (` `, `/`, `x`, `-`)
- prioridade (P0/P1/P2)
- título
- metadados (id, prazo, cliente, tags, clickup)

### 4. Filtrar e ordenar

- Excluir estados `[x]` e `[-]` (concluídas/canceladas)
- Ordenar por: P0 > P1 > P2, depois prazo asc (mais próximo primeiro), depois ordem de inbox

### 5. Apresentar ao gestor

Formato de resposta:

```
{Nome}, suas demandas hoje:

🔴 P0 ({N})
1. Título — prazo {data} ({cliente})

🟡 P1 ({N})
1. Título — prazo {data} ({cliente})

🟢 P2 ({N})
1. ...

📥 Novas no inbox ({N})
1. {Título} — criada {data} por @{autor}

Total: {N} ativas. {N} novas chegaram desde a última sessão.
```

Se o gestor especificou "só hoje" → mostrar só `hoje.md`. Se pediu "tudo" → incluir `semana.md`. Default: hoje + inbox novas.

### 6. Sugestões de próxima ação

Após listar, oferecer:
- "Quer rodar `/planejar-dia` pra mover {N} novas do inbox pro hoje?"
- "Tem {N} P0 com prazo hoje. Quer começar por uma delas?"

## Edge cases

- **Inbox vazio + hoje vazio:** "Sem demandas. Quer revisar a semana?" (oferece ler `semana.md`)
- **Tarefa sem prazo:** trata como prazo "infinito" pra ordenação (vai pro fim do bloco da prioridade)
- **Tarefa sem cliente:** OK, só não exibir o sufixo `({cliente})`

## Não fazer

- Não modificar arquivos — essa skill é READ-ONLY
- Não acionar ClickUp aqui — só o markdown
