# Blockchain DevOps

## Módulo 1: Fundamentos do Blockchain e Besu

**Aula 1.1: Introdução ao Blockchain**

- Tópicos: Evolução das blockchain e grandes nomes do ecossitema
- Ferramentas: Slides de apresentação, vídeos ilustrativos
- Projeto: Apresentar noção histórica do tema

**Aula 1.2: Análise do Bitcoin**

- Tópicos: Entender detalhes técinos sobre o Bitcoin: Wallet, Tx, Bloco, Consenso
- Ferramentas: Slides de apresentação, vídeos ilustrativos
- Projeto: Criar uma carteira Bitcoin e usar a Testnet

**Aula 1.3: Análise do Ethereum**

- Tópicos: Entender detalhes técinos sobre o Ethereum: Wallet, Tx, Bloco, Consenso
- Ferramentas: Slides de apresentação, vídeos ilustrativos
- Projeto: Criar uma carteira Ethereum e usar a Testnet

**Aula 1.4: Análise da Solana**

- Tópicos: Entender detalhes técinos sobre o Solana: Wallet, Tx, Bloco, Consenso
- Ferramentas: Slides de apresentação, vídeos ilustrativos
- Projeto: Criar uma carteira Solana e usar a Testnet

**Aula 1.5: Análise da Polkadot**

- Tópicos: Entender detalhes técinos sobre o Polkadot: Wallet, Tx, Bloco, Consenso
- Ferramentas: Slides de apresentação, vídeos ilustrativos
- Projeto: Criar uma carteira Polkadot e usar a Testnet

**Aula 1.6: Análise da Near**

- Tópicos: Entender detalhes técinos sobre o Near: Wallet, Tx, Bloco, Consenso
- Ferramentas: Slides de apresentação, vídeos ilustrativos
- Projeto: Criar uma carteira Near e usar a Testnet

**Aula 1.7: Análise da R3Corda**

- Tópicos: Entender detalhes técinos sobre o R3Corda: Wallet, Tx, Bloco, Consenso
- Ferramentas: Slides de apresentação, vídeos ilustrativos
- Projeto: Criar uma carteira R3Corda e usar a Testnet

**Aula 1.8: Análise do Hyperledger Besu**

- Tópicos: Entender detalhes técinos sobre o Besu: Wallet, Tx, Bloco, Consenso
- Ferramentas: Slides de apresentação, vídeos ilustrativos
- Projeto: Criar uma carteira Besu e usar a Testnet

**Aula 1.9: Instalação**

- Tópicos: Passo a passo para instalação local do Besu e Solução de problemas
- Ferramentas: Besu
- Projeto: Instalação do Besu no ambiente local do aluno

**Aula 1.10: Configuração Inicial do Besu**

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


## Módulo 5: Computação em Nuvem

## Módulo 6: Ciclo de desenvolvimento de smartcontracts
