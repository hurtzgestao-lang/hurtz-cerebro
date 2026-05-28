# TOOLS.md — Ferramentas e convenções

Este arquivo orienta o OpenClaw sobre ferramentas, mas não concede permissão por si só. Use apenas as ferramentas realmente disponíveis na sessão.

## Shell e arquivos

- Antes de editar, rode `git status --short --branch`.
- Prefira `rg` para buscar texto e `find` para mapear arquivos.
- Não edite `.env` nem exponha seu conteúdo.
- Preserve mudanças existentes de outros usuários.

## Skills

O repo já tem workflows em `.claude/skills/`. Para OpenClaw, use a skill ponte:

- `.agents/skills/hurtz-cerebro/SKILL.md`

Ela manda ler a skill canônica correspondente antes de executar.

## APIs

As skills podem usar:

- Evolution API para WhatsApp.
- Google Calendar, Sheets, Docs e Drive.
- Meta Ads / Meta Leads.
- OpenRouter para imagem.
- Cloudflare Pages para publicar páginas.

Credenciais ficam no `.env` local e nunca devem ser gravadas em arquivos versionados.

## Verificações úteis

```bash
git status --short --branch
find .claude/skills -maxdepth 2 -name SKILL.md -print
rg "termo" base-conhecimento clientes colaboradores propostas
```

## Quando algo falhar

Informe o erro em linguagem simples, diga o que já foi tentado e proponha o próximo passo. Não mascare falhas de API, git, autenticação ou permissão.
