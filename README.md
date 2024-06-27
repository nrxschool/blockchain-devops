# Blockchain DevOps

## Módulo 1: Fundamentos do Blockchain e Besu

**Aula 1.1: Introdução ao Blockchain**

- Tópicos: Evolução das blockchain e grandes nomes do ecossitema
- Ferramentas: Slides de apresentação, vídeos ilustrativos
- Projeto: Apresentar noção histórica do tema

**aula 1.2: Como funciona qualquer blockchain**

- Tópicos: Template de como estudar uma blockchain
- Ferramentas: Slides
- Projeto: Template de estudo

**Aula 1.3: Análise do Hyperledger Besu**

- Tópicos: Entender detalhes técinos sobre o Besu: Wallet, Tx, Bloco, Consenso
- Ferramentas: Slides de apresentação, vídeos ilustrativos
- Projeto: Criar uma carteira Besu e usar a Testnet

**Aula 1.4: Instalação**

- Tópicos: Passo a passo para instalação local do Besu e Solução de problemas
- Ferramentas: Besu
- Projeto: Instalação do Besu no ambiente local do aluno

**Aula 1.5: Configuração Inicial do Besu**

- Tópicos: Exploração da interface de linha de comando
- Ferramentas: Besu, Besu CLI
- Projeto: Configuração inicial de um node Besu no ambiente local do aluno

## Módulo 2: Fundamentos do Docker e Docker-Compose

**Aula 2.1: Instalando o Docker**

- Tópicos: Passo a passo para instalação local do Docker e Solução de problemas
- Ferramentas: Docker
- Projeto: Entender comandos da CLI

**Aula 2.2: Fundamentos sobre Containers**

- Tópicos: História da infraestrutura, containers, arquitetura do docker
- Ferramentas: Docker, Terminal
- Projeto: Criação de um servidor Nginx

**Aula 2.3: Comandos Básicos do Docker (+Docker hub)**

- Tópicos: Docker build, pull, push, exec, ps
- Ferramentas: Docker, Vscode
- Projeto: Build de imagem e mandar para o Docker hub

**Aula 2.4: Conteinerizar uma Aplicação com Docker**

- Tópicos: Criar um CRUD em python e colocar em um container usando um Dockerfile
- Ferramentas: Docker, Vscode
- Projeto: Build da imagem, rodar e mandar para o Docker hub

**Aula 2.5: Orquestrando Aplicações com Docker-Compose**

- Tópicos: Habilitando um load balancer
- Ferramentas: Docker-Compose, Nginx
- Projeto: Orquestrar 3 aplicações + Banco de dados + Load Balancer

**Aula 2.6: Criando uma Blockchain Privada com Docker Swarm**

- Tópicos: Criar uma rede com 4 nodes usando PoW, PoS e PoA, usar load balancer e firewall
- Ferramentas: Docker-Compose, Nginx, Besu, UFW
- Projeto: Orquestrar 4 nodes + load balancer + firewall

## Módulo 3: Fundamentos de Kubernetes

**Aula 3.1: Instalando o Kubernetes**

- Tópicos: Instalação do kubectl e Kind, configuração de contexto e namespaces
- Ferramentas: Kubernetes, kubectl, Kind
- Projeto: Entender comandos do CLI

**Aula 3.2: Fundamentos do Kubernetes**

- Tópicos: História e arquitetura do Kubernetes
- Ferramentas: Slides
- Projeto: ---

**Aula 3.3: Arquitetura do Kubernetes**

- Tópicos: Arquitetura do Kubernetes
  - control plane
  - nodes
  - pods
  - schedulers
  - etcd
  - kube-apiserver
  - kube-controller-manager
  - kube-scheduler
  - kubelet
  - kube-proxy
- Ferramentas: Slides e Documentação do Kubernetes
- Projeto: ---

**Aula 3.4: Componentes de Desenvolvimento do Kubernetes**

- Tópicos: Componentes do Kubernetes
  - deployments
  - pods
  - services
  - replica sets
  - namespaces
- Ferramentas: kubectl
- Projeto: Fazer deploy do Nginx

**Aula 3.5: Conteinerizar uma Aplicação com Kubernetes**

- Tópicos: Implantação de uma aplicação CRUD (usada no módulo anterior) no Kubernetes, Criação de arquivos YAML para deployments, services e config maps
- Ferramentas: Kubernetes, kubectl, Yaml
- Projeto: Criar e aplicar arquivos YAML para deploy da aplicação CRUD no cluster Kubernetes

**Aula 3.6: Autoscaling no Kubernetes**

- Tópicos: Autoscaling de pods (Horizontal Pod Autoscaler), Configuração e monitoramento de autoscaling
- Ferramentas: Kubernetes, kubectl
- Projeto: Implementar autoscaling para a aplicação CRUD no cluster Kubernetes

**Aula 3.7: Rolling Updates e Rollbacks no Kubernetes**

