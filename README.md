# Blockchain DevOps

## Módulo 1: Fundamentos do Blockchain e Besu

**Aula 1.1: Como funciona qualquer blockchain**

- Tópicos: Template de como estudar uma blockchain
- Projeto: Template de estudo

**Aula 1.2: História do Blockchain**

- Tópicos: Evolução das blockchain e grandes nomes do ecossitema
- Projeto: Apresentar noção histórica do tema

**Aula 1.3: Análise do Hyperledger Besu**

- Tópicos: Entender detalhes técinos sobre o Besu: Wallet, Tx, Bloco, Consenso
- Projeto: Instalar a metamask

## Módulo 2: Fundamentos do Docker e Docker-Compose

**Aula 2.1: Fundamentos sobre Containers**

- Tópicos: História da infraestrutura, containers, arquitetura do docker
- Projeto: Criação de um servidor Nginx

**Aula 2.2: Comandos Básicos do Docker (+Docker hub)**

- Tópicos: Docker build, pull, push, exec, ps
- Projeto: Build de imagem e mandar para o Docker hub

**Aula 2.3: Orquestrando Aplicações com Docker-Compose**

- Tópicos: Criar uma rede com 4 nodes usando PoW, PoS e PoA, usar load balancer e firewall
- Projeto: Orquestrar 4 nodes + load balancer + firewall

## Módulo 3: Monitoramento com Prometheus, Grafana e Blockscout

**Aula 3.1: Introdução ao Monitoramento**

- Tópicos: Importância do monitoramento, métricas essenciais, logs e alertas

**Aula 3.2: Arquitetura do Prometheus**

- Tópicos: História e Arquitetura do Prometheus
- Projeto: Rodar o prometheus com Docker

**Aula 3.3: Integrando o Besu com Prometheus**

- Tópicos: Configuração de jobs e targets
- Projeto: Configurar o Prometheus para monitorar um node blockchain

**Aula 3.4: Arquitetura do Grafana**

- Tópicos: História e Arquitetura do Grafana
- Projeto: rodar o Grafana com Docker

**Aula 3.5: Integrando Besu + Prometheus + Grafana**

- Tópicos: Integrando Grafana com Prometheus
- Projeto: Criar dashboard no Grafana

**Aula 3.6: Explorador de Blocos**

- Tópicos: Configuração do Blockscout, integração com nodes Besu
- Projeto: Configurar o Blockscout para monitorar um node Besu

## Módulo 4: Testes de Carga com K6 e Caliper

**Aula 4.1: Introdução aos Testes de Carga**

- Tópicos: Importância dos testes de carga, arquitetura do K6, instalando e configurando o K6.

**Aula 4.1: Seu Primeiro Teste de Carga**

- Tópicos: Criação de scripts de teste
- Projeto: Configurar e executar um teste de carga usando K6 na aplicação CRUD

**Aula 4.2: Teste de Carga - Smoke Testing**

- Tópicos: Conceito e Script do teste
- Projeto: Configurar e executar um Smoke Test para a aplicação, verificando a resposta básica do sistema

**Aula 4.3: Teste de Carga - Average Load Testing**

- Tópicos: Conceito e Script de teste
- Projeto: Configurar e executar um teste de carga média para a aplicação, analisando métricas de desempenho

**Aula 4.4: Teste de Carga - Stress Testing**

- Tópicos: Conceito e Script de teste
- Projeto: Configurar e executar um Stress Test para a aplicação, analisando como o sistema lida com sobrecarga

**Aula 4.5: Teste de Carga - Soak Testing**

- Tópicos: Conceito e Script de teste
- Projeto: Configurar e executar um Soak Test para a aplicação, monitorando a estabilidade ao longo do tempo

**Aula 4.6: Teste de Carga - Spike Testing**

- Tópicos: Conceito e Script de teste
- Projeto: Configurar e executar um Spike Test para a aplicação, observando a resposta a picos de carga

**Aula 4.7: Teste de Carga - Breakpoint Testing**

- Tópicos: Conceito e Script de teste
- Projeto: Configurar e executar um Breakpoint Test para a aplicação, determinando a capacidade máxima antes do colapso

**Aula 4.8: Introdução ao Hyperledger Caliper**

- Tópicos: História e arquitetura do Hyperledger Caliper
- Projeto: ---

**Aula 4.9: Seu Primeiro Testes de Performance com Caliper**

- Tópicos: Configuração de benchmarks para um teste simples
- Projeto: Configurar e executar testes de performance contra node Besu

**Aula 4.10: Stress Testes com Caliper**

- Tópicos: Script de teste
- Projeto: Configurar e executar testes de stress contra node Besu

**Aula 4.11: Análise de Resultados de Testes de Carga**

- Tópicos: Interpretação de resultados de testes de carga, identificação de gargalos
- Projeto: Analisar os resultados dos testes de carga e identificar melhorias

## Módulo 5: Computação em Nuvem

**Aula 5.1: Introdução à Computação em Nuvem**

- Tópicos: História da computação em nuvem, principais provedores (AWS, GCP, Azure), criando máquinas virtuais.
- Projeto: Criar uma conta em um provedor de nuvem

**Aula 5.2: Implementação de Nodes Blockchain na Nuvem**

- Tópicos: Configuração de rede hyperledger besu privada.
- Projeto: Instanciar e configurar um node blockchain na nuvem

## Módulo 6: Ciclo de Desenvolvimento de Smart Contracts

**Aula 6.1: Introdução ao Desenvolvimento de Smartcontracts EVM**

- Tópicos: História e Arquitetura do mundo EVM, instalar e configurar Foundry e ScaffoldETH2

**Aula 6.2: Ciclo de vida dos Smartcontract**

- Tópicos: Planejamento, Desenvolvimento, Testes, Auditória, Deploy Testnet, Deploy Mainnet, Escrever Token ERC20
- Projeto: Criar Token em solidity e fazer deploy no nosso Node

**Aula 6.3: Implementando uma Vending Machine TDD**

- Tópicos: Conceitos de TDD
- Projeto: Escrever os testes para a Vending Machine

**Aula 6.4: Escrevendo a Vending Machine**

- Tópicos: Escrevendo um contrato de Vending Machine
- Projeto: Validar os testes para a Vending Machine

**Aula 6.5: Auditando nossa Vending Machine**

- Tópicos: Conceitos de Auditoria e Análise estática de código
- Projeto: Encontrar falhas de segurança no smartcontract

**Aula 6.6: Fazendo deploy da Vending Machine**

- Tópicos: Finalizar ciclo de vida de um smartcontract
- Projeto: Fazer deploy usando nosso node
