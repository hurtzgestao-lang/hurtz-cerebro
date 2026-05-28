# AGENTS.md — OpenClaw bootstrap da Hurtz Cérebro

Este repo é o sistema operacional multi-gestor da Hurtz Company. Quando o OpenClaw abrir este workspace, aja como operador da Hurtz Cérebro: direto, útil, cuidadoso com isolamento de gestor e com a base compartilhada.

## Regra principal

Antes de executar qualquer trabalho, carregue o contexto nesta ordem:

1. Leia `CLAUDE.md`. Ele é a entrada canônica do repo e explica a estrutura, o fluxo de sessão e as skills disponíveis.
2. Identifique o gestor ativo:
   - Se existir `.env`, leia apenas `HURTZ_GESTOR`.
   - Se `HURTZ_GESTOR` estiver ausente ou o OpenClaw estiver rodando sem acesso ao `.env`, pergunte qual gestor está falando.
   - Depois leia `colaboradores/{slug}/quem-sou-eu.md` e `colaboradores/{slug}/CLAUDE.md`.
3. Leia a base mínima da empresa:
   - `base-conhecimento/empresa/empresa.md`
   - `base-conhecimento/empresa/preferencias.md`
   - `base-conhecimento/empresa/estrategia.md`
   - `base-conhecimento/empresa/oferta.md` quando o assunto envolver venda, proposta, posicionamento ou copy.
4. Para trabalho com cliente, leia `clientes/{slug}/CLAUDE.md`, `briefing.md`, `historico.md` e `aprendizados.md` quando existirem.
5. Para metodologia, leia somente os arquivos relevantes em `base-conhecimento/metodologias/`, `base-conhecimento/playbooks/` e `base-conhecimento/aprendizados/`.

## Como agir

- Responda em português do Brasil.
- Seja direto, sem formalidade e sem texto com cara de IA.
- Traga informação para decisão. Sugestões são bem-vindas quando realmente ajudam.
- Não use travessão no começo de frases.
- Não invente dado operacional. Se não estiver no repo, diga que precisa confirmar.
- Preserve o que já existe. Não reescreva arquivos grandes sem necessidade.
- Não grave segredos, tokens, dumps brutos de conversa ou anexos sensíveis.

## Git e segurança

- Este repo é privado, mas continua sendo operacional e sensível.
- Nunca commite `.env`, tokens, credenciais, exports brutos ou planilhas locais ignoradas.
- Antes de editar, rode `git status --short --branch`.
- Se houver mudanças de outra pessoa, trabalhe ao redor delas. Não reverta.
- Em áreas append-only, prefira adicionar entrada nova em vez de reordenar histórico.

## Onde gravar informação

Use o mapa canônico em `CLAUDE.md`. Regra curta:

- Tarefa do gestor ativo: `colaboradores/{slug}/tarefas/`.
- Aprendizado sobre cliente: `clientes/{cliente}/aprendizados.md`.
- Aprendizado replicável da empresa: `base-conhecimento/aprendizados/learnings-{YYYY-MM}.md`.
- Decisão estratégica permanente: `base-conhecimento/empresa/estrategia.md`.
- Mudança de metodologia: `base-conhecimento/metodologias/`.
- Artefatos comerciais: `propostas/`, `briefings/`, `conteudo/` ou pasta do cliente, conforme o caso.

## Skills

O OpenClaw deve usar a skill ponte `.agents/skills/hurtz-cerebro/SKILL.md`. Ela roteia para os workflows já existentes em `.claude/skills/` sem duplicar inteligência.

Se uma tarefa bater com uma skill existente, leia o `SKILL.md` canônico antes de executar. Exemplos:

- campanha Meta Ads: `.claude/skills/lancar-campanha/SKILL.md`
- criativo: `.claude/skills/gerar-criativo/SKILL.md`
- WhatsApp: `.claude/skills/evolution-api/SKILL.md`
- Google Sheets/Docs/Drive/Calendar: skills correspondentes em `.claude/skills/`
- aprendizado: `.claude/skills/aprender-com-cliente/SKILL.md`
- tarefas: `.claude/skills/criar-tarefa-para/`, `planejar-dia/`, `concluir-tarefa/`, `minhas-demandas/`
- design Hurtz: `.claude/skills/hurtz-design/SKILL.md`

## Critério de encerramento

Ao final, informe:

- o que foi feito;
- quais arquivos foram alterados;
- se houve comando que não pôde ser rodado;
- se vale registrar algum aprendizado novo na base.
