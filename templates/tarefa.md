# Template canônico de tarefa

Toda tarefa do sistema Hurtz Cérebro é um **bloco markdown** dentro de `inbox.md` / `hoje.md` / `semana.md` / `concluidas.md`. Não é arquivo separado — escala melhor pra leitura por Claude e renderização Obsidian.

## Formato

```markdown
- [ ] [P1] {Título curto e específico} — {contexto/por que importa}
  ^id-{YYYY-MM-DD-NNN}
  - criada: {YYYY-MM-DD} por @{slug-criador}
  - prazo: {YYYY-MM-DD ou "sem prazo"}
  - cliente: [[clientes/{slug-cliente}]]
  - tags: #{tag1} #{tag2}
  - clickup: {CU-id ou vazio}
  - notas: {opcional — links wikilinks pra playbooks/aprendizados relevantes}
```

## Estados

| Marca | Significado |
|---|---|
| `[ ]` | aberta |
| `[/]` | em progresso |
| `[x]` | concluída |
| `[-]` | cancelada |

## Prioridades

| Tag | Significado |
|---|---|
| `[P0]` | crítica — bloqueia operação, fazer hoje |
| `[P1]` | alta — fazer essa semana |
| `[P2]` | normal — agendar quando der |

## Bloco-ref (`^id-...`)

- Formato: `^id-{YYYY-MM-DD}-{NNN}` onde NNN é sequencial dentro do dia (001, 002, ...)
- Funciona como bloco-ref do Obsidian: outros arquivos podem linkar via `[[arquivo#^id-2026-05-08-001]]`
- Skill `sync-clickup` usa esse id como chave bidirecional com o ClickUp

## Exemplo real

```markdown
- [ ] [P1] Ajustar campanha do Dr. Alan — CPL subiu 40% ontem, ROAS caindo
  ^id-2026-05-08-001
  - criada: 2026-05-08 por @klebson
  - prazo: 2026-05-09
  - cliente: [[clientes/dr-alan-andrade]]
  - tags: #trafego #urgente
  - clickup:
  - notas: ver [[base-conhecimento/playbooks/escalada-cpl-alto]]
```

## Fluxo de vida

1. **Criação:** Skill `criar-tarefa-para` ou edição manual em `inbox.md`
2. **Planejamento:** `/planejar-dia` move blocos do `inbox`/`semana` → `hoje.md`
3. **Execução:** marca `[/]` ao começar (opcional)
4. **Conclusão:** skill `concluir-tarefa` muda pra `[x]`, move pra `concluidas.md`
5. **Cancelamento:** `[-]` + nota explicativa, vai pra `concluidas.md` também

## Regras de escrita

- **Título curto, ação clara** ("Ajustar campanha", "Revisar copy", "Agendar reunião")
- **Após o travessão, contexto curto** — por que importa, qual gatilho, qual urgência
- **Sempre incluir cliente** se a tarefa for de cliente (wikilink obrigatório)
- **Prazo em data absoluta** (não "amanhã" — converter pra `2026-05-09`)
- **Block-ref `^id-...`** na linha imediatamente abaixo do checkbox
