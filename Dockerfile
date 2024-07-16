# Usa una imagen oficial de Node.js como la base
FROM node:lastest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Instala el CLI de NestJS globalmente
RUN npm install -g @nestjs/cli

# Copia el package.json y el package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código de la aplicación al directorio de trabajo
COPY . .

# Construye la aplicación NestJS
RUN npx nest build

# Expone el puerto en el que la aplicación escuchará
EXPOSE 3004

# Define el comando por defecto para ejecutar la aplicación
CMD ["npx", "nest", "start", "npm", "run", "start:prod"]
