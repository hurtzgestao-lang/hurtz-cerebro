# OpenClaw — Ponte de inteligência da Hurtz Cérebro

Este repo já está preparado para ser usado como workspace do OpenClaw.

## O que foi adaptado

- `AGENTS.md` — regras operacionais e ordem de leitura.
- `SOUL.md` — personalidade e limites do agente.
- `IDENTITY.md` — identidade do agente Hurtz Cérebro.
- `USER.md` — resolução de gestor ativo.
- `TOOLS.md` — convenções de ferramentas.
- `.agents/skills/hurtz-cerebro/SKILL.md` — skill ponte para reaproveitar `.claude/skills/`.

## Configuração recomendada

Use este repo como workspace do agente no `~/.openclaw/openclaw.json`:

```json5
{
  agents: {
    defaults: {
      workspace: "/caminho/para/hurtz-cerebro"
    }
  }
}
```

Depois rode:

```bash
openclaw skills list
openclaw skills info hurtz-cerebro
openclaw skills check
```

## Importante

- Não copie `.env` para dentro de `~/.openclaw/`.
- Não coloque credenciais no `openclaw.json`.
- Se usar sandbox, garanta que o sandbox tenha acesso de leitura/escrita ao workspace e receba variáveis de ambiente pelo caminho seguro definido no OpenClaw.
- A fonte canônica das skills continua sendo `.claude/skills/`. A skill OpenClaw é uma ponte para evitar duas inteligências divergentes.
