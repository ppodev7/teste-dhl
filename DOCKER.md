# 🐳 Docker Compose - Guia de Uso

Este projeto inclui um `docker-compose.yml` configurado para build automático e execução de todos os serviços.

## 📋 Pré-requisitos

- Docker instalado ([Download](https://www.docker.com/get-started))
- Docker Compose instalado (geralmente vem com Docker Desktop)

## 🚀 Como Usar

### 1. Build e Iniciar Todos os Serviços

Na raiz do projeto, execute:

```bash
docker-compose up --build
```

Este comando irá:
- ✅ Fazer build automático das imagens do backend e frontend
- ✅ Iniciar o MongoDB
- ✅ Iniciar o Backend (porta 3001)
- ✅ Iniciar o Frontend (porta 3000)

### 2. Executar em Background (Detached Mode)

```bash
docker-compose up --build -d
```

### 3. Parar os Serviços

```bash
docker-compose down
```

### 4. Parar e Remover Volumes (limpa dados do MongoDB)

```bash
docker-compose down -v
```

### 5. Ver Logs

```bash
# Todos os serviços
docker-compose logs -f

# Apenas backend
docker-compose logs -f backend

# Apenas frontend
docker-compose logs -f frontend

# Apenas MongoDB
docker-compose logs -f mongodb
```

### 6. Rebuild Apenas um Serviço

```bash
# Rebuild apenas o backend
docker-compose build backend

# Rebuild apenas o frontend
docker-compose build frontend
```

## 🌐 Acessos

Após iniciar os serviços:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **MongoDB**: localhost:27017

## 📦 Serviços

### MongoDB
- **Container**: `zyx-mongodb`
- **Porta**: 27017
- **Database**: `zyx`
- **Volume**: Dados persistem em `mongodb_data`

### Backend
- **Container**: `zyx-backend`
- **Porta**: 3001
- **Build**: Automático a partir de `./backend/Dockerfile`
- **Variáveis de Ambiente**:
  - `MONGODB_URI=mongodb://mongodb:27017/zyx`
  - `PORT=3001`

### Frontend
- **Container**: `zyx-frontend`
- **Porta**: 3000
- **Build**: Automático a partir de `./frontend/Dockerfile`
- **Variáveis de Ambiente**:
  - `NEXT_PUBLIC_API_URL=http://localhost:3001/api`

## 🔧 Comandos Úteis

```bash
# Ver status dos containers
docker-compose ps

# Reiniciar um serviço específico
docker-compose restart backend

# Executar comando dentro de um container
docker-compose exec backend sh
docker-compose exec frontend sh

# Limpar tudo (containers, imagens, volumes)
docker-compose down -v --rmi all
```

## ⚠️ Troubleshooting

### Porta já em uso
Se as portas 3000, 3001 ou 27017 estiverem em uso, você pode:
1. Parar os serviços que estão usando essas portas
2. Ou alterar as portas no `docker-compose.yml`

### Erro de conexão com MongoDB
- Verifique se o MongoDB está saudável: `docker-compose ps`
- Veja os logs: `docker-compose logs mongodb`

### Frontend não conecta ao Backend
- Verifique se o backend está rodando: `docker-compose ps`
- Veja os logs do backend: `docker-compose logs backend`
- Verifique a variável `NEXT_PUBLIC_API_URL` no `docker-compose.yml`

### Rebuild necessário após mudanças no código
```bash
docker-compose up --build
```

## 📝 Notas

- Os dados do MongoDB são persistidos em um volume Docker
- O frontend roda em modo desenvolvimento (hot reload)
- O backend roda em modo produção
- Todos os serviços estão na mesma rede Docker (`zyx-network`)


