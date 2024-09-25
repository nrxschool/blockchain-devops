# Blockchain DevOps

## Módulo 1: Fundamentos do Blockchain e Besu

**✅ Aula 1.1: Como funciona qualquer blockchain**

- Tópicos: Template de como estudar uma blockchain
- Projeto: Template de estudo

**✅ Aula 1.2: História do Blockchain**

- Tópicos: Evolução das blockchain e grandes nomes do ecossitema
- Projeto: Apresentar noção histórica do tema

**✅ Aula 1.3: Análise do Hyperledger Besu**

- Tópicos: Entender detalhes técinos sobre o Besu: Wallet, Tx, Bloco, Consenso
- Projeto: Instalar a metamask

## Módulo 2: Fundamentos do Docker e Docker-Compose

**✅ Aula 2.1: Fundamentos sobre Containers**

- Tópicos: História da infraestrutura, containers, arquitetura do docker
- Projeto: Criação de um servidor Nginx

**✅ Aula 2.2: Comandos Básicos do Docker (+Docker hub)**

- Tópicos: Docker build, pull, push, exec, ps
- Projeto: Build de imagem e mandar para o Docker hub

**✅ Aula 2.3: Orquestrando Aplicações com Docker-Compose**

- Tópicos: Criar uma rede com 4 nodes usando PoW, PoS e PoA, usar load balancer e firewall
- Projeto: Orquestrar 4 nodes + load balancer + firewall

## Módulo 3: Monitoramento com Prometheus, Alert Manager, Loki Grafana e BlockExplorer

**✅ Aula 3.1: Introdução ao Monitoramento**

- Tópicos: Importância do monitoramento, métricas essenciais, logs e alertas

**✅ Aula 3.2: Integrando Prometheus com Besu**

- Tópicos: História e Arquitetura do Prometheus
- Projeto: Rodar o prometheus com Docker, Configuração de jobs e targets, Configurar o Prometheus para monitorar um node blockchain

**✅ Aula 3.3: Integrando Besu + Prometheus + AlertManager**

- Tópicos: História e Arquitetura do Prometheus
- Projeto: Rodar o prometheus com Docker, Configuração de jobs e targets, Configurar o Prometheus para monitorar um node blockchain

**✅ Aula 3.4: Integrando Besu + Prometheus + Grafana**

- Tópicos: História e Arquitetura do Grafana
- Projeto: rodar o Grafana com Docker, Integrando Grafana com Prometheus, Criar dashboard no Grafana

**✅ Aula 3.5: Logs com Grafana Loki**

- Tópicos: História e Arquitetura do Grafana Loki
- Projeto: rodar o Loki com Docker

**✅ Aula 3.6: Explorador de Blocos**

- Tópicos: O que são explorers
- Projeto: Configurar e integrar o Etherparty para monitorar uma rede Besu

## Módulo 4: Testes de Carga com K6

**✅ Aula 4.1: Introdução aos Testes de Carga**

- Tópicos: Importância dos testes de carga, arquitetura do K6, instalando e configurando o K6 e integrando ele com Grafana e InfluxDB.
- Projeto: Configurar e executar o primeiro teste de carga usando K6.

**✅ Aula 4.2: Teste de Carga - Smoke Testing**

- Tópicos: Conceito e Script de teste
- Projeto: Configurar e executar um Smoke Testing para a aplicação, analisando como o sistema lida com sobrecarga

**✅ Aula 4.3: Teste de Carga - Spike Testing**

- Tópicos: Conceito e Script de teste
- Projeto: Configurar e executar um Spike Test para a aplicação, observando a resposta a picos de carga

**✅ Aula 4.4: Teste de Carga - Breakpoint Testing com Blockchain****

- Tópicos: Integrar nosso ambiente de teste com uma rede blockchain.
- Projeto: Configurar e executar um Breaking Test para uma rede blockchain, verificar a resposta do sistema via Grafana.

## Módulo 5: Ciclo de Desenvolvimento de Smart Contracts

**✅ Aula 6.1: Introdução ao Desenvolvimento de Smartcontracts EVM**

- Tópicos: História e Arquitetura do mundo EVM, instalar e configurar Foundry e ScaffoldETH2

**✅ Aula 6.2: Ciclo de vida dos Smartcontract**

- Tópicos: Planejamento, Desenvolvimento, Testes, Auditória, Deploy Testnet, Deploy Mainnet, Escrever Token ERC20
- Projeto: Criar Token em solidity e fazer deploy no nosso Node

**✅ Aula 6.3: Implementando uma Vending Machine TDD**

- Tópicos: Conceitos de TDD
- Projeto: Escrever os testes para a Vending Machine

**⏰ Aula 6.4: Encerramento**

- Tópicos: Recapitulação do curso e próximos passos
