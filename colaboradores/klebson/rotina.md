# Rotina diária de Klebson

## Manhã
- [ ] `git pull` (auto via SessionStart hook)
- [ ] `/minhas-tarefas` — ver demandas
- [ ] `/planejar-dia` — escolher 3-5 tarefas pro dia
- [ ] Verificar inbox de pedidos novos (clientes, gestores)

## Durante o dia
- [ ] Reuniões comerciais — registrar status em `briefings/` ou `propostas/`
- [ ] Distribuir trabalho: "adiciona tarefa pro {gestor}" → skill `criar-tarefa-para`
- [ ] Após call com gestor: registrar decisões em `colaboradores/{gestor}/notas/` ou `clientes/{X}/historico.md`
- [ ] Quando descobrir algo novo: skill `aprender-com-cliente`

## Final do dia
- [ ] Marcar concluídas via `/concluir-tarefa`
- [ ] Mover incompletas para semana ou inbox conforme prazo
- [ ] `/syncar` (auto via Stop hook)

## Sexta-feira
- [ ] `evoluir-agente` — revisar correções/padrões da semana e propor edições no CLAUDE.md
- [ ] `relatorio-equipe` — ver carga dos 3 gestores