- Tópicos: Deployments com rolling updates, Gerenciamento de rollbacks
- Ferramentas: Kubernetes, kubectl
- Projeto: Configurar e realizar rolling updates e rollbacks na aplicação CRUD

**Aula 3.8: ConfigMaps no Kubernetes**

- Tópicos: Gerenciamento de ConfigMaps para configuração de aplicações
- Ferramentas: Kubernetes, kubectl
- Projeto: Configurar e utilizar ConfigMaps na aplicação CRUD

**Aula 3.9: Secrets no Kubernetes**

- Tópicos: Uso de Secrets para gerenciamento seguro de informações sensíveis
- Ferramentas: Kubernetes, kubectl
- Projeto: Configurar e utilizar Secrets na aplicação CRUD

**Aula 3.10: Criando uma Blockchain Privada com Besu no Kubernetes**

- Tópicos: Configuração de uma rede blockchain privada do Besu no Kubernetes
- Ferramentas: Kubernetes, kubectl, Besu
- Projeto: Configurar e implantar uma rede blockchain privada do Besu no cluster Kubernetes

**Aula 3.11: Disponibilidade e Escalabilidade com Kubernetes**

- Tópicos: Implementação de estratégias de alta disponibilidade e escalabilidade
- Ferramentas: Kubernetes, kubectl, Besu
- Projeto: Configurar e testar a escalabilidade e alta disponibilidade da rede blockchain privada do Besu no Kubernetes

## Módulo 4: Monitoramento com Prometheus, Grafana e Blockscout

**Aula 4.1: Introdução ao Monitoramento**

- Tópicos: Importância do monitoramento, métricas essenciais, logs e alertas
- Ferramentas: Slides
- Projeto: ---

**Aula 4.2: Arquitetura do Prometheus**

- Tópicos: História e Arquitetura do Prometheus
- Ferramentas: Slides
- Projeto: Rodar o prometheus com Docker

**Aula 4.3: Integrando o Besu com Prometheus**

- Tópicos: Configuração de jobs e targets
- Ferramentas: Prometheus, Docker, Besu
- Projeto: Configurar o Prometheus para monitorar um node blockchain

**Aula 4.4: Consultando métricas com PrompQL**

- Tópicos: Noções básicas de prompQL
- Ferramentas: Prometheus, Docker, Besu
- Projeto: Fazer consultas de métricas do node

**Aula 4.5: Arquitetura do Grafana**

- Tópicos: História e Arquitetura do Grafana
- Ferramentas: Slides
- Projeto: ---

**Aula 4.6: Integrando Besu + Prometheus + Grafana**

- Tópicos: Integrando Grafana com Prometheus
- Ferramentas: Prometheus, Docker, Besu
- Projeto: Criar dashboard no Grafana

**Aula 4.7: Configuração de Alertas com Prometheus Alertmanager**

- Tópicos: Configuração do Alertmanager, regras de alerta
- Ferramentas: Prometheus, Alertmanager, Docker
- Projeto: Configurar alertas para monitorar a saúde dos nodes blockchain e outras coisas

**Aula 4.8: Arquitetura do Blockscout**

- Tópicos: História e arquitetura do Blockscout
- Ferramentas: Slides
- Projeto: ---

**Aula 4.9: Explorando Blockchains com Blockscout**

- Tópicos: Configuração do Blockscout, integração com nodes Besu
- Ferramentas: Blockscout, Docker
- Projeto: Configurar o Blockscout para monitorar um node Besu

## Módulo 5: Testes de Carga com K6 e Caliper

**Aula 5.1: Introdução aos Testes de Carga**

- Tópicos: Importância dos testes de carga, ferramentas e metodologias, tipos de teste.
- Ferramentas: Slides de apresentação
- Projeto: ---

**Aula 5.2: Arquitetura do K6**

- Tópicos: História e Arquitetura do K6
- Ferramentas: Slides
- Projeto: Instalar K6

**Aula 5.2: Seu Primeiro Teste de Carga**

- Tópicos: Criação de scripts de teste
- Ferramentas: K6, Docker
- Projeto: Configurar e executar um teste de carga usando K6 na aplicação CRUD

**Aula 5.3: Integrando K6 com Grafana**

- Tópicos: Usar grafana para visualizar as métricas em real-time
- Ferramentas: K6, Docker
- Projeto: Integrar Grafana com K6

**Aula 5.3: Teste de Carga - Smoke Testing**

- Tópicos: Conceito e Script do teste
- Ferramentas: K6, Docker, Grafana
- Projeto: Configurar e executar um Smoke Test para a aplicação, verificando a resposta básica do sistema

**Aula 5.4: Teste de Carga - Average Load Testing**

- Tópicos: Conceito e Script de teste
- Ferramentas: K6, Docker, Grafana
- Projeto: Configurar e executar um teste de carga média para a aplicação, analisando métricas de desempenho

**Aula 5.5: Teste de Carga - Stress Testing**

