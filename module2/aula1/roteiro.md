# Aula 1: Docker e Containers

## Introdução

Bem-vindos à nossa aula sobre Docker e Containers! Hoje vamos explorar a história da infraestrutura, o conceito de containers, a arquitetura do Docker e como utilizá-lo para criar e gerenciar aplicações. No final desta aula, você será capaz de configurar um servidor Nginx usando Docker.

## Objetivos

- Entender a evolução da infraestrutura e o surgimento dos containers.
- Compreender a arquitetura do Docker.
- Instalar e configurar o Docker no seu ambiente.
- Criar e gerenciar containers Docker.
- Implementar um servidor Nginx usando Docker.

## Tópicos

### 1. História da Infraestrutura

A evolução da infraestrutura de TI passou por várias fases, desde servidores físicos dedicados até a virtualização e, mais recentemente, a containerização.

- **Servidores Físicos:** Inicialmente, as empresas utilizavam servidores físicos dedicados para cada aplicação. Isso levava a um uso ineficiente de recursos, já que cada servidor era subutilizado.
- **Virtualização:** Com a introdução da virtualização, foi possível executar múltiplas máquinas virtuais (VMs) em um único servidor físico. Isso melhorou a utilização dos recursos, mas ainda havia problemas com o gerenciamento e a escalabilidade.
- **Containerização:** Containers oferecem uma solução mais leve e eficiente em termos de recursos, permitindo a execução de múltiplas aplicações isoladas em um único sistema operacional.

### 2. Containers

Containers são pacotes leves e portáteis que incluem tudo o que uma aplicação precisa para rodar: código, runtime, bibliotecas e dependências. Eles garantem que a aplicação funcione de forma consistente em qualquer ambiente.

- **Isolamento:** Cada container opera de forma isolada, garantindo que as dependências de uma aplicação não interfiram em outra.
- **Portabilidade:** Containers podem ser executados em qualquer lugar onde o Docker esteja instalado, seja em um laptop de desenvolvedor, um servidor de testes ou em produção.

### 3. Arquitetura do Docker

Docker é uma plataforma de containerização que facilita a criação, o deploy e a execução de aplicações em containers. A arquitetura do Docker é composta por vários componentes principais:

- **Docker Client:** É o CLI que envia pedidos para o daemon, com ele podemos gerenciar nossos containers.
- **Docker Daemon(dockerd):** Ele escuta os pedidos da API do Docker e gere objectos do Docker, como imagens, contentores, redes e volumes. Um daemon também pode se comunicar com outros daemons para gerenciar os serviços do Docker.
- **Imagens:** São templates de read-only que servem como base para a criação de containers. Imagens são construídas a partir de Dockerfiles.
- **Containers:** São instâncias em execução de imagens Docker.
- **Registries:** São repositórios onde imagens Docker são armazenadas e compartilhadas. O Docker Hub é o registry público mais conhecido.

## Ferramentas

- **Docker:** Para criar e gerenciar containers.
- **Terminal:** Para executar comandos Docker.

## Passo a Passo

### 1. Instalando o Docker

- [Instalar Docker](https://docs.docker.com/engine/install/)

### 2. Criando um Container Docker

#### 2.1. Baixando uma Imagem

Vamos usar a imagem oficial do Nginx para criar nosso servidor. Baixe a imagem com o comando:

```bash
docker pull nginx
```

#### 2.2. Executando um Container

Crie e execute um container a partir da imagem do Nginx:

```bash
docker run --name my-nginx -d -p 80:80 nginx
```

- `--name my-nginx`: Nome do container.
- `-d`: Execute o container em modo "detached".
- `-p 80:80`: Mapear a porta 80 do host para a porta 80 do container.

#### 2.3. Verificando o Container

Verifique se o container está em execução:

```bash
docker ps
```

Acesse `http://localhost` no seu navegador para ver a página de boas-vindas do Nginx.

### 3. Gerenciando Containers

#### 3.1. Listando Containers

Para listar todos os containers em execução:

```bash
docker ps
```

Para listar todos os containers, incluindo os que estão parados:

```bash
docker ps -a
```

#### 3.2. Parando e Removendo Containers

Para parar um container:

```bash
docker stop my-nginx
```

Para remover um container:

```bash
docker rm my-nginx
```

#### 3.3. Removendo Imagens

Para listar todas as imagens:

```bash
docker images
```

Para remover uma imagem:

```bash
docker rmi nginx
```

## Projeto: Criação de um Servidor Nginx

Vamos criar um servidor Nginx utilizando Docker.

### Passo a Passo do Projeto

1. **Baixar a imagem do Nginx:**

```bash
docker pull nginx
```

2. **Criar e executar um container:**

```bash
docker run --name my-nginx -d -p 80:80 nginx
```

3. **Verificar o funcionamento:**

Acesse `http://localhost` no navegador para ver a página de boas-vindas do Nginx.

### Recapitulação

Hoje, exploramos a evolução da infraestrutura, entendemos o conceito de containers, analisamos a arquitetura do Docker e aprendemos a criar e gerenciar containers. Implementamos na prática um servidor Nginx usando Docker, destacando desde a criação básica até a personalização do serviço.

### Exercícios

1. Experimente criar e executar outros containers usando diferentes imagens disponíveis no Docker Hub.
2. Personalize ainda mais a configuração do seu servidor Nginx, adicionando mais páginas HTML ou configurando diferentes diretórios.

## Chamada para a Próxima Aula

Na próxima aula, vamos aprender como criar nossa própria imagem Docker! Vamos explorar Dockerfiles, construir imagens personalizadas e entender como otimizá-las para diferentes ambientes. Não percam!
