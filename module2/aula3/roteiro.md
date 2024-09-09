# Aula 2.3: Orquestrando Aplicações com Docker-Compose

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
version: '3.7'

services:
  bootnode:
    container_name: master
    image: hyperledger/besu:latest
    volumes:
      - ./:/config
      - ./besu1:/blockchain
    ports:
      - 8545:8545
      - 8546:8546
      - 8547:8547
      - 8548:8548
      - 30303:30303
    command: >
      --config-file=/config/besu.toml
      --node-private-key-file=/config/key
    networks:
      besu-network:
        ipv4_address: 10.10.0.11

  besu2:
    depends_on:
      - bootnode
    image: hyperledger/besu:latest
    volumes:
      - ./:/config
      - ./besu2:/blockchain
    ports:
      - 9545:8545
      - 9546:8546
      - 9547:8547
      - 9548:8548
    command: >
      --bootnodes="enode://4e8b70b62d75b526fc284741e72a0b64579a48d70641201986ec25191a2d570827c65bc1de0bab80ad2124c47fe6219eda6424f7df8fed1208d73dc7b7e2a3e8@10.10.0.11:30303"
      --config-file=/config/besu.toml
    networks:
      besu-network:
        ipv4_address: 10.10.0.12

  besu3:
    depends_on:
      - bootnode
    image: hyperledger/besu:latest
    volumes:
      - ./:/config
      - ./besu3:/blockchain
    ports:
      - 10545:8545
      - 10546:8546
      - 10547:8547
      - 10548:8548
    command: >
      --bootnodes="enode://4e8b70b62d75b526fc284741e72a0b64579a48d70641201986ec25191a2d570827c65bc1de0bab80ad2124c47fe6219eda6424f7df8fed1208d73dc7b7e2a3e8@10.10.0.11:30303"
      --config-file=/config/besu.toml
    networks:
      besu-network:
        ipv4_address: 10.10.0.13

  besu4:
    depends_on:
      - bootnode
    image: hyperledger/besu:latest
    volumes:
      - ./:/config
      - ./besu4:/blockchain
    ports:
      - 11545:8545
      - 11546:8546
      - 11547:8547
      - 11548:8548
    command: >
      --bootnodes="enode://4e8b70b62d75b526fc284741e72a0b64579a48d70641201986ec25191a2d570827c65bc1de0bab80ad2124c47fe6219eda6424f7df8fed1208d73dc7b7e2a3e8@10.10.0.11:30303"
      --config-file=/config/besu.toml
    networks:
      besu-network:
        ipv4_address: 10.10.0.14

networks:
  besu-network:
    name: drex
    driver: bridge
    ipam:
      driver: default
      config:
        - subnet: "10.10.0.0/24"
          gateway: "10.10.0.1"
```

### 2.3. Arquivo `genesis.json`

Crie um arquivo chamado `genesis.json` com o seguinte conteúdo:

```json
{
  "config": {
    "chainId": 31337,
    "londonBlock": 0,
    "contractSizeLimit": 2147483647,
    "ethash": {
      "fixeddifficulty": 100
    }
  },
  "nonce": "0x42",
  "timestamp": "0x0",
  "extraData": "0x11bbe8db4e347b4e8c937c1c8370e4b5ed33adb3db69cbdb7a38e1e50b1b82fa",
  "gasLimit": "0x1000000",
  "difficulty": "0x10000",
  "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "coinbase": "0x0000000000000000000000000000000000000000",
  "alloc": {
    "f39Fd6e51aad88F6F4ce6aB8827279cffFb92266": {
      "privateKey": "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
      "balance": "90000000000000000000000"
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
