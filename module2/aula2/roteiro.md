## Criando uma Imagem Docker Simples

### 2.1. Criar um Dockerfile para a Versão 1.0

- **Dockerfile Básico**:

```Dockerfile
# Usar a imagem base do Nginx
FROM nginx:latest

# Copiar o conteúdo do diretório atual para o diretório de trabalho do container
COPY . /usr/share/nginx/html

# Expor a porta 80 para acesso HTTP
EXPOSE 80
```

### 2.2. Criar o Arquivo `index.html` para a Versão 1.0

- **Crie um Arquivo `index.html` com o Seguinte Conteúdo**:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Meu Servidor Nginx v1</title>
  </head>
  <body>
    <h1>Olá, Docker!</h1>
    <p>Este é o meu servidor Nginx rodando em um container Docker.</p>
    <p>Versão: 1.0</p>
  </body>
</html>
```

### 2.3. Construir a Imagem Docker para a Versão 1.0

- **Comando para Construir a Imagem**:

```bash
docker build -t meu-nginx:1.0 .
```

### 2.4. Rodar um Container com a Imagem da Versão 1.0

- **Comando para Rodar o Container**:

```bash
docker run -d -p 8080:80 meu-nginx:1.0
```

### 2.5. Verificar o Funcionamento da Versão 1.0

- **Acessar o Servidor Nginx**

Abrir o navegador e acessar `http://localhost:8080`.

### 2.6. Criar uma Segunda Imagem para a Versão 2.0

#### 2.6.1. Atualizar o Arquivo `index.html` para a Versão 2.0

- **Atualize o Arquivo `index.html` com o Seguinte Conteúdo**:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Meu Servidor Nginx v2</title>
  </head>
  <body>
    <h1>Olá, Docker!</h1>
    <p>Este é o meu servidor Nginx rodando em um container Docker.</p>
    <p>Versão: 2.0</p>
  </body>
</html>
```

#### 2.6.2. Construir a Imagem Docker para a Versão 2.0

- **Comando para Construir a Imagem**:

```bash
docker build -t meu-nginx:2.0 .
```

#### 2.6.3. Rodar um Container com a Imagem da Versão 2.0

- **Comando para Rodar o Container**:

```bash
docker run -d -p 8081:80 meu-nginx:2.0
```

#### 2.6.4. Verificar o Funcionamento da Versão 2.0

- **Acessar o Servidor Nginx**

Abrir o navegador e acessar `http://localhost:8081`.

### 2.7. Criar uma Terceira Imagem para a Versão 3.0

#### 2.7.1. Atualizar o Arquivo `index.html` para a Versão 3.0

- **Atualize o Arquivo `index.html` com o Seguinte Conteúdo**:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Meu Servidor Nginx v3</title>
  </head>
  <body>
    <h1>Olá, Docker!</h1>
    <p>Este é o meu servidor Nginx rodando em um container Docker.</p>
    <p>Versão: 3.0</p>
  </body>
</html>
```

#### 2.7.2. Construir a Imagem Docker para a Versão 3.0

- **Comando para Construir a Imagem**:

```bash
docker build -t meu-nginx:3.0 .
```

#### 2.7.3. Rodar um Container com a Imagem da Versão 3.0

- **Comando para Rodar o Container**:

```bash
docker run -d -p 8082:80 meu-nginx:3.0
```

#### 2.7.4. Verificar o Funcionamento da Versão 3.0

- **Acessar o Servidor Nginx**

Abrir o navegador e acessar `http://localhost:8082`.

### Recapitulação

Nesta aula, abordamos:

- A criação de um Dockerfile.
- Versionamento de imagens Docker.
- A execução de containers.

### Exercícios

1. Experimente criar e executar outros containers usando diferentes imagens disponíveis no Docker Hub.
2. Personalize ainda mais a configuração do seu servidor Nginx, adicionando mais páginas HTML ou configurando diferentes diretórios.

## Chamada para a Próxima Aula

Na próxima aula, vamos aprender como gerenciar várias imagens usando docker compose. Não percam!
