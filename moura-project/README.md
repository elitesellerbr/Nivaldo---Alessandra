# Moura App

Landing page bilíngue (🇮🇹 Italiano / 🇧🇷 Português) com painel administrativo em português.

## Stack

- **Frontend**: React 19 + TypeScript + Tailwind CSS v4 + Vite
- **Backend**: Express + TypeScript (tsx)
- **Banco**: PostgreSQL via Prisma ORM
- **Deploy**: Railway

---

## Rodar localmente

**Pré-requisitos:** Node.js 18+, PostgreSQL rodando

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com sua DATABASE_URL

# 3. Criar tabelas no banco
npm run db:push

# 4. Rodar em desenvolvimento
npm run dev
```

Acesse: http://localhost:3000

---

## Deploy no Railway

### 1. Criar projeto no Railway

1. Entre em [railway.app](https://railway.app) e crie um novo projeto
2. Clique em **"Add a Service"** → **"GitHub Repo"**
3. Conecte este repositório

### 2. Adicionar banco PostgreSQL

1. No projeto Railway, clique em **"Add a Service"** → **"Database"** → **"PostgreSQL"**
2. O Railway vai criar o banco e disponibilizar a variável `DATABASE_URL` automaticamente

### 3. Configurar variáveis de ambiente

No painel Railway, vá em **Variables** do serviço da aplicação e adicione:

```
NODE_ENV=production
```

> `DATABASE_URL` e `PORT` são injetados automaticamente pelo Railway.

### 4. Deploy

O Railway faz o build e deploy automático a cada push no GitHub.

O comando de start (`railway.json`) executa:
```
npm run db:migrate && npm start
```

Isso aplica as migrations do Prisma e inicia o servidor.

---

## Estrutura do projeto

```
/
├── prisma/
│   └── schema.prisma      # Modelos do banco
├── src/
│   ├── pages/
│   │   ├── LandingPage.tsx  # Landing bilíngue (IT/PT)
│   │   └── AdminPage.tsx    # Painel admin em PT
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── server.ts              # API Express + serve Vite
├── railway.json           # Config deploy Railway
├── vite.config.ts
└── package.json
```

---

## Painel Admin

Acesse em `/admin`  
Senha padrão: `moura2025`

> ⚠️ **Mude a senha** editando `ADMIN_PASS` em `src/pages/AdminPage.tsx` antes de subir para produção!

### Funcionalidades
- 📖 **Histórias**: Criar, editar, publicar/ocultar, deletar histórias
- ✉️ **Mensagens**: Ver e gerenciar mensagens de contato enviadas pelo site
- ⚙️ **Configurações**: Nome da empresa, telefone, e-mail, endereço, redes sociais

---

## Rotas da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/health` | Health check |
| GET | `/api/stories` | Stories publicadas (público) |
| GET | `/api/settings` | Configurações (público) |
| POST | `/api/contact` | Enviar mensagem de contato |
| GET | `/api/admin/stories` | Todas as stories (admin) |
| POST | `/api/admin/stories` | Criar story |
| PUT | `/api/admin/stories/:id` | Atualizar story |
| DELETE | `/api/admin/stories/:id` | Deletar story |
| GET | `/api/admin/messages` | Todas as mensagens |
| PUT | `/api/admin/messages/:id/read` | Marcar como lida |
| POST | `/api/settings` | Salvar configurações |
