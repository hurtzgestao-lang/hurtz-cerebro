# MQL — Definição Hurtz Company

## O que é MQL aqui

MQL (Marketing Qualified Lead) é o representante de consórcio que é dono ou gestor de uma representação — não vendedor avulso, não consultor comercial.

---

## Critérios obrigatórios (todos precisam ser verdadeiros)

### 1. É representante de consórcio — não consultor comercial
O MQL é dono ou responsável por uma representação de consórcio. Consultor(a) de vendas, vendedor avulso ou pessoa que trabalha dentro de outra representação como funcionário **não é MQL**.

No formulário atual, o campo "como você atua" tem duas respostas possíveis:
- `consultor(a) de vendas` → **não é MQL**
- `outra administradora` → **pode ser MQL** (mas nem sempre — alguns consultores marcam essa opção também)

### 2. Tem time de vendas com pelo menos 2 pessoas
Representantes solo (time de 1 pessoa ou "só eu") ainda não têm a estrutura mínima para o produto. **Mínimo: 2 pessoas no time de vendas.**

### 3. Não atua exclusivamente com administradoras não-independentes
O produto é voltado para representações de administradoras independentes de consórcio. Leads que atuam somente com administradoras vinculadas a banco, seguradora ou montadora são descartados.

**Categorias descartadas (qualquer uma que apareça sozinha desqualifica):**

- **Bancos:** Banco do Brasil, BB, Santander, Bradesco, Itaú, Caixa Econômica, CEF, HSBC, Nubank, VW Banco do Brasil
- **Seguradoras:** Porto Seguro
- **Montadoras:** Yamaha, Honda, VW, Volkswagen, Ford, Fiat, Chevrolet, GM, Toyota, Renault, Hyundai
- **Outros exemplos identificados:** Tradição Consórcio (banco)

**Regra:** se o lead menciona APENAS administradoras dessas categorias → descartado. Se mistura uma dessas com uma independente → manter (avaliar caso a caso).

---

## Critérios em desenvolvimento (não aplicar ainda como filtro)

### Faturamento
O perfil de faturamento ideal começa em R$ 800 mil/mês. Porém, o formulário atual não captura essa faixa com precisão (pula de "abaixo de 1 milhão" direto para "de 1 a 3 milhões"). Até o formulário ser ajustado, **não usar faturamento como critério eliminatório de MQL**.

---

## Como aplicar em análises

Ao analisar leads do Meta, aplicar os filtros na ordem:

1. Remover `como_atua == "consultor(a) de vendas"`
2. Remover `time_vendas < 2` (inclui "1", "Só eu", campos vazios)
3. Remover leads cuja `administradora` seja exclusivamente banco, seguradora ou montadora (BB, Bradesco, Santander, Itaú, Caixa, Porto Seguro, Yamaha, Honda, VW Banco do Brasil, Tradição Consórcio, etc.)

O que sobrar é a base de MQLs do período.

---

## Contexto para melhorias futuras

- O formulário precisa ser ajustado para: capturar faixas de faturamento menores (500k-800k, 800k-1M) e distinguir melhor representante de consultor
- A coluna "como capta" precisa virar múltipla escolha para ser analiticamente útil
- Quando essas melhorias forem feitas, revisar os critérios acima
