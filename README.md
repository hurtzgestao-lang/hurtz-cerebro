# Hurtz Cérebro

Sistema operacional multi-gestor da Hurtz Company. Mono-repo com base de conhecimento compartilhada, workspace privado por gestor, e clientes em pasta única — todo o time trabalha aqui.

## Pra quem é

Time da Hurtz: Klebson (dono), Marcos (CEO), Matheus (gestor de operações), Vinicius (gestor de tráfego), Kerlys (gestor de tráfego), Suyane (SDR).

## Como começar (cada gestor faz uma vez)

```bash
# 1. Clonar
git clone https://github.com/hurtzgestao-lang/hurtz-cerebro.git
cd hurtz-cerebro

# 2. Configurar variáveis de ambiente (cada um o seu)
cp .env.example .env
# Editar .env e ajustar:
#   HURTZ_GESTOR=seu-slug   (klebson, marcos, matheus, vinicius, kerlys, suyane)
#   + segredos das APIs (Klebson compartilha)

# 3. Abrir Claude Code
claude
```

Primeira sessão: rode `/iniciar` pra carregar o contexto da empresa e do seu workspace pessoal.

## Comandos do dia a dia

| Comando | O que faz |
|---|---|
| `/minhas-tarefas` | Lista o que você tem pra fazer |
| `/planejar-dia` | Move 3-5 itens do inbox pro hoje |
| `/criar-tarefa` | Cria tarefa pra outro gestor (vai pro inbox dele + WhatsApp) |
| `/concluir-tarefa` | Fecha tarefa concluída ou cancelada |
| `/aprender` | Registra aprendizado (cliente-específico ou padrão da empresa) |
| `/evoluir-agente` | Sexta-feira: evolui o seu CLAUDE.md com base nas correções da semana |
| `/relatorio-equipe` | (Klebson/Marcos) visão da carga da equipe |
| `/mover-cliente` | (Klebson/Marcos) move cliente entre gestores |
| `/onboarding-gestor` | Cria workspace pra novo gestor |

## Estrutura

```
hurtz-cerebro/
├── CLAUDE.md                # entrada multi-gestor (Claude lê primeiro)
├── base-conhecimento/       # COMPARTILHADO — empresa, metodologias, playbooks, aprendizados
├── colaboradores/           # PRIVADO POR GESTOR — cada um edita só o seu
│   ├── _template/
│   ├── klebson/  marcos/  matheus/  vinicius/  kerlys/  suyane/
│   │   ├── CLAUDE.md        # agente pessoal (evolui com o uso)
│   │   ├── quem-sou-eu.md   # identidade (slug, telefone, papel, clientes)
│   │   ├── tarefas/         # inbox, hoje, semana, concluidas
│   │   ├── memoria/         # preferencias, padroes, correcoes
│   │   ├── notas/           # rascunhos pessoais
│   │   └── rotina.md
├── clientes/                # COMPARTILHADO — um por cliente
├── marca/                   # design system Hurtz (skill hurtz-design)
├── templates/               # tarefa.md, skills/
├── dados/                   # grupos-gestores.json, contatos.json
└── .claude/
    ├── settings.json        # hooks SessionStart pull / Stop commit+push
    ├── skills/              # 23 skills compartilhadas
    └── commands/            # comandos slash
```

## Princípios

1. **Privado por convenção** — `colaboradores/{slug}/` só o dono edita. Outros leem mas não escrevem (exceto via `criar-tarefa-para` que append no inbox).
2. **Append-only nas áreas compartilhadas** — `aprendizados/`, `historico.md`, `concluidas.md` evitam conflito por design (`merge=union` no `.gitattributes`).
3. **Git é fonte da verdade** — auto-pull no início, auto-commit/push no fim. Sem ferramentas paralelas pra tarefas.
4. **CLAUDE.md de cada gestor evolui** — skill `evoluir-agente` lê correções/padrões da semana e propõe edições cirúrgicas (sempre com aprovação manual).
5. **Inteligência coletiva** — quando alguém aprende algo, vai pro `base-conhecimento/aprendizados/` e o time é avisado via WhatsApp.

## Compatibilidade Obsidian

A raiz do repo funciona como Vault Obsidian out-of-the-box. Wikilinks `[[clientes/dr-alan]]` funcionam. Block-refs `^id-...` em tarefas são lincáveis. Plugins recomendados (cada gestor configura): Dataview, Tasks, Templater, Git.

## Pra desenvolvedor / quem mexe no sistema

- Skills em `.claude/skills/{nome}/SKILL.md` com frontmatter `name` + `description`
- Comandos slash em `.claude/commands/{nome}.md` (atalhos pra skills)
- Template de tarefa canônico em `templates/tarefa.md`
- Hook auto-sync em `.claude/settings.json`

## Status do plano

- ✅ Fase 0/1 — estrutura, MVP de skills, 6 workspaces de gestor
- ✅ Fase 2 — inteligência coletiva (aprender, evoluir, relatorio, mover)
- ⏳ Fase 3 — rollout (onboarding presencial dos gestores)
- ⏳ Fase 4 — sync ClickUp (skill `sync-clickup`)

Plano detalhado: `/Users/klebsoncosta/.claude/plans/seguinte-eu-quero-criar-whimsical-ocean.md` (local).

---

**Repo:** github.com/hurtzgestao-lang/hurtz-cerebro (privado)
**Workspace pessoal antigo do Klebson** (não migrado): github.com/hurtzgestao-lang/hurtz-consorcio
