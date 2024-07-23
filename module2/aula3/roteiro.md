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

```yaml
version: "3.7"

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

- **Acessar os Servidores Nginx**:

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
version: "3.7"

services:
  node1:
    image: hyperledger/besu:latest
    ports:
      - "8545:8545"
      - "8546:8546"
    volumes:
      - node1_data:/opt/besu/data
    command:
      [
        "--data-path=/opt/besu/data",
        "--genesis-file=/opt/besu/genesis.json",
        "--rpc-http-enabled",
        "--rpc-http-api=ETH,NET,WEB3",
        "--host-whitelist=*",
        "--rpc-http-cors-origins=*",
      ]

  node2:
    image: hyperledger/besu:latest
    ports:
      - "8547:8545"
      - "8548:8546"
    volumes:
      - node2_data:/opt/besu/data
    command:
      [
        "--data-path=/opt/besu/data",
        "--genesis-file=/opt/besu/genesis.json",
        "--rpc-http-enabled",
        "--rpc-http-api=ETH,NET,WEB3",
        "--host-whitelist=*",
        "--rpc-http-cors-origins=*",
      ]

  node3:
    image: hyperledger/besu:latest
    ports:
      - "8549:8545"
      - "8550:8546"
    volumes:
      - node3_data:/opt/besu/data
    command:
      [
        "--data-path=/opt/besu/data",
        "--genesis-file=/opt/besu/genesis.json",
        "--rpc-http-enabled",
        "--rpc-http-api=ETH,NET,WEB3",
        "--host-whitelist=*",
        "--rpc-http-cors-origins=*",
      ]

  node4:
    image: hyperledger/besu:latest
    ports:
      - "8551:8545"
      - "8552:8546"
    volumes:
      - node4_data:/opt/besu/data
    command:
      [
        "--data-path=/opt/besu/data",
        "--genesis-file=/opt/besu/genesis.json",
        "--rpc-http-enabled",
        "--rpc-http-api=ETH,NET,WEB3",
        "--host-whitelist=*",
        "--rpc-http-cors-origins=*",
      ]

volumes:
  node1_data:
  node2_data:
  node3_data:
  node4_data:
```

### 2.3. Arquivo `genesis.json`

Crie um arquivo chamado `genesis.json` com o seguinte conteúdo:

```json
{
  "config": {
    "chainId": 1337,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0,
    "petersburgBlock": 0,
    "ethash": {}
  },
  "difficulty": "1",
  "gasLimit": "8000000",
  "alloc": {
    "0x0000000000000000000000000000000000000001": {
      "balance": "1000000000000000000000000000"
    }
  }
}
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
