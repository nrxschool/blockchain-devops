# Aula 4.4: Teste de Carga - Breakpoint Testing

## Introdução

Nesta aula, vamos entender sobre o Breakpoint Testing.

## Conceito: Breakpoint Testing

**Por que é importante?**

**Exemplo Prático**

### Executando Breakpoint Testing

**Preparando o Ambiente**

**Configurando o Script de Teste**

Crie um novo arquivo teste de nome `script.js` com um item a mais, dessa vez vamos criar um contador de status 200 para vermos isso no Grafana.

```javascript

```

**Executando o Teste**

Com o ambiente configurado, execute os seguintes comandos para rodar o Spike Test:

1. **Suba os contêineres:**

```bash
docker-compose up -d
```

2. **Execute o teste com k6:**

```bash
docker run --net=aula3_my_net --rm -i grafana/k6 run -o influxdb=http://influxdb:8086/k6 - <script.js
```

Este comando utiliza a imagem do k6 para executar o script de teste. As métricas serão enviadas para o InfluxDB, que pode ser acessado pelo Grafana.

### Análise dos Resultados

Agora que o teste foi executado, vamos analisar os resultados:

Vamos olhar as métricas aqui

### Conclusão

O Breakpoint Testing é uma etapa fundamental em qualquer ciclo de testes de carga. Ele ajuda a detectar problemas básicos e preparar o sistema para testes mais completos. Com o ambiente Docker configurado, você pode repetir esses testes sempre que houver uma nova versão da sua aplicação, garantindo que o sistema esteja sempre pronto para o uso.

Na próxima aula vamos ver como integrar o k6 com nossa rede Blockchain.
