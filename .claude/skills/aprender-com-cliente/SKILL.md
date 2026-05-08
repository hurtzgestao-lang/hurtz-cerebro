---
name: aprender-com-cliente
description: Captura aprendizado do gestor e salva no lugar certo (cliente-específico ou padrão da empresa). Notifica grupo Hurtz Operacional via WhatsApp. Aciona ao "aprendi que X", "descobri que Y", "/aprender", "registra esse aprendizado".
---

# Skill: aprender-com-cliente

Inteligência coletiva. Quando um gestor descobre algo, essa skill captura e propaga pro time.

## Quando usar

Prompts típicos:
- "aprendi que aumentar orçamento segunda de manhã reduz CPL"
- "descobri que o público de 35-45 converte melhor pro Dr. Alan"
- "/aprender"
- "registra esse aprendizado: ..."
- "isso aqui vale pro time saber"

## Fluxo

### 1. Identificar gestor

Chamar `quem-sou-eu` — autor do aprendizado.

### 2. Capturar conteúdo

Extrair do prompt (ou perguntar):
- **Título curto** (uma linha, descreve o aprendizado)
- **Contexto** (situação onde foi observado: cliente, tipo de campanha, momento)
- **Aprendizado** (o que foi descoberto)
- **Aplicar quando** (gatilho — em que situações futuras isso é útil)
- **Confiança** (alta / média / hipótese)

### 3. Decidir: específico do cliente OU padrão da empresa?

Perguntar ao gestor (ou inferir do contexto):

> "Isso vale pra qualquer cliente da Hurtz, ou é específico do {cliente}?"

| Tipo | Vai pra |
|---|---|
| Específico de UM cliente | `clientes/{slug-cliente}/aprendizados.md` |
| Padrão replicável (qualquer cliente) | `base-conhecimento/aprendizados/learnings-{YYYY-MM}.md` |

Se o aprendizado tem nuance ("vale pra clientes de saúde, mas não pra representação"), **registrar como padrão** com a nuance descrita em "Aplicar quando".

### 4. Append no arquivo certo

Formato canônico (em `base-conhecimento/aprendizados/README.md`):

```markdown
## YYYY-MM-DD — {Título curto do aprendizado}
**Autor:** @{slug-gestor}
**Contexto:** {situação onde foi observado}
**Aprendizado:** {o que foi descoberto}
**Aplicar quando:** {gatilho}
**Confiança:** {alta / média / hipótese}
```

Pra clientes específicos, mesmo formato em `clientes/{X}/aprendizados.md`.

### 5. Criar arquivo do mês se não existir

Se o aprendizado é padrão e `base-conhecimento/aprendizados/learnings-{mês-atual}.md` não existir, criar com header:

```markdown
---
mes: 2026-05
descricao: Aprendizados coletivos da Hurtz em {Mês de Ano}
---

# Aprendizados — {Mês de Ano}

```

### 6. Notificar grupo Hurtz Operacional (skill evolution-api)

Disparar mensagem pro grupo (env var `EVOLUTION_GROUP_OPERACIONAL`):

```
📚 Novo aprendizado coletivo registrado por @{autor}:

**{Título}**
{Aprendizado}

→ Quando aplicar: {gatilho}
→ Confiança: {nível}

(em base-conhecimento/aprendizados/learnings-{mês}.md)
```

Pra aprendizado de cliente, NÃO notificar grupo (é privado do cliente). Só registrar.

### 7. Confirmar ao gestor

```
✓ Registrado em {arquivo}.
{Se padrão}: Time avisado no grupo Hurtz Operacional.
{Se cliente}: Visível pra qualquer gestor que abrir o cliente.
```

### 8. Sugestão de promoção (após 3 entradas)

Se o gestor já registrou 3+ aprendizados padrão num mês com tema parecido, sugerir promover a metodologia/playbook:

> "Já temos 3 aprendizados sobre 'CPL alto' nos últimos 30 dias. Quer transformar em playbook em `base-conhecimento/playbooks/escalada-cpl-alto.md`?"

## Edge cases

- **Gestor sem certeza se vale registrar:** registrar com `confiança: hipótese` — outro gestor depois confirma ou refuta
- **Aprendizado que contradiz outro:** NÃO sobrescrever o anterior. Append novo com `confiança: hipótese — pode contradizer learning de YYYY-MM-DD`. Skill `digest-mensal` (futura) compila contradições.
- **Cliente não cadastrado em `clientes/`:** perguntar se cria pasta nova ou se é padrão da empresa

## Não fazer

- Não modificar aprendizados antigos (append-only)
- Não filtrar/julgar relevância — se o gestor disse, registra
- Não enviar WhatsApp em massa pra cliente-específico (só pro grupo Operacional, em padrão)
