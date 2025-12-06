# Backend Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copia package.json e instala dependências
COPY package*.json ./
RUN npm install

# Copia o código
COPY . .

# Expõe a porta
EXPOSE 3001

# Comando para iniciar
CMD ["npm", "start"]

