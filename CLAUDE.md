# Hurtz Cérebro — Sistema Operacional Multi-Gestor

Mono-repo da Hurtz Company. Cada gestor (Klebson, Marcos, Matheus, Vinicius, Kerlys, Suyane) clona e abre Claude Code aqui. Base de conhecimento compartilhada + workspace privado por gestor + clientes compartilhados.

## Como o Claude se orienta nessa sessão

Toda sessão segue esse fluxo de leitura:

1. **Identidade ativa** — chamar skill `quem-sou-eu`. Lê `.env` (`HURTZ_GESTOR=...`) + `colaboradores/{slug}/quem-sou-eu.md`. Se faltar, perguntar ou rodar `/onboarding-gestor`.
2. **Agente pessoal do gestor** — ler `colaboradores/{slug}/CLAUDE.md`. Esse arquivo evolui com o uso e contém preferências, rotinas e mapas de gravação personalizados.
3. **Base de conhecimento compartilhada** — ler `base-conhecimento/empresa/empresa.md` + `preferencias.md` + `estrategia.md` (no mínimo). Demais arquivos sob demanda.
4. **Contexto da tarefa** — se a tarefa envolve cliente, ler `clientes/{slug}/CLAUDE.md` + `aprendizados.md`. Se envolve metodologia, `base-conhecimento/metodologias/`.

## Estrutura do mono-repo

```
hurtz-cerebro/
├── CLAUDE.md                     # esse arquivo (entrada multi-gestor)
├── .env.example                  # template — cada gestor copia pra .env (HURTZ_GESTOR=...)
├── .gitignore .gitattributes     # versionamento: clientes/ e base-conhecimento/ versionados
├── .claude/
│   ├── settings.json             # hooks: SessionStart pull / Stop commit+pull+push
│   ├── skills/                   # skills compartilhadas (todas versionadas)
│   └── commands/                 # /minhas-tarefas, /criar-tarefa, /planejar-dia, /onboarding-gestor
│
├── base-conhecimento/            # COMPARTILHADO — terreno comum da empresa
│   ├── empresa/                  # quem somos, oferta, MQL, estratégia, preferências
│   ├── metodologias/             # processos canônicos (gestão de tráfego, atendimento, social-selling)
│   ├── playbooks/                # rotinas pra situações específicas
│   ├── aprendizados/             # learnings-{YYYY-MM}.md (inteligência coletiva, append-only)
│   └── glossario.md
│
├── colaboradores/                # PRIVADO POR GESTOR (cada um edita só o seu)
│   ├── _template/                # base do /onboarding-gestor
│   └── {klebson,marcos,matheus,vinicius,kerlys,suyane}/
│       ├── CLAUDE.md             # AGENTE PESSOAL (instruções de cérebro coletivo, evolui com o uso)
│       ├── quem-sou-eu.md        # identidade (slug, telefone, papel, clientes)
│       ├── tarefas/              # inbox, hoje, semana, concluidas
│       ├── memoria/              # preferencias, padroes, correcoes (alimenta evoluir-agente)
│       ├── notas/                # rascunhos pessoais
│       └── rotina.md             # checklist diário
│
├── clientes/                     # COMPARTILHADO (cliente troca de gestor sem mover pasta)
│   └── {slug-cliente}/           # CLAUDE.md, briefing.md, guia-crm.md, historico.md, aprendizados.md
│
├── dados/                        # grupos-gestores.json, contatos.json (versionado)
│                                 # planilhas (.csv/.xlsx) e logs/ ignorados
├── marca/                        # design system (skill hurtz-design)
├── propostas/  briefings/  conteudo/  repositorio-publicacoes/  templates/  scripts/
└── _contexto/                    # LEGADO — migrado pra base-conhecimento/empresa/. Manter por compat.
```

## Skills disponíveis

### Multi-gestor (núcleo do Hurtz Cérebro)
- `quem-sou-eu` — identifica gestor ativo (.env + quem-sou-eu.md)
- `minhas-demandas` — lista demandas do gestor (`/minhas-tarefas`)
- `criar-tarefa-para` — cria tarefa pra outro gestor + WhatsApp (`/criar-tarefa`)
- `planejar-dia` — move 3-5 itens pra hoje.md (`/planejar-dia`)
- `concluir-tarefa` — fecha tarefa, move pra concluidas.md
- `onboarding-gestor` — cria workspace pra novo gestor (`/onboarding-gestor`)

### Inteligência coletiva e gestão (Fase 2)
- `aprender-com-cliente` — registra aprendizado (cliente-específico ou padrão da empresa) + notifica grupo (`/aprender`)
- `evoluir-agente` — auto-otimiza CLAUDE.md do gestor com base em correções/padrões da semana (`/evoluir-agente`)
- `relatorio-equipe` — visão executiva da carga da equipe (`/relatorio-equipe`)
- `mover-cliente` — move cliente entre gestores, atualiza tudo + WhatsApp (`/mover-cliente`)

### Comunicação
- `evolution-api` — WhatsApp via Evolution
- `verificar-atendimento` / `relatorio-atendimento` — monitoramento de grupos por gestor

