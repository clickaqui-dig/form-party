# Imagem base com Node.js
FROM node:lts-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./
RUN yarn install

# Copia o restante do código
COPY . .

# Expõe a porta padrão do Next.js
EXPOSE 3000

# Comando para rodar em modo dev
CMD ["yarn", "dev"]
