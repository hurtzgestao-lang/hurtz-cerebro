# Base de Conhecimento — Hurtz Cérebro

Conhecimento compartilhado da empresa. Lido por todos os gestores.

## Estrutura

| Pasta | Conteúdo |
|---|---|
| `empresa/` | Identidade, oferta, estratégia, MQL, preferências de tom — o "quem somos" da Hurtz. Originalmente em `_contexto/`. |
| `metodologias/` | Processos canônicos da empresa: gestão de tráfego, atendimento SDR, social selling, copy. Mudanças exigem PR. |
| `playbooks/` | Rotinas e respostas a situações específicas: escalada de cliente em risco, reunião de kickoff, fechamento mensal. |
| `aprendizados/` | Aprendizados coletivos compilados mensalmente (`learnings-YYYY-MM.md`). Append-only. Skill `aprender-com-cliente` escreve aqui. |
| `glossario.md` | Termos internos da empresa, com wikilinks pra contexto. |

## Como usar

- **Leitura:** todo gestor lê `empresa/` no início da sessão (via skill `iniciar`). Lê `metodologias/` antes de tomar decisão técnica. Lê `aprendizados/` antes de propor algo novo.
- **Escrita:**
  - `aprendizados/` → push direto via skill `aprender-com-cliente` (peso baixo, alta frequência)
  - `empresa/`, `metodologias/`, `playbooks/` → edição com cuidado, idealmente PR (Klebson/Marcos aprovam)
  - `glossario.md` → append direto, ordem alfabética

## Princípio

Tudo aqui é o **terreno comum** da empresa. Cada gestor tem o seu workspace privado em `colaboradores/{slug}/`, mas o que ele aprende e o que ele segue como padrão vem daqui.
