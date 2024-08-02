# Aula 3: Docker Compose e Criando uma Rede Blockchain Privada com 4 Nodes Besu

## Introdução

Bem-vindos à terceira aula do módulo sobre Docker e Containers. Hoje, vamos explorar o Docker Compose e aprender a utilizá-lo para criar uma rede blockchain privada composta por quatro nodes Hyperledger Besu.

## Docker Compose

### 1.1. O que é Docker Compose?

Docker Compose é uma ferramenta que permite definir e gerenciar multi-containers Docker como um único serviço. Usando um arquivo YAML, você pode configurar a aplicação e os serviços necessários para rodá-la.

### 1.2. Usando o Docker Compose para subir nossas imagens!

Vamos utilizar o Docker Compose para subir simultaneamente todas as versões das imagens criadas anteriormente.

#### 1.2.1. Criar um Arquivo `docker-compose.yml`

Crie um arquivo chamado `docker-compose.yml` no diretório do seu projeto com o seguinte conteúdo:

```yml
services:
  nginx_v1:
    image: meu-nginx:1.0
    ports:
      - "8080:80"

  nginx_v2:
    image: meu-nginx:2.0
    ports:
      - "8081:80"

  nginx_v3:
    image: meu-nginx:3.0
    ports:
      - "8082:80"
```

#### 1.2.2. Subir os Containers

- **Comando para Subir os Containers**:

```bash
docker-compose up -d
```

#### 1.2.3. Verificar os Logs

- **Comando para Verificar os Logs**:

```bash
docker-compose logs -f
```

#### 1.2.4. Verificar o Funcionamento

- Versão 1.0: Abrir o navegador e acessar `http://localhost:8080`.
- Versão 2.0: Abrir o navegador e acessar `http://localhost:8081`.
- Versão 3.0: Abrir o navegador e acessar `http://localhost:8082`.

## Configurando uma Rede Blockchain Privada com 4 Nodes Besu

### 2.1. Preparação do Ambiente

- **Criar um Diretório para o Projeto**:

```bash
mkdir besu-network
```

- **Navegar para o Diretório**:

```bash
cd besu-network
```

### 2.2. Arquivo `docker-compose.yml`

Crie um arquivo chamado `docker-compose.yml` com o seguinte conteúdo:

```yaml

```

### 2.3. Arquivo `genesis.json`

Crie um arquivo chamado `genesis.json` com o seguinte conteúdo:

```json

```

## Subindo a Rede

### 3.1. Construindo e Iniciando os Containers

- **Comando para Construir e Iniciar os Containers**:

```bash
docker-compose up -d
```

- **Verificar os Logs**:

```bash
docker-compose logs -f
```

### 3.2. Verificando a Rede

- **Conectar-se a um Node**:

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' http://localhost:8545
```

- **Verificar quantidade de nodes**:

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":1}' localhost:8545
```

## Interagindo com a Rede Blockchain

- **Transferir Tokens com Metamask**
- **Verificar Saldo**

## Conclusão

Nesta aula, você aprendeu sobre:

- Docker Compose: como utilizá-lo para definir e gerenciar serviços multi-containers.
- Como criar uma rede blockchain privada com quatro nodes Hyperledger Besu.

### Recapitulação

Nesta aula você aprendeu sobre:

- Docker Compose para gerenciar múltiplos containers.
- A criação e configuração de uma rede blockchain privada com quatro nodes Hyperledger Besu.

### Chamada para a Próxima Aula

Na próxima aula, vamos explorar mais sobre como monitorar e gerenciar nossa rede blockchain. Não percam!