- Tópicos: Conceito e Script de teste
- Ferramentas: K6, Docker, Grafana
- Projeto: Configurar e executar um Stress Test para a aplicação, analisando como o sistema lida com sobrecarga

**Aula 5.6: Teste de Carga - Soak Testing**

- Tópicos: Conceito e Script de teste
- Ferramentas: K6, Docker, Grafana
- Projeto: Configurar e executar um Soak Test para a aplicação, monitorando a estabilidade ao longo do tempo

**Aula 5.7: Teste de Carga - Spike Testing**

- Tópicos: Conceito e Script de teste
- Ferramentas: K6, Docker, Grafana
- Projeto: Configurar e executar um Spike Test para a aplicação, observando a resposta a picos de carga

**Aula 5.8: Teste de Carga - Breakpoint Testing**

- Tópicos: Conceito e Script de teste
- Ferramentas: K6, Docker, Grafana
- Projeto: Configurar e executar um Breakpoint Test para a aplicação, determinando a capacidade máxima antes do colapso

**Aula 5.9: Introdução ao Hyperledger Caliper**

- Tópicos: História e arquitetura do Hyperledger Caliper
- Ferramentas: Slides
- Projeto: ---

**Aula 5.10: Seu Primeiro Testes de Performance com Caliper**

- Tópicos: Configuração de benchmarks para um teste simples
- Ferramentas: Caliper, Besu, Docker
- Projeto: Configurar e executar testes de performance contra node Besu

**Aula 5.11: Stress Testes com Caliper**

- Tópicos: Script de teste
- Ferramentas: Caliper, Besu, Docker
- Projeto: Configurar e executar testes de stress contra node Besu

**Aula 5.4: Análise de Resultados de Testes de Carga**

- Tópicos: Interpretação de resultados de testes de carga, identificação de gargalos
- Ferramentas: K6, Caliper, Grafana
- Projeto: Analisar os resultados dos testes de carga e identificar melhorias

## Módulo 6: Computação em Nuvem

**Aula 6.1: Introdução à Computação em Nuvem**

- Tópicos: Conceitos básicos de computação em nuvem, principais provedores (AWS, GCP, Azure)
- Ferramentas: Slides
- Projeto: Criar uma conta em um provedor de nuvem

**Aula 6.2: Implementação de Nodes Blockchain na Nuvem**

- Tópicos: Instanciação de máquinas virtuais, configuração de rede e segurança
- Ferramentas: AWS/GCP/Azure, Terraform
- Projeto: Instanciar e configurar um node blockchain na nuvem

**Aula 6.3: Infraestrutura como Código (IaC)**

- Tópicos: Conceitos de IaC, introdução ao Terraform
- Ferramentas: Terraform, AWS/GCP/Azure
- Projeto: Criar uma configuração de infraestrutura como código para deploy de nodes blockchain

**Aula 6.4: Gerenciamento de Recursos na Nuvem (FinOps)**

- Tópicos: Gerenciamento de custos, dimensionamento automático, monitoramento
- Ferramentas: AWS/GCP/Azure, Terraform
- Projeto: Configurar políticas de gerenciamento de recursos e monitoramento

## Módulo 7: Ciclo de Desenvolvimento de Smart Contracts

**Aula 7.1: Introdução ao Desenvolvimento de Smartcontracts EVM**

- Tópicos: História e Arquitetura do mundo EVM
- Ferramentas: Slides
- Projeto: ---

**Aula 7.2: Instalando Foundry**

- Tópicos: Instalar Foundry
- Ferramentas: Foundry e Docs
- Projeto: Configurar um ambiente de desenvolvimento para Solidity

**Aula 7.3: Ciclo de vida dos Smartcontract**

- Tópicos: Planejamento, Desenvolvimento, Testes, Auditória, Deploy Testnet, Deploy Mainnet
- Ferramentas: Slides
- Projeto: ---

**Aula 7.4: Seu primeiro Token ERC20**

- Tópicos: Escrever Token ERC20
- Ferramentas: Foundry
- Projeto: Criar Token em solidity e fazer deploy no nosso Node

**Aula 7.5: Testando nossa Vending Machine TDD**

- Tópicos: Conceitos de TDD
- Ferramentas: Foundry, Solidity
- Projeto: Escrever os testes para a Vending Machine

**Aula 7.6: Escrevendo a Vending Machine**

- Tópicos: Escrevendo um contrato de Vending Machine
- Ferramentas: Foundry, Solidity
- Projeto: Validar os testes para a Vending Machine

**Aula 7.7: Auditando nossa Vending Machine**

- Tópicos: Conceitos de Auditoria e Análise estática de código
- Ferramentas: Slither, Foundry, Solidity
- Projeto: Encontrar falhas de segurança no smartcontract

**Aula 7.8: Fazendo deploy da Vending Machine**

- Tópicos: Finalizar ciclo de vida de um smartcontract
- Ferramentas: Slither, Foundry, Solidity
- Projeto: Fazer deploy usando nosso node
