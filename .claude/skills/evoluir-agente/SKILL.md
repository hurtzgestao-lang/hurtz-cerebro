---
name: evoluir-agente
description: Auto-otimiza o CLAUDE.md do gestor com base em correções e padrões observados na semana. Lê memoria/correcoes.md e memoria/padroes.md, identifica recorrências, propõe edições cirúrgicas no CLAUDE.md (gestor aprova cada uma). Aciona ao "evoluir meu agente", "/evoluir-agente", sexta-feira.
---

# Skill: evoluir-agente

Faz o `colaboradores/{gestor}/CLAUDE.md` evoluir com o uso, sem rewrite. Lê memória, identifica padrões, propõe edições pontuais.

## Quando usar

- Sexta-feira (rotina semanal)
- Prompt: "evoluir meu agente", "atualiza meu CLAUDE.md", "/evoluir-agente"
- Após sessão longa de correções
- Quando o gestor sente que "o Claude precisa aprender X"

## Princípio

**NUNCA fazer rewrite do CLAUDE.md.** Sempre:
- Append cirúrgico (nova linha em seção existente)
- Edit pontual (uma linha específica)
- Cada edição é aprovada antes de gravar
- Histórico fica no git

## Fluxo

### 1. Identificar gestor

Chamar `quem-sou-eu`. Trabalhar só com `colaboradores/{eu}/`.

### 2. Ler memória relevante

```javascript
const correcoes = fs.readFileSync(`colaboradores/${slug}/memoria/correcoes.md`, 'utf8');
const padroes = fs.readFileSync(`colaboradores/${slug}/memoria/padroes.md`, 'utf8');
const preferencias = fs.readFileSync(`colaboradores/${slug}/memoria/preferencias.md`, 'utf8');
```

### 3. Filtrar pela janela temporal

Default: últimos 7 dias (sexta-feira: 7 dias atrás → hoje). Configurável via prompt ("últimos 30 dias").

Parsear blocos por data (formato `## YYYY-MM-DD — {Tema}`). Filtrar pelas datas no range.

### 4. Identificar recorrências

Critérios:
- **Mesmo tema 2+ vezes em correções** → vira regra fixa
- **Padrão observado 3+ vezes** → vira aprendizado documentado no CLAUDE.md
- **Preferência mencionada 2+ vezes em contextos diferentes** → vira preferência canônica

Exemplo:
```
Correções recentes:
- 2026-05-03 — Formatação de relatório (queria bullet, fiz tabela)
- 2026-05-06 — Formatação de relatório (queria bullet, fiz prosa)

→ Recorrência: prefere relatórios em bullet
→ Sugestão: adicionar regra "Relatórios sempre em bullet, nunca tabela ou prosa" na seção "Aprendizados sobre como trabalho" do CLAUDE.md
```

### 5. Propor edições (uma a uma, aguardar aprovação)

Pra cada recorrência identificada:

```
Encontrei essa recorrência:

{Sumário do padrão}
Evidências (3):
- 2026-05-03 — {trecho da correção}
- 2026-05-06 — {trecho da correção}
- 2026-05-08 — {trecho da correção}

Proposta de edição em colaboradores/{slug}/CLAUDE.md, seção "Aprendizados sobre como trabalho":

  + Relatórios sempre em bullet, nunca tabela ou prosa.
    (consolidado em 2026-05-10 a partir de 3 correções)

Aprova? (s/n/editar)
```

Opções:
- **s/sim/ok** → grava com Edit (append na seção indicada)
- **n/não** → marca como "rejeitada" em `memoria/correcoes.md` (adiciona linha "rejeitado_em_evolucao: 2026-05-10")
- **editar** → permite ajustar o texto antes de gravar

### 6. Append no CLAUDE.md (sempre cirúrgico)

Localizar seção alvo (ex: "## Aprendizados sobre como trabalho") e fazer Edit pontual:

```javascript
// Pseudocódigo
const claudeMd = fs.readFileSync(claudePath, 'utf8');
const novaLinha = `\n- ${proposta.texto}\n  (consolidado em ${hoje} a partir de ${n} ${tipo})`;
const claudeAtualizado = claudeMd.replace(
  /## Aprendizados sobre como trabalho\n\n\(seção que cresce[^)]+\)/,
  `## Aprendizados sobre como trabalho\n${novaLinha}\n\n(seção que cresce com o tempo via \`evoluir-agente\`)`
);
fs.writeFileSync(claudePath, claudeAtualizado);
```

Se a seção alvo não existir (ex: gestor quer regra em outra seção), perguntar onde adicionar.

### 7. Marcar correções como consolidadas

Pra cada correção que virou regra, append em `memoria/correcoes.md`:
```
consolidado_em: 2026-05-10 → CLAUDE.md "Aprendizados sobre como trabalho"
```

Não deletar — preserva histórico.

### 8. Resumo final ao gestor

```
✓ Evolução completa.
- {N} regras adicionadas ao seu CLAUDE.md
- {N} sugestões rejeitadas
- {N} correções marcadas como consolidadas

CLAUDE.md cresceu {X} linhas. Histórico no git.
```

## Edge cases

- **Memória vazia** → "Nada pra evoluir. Volte semana que vem ou após algumas correções."
- **Recorrência ambígua** ("vc quer X ou Y?"): apresentar duas variantes, gestor escolhe
- **CLAUDE.md ficando grande** (> 300 linhas): sugerir consolidação manual ("seu CLAUDE.md tá grande — quer revisar e cortar regras antigas?")
- **Conflito entre regra existente e nova proposta** → pedir ao gestor pra arbitrar (qual prevalece)

## Frequência sugerida

- **Toda sexta-feira** — rotina semanal padrão
- **Manualmente** — sempre que gestor sente que precisa

Skill NÃO roda automaticamente em hook (intervenção exige aprovação humana).

## Não fazer

- Não rewrite — sempre append/edit cirúrgico
- Não consolidar correções de outros gestores (cada um evolui o seu)
- Não inventar padrões inexistentes — só consolidar o que está em `memoria/`
- Não deletar correções da memória — só marcar como consolidadas
