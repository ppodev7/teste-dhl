# ZYX Logística - Controle de Caminhões

<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/DHL_Logo.svg/320px-DHL_Logo.svg.png" alt="DHL Logo" width="200"/>
</p>

<p align="center">
  <strong>Sistema de Controle de Entrada e Saída de Caminhões</strong>
</p>

---

## 📋 Sobre o Projeto

O desafio proposto consistia na criação de uma aplicação web simples para demonstrar a digitalização de um processo logístico da empresa **ZYX Logística**. As tecnologias eram livres, com a exigência de uma solução completa (Frontend e Backend) integrando boas práticas. O foco deveria ser na capacidade de criar algo funcional, organizado e claro, com um fluxo que abrangesse as operações básicas de **CRUD** (Cadastro, Consulta, Atualização e Exclusão).

---

## 🎯 Foco e Justificativa

Diante dos múltiplos pontos críticos apresentados no contexto atual da ZYX Logística (Inbound, Inventário, Entrada de Caminhões, Expedição e Relatórios), optei por focar o desenvolvimento exclusivamente no módulo de **Controle de Entrada e Saída de Caminhões**.

Essa escolha se baseou na avaliação de que a ausência de um registro eletrônico para o fluxo de caminhões representa uma situação de **criticidade imediata** e é um ponto de partida fundamental para garantir a rastreabilidade e a segurança operacional na unidade logística.

---

## 🚀 Tecnologias

| Frontend | Backend | Banco de Dados |
|----------|---------|----------------|
| Next.js 16 | Node.js | MongoDB |
| TypeScript | Express | Mongoose |
| Tailwind CSS | - | - |
| shadcn/ui | - | - |

---

Essa aplicação contém uso de IA: Gemini(VSCode), Claude Sonnet, Cursor (Para testes)

## ⚙️ Como Executar a Aplicação

### Pré-requisitos

Antes de começar, você precisa ter instalado:

1. **Node.js 18+** - [Baixar aqui](https://nodejs.org/)
2. **MongoDB** - [Baixar aqui](https://www.mongodb.com/try/download/community)

> Para verificar se já tem instalado, rode no terminal:
> ```bash
> node --version
> mongod --version
> ```

---

### Passo 1: Clone o repositório

```bash
git clone https://github.com/seu-usuario/zyx-logistica.git
cd zyx-logistica
```

---

### Passo 2: Inicie o MongoDB

Abra um terminal e rode:

```bash
mongod
```

> Deixe este terminal aberto. O MongoDB precisa estar rodando.

---

### Passo 3: Inicie o Backend

Abra **outro terminal** e rode:

```bash
cd backend
npm install
npm run dev
```

Você verá: `Servidor rodando na porta 3001` e `MongoDB rodando com sucesso!`

> Deixe este terminal aberto também.

---

### Passo 4: Inicie o Frontend

Abra **outro terminal** e rode:

```bash
cd frontend
npm install
npm run dev
```

Você verá: `Ready in Xms`

---

### Passo 5: Acesse a aplicação

Abra o navegador e acesse:

👉 **http://localhost:3000**

---

## 📡 API Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/trucks` | Lista todos os caminhões |
| `POST` | `/api/trucks` | Registra novo caminhão |
| `PUT` | `/api/trucks/:id` | Atualiza dados do caminhão |
| `DELETE` | `/api/trucks/:id` | Remove caminhão do sistema |

---

## ✅ Funcionalidades

- [x] Cadastro de caminhões
- [x] Listagem com filtro por status
- [x] Visualização detalhada (Ver Mais)
- [x] Edição de registros
- [x] Exclusão de registros
- [x] Interface responsiva
- [x] Tema dark

---

## 📁 Estrutura

```
zyx-logistica/
├── backend/           # API REST (Express + MongoDB)
│   └── src/
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       └── services/
│
├── frontend/          # Interface (Next.js)
│   └── app/
│       ├── _components/
│       └── dashboard/
│
└── README.md
```

---

## ❓ Problemas Comuns

| Problema | Solução |
|----------|---------|
| `mongod: command not found` | MongoDB não está instalado ou não está no PATH |
| `ECONNREFUSED` no frontend | Backend não está rodando. Inicie com `npm run dev` |
| `MongoDB connection error` | MongoDB não está rodando. Inicie com `mongod` |
| Porta 3000 em uso | Outra aplicação está usando. Feche-a ou mude a porta |

---

## 👤 Autor

**Pedro**

## 📄 Licença

MIT
