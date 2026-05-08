# Agente do Klebson — Dono / Líder da operação

Esse arquivo é o agente pessoal do Klebson dentro do Hurtz Cérebro. Evolui com o uso (ver "Auto-otimização" no fim).

## Quem sou eu

Carregar `colaboradores/klebson/quem-sou-eu.md` para identidade completa.

Klebson é o dono da Hurtz Company. Faz comercial (closer), produto, definição de estratégia e direção da equipe. Não opera tráfego no dia a dia mas conhece todos os clientes e direciona os 3 gestores (Vinicius, Mateus, Kerlys).

## Como uso o cérebro coletivo

- **Antes de decisão estratégica** → ler `base-conhecimento/empresa/estrategia.md` + `base-conhecimento/aprendizados/learnings-{mês-atual}.md`
- **Antes de proposta comercial nova** → ler `base-conhecimento/empresa/oferta.md` + casos em `base-conhecimento/aprendizados/`
- **Antes de mexer em metodologia** → ler `base-conhecimento/metodologias/{tema}.md`
- **Trabalho de cliente específico** → ler `clientes/{cliente}/CLAUDE.md` + `aprendizados.md`
- **Comunicação com cliente ou parceiro** → seguir `base-conhecimento/empresa/preferencias.md` (tom direto, sem travessão, sem enrolação)

Quando descobrir algo novo, skill `aprender-com-cliente`:
- Específico do cliente → `clientes/{X}/aprendizados.md`
- Padrão replicável → `base-conhecimento/aprendizados/learnings-{mês}.md`

## Onde gravar cada tipo de informação

| Tipo de informação | Vai pra |
|---|---|
| Tarefa minha (nova/movida/concluída) | `colaboradores/klebson/tarefas/*.md` |
| Tarefa pra outro gestor | skill `criar-tarefa-para` → vai pro inbox dele |
| Aprendizado sobre cliente específico | `clientes/{X}/aprendizados.md` |
| Aprendizado padrão da empresa | `base-conhecimento/aprendizados/learnings-{mês}.md` |
| Preferência minha de trabalho | `colaboradores/klebson/memoria/preferencias.md` |
| Padrão observado | `colaboradores/klebson/memoria/padroes.md` |
| Correção que fiz no Claude | `colaboradores/klebson/memoria/correcoes.md` |
| Mudança em metodologia da empresa | edit direto em `base-conhecimento/metodologias/` (sou dono, posso aprovar) |
| Histórico de atendimento de cliente | `clientes/{X}/historico.md` (append-only) |
| Rascunho de proposta/copy | `colaboradores/klebson/notas/` ou `propostas/` (se for produção) |
| Decisão estratégica permanente | edit em `base-conhecimento/empresa/estrategia.md` |

Áreas compartilhadas (`base-conhecimento/`, `clientes/`) usam append-only sempre que possível pra evitar conflito git.

## Minhas rotinas

- **Manhã:** `/minhas-tarefas` → `/planejar-dia` → revisar inbox de pedidos novos
- **Distribuir trabalho:** falar "adiciona tarefa pro Kerlys X" → skill `criar-tarefa-para` cuida do resto (inbox + WhatsApp)
- **Reunião comercial:** registrar status do lead em `briefings/` ou `propostas/`
- **Após call com gestor:** registrar decisões em `colaboradores/{gestor}/notas/` ou em `clientes/{X}/historico.md`
- **Final do dia:** `/concluir-tarefa` → `/syncar`
- **Sexta-feira:** rodar `evoluir-agente` pra evoluir esse arquivo + `relatorio-equipe` pra ver carga dos 3 gestores

## Foco atual (atualizar conforme estratégia muda)

Ler `base-conhecimento/empresa/estrategia.md` (fonte canônica) — copia local pra referência rápida:

- Aumentar ticket médio: 1.500 → 3.000
- Reter por 3+ meses
- Atingir 100k MRR
- Desenvolver novos produtos / Sistema Cota Vendida

## Auto-otimização (esse arquivo evolui)

Toda sexta, skill `evoluir-agente`:
1. Lê `memoria/correcoes.md` e `memoria/padroes.md` da semana
2. Identifica recorrências
3. Propõe edições cirúrgicas nesse arquivo (com aprovação manual)
4. Histórico no git

Sem rewrite. Append/edit pontual.

---

## Aprendizados sobre como trabalho

(seção que cresce com o tempo via `evoluir-agente` — começa vazia)
