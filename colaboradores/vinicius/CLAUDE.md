# Agente do Vinicius — gestor de tráfego

Esse arquivo é o agente pessoal de Vinicius dentro do Hurtz Cérebro. Ele evolui com o uso (ver "Auto-otimização" no fim).

## Quem sou eu

Carregar `colaboradores/vinicius/quem-sou-eu.md` para identidade completa (nome, telefone, papel, clientes sob responsabilidade).

## Como uso o cérebro coletivo

Antes de qualquer trabalho relevante:

- **Trabalho de cliente** → ler `clientes/{cliente}/CLAUDE.md` + `clientes/{cliente}/aprendizados.md` antes de tomar qualquer decisão
- **Decisão de tráfego/estratégia** → consultar `base-conhecimento/metodologias/` e `base-conhecimento/aprendizados/learnings-{mês-atual}.md` (mês corrente)
- **Dúvida sobre processo da empresa** → ler `base-conhecimento/playbooks/` + `base-conhecimento/empresa/`
- **Atendimento ou comunicação com cliente** → seguir `base-conhecimento/empresa/preferencias.md` (tom de voz da empresa)

Quando descobrir algo novo, disparar skill `aprender-com-cliente`:
- Específico do cliente → `clientes/{X}/aprendizados.md`
- Padrão replicável → `base-conhecimento/aprendizados/learnings-{mês}.md`

## Onde gravar cada tipo de informação

| Tipo de informação | Vai pra |
|---|---|
| Tarefa minha (nova/movida/concluída) | `colaboradores/vinicius/tarefas/*.md` |
| Aprendizado sobre cliente específico | `clientes/{X}/aprendizados.md` |
| Aprendizado padrão da empresa | `base-conhecimento/aprendizados/learnings-{mês}.md` |
| Preferência minha de trabalho | `colaboradores/vinicius/memoria/preferencias.md` |
| Padrão observado no meu trabalho | `colaboradores/vinicius/memoria/padroes.md` |
| Correção que fiz no Claude | `colaboradores/vinicius/memoria/correcoes.md` |
| Mudança em metodologia da empresa | PR em `base-conhecimento/metodologias/` (Klebson aprova) |
| Histórico de atendimento de cliente | `clientes/{X}/historico.md` (append-only) |
| Rascunho ou nota pessoal | `colaboradores/vinicius/notas/` |

Áreas compartilhadas (`base-conhecimento/`, `clientes/`) usam append-only sempre que possível pra evitar conflito git.

## Minhas rotinas

- **Manhã:** `/minhas-tarefas` → ver demandas → `/planejar-dia` move 3-5 itens pra `hoje.md`
- **Após reunião com cliente:** registrar resumo em `clientes/{X}/historico.md`
- **Final do dia:** `/concluir-tarefa` em cada finalizada → `/syncar`
- **Sexta-feira:** rodar skill `evoluir-agente` pra revisar correções/padrões da semana e propor edições nesse arquivo

Detalhes de rotina específica em `colaboradores/vinicius/rotina.md`.

## Auto-otimização (esse arquivo evolui)

Esse `CLAUDE.md` não é estático. A cada semana, a skill `evoluir-agente`:

1. Lê `memoria/correcoes.md` (correções do gestor) e `memoria/padroes.md` (padrões observados)
2. Identifica recorrências
3. Propõe edições cirúrgicas nesse arquivo (ex: "vc corrige minha formatação de relatório toda semana — adiciono regra fixa?")
4. Cada edição é aprovada manualmente antes de gravar
5. Histórico fica no git (sempre dá pra reverter)

Não rewrite. Sempre append/edit pontual. Resultado: depois de 1-2 meses, esse arquivo reflete o jeito de trabalhar do dono.

---

## Aprendizados sobre como trabalho

(seção que cresce com o tempo via `evoluir-agente` — começa vazia)
