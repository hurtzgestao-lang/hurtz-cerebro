---
name: mover-cliente
description: Move um cliente de um gestor pra outro. Atualiza frontmatter do cliente, dados/grupos-gestores.json e dos quem-sou-eu.md dos dois gestores envolvidos. Notifica ambos via WhatsApp. Aciona ao "passa o Dr. Alan pro Vinicius", "muda gestor do cliente X", "/mover-cliente".
---

# Skill: mover-cliente

Operação delicada — afeta o operacional. Move responsabilidade de um cliente entre gestores e atualiza todos os pontos canônicos.

## Quando usar

Prompts típicos:
- "passa o Dr. Alan pro Vinicius"
- "muda gestor do cliente X de Kerlys pro Matheus"
- "transfere cliente Y"
- "/mover-cliente"

## Permissão

Operação executiva. Se quem está rodando NÃO for Klebson ou Marcos, perguntar:
> "Mover cliente afeta a carga dos 2 gestores. Confirmou com o Klebson ou Marcos?"

Não bloqueia tecnicamente — só registra confirmação na resposta.

## Fluxo

### 1. Identificar quem solicitou

Chamar `quem-sou-eu`.

### 2. Capturar dados

Extrair:
- **Cliente** (slug em `clientes/`) — se ambíguo, listar matches
- **Gestor origem** (slug atual)
- **Gestor destino** (slug novo)
- **Motivo** (opcional, mas útil pro histórico — sobrecarga, especialização, mudança de carteira)

Validar:
- Cliente existe em `clientes/{slug-cliente}/`
- Gestor origem existe em `colaboradores/{slug-origem}/`
- Gestor destino existe em `colaboradores/{slug-destino}/`
- Origem ≠ destino

### 3. Mostrar impacto antes de mover

```
Vai mover cliente "Dr. Alan Andrade" de @kerlys → @vinicius
- Carga atual de @kerlys: 13 clientes (vai pra 12)
- Carga atual de @vinicius: 17 clientes (vai pra 18)
- Tarefas em aberto envolvendo esse cliente: {N}
- WhatsApp grupo: "Dr Alan Andrade | Hurtz Company" (gid: 120363...)

Confirma? (s/n)
```

### 4. Executar a mudança em 4 lugares

**a) Frontmatter de `clientes/{cliente}/CLAUDE.md`**
```yaml
---
gestor_atual: vinicius
gestor_anterior: kerlys
movido_em: 2026-05-08
motivo: sobrecarga do kerlys
---
```

**b) `dados/grupos-gestores.json`** — atualizar campo `gestor` do match correspondente

**c) `colaboradores/kerlys/quem-sou-eu.md`** — remover slug do array `clientes:`

**d) `colaboradores/vinicius/quem-sou-eu.md`** — adicionar slug ao array `clientes:`

### 5. Append no histórico do cliente

`clientes/{cliente}/historico.md`:

```markdown
## 2026-05-08 — Mudança de gestor
**De:** @kerlys → **Para:** @vinicius
**Motivo:** sobrecarga do kerlys
**Solicitado por:** @klebson
**Tarefas em aberto transferidas:** {N}
```

### 6. Tarefas em aberto envolvendo o cliente

Buscar nos arquivos de tarefas do gestor origem (inbox/hoje/semana) tarefas com `cliente: [[clientes/{slug-cliente}]]`.

Pra cada uma, perguntar:
> "Encontrei {N} tarefas abertas do {cliente} no @kerlys:
>   1. [P1] Ajustar campanha
>   2. [P2] Revisar copy
>
> Mover pro @vinicius? (todas / nenhuma / individual)"

Se "todas" → mover blocos pra `colaboradores/vinicius/tarefas/inbox.md`. Append nota "transferida_em: 2026-05-08 (mudança de gestor)".

### 7. Commit + push

Commit único com tudo:
```
git commit -m "mover cliente: dr-alan-andrade @kerlys → @vinicius"
git pull --rebase
git push
```

### 8. Notificar ambos os gestores via WhatsApp (helper notificarGestor)

Pra @kerlys (origem):
```
🔄 Cliente removido da sua carteira: Dr. Alan Andrade
Agora com @vinicius. Motivo: sobrecarga.

{N} tarefas abertas foram transferidas. Sua carga: 13 → 12 clientes.
```

Pra @vinicius (destino):
```
🔄 Novo cliente na sua carteira: Dr. Alan Andrade
Veio do @kerlys. Motivo: sobrecarga.

{N} tarefas abertas no seu inbox. Sua carga: 17 → 18 clientes.
Detalhes: clientes/dr-alan-andrade/CLAUDE.md
```

### 9. Resumo final

```
✓ Cliente Dr. Alan Andrade movido @kerlys → @vinicius
- 4 arquivos atualizados (CLAUDE.md, grupos-gestores.json, 2 quem-sou-eu)
- 3 tarefas em aberto transferidas
- Histórico do cliente atualizado
- 2 WhatsApps enviados
- Commit feito e push concluído
```

## Edge cases

- **Cliente sem pasta em `clientes/`** → criar pasta primeiro (ou abortar se não souber dados)
- **Slug ambíguo** ("dr alan" → Dr Alan Andrade ou outro Dr) — listar matches, perguntar
- **Gestor destino sobrecarregado** (>20 clientes ou >5 P0) → alertar antes de confirmar
- **Tarefa transferida sem prazo** → mover pro inbox, não pro hoje (deixa o destino decidir)
- **Commit em conflito** → reportar, não tentar resolver

## Não fazer

- Não mover sem confirmação explícita do usuário
- Não esquecer de atualizar TODOS os 4 lugares (frontmatter, JSON, 2 quem-sou-eu)
- Não notificar grupo Operacional automaticamente — só os 2 gestores envolvidos (gerencial)
- Não transferir tarefas já concluídas — só abertas
