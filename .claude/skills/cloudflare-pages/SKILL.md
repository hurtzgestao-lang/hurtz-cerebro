---
name: cloudflare-pages
description: Publica páginas estáticas (HTML, propostas, landing pages) via Cloudflare Pages com GitHub
type: implementation
---

# Cloudflare Pages — Publicação de Páginas

**Configuração:**
- Projeto Cloudflare: `hurtz-publicacoes`
- Repo GitHub: `hurtzgestao-lang/hurtz-publicacoes`
- URL principal: https://pages.hurtzcompany.com.br
- Deploy: automático via Git

---

## Quando usar

Quando o usuário pedir para:
- "Publicar essa página"
- "Subir a proposta pra web"
- "Criar um link pra esse HTML"
- "Deixar essa página online"

---

## Como funciona

Projeto conectado ao GitHub. Cada push dispara deploy automático.

### Estrutura

```
repositorio-publicacoes/
  teste/
    index.html      → pages.hurtzcompany.com.br/teste/
  proposta-cliente-x/
    index.html      → pages.hurtzcompany.com.br/proposta-cliente-x/
  landing-produto-y/
    index.html      → pages.hurtzcompany.com.br/landing-produto-y/
```

**Regra:**
- Cada pasta = um slug
- Arquivo sempre: `index.html`
- URL: `pages.hurtzcompany.com.br/[pasta]/` (barra no final obrigatória)

---

## Criar nova página

1. Criar pasta em `repositorio-publicacoes/[slug]/`
2. Criar `index.html` dentro
3. Commit e push
4. Cloudflare faz deploy automático
5. URL: `https://pages.hurtzcompany.com.br/[slug]/`

```bash
cd "/Users/klebsoncosta/Hurtz Company/Produto1/Hurtz_Consorcio/repositorio-publicacoes"
mkdir nova-pagina
# criar index.html
git add .
git commit -m "nova página: nome-da-pagina"
git push
```

---

## Resposta ao usuário

Após publicar:

```
Publicado: https://pages.hurtzcompany.com.br/[slug]/
Slug: [nome da pasta]
Deploy automático em andamento...
```

Se erro, explicar o motivo e solução.
