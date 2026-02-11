FROM node:22-alpine

WORKDIR /app

# Instalamos dependencias globales necesarias
RUN npm install -g npm@latest

COPY package*.json ./

# Instalamos dependencias
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]