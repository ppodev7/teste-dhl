# Frontend Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copia package.json e instala dependências
COPY package*.json ./
RUN npm install

# Copia o código
COPY . .

# Expõe a porta
EXPOSE 3000

# Comando para iniciar em modo dev
CMD ["npm", "run", "dev"]

