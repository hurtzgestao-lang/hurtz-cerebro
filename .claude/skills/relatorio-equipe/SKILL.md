---
name: relatorio-equipe
description: Visão executiva da carga da equipe. Agrega tarefas abertas/concluídas por gestor, identifica quem está sobrecarregado ou ocioso, mostra prazos vencidos. Aciona ao "como está a equipe?", "/relatorio-equipe", "carga da equipe", "quem tá sobrecarregado".
---

# Skill: relatorio-equipe

Skill executiva pra Klebson e Marcos terem visão da operação. Lê todos os `colaboradores/*/tarefas/` e gera relatório agregado.

## Quando usar

- "como está a equipe?"
- "carga dos gestores essa semana"
- "quem tá sobrecarregado?"
- "quem concluiu o quê esse mês?"
- "/relatorio-equipe"
- Sexta-feira (rotina semanal de gestão)

## Permissão

Conceitualmente, deveria ser exclusiva do Klebson/Marcos. Não bloqueia outros gestores tecnicamente — todos veem todos os arquivos no mono-repo. Mas o conteúdo é gerencial.

## Fluxo

### 1. Identificar quem pediu

Chamar `quem-sou-eu`. Se for Klebson ou Marcos, prossegue. Se for outro gestor, mostrar com aviso "essa visão é executiva — confirma se quer ver?".

### 2. Listar gestores ativos

Listar pastas em `colaboradores/` (ignorar `_template/`). Cada uma é um gestor.

### 3. Pra cada gestor, ler 4 arquivos de tarefas

```javascript
const arquivos = ['inbox.md', 'hoje.md', 'semana.md', 'concluidas.md'];
for (const slug of gestores) {
  for (const arq of arquivos) {
    const conteudo = fs.readFileSync(`colaboradores/${slug}/tarefas/${arq}`, 'utf8');
    // parsear blocos de tarefa
  }
}
```

### 4. Agregar métricas por gestor

| Métrica | Cálculo |
|---|---|
| **Inbox** | tarefas abertas em `inbox.md` |
| **Hoje** | tarefas em `hoje.md` (estado `[ ]` ou `[/]`) |
| **Semana** | tarefas em `semana.md` |
| **P0 abertas** | qualquer arquivo, P0, estado aberto |
| **Atrasadas** | qualquer arquivo, prazo < hoje, estado aberto |
| **Concluídas (semana)** | em `concluidas.md`, `concluida:` nos últimos 7 dias |
| **Concluídas (mês)** | mesmo, últimos 30 dias |
| **Idade média do inbox** | média de (hoje - data_criacao) |

### 5. Identificar sinais de alerta

Heurísticas:
- **Sobrecarga:** > 8 tarefas em hoje OU > 5 P0 abertas
- **Ocioso:** 0 concluídas na semana E < 2 abertas
- **Negligência:** inbox > 15 itens com idade média > 7 dias
- **Atrasos:** > 3 tarefas com prazo vencido
- **Sem prazo:** > 50% das tarefas sem prazo definido

### 6. Apresentar relatório

```
📊 Relatório da equipe — {data}

| Gestor   | Hoje | Inbox | P0 | Atrasadas | ✓ Semana | ✓ Mês |
|----------|------|-------|----|-----------|----------|-------|
| Vinicius | 5    | 12    | 1  | 0         | 8        | 32    |
| Matheus  | 3    | 8     | 0  | 1         | 6        | 24    |
| Kerlys   | 12 ⚠️| 18 ⚠️ | 4 ⚠️| 3 ⚠️     | 4        | 18    |
| Suyane   | 2    | 5     | 0  | 0         | 12       | 48    |

⚠️ Alertas:
- Kerlys está sobrecarregado (12 hoje + 4 P0 + 3 atrasadas)
- Inbox do Kerlys com 18 itens (idade média 9 dias)

Sugestões:
1. Redistribuir 3-4 tarefas P2 do Kerlys pro Matheus
2. Klebson revisar inbox do Kerlys e priorizar
3. Validar com Kerlys se há bloqueio operacional
```

### 7. Detalhamento opcional

Se gestor pedir "detalha o Kerlys", mostrar lista das 4 P0 dele, prazos, clientes envolvidos.

### 8. Notificar grupo Operacional (opcional)

Perguntar antes:
> "Quer enviar resumo pro grupo Hurtz Operacional?"

Se sim, formato resumido:

```
📊 Status semanal — semana 19/2026

✓ Concluídas: 30 (Vinicius 8, Matheus 6, Kerlys 4, Suyane 12)
⚠️ Atrasadas: 4 (Matheus 1, Kerlys 3)
🔴 Carga crítica: Kerlys (12 hoje + 4 P0)

Detalhes com Klebson.
```

## Edge cases

- **Pasta de gestor sem tarefas/** → ignorar (gestor recém-onboardado)
- **Arquivo malformado** → reportar erro mas continuar com os outros
- **Frontmatter ausente em alguma tarefa** → considerar como "sem prazo" / "P2"

## Não fazer

- Não modificar nenhum arquivo — skill READ-ONLY
- Não automatizar redistribuição — skill `mover-cliente` ou `criar-tarefa-para` faz isso, sob comando humano
- Não publicar relatório sem aprovação (perguntar antes de notificar grupo)
