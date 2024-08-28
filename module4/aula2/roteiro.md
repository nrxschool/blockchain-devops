# Aula 4.2: Teste de Carga - Smoke Testing

## Introdução

Nesta aula, vamos entender os conceitos de teste de carga e, especificamente, o Smoke Testing. Vamos aprender a executar testes de carga usando ferramentas populares e analisar os resultados de desempenho, usando o ambiente configurado no Docker Compose.

## Tipos de Teste de Carga

- [link](https://grafana.com/docs/k6/latest/testing-guides/test-types/)

Existem diversos tipos de testes de carga, e vamos explorar alguns deles pois cada um tem um objetivo especifico.
Aqui está uma tabela detalhada para cada tipo de teste de carga, com base nas informações fornecidas:

| Tipo de Teste         | VUs/Throughput        | Duração                     | Objetivo                                                                                                 | Quando Executar                                                               | Observações                                                                                                                                                |
| --------------------- | --------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Smoke Test**        | Baixo                 | Curta (segundos ou minutos) | Verificar se o sistema funciona com carga mínima. Coletar valores de desempenho base.                    | Quando há mudanças relevantes no código do sistema ou aplicativo              | Também conhecido como "shakeout test". Serve para validar a lógica funcional, métricas base e desvios.                                                     |
| **Average-Load Test** | Produção Média        | Média (5-60 minutos)        | Avaliar o desempenho do sistema sob carga típica de produção.                                            | Regularmente, para garantir que o sistema mantenha o desempenho com uso médio | Também chamado de "day-in-life test" ou "volume test".                                                                                                     |
| **Stress Test**       | Alto (acima da média) | Média (5-60 minutos)        | Verificar a estabilidade e confiabilidade do sistema sob cargas mais pesadas do que o normal.            | Quando o sistema pode receber cargas acima da média                           | Também chamado de "rush-hour test" ou "scale test". Utilizado para testar como o sistema lida com picos de carga.                                          |
| **Soak Test**         | Média                 | Longa (horas ou dias)       | Analisar a degradação de desempenho e o consumo de recursos ao longo de períodos prolongados.            | Após mudanças, para verificar o desempenho sob uso contínuo prolongado        | Também conhecido como "endurance test" ou "stamina test". Foca na estabilidade e disponibilidade durante longos períodos.                                  |
| **Spike Test**        | Muito Alto            | Curta (alguns minutos)      | Verificar se o sistema sobrevive e executa sob picos repentinos e massivos de utilização.                | Quando o sistema se prepara para eventos sazonais ou picos frequentes         | Simula picos extremos de carga em um curto período de tempo, como em vendas de ingressos ou lançamentos de produtos.                                       |
| **Breakpoint Test**   | Cresce até quebrar    | O quanto necessário         | Descobrir os limites do sistema e planejar ações de correção para quando esses limites forem alcançados. | Em momentos estratégicos para encontrar os limites superiores do sistema      | Também conhecido como "capacity test" ou "limit test". Rampa até limites irrealistas e geralmente precisa ser interrompido manualmente ou automaticamente. |

### Conceito: Smoke Testing

É o tipo mais simples de teste, suas métricas podem ser utilizadas como base de comparação com os outros testes. É mais como uma teste de validação, é rápido de executar e tem como objetivo identificar problemas críticos logo no início.

**Por que é importante?**

- Detecta problemas básicos rapidamente, economizando tempo.
- Previne a execução de testes mais longos em sistemas que já estão falhando em operações básicas.
- Coleta de métricas como o "mínimo" que o sistema tem que aguentar.

**Exemplo Prático:**

Imagine que você acabou de configurar uma nova versão da sua aplicação. Antes de realizar testes completos de carga ou estresse, você quer garantir que as operações básicas, como login ou consulta de banco de dados, estão funcionando. O Smoke Testing faz exatamente isso.

### Executando Smoke Testing

**Preparando o Ambiente**

O `docker-compose` da aula passada será usado denovo e em todas as próximas aulas de teste. Só relembrando:

```yaml
networks:
  my_net:

services:
  nginx:
    image: nginx:latest
    ports:
      - "80:80"

  influxdb:
    image: influxdb:1.8
    networks:
      - my_net
    ports:
      - "8086:8086"
    environment:
      - INFLUXDB_DB=k6

  grafana:
    depends_on:
      - influxdb
    image: grafana/grafana:latest
    networks:
      - my_net
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=admin
```

**Configurando o Script de Teste**

Crie um novo arquivo teste de nome `script.js` com um item a mais, dessa vez vamos criar um contador de status 200 para vermos isso no Grafana.

```javascript
import http from "k6/http";
import { check, sleep } from "k6";
import { Counter } from "k6/metrics";

export let options = {
  vus: 20000,
  duration: "30s",
};

const successfulRequests = new Counter("successful_requests");
const failRequests = new Counter("fail_requests");

export default function () {
  let res = http.get("http://nginx");

  const checkResult = check(res, {
    "status was 200": (r) => r.status == 200,
  });

  if (checkResult) {
    successfulRequests.add(1);
  } else {
    failRequests.add(1);
  }
  sleep(1);
}
```

**Executando o Teste**

Com o ambiente configurado, execute os seguintes comandos para rodar o Smoke Test:

1. **Suba os contêineres:**

```bash
docker-compose up -d
```

2. **Execute o teste com k6:**

```bash
docker run --net=aula2_my_net --rm -i grafana/k6 run -o influxdb=http://influxdb:8086/k6 - <script.js
```

Este comando utiliza a imagem do k6 para executar o script de teste. As métricas serão enviadas para o InfluxDB, que pode ser acessado pelo Grafana.

### Análise dos Resultados

Agora que o teste foi executado, vamos analisar os resultados:

#### Visualizando no Grafana

1. Abra o Grafana no navegador: `http://localhost:3000`
2. Faça login usando as credenciais padrão: `admin / admin`.
3. Adicione uma nova fonte de dados apontando para o InfluxDB (`http://influxdb:8086`).
4. Importe o dashboard e vamos analisar os gráficos.

Vamos olhar as métricas aqui

### Conclusão

O Smoke Testing é uma etapa fundamental em qualquer ciclo de testes de carga. Ele ajuda a detectar problemas básicos e preparar o sistema para testes mais completos. Com o ambiente Docker configurado, você pode repetir esses testes sempre que houver uma nova versão da sua aplicação, garantindo que o sistema esteja sempre pronto para o uso.

Na próxima aula vamos ver sobre o Spike Teste
