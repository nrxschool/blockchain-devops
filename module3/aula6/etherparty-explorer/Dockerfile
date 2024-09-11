# Usando a imagem oficial do Node.js como base
FROM node:18-slim

# Definindo o diretório de trabalho dentro do container
WORKDIR /app

# Copiando os arquivos para o container
COPY . .

# Instalando dependências de produção e desenvolvimento
RUN npm install

# Expondo a porta em que o aplicativo será executado
EXPOSE 8000

# Comando para iniciar o servidor
CMD ["npm", "run", "prod"]