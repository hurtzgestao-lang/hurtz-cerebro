---
name: onboarding-gestor
description: Cria o workspace de um novo gestor a partir de colaboradores/_template/. Entrevista o usuário, preenche quem-sou-eu.md, gera .env, faz commit inicial. Aciona ao "/onboarding-gestor", "onboarda o Kerlys", "novo gestor", "configura o workspace do Vinicius".
---

# Skill: onboarding-gestor

Cria a pasta `colaboradores/{slug}/` pra um novo gestor, copiando `_template/` e preenchendo identidade. Comando único pra trazer alguém pro sistema.

## Quando usar

- "/onboarding-gestor"
- "onboarda o Kerlys"
- "configura workspace do Vinicius"
- "novo gestor: Suyane"

## Fluxo

### 1. Entrevistar (se faltar info)

Coletar:
- **Slug** (ex: `kerlys`, `vinicius`, `matheus`) — sem espaço, lowercase, sem acento
- **Nome completo** (ex: "Kerlys Silva")
- **Papel** (ex: "gestor de tráfego", "SDR", "freelancer", "CEO")
- **Telefone** (formato 55 + DDD + número, sem espaço)
- **Email** (opcional)
- **Clientes sob responsabilidade** — buscar em `dados/grupos-gestores.json` filtrando por gestor (case-insensitive)

### 2. Validar slug

```javascript
const fs = require('fs');
if (fs.existsSync(`colaboradores/${slug}`)) {
  console.log(`Slug ${slug} já existe. Usar outro ou apagar a pasta antes.`);
  return;
}
```

### 3. Copiar _template/ → colaboradores/{slug}/

```javascript
const { execSync } = require('child_process');
execSync(`cp -r colaboradores/_template colaboradores/${slug}`);
```

### 4. Substituir placeholders nos arquivos

Em todos os arquivos `.md` da pasta nova, fazer replace de:
- `{{SLUG}}` → slug
- `{{NOME}}` → nome
- `{{NOME COMPLETO}}` → nome completo
- `{{PAPEL}}` → papel
- `{{55DDDXXXXXXXXX}}` → telefone
- `{{email}}` → email (ou string vazia)
- `{{YYYY-MM-DD}}` → data de hoje
- `{{ISO-8601}}` → data ISO de hoje
- `{{YYYY-Www}}` → semana ISO atual

### 5. Preencher quem-sou-eu.md frontmatter

```yaml
---
slug: kerlys
nome: Kerlys Silva
papel: gestor-trafego
telefone: 5594988082290
email: kerlys@hurtz.com
clientes: [dr-alan-andrade, dominar-empreendimentos, ...]
ativo_desde: 2026-05-08
---
```

A lista de `clientes` vem do match no `dados/grupos-gestores.json`.

### 6. Atualizar contatos.json (compartilhado)

Append do gestor em `dados/contatos.json` se ainda não estiver lá (campo `nome`, `cargo`, `numero`).

### 7. Gerar .env local (apenas no workspace do gestor que está sendo onboardado)

Se a skill estiver rodando **na máquina do gestor** (verificar via prompt do usuário):

```
HURTZ_GESTOR=kerlys
EVOLUTION_API_URL=...
EVOLUTION_API_KEY=...
EVOLUTION_INSTANCE=...
# (copiar demais segredos do .env.example)
```

Se rodando **na máquina do Klebson preparando pra outro**: criar só o `colaboradores/{slug}/` e dizer "Quando o {nome} clonar o repo, ele copia .env.example pra .env e troca HURTZ_GESTOR pra {slug}".

### 8. Commit inicial

```javascript
execSync(`git add colaboradores/${slug}/ dados/contatos.json`);
execSync(`git commit -m "onboarding: ${slug} (${nome})"`);
execSync(`git push`);
```

### 9. Resumo ao usuário

```
✓ {Nome} onboardado como @{slug}
- Pasta: colaboradores/{slug}/
- Clientes: {N} (de grupos-gestores.json)
- Telefone: {telefone}
- .env: {gerado / placeholder}

Próximos passos pro {Nome}:
1. Clonar o repo: git clone {url}
2. Copiar .env.example pra .env e ajustar HURTZ_GESTOR={slug}
3. Abrir Claude Code: cd hurtz-cerebro && claude
4. Rodar /iniciar pra carregar contexto
5. Pedir "/minhas-tarefas" pra ver inbox

Você (criador) já pode mandar tarefa pro {Nome} com "adiciona tarefa pro {slug} X".
```

## Edge cases

- **Slug duplicado** → abortar com mensagem clara, não sobrescrever
- **Sem match em grupos-gestores.json** → OK, lista de clientes vazia (gestor pode atualizar manualmente)
- **Sem .env.example no repo** → criar antes de rodar onboarding (dependência)

## Não fazer

- Não copiar `.env` pessoal de outro gestor (cada um tem o seu)
- Não comitar `.env` (está no `.gitignore`)
- Não modificar `colaboradores/_template/` (template é imutável)
