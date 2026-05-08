---
name: concluir-tarefa
description: Marca uma tarefa como concluída ou cancelada, move pra concluidas.md. Aciona ao "concluí X", "terminei Y", "cancela Z", "/concluir-tarefa", "fechei a tarefa do Dr. Alan".
---

# Skill: concluir-tarefa

Fecha uma tarefa do gestor ativo: muda estado pra `[x]` (ou `[-]` se cancelada), move bloco pra `concluidas.md`, sync ClickUp opcional.

## Quando usar

- "concluí a tarefa X"
- "terminei Y"
- "cancela Z" (motivo opcional)
- "fechei a tarefa do Dr. Alan"
- "/concluir-tarefa"

## Fluxo

### 1. Identificar gestor

Chamar `quem-sou-eu`.

### 2. Localizar tarefa

Buscar pelo título, ID ou cliente em ordem:
1. `colaboradores/{eu}/tarefas/hoje.md` (mais provável)
2. `colaboradores/{eu}/tarefas/inbox.md`
3. `colaboradores/{eu}/tarefas/semana.md`

Se houver mais de um match, listar e perguntar qual.

### 3. Mudar estado e adicionar metadados de conclusão

Marcar `[x]` (ou `[-]` se cancelada) e adicionar:
- `concluida: YYYY-MM-DD`
- `resultado:` (se gestor mencionou — ex: "ROAS subiu 20%")
- `motivo_cancelamento:` (se cancelada)

```markdown
- [x] [P1] Ajustar campanha do Dr. Alan — CPL subiu 40% ontem
  ^id-2026-05-08-001
  - criada: 2026-05-08 por @klebson
  - prazo: 2026-05-09
  - cliente: [[clientes/dr-alan-andrade]]
  - tags: #trafego #urgente
  - clickup: CU-abc123
  - concluida: 2026-05-09
  - resultado: CPL voltou ao normal após pausar 2 ads
```

### 4. Mover bloco do arquivo origem pra concluidas.md

Append no topo de `concluidas.md` (mais recentes primeiro), remover do origem.

### 5. Sync ClickUp (opcional, fase 2)

Se a tarefa tiver `clickup: CU-...`, chamar skill `sync-clickup` pra fechar a tarefa lá. Skip silenciosamente se a skill não existir ainda (fase 1).

### 6. Confirmar ao gestor

```
✓ Concluída: [P1] Ajustar campanha do Dr. Alan
Movida pra concluidas.md.
{Se aprendizado relevante}: Quer registrar aprendizado? (skill aprender-com-cliente)
```

### 7. Sugerir próxima

Se ainda há tarefas em `hoje.md`, sugerir a próxima por prioridade.

## Edge cases

- **Tarefa não encontrada:** listar candidatos próximos por título/cliente
- **Múltiplos matches:** perguntar qual ID
- **Tarefa em outro gestor:** não dá — só conclui as próprias. Sugerir avisar o gestor.
- **Cancelamento sem motivo:** perguntar antes de mover

## Não fazer

- Não deletar a tarefa — mover pra concluidas.md preserva histórico
- Não mexer em tarefas de outros gestores
- Não esquecer de atualizar `ultima_atualizacao` no frontmatter do arquivo origem