### Meta Ads
- `meta-leads` — extração de leads
- `meta-ads-insights` — métricas de tráfego

### Google
- `google-calendar`, `google-sheets`, `google-docs`, `google-drive`

### Conteúdo / Vendas / Design
- `social-selling` — playbook completo
- `hurtz-design` — design system
- `generate-image` — imagens via OpenRouter
- `cloudflare-pages` — deploy de páginas

## Comandos slash

| Comando | O que faz |
|---|---|
| `/iniciar` | Carrega contexto da sessão (lê empresa.md + agente pessoal) |
| `/minhas-tarefas` | Lista demandas do gestor ativo |
| `/criar-tarefa` | Cria tarefa pra outro gestor (atalho) |
| `/planejar-dia` | Planeja o dia (move tarefas pro hoje) |
| `/aprender` | Registra aprendizado (cliente-específico ou padrão) |
| `/evoluir-agente` | Evolui o CLAUDE.md do gestor com base em correções da semana |
| `/relatorio-equipe` | Visão executiva da carga da equipe |
| `/mover-cliente` | Move cliente entre gestores |
| `/onboarding-gestor` | Cria workspace pra novo gestor |
| `/syncar` | Força commit + push (também acontece automaticamente no Stop) |
| `/atualizar` | Sincroniza memórias com estado real do projeto |

## Sync git colaborativo

- **SessionStart hook:** `git pull --rebase --autostash` (silencioso, alerta só em conflito)
- **Stop hook:** `git add -A → commit → pull --rebase → push` (silencioso, alerta em conflito)
- **Áreas append-only** (`.gitattributes` com `merge=union`): `base-conhecimento/aprendizados/`, `clientes/*/historico.md`, `clientes/*/aprendizados.md`, `colaboradores/*/tarefas/concluidas.md`, `colaboradores/*/memoria/*.md`
- **Privado por convenção:** `colaboradores/{slug}/` — só o dono edita. Outros podem ler mas não devem editar (exceto via skill `criar-tarefa-para` que append no inbox).

## Onde gravar cada tipo de informação (mapa global)

| Tipo de informação | Vai pra |
|---|---|
| Tarefa de quem está rodando | `colaboradores/{eu}/tarefas/*.md` |
| Tarefa pra outro gestor | skill `criar-tarefa-para` → inbox dele |
| Aprendizado sobre cliente específico | `clientes/{X}/aprendizados.md` |
| Aprendizado padrão da empresa | `base-conhecimento/aprendizados/learnings-{mês}.md` |
| Preferência minha de trabalho | `colaboradores/{eu}/memoria/preferencias.md` |
| Padrão observado | `colaboradores/{eu}/memoria/padroes.md` |
| Correção que fiz no Claude | `colaboradores/{eu}/memoria/correcoes.md` |
| Histórico de atendimento de cliente | `clientes/{X}/historico.md` (append-only) |
| Mudança em metodologia da empresa | edit em `base-conhecimento/metodologias/` (Klebson/Marcos aprovam) |
| Decisão estratégica permanente | edit em `base-conhecimento/empresa/estrategia.md` |
| Rascunho pessoal | `colaboradores/{eu}/notas/` |

## Tom de voz (canônico em base-conhecimento/empresa/preferencias.md)

Direto, sem enrolação, sem travessão, sem formalidade. Traz informações pra decisão. Sugestões bem-vindas.

## Compatibilidade Obsidian

- Vault = raiz do repo. Wikilinks `[[clientes/dr-alan]]` funcionam nativamente.
- Block-refs `^id-...` em tarefas — Obsidian lincável e usado pelo sync ClickUp (fase 2).
- Plugins recomendados (cada gestor instala): Dataview, Tasks, Templater, Git. Markdown puro funciona sem plugin.

## Onboarding de novo gestor

```
1. Klebson roda /onboarding-gestor (entrevista: nome, slug, telefone, papel)
2. Skill copia colaboradores/_template/ → colaboradores/{slug}/, preenche dados, faz commit+push
3. Novo gestor:
   git clone https://github.com/hurtzgestao-lang/hurtz-cerebro.git
   cd hurtz-cerebro
   cp .env.example .env  # ajustar HURTZ_GESTOR={slug} e segredos
   claude  # abre Claude Code, /iniciar pra carregar contexto
4. Klebson manda primeira tarefa: "adiciona tarefa pro {slug} X"
5. Novo gestor pergunta "minhas tarefas" e vê
```

## Aprender com correções (memória coletiva)

Quando o usuário corrigir algo, perguntar se vale salvar:
- **Sobre o gestor que está rodando** → `colaboradores/{eu}/memoria/correcoes.md`
- **Sobre preferência da empresa toda** → `base-conhecimento/empresa/preferencias.md`
- **Sobre processo da empresa** → `base-conhecimento/metodologias/`
- **Aprendizado replicável** → `base-conhecimento/aprendizados/learnings-{mês}.md`

Skill `evoluir-agente` (sexta-feira) consolida correções/padrões da semana e propõe edições no CLAUDE.md do gestor.

---

**Repo:** https://github.com/hurtzgestao-lang/hurtz-cerebro (privado)
**Usado por:** time da Hurtz Company
