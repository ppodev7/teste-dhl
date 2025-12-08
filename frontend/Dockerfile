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

# Variáveis de ambiente para Next.js
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0

# Comando para iniciar em modo dev (hot reload)
CMD ["npm", "run", "dev"]
