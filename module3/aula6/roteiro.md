# Aula 3.6: Explorador de Blocos

### Introdução

Imagine que você está navegando em uma cidade. Para saber onde ir, você consulta um mapa. No mundo das blockchains, um **explorador de blocos** é como esse mapa. Ele permite que qualquer pessoa veja o que está acontecendo dentro da rede, desde transações até informações detalhadas sobre blocos.

### O que são Explorers

Exploradores de blocos, ou **block explorers**, são ferramentas essenciais em qualquer blockchain pública ou privada. Eles fornecem uma interface amigável para consultar dados da blockchain, permitindo que a gente visualize transações, saldos de carteiras, e o estado geral da rede.

#### Funcionalidades Comuns dos Explorers:

1. **Pesquisa de Transações**: Encontre qualquer transação usando seu hash e ver se já foi minerada.
2. **Visualização de Blocos**: Veja detalhes sobre os blocos minerados, incluindo tempo, minerador e transações contidas.
3. **Consulta de Carteiras**: Acompanhe saldos e transações associadas a uma carteira específica.
4. **Estatísticas da Rede**: Dados como dificuldade, taxa de hash, e número de nós ativos na rede.

### Explorers na Prática

Ter um explorer é essencial para desenvolvedores e usuários, pois fornece transparência, auditoria e fácil acessibilidade às informações da blockchain. Ele é, muitas vezes, a porta de entrada para interagir com uma rede blockchain de maneira não técnica.

É importante você aprender que existem várias soluções para explorers, eu super aconselho que você tente rodar as soluções abaixo para ver como elas funcionam:

- Blockscout
- Chainlens
- EthVM

Porém, para o objetivo da aula vou usar um explorer light chamado **Etherparty** para monitorar nossa rede Besu. Como o Etherparty tem menos funcionalidades logo mais fácil de instalar, configurar e gereniar do que os outros exploradores que citei antes, por isso escolhi ele.

---

**Parte 2: Configurando o Etherparty para Monitorar a Rede Besu**

---

### Preparando o Ambiente

Eu já fiz boa parte da configuração do Etherparty, baixei o repositorio e escrevi um dockerfile minimo para que possamos adiciona-lo no nosso docker compose. Isso se chama containerização.

A única modificação que fiz no código foi para que ele busque o endereço do nosso node por uma variável de ambiente chamada `ETH_NODE_URL` que vamos inserir no arquivo do docker compose já já, aqui está nosso dockerfile:

```dockerfile
# Usando a imagem oficial do Node.js como base
FROM node:18-slim

# Definindo o diretório de trabalho dentro do container
WORKDIR /app

# Copiando os arquivos para o container
COPY . .

# Instalando dependências de produção e desenvolvimento
RUN npm install

# Expondo a porta em que o aplicativo será executado
EXPOSE 8080

# Comando para iniciar o servidor
CMD ["npm", "run", "prod"]
```

### Integrando o Etherparty

Agora vamos adicionar o Etherparty ao nosso arquivo `docker-compose.yml` para que ele rode junto com os outros serviços.

```yaml
services:
  # restante do código

  etherparty:
    depends_on:
      - bootnode
    build:
      context: ./etherparty-explorer
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - ETH_NODE_URL=http://10.10.0.11:8545
    networks:
      - besu-network
```

Aqui, estamos configurando o Etherparty para se conectar ao node Besu na porta 8545. Ele vai ficar disponivel em `http://localhost:8000`.

### Subindo os Serviços

Com o Etherparty adicionado, execute o comando para iniciar todos os serviços:

```bash
docker-compose up -d
```

### Configurando o Etherparty na Metamask

Vamos executar algumas transações agora e pegar o txid para gente visualizar no explorer...

- Enviar alguns DREX da carteira A para a B
- Pegar o txid e usar o campo de busca do explorer

---

**Conclusão**

Nessa aula você aprendeu o que são explorers e viu na prática como eles funcionam. Como lição de casa quero que você tente rodar na sua máquina um dos outros explorer que cite, Blockscout ou Chainlens ou o EthVM que são mais ricos em informações.

Na próxima aula, vamos continuar a aprofundar nosso conhecimento no mundo DevOps, vamos aprender sobre testes de carga em Blockchain.
