---
name: evolution-api
description: Dispara mensagens WhatsApp via Evolution API do Rugido
---

# Evolution API — Disparo de Mensagens

**Configuração (variáveis de ambiente em .env):**
- `EVOLUTION_API_URL`
- `EVOLUTION_API_KEY`
- `EVOLUTION_INSTANCE`

---

## Quando usar

Quando o usuário pedir para:
- Enviar mensagem/aviso pelo WhatsApp
- Disparar comunicação para alguém
- Enviar texto ou mídia via API

---

## Resolução de contatos

Antes de enviar, sempre consultar `dados/contatos.json` para resolver nome ou cargo para número.

```javascript
const contatos = require('./dados/contatos.json').contatos;

function resolverContato(nomeOuCargo) {
  const termo = nomeOuCargo.toLowerCase();
  return contatos.find(c =>
    c.nome.toLowerCase() === termo ||
    c.cargo.toLowerCase() === termo
  );
}
```

Se o usuário disser "manda pro SDR" ou "manda pra Suyane", buscar no arquivo e usar o número de lá.
Se não encontrar, perguntar o número antes de enviar.

---

## Helper: notificar-gestor (multi-gestor)

Pra notificar um gestor do Hurtz Cérebro pelo slug (`klebson`, `kerlys`, `vinicius`, etc.), usar `colaboradores/{slug}/quem-sou-eu.md` como fonte da verdade do telefone — não `dados/contatos.json` (esse é pra contatos genéricos).

```javascript
const fs = require('fs');
const matter = require('gray-matter'); // ou parse manual do frontmatter

async function notificarGestor(slug, mensagem) {
  const path = `colaboradores/${slug}/quem-sou-eu.md`;
  if (!fs.existsSync(path)) {
    throw new Error(`Gestor "${slug}" não existe em colaboradores/`);
  }
  const { data } = matter(fs.readFileSync(path, 'utf8'));
  if (!data.telefone) {
    console.warn(`Gestor "${slug}" sem telefone configurado em quem-sou-eu.md — notificação ignorada`);
    return { skipped: true, motivo: 'telefone_vazio' };
  }
  const response = await fetch(`${process.env.EVOLUTION_API_URL}/message/sendText/${process.env.EVOLUTION_INSTANCE}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': process.env.EVOLUTION_API_KEY
    },
    body: JSON.stringify({
      number: data.telefone,
      text: mensagem,
      delay: 1000,
      linkPreview: false
    })
  });
  return await response.json();
}
```

**Quando usar:** skill `criar-tarefa-para` chama isso após editar inbox do destinatário e fazer push. Também útil pra qualquer skill que precise pingar um gestor específico (ex: `relatorio-equipe`, `aprender-com-cliente` em fases futuras).

**Fallback silencioso:** se telefone vazio, retorna `{skipped: true}` em vez de falhar — a skill chamadora decide se alerta o usuário ou continua.

---

## Fluxo de trabalho

### 1. Enviar mensagem de texto

**Endpoint:** `POST /message/sendText/{EVOLUTION_INSTANCE}`

**Executar via JavaScript (ctx_execute):**
```javascript
const response = await fetch(`${process.env.EVOLUTION_API_URL}/message/sendText/${process.env.EVOLUTION_INSTANCE}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': process.env.EVOLUTION_API_KEY
  },
  body: JSON.stringify({
    number: '5594988082290',
    text: 'Sua mensagem',
    delay: 1000,
    linkPreview: false
  })
});
const data = await response.json();
console.log(JSON.stringify(data, null, 2));
console.log('Status:', response.status);
```

### 2. Verificar status da instância

**Executar via JavaScript:**
```javascript
const response = await fetch(`${process.env.EVOLUTION_API_URL}/instance/connectionState/${process.env.EVOLUTION_INSTANCE}`, {
  headers: {
    'apikey': process.env.EVOLUTION_API_KEY
  }
});
const data = await response.json();
console.log(JSON.stringify(data, null, 2));
```

---

## Regras

- Número sempre com código do país (55) e DDD, sem caracteres especiais
- Texto direto, sem HTML
- Delay mínimo 1000ms entre mensagens para evitar bloqueio
- Confirmar envio mostrando o status da resposta

---

## Resposta ao usuário

Apos enviar, resumir em uma linha:
```
Enviado para [número]: [resumo da mensagem]
Status: [PENDING/ERROR]
```

Se erro, mostrar o motivo.
