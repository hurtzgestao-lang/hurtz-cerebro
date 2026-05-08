---
name: mover-cliente
description: Move um cliente de um gestor pra outro. Atalho pra skill `mover-cliente`.
---

# /mover-cliente

Invoque a skill `mover-cliente`.

**Uso:** `/mover-cliente cliente=dr-alan-andrade de=kerlys para=vinicius motivo="sobrecarga"` ou em linguagem natural ("passa o Dr. Alan pro Vinicius").

A skill:
1. Valida cliente e gestores
2. Mostra impacto (carga atual de cada gestor, tarefas em aberto)
3. Pergunta confirmação
4. Atualiza 4 lugares: `clientes/{X}/CLAUDE.md`, `dados/grupos-gestores.json`, e os 2 `quem-sou-eu.md`
5. Move tarefas em aberto pro novo gestor (se pedido)
6. Append em `clientes/{X}/historico.md`
7. Commit + push
8. Notifica os 2 gestores via WhatsApp
