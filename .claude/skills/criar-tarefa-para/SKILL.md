---
name: criar-tarefa-para
description: Cria uma tarefa pra outro gestor (ou pra si mesmo). Edita inbox.md do destinatário, faz commit/push, notifica via WhatsApp pelo evolution-api. Aciona ao "adiciona tarefa pro Kerlys X", "cria tarefa pro Vinicius", "/criar-tarefa", "manda tarefa pro Mateus".
---

# Skill: criar-tarefa-para

Append uma tarefa no inbox de outro gestor (ou de si mesmo) e notifica via WhatsApp. Fluxo end-to-end: parsing → escrita → commit → push → WhatsApp.

## Quando usar

Prompts típicos:
- "adiciona tarefa pro Kerlys: revisar campanha Dr. Alan, P1, prazo amanhã"
- "manda tarefa pro Vinicius pra X"
- "cria tarefa pro Matheus Y"
- "/criar-tarefa @kerlys ..."

Se o destinatário não for explicitado, perguntar antes de criar.

## Fluxo end-to-end

### 1. Identificar criador (autor)

Chamar skill `quem-sou-eu`. Esse é o `@autor` da tarefa.

### 2. Parsear destinatário e dados

Extrair do prompt (ou perguntar se faltar):

| Campo | Como extrair |
|---|---|
| **destinatário** | nome próprio mencionado ("pro Kerlys", "pra Vinicius") → mapear pra slug |
| **título** | trecho-ação principal — verbo + objeto |
| **contexto** | resto da frase (após o "—" mental) |
| **prioridade** | menção "P0/P1/P2" ou "urgente" (P0), "importante" (P1), default P2 |
| **prazo** | "amanhã" → data de amanhã ISO; "hoje" → hoje; "sexta" → próxima sexta. Sempre converter pra YYYY-MM-DD |
| **cliente** | nome de cliente mencionado, mapear pra slug em `clientes/` |
| **tags** | inferir pelo contexto (#trafego, #copy, #atendimento, #urgente) |

Validar slug do destinatário existe em `colaboradores/{slug}/`. Se não, perguntar ou sugerir `/onboarding-gestor`.

### 3. Gerar block-ref único

```javascript
const hoje = new Date().toISOString().slice(0,10); // "2026-05-08"
// contar quantas tarefas já têm ^id-{hoje}- nos arquivos do destinatário pra escolher próximo NNN
const inbox = fs.readFileSync(`colaboradores/${dest}/tarefas/inbox.md`, 'utf8');
const hojeArq = fs.readFileSync(`colaboradores/${dest}/tarefas/hoje.md`, 'utf8');
const count = ((inbox + hojeArq).match(new RegExp(`\\^id-${hoje}-`, 'g')) || []).length;
const id = `^id-${hoje}-${String(count + 1).padStart(3, '0')}`;
```

### 4. Construir bloco markdown (formato `templates/tarefa.md`)

```markdown
- [ ] [P1] Ajustar campanha do Dr. Alan — CPL subiu 40% ontem
  ^id-2026-05-08-001
  - criada: 2026-05-08 por @klebson
  - prazo: 2026-05-09
  - cliente: [[clientes/dr-alan-andrade]]
  - tags: #trafego #urgente
  - clickup:
```

### 5. Append no inbox do destinatário

```javascript
fs.appendFileSync(`colaboradores/${dest}/tarefas/inbox.md`, '\n' + bloco + '\n');
```

### 6. Commit + push

```javascript
const { execSync } = require('child_process');
execSync(`git add colaboradores/${dest}/tarefas/inbox.md`);
execSync(`git commit -m "tarefa: ${dest} — ${tituloCurto}"`);
execSync(`git pull --rebase --autostash`);
execSync(`git push`);
```

Se push falhar (conflito), abrir warning ao Klebson. Não tentar resolver sozinho.

### 7. Notificar via WhatsApp (skill evolution-api)

Resolver telefone do destinatário em `colaboradores/{dest}/quem-sou-eu.md` (frontmatter `telefone`).

Mensagem:
```
🔔 Nova tarefa do @{autor}:

[{P}] {título}

Prazo: {prazo}
Cliente: {nome-cliente ou "—"}

Veja no seu workspace: colaboradores/{dest}/tarefas/inbox.md
```

Disparar via `evolution-api`. Se telefone do destinatário estiver vazio, alertar criador ("Kerlys não tem telefone configurado em quem-sou-eu.md — só git push foi feito").

### 8. Confirmar ao criador

```
Tarefa criada pro @{dest}:
[{P}] {título}
ID: ^id-{date}-{NNN}
Prazo: {prazo}

✓ Inbox dele atualizado e push feito
✓ WhatsApp enviado pro telefone {telefone}
```

## Edge cases

- **Destinatário ambíguo** ("pro Mateus" vs "pra Matheus") → perguntar slug exato se mais de 1 match
- **Telefone vazio** → push + warning ao criador, não falhar a skill
- **Sem prazo no prompt** → perguntar ou marcar "sem prazo"
- **Push em conflito** → reportar ao criador, não rebobinar
- **Criador = destinatário** ("cria tarefa pra mim X") → OK, append no próprio inbox, sem WhatsApp

## Não fazer

- Não criar tarefa no `hoje.md` direto — sempre `inbox.md` (gestor decide se vai pro dia via `/planejar-dia`)
- Não inventar telefone se faltar — só usar o que está em `quem-sou-eu.md`
- Não enviar WhatsApp em massa — uma tarefa = uma mensagem
