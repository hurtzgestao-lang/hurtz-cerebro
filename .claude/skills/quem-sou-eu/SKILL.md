---
name: quem-sou-eu
description: Identifica qual gestor está rodando o Claude Code agora. Lê HURTZ_GESTOR do .env e cruza com colaboradores/{slug}/quem-sou-eu.md. Skill base usada por toda outra skill multi-gestor.
---

# Skill: quem-sou-eu

Identifica o gestor ativo na sessão de Claude Code. Resultado é um objeto com slug, nome, telefone, papel e clientes.

## Quando usar

- **Implícita:** sempre que outra skill precisar saber "quem está pedindo" (`minhas-demandas`, `concluir-tarefa`, `evoluir-agente`)
- **Explícita:** "quem eu sou?" / "/quem-sou-eu"

## Fluxo

### 1. Ler HURTZ_GESTOR do .env

```javascript
require('dotenv').config();
const slug = process.env.HURTZ_GESTOR;

if (!slug) {
  // Fallback: perguntar ao usuário
  console.log("Variável HURTZ_GESTOR não está configurada no .env.");
  console.log("Quem é vc? Digite o slug (klebson, marcos, matheus, vinicius, kerlys, suyane):");
  // após resposta, oferecer escrever no .env
}
```

### 2. Validar que existe colaboradores/{slug}/

```javascript
const fs = require('fs');
const path = `colaboradores/${slug}/quem-sou-eu.md`;

if (!fs.existsSync(path)) {
  console.log(`Slug "${slug}" não tem pasta em colaboradores/. Rodar /onboarding-gestor pra criar.`);
  return null;
}
```

### 3. Parsear frontmatter de quem-sou-eu.md

```javascript
const matter = require('gray-matter'); // ou parse manual
const conteudo = fs.readFileSync(`colaboradores/${slug}/quem-sou-eu.md`, 'utf8');
const { data } = matter(conteudo);

// data = { slug, nome, papel, telefone, email, clientes, ativo_desde }
return data;
```

Se `gray-matter` não estiver disponível, parsear manualmente o bloco entre `---` no topo.

### 4. Resposta ao usuário (se invocada explicitamente)

Mostrar resumo curto:

```
Identidade ativa: {nome} (@{slug})
Papel: {papel}
Clientes: {N} ({primeiros 3 nomes})
```

## Cache

Resultado pode ser cacheado em memória da sessão — não muda a cada chamada. Outras skills devem assumir que `quem-sou-eu` é barato (basicamente um read).

## Edge cases

- **`.env` ausente:** perguntar interativamente, oferecer escrever em `.env` (não em `.env.example`)
- **Slug inválido (pasta não existe):** sugerir `/onboarding-gestor`
- **Múltiplos `.env` em paths diferentes:** usar sempre o `.env` da raiz do workspace

## Saída esperada

Objeto JSON na sessão, formato:

```json
{
  "slug": "klebson",
  "nome": "Klebson Costa",
  "papel": "dono / liderança",
  "telefone": "",
  "email": "hurtzgestao@gmail.com",
  "clientes": [],
  "ativo_desde": "2026-05-08"
}
```
