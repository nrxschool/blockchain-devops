# Aula 4.3: Teste de Carga - Breakpoint Testing

## Introdução

Nesta aula, vamos explorar o **Breakpoint Testing**, um tipo de teste de carga que avalia o ponto em que o sistema falha ou começa a se degradar sob uma carga crescente.

## Conceito: Breakpoint Testing

**Por que é importante?**

Breakpoint Testing é crucial para identificar os limites do sistema. Ele ajuda a determinar quantos usuários ou requisições a aplicação pode suportar antes de começar a apresentar problemas, como lentidão ou erros. Este tipo de teste é essencial para garantir que seu sistema possa lidar com cenários de tráfego intenso e para definir limites seguros de operação.

**Exemplo Prático**

Imagine que você está executando um serviço de streaming de vídeo. O Breakpoint Testing permite que você descubra o número máximo de usuários simultâneos que podem acessar a plataforma antes que o serviço comece a falhar, ajudando na definição de capacidades de infraestrutura.

### Executando Breakpoint Testing

**Preparando o Ambiente**

Certifique-se de que todos os contêineres necessários estão configurados e que você possui as ferramentas K6, InfluxDB e Grafana corretamente integradas.

**Configurando o Script de Teste**

Crie um novo arquivo de nome `script.js` com o seguinte conteúdo. Neste exemplo, vamos configurar um teste de carga progressivo, onde o número de usuários virtuais aumenta até que o sistema atinja seu ponto de quebra:

```javascript
import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  stages: [
    // Aumenta gradualmente o número de usuários virtuais
    { duration: "30", target: 100 }, // 1 minuto com 100 usuários
    { duration: "30", target: 500 }, // 1 minuto com 500 usuários
    { duration: "30", target: 1000 }, // 1 minuto com 1000 usuários
    { duration: "30", target: 5000 }, // 1 minuto com 5000 usuários
    { duration: "30", target: 10000 }, // 1 minuto com 10000 usuários
    { duration: "30", target: 50000 }, // 1 minuto com 15000 usuários
    { duration: "30", target: 0 }, // Finaliza removendo todos os usuários
  ],
};

export default function () {
  let res = http.get("http://nginx");

  const checkResult = check(res, {
    "status was 200": (r) => r.status == 200,
  });

  sleep(1);
}
```

Neste script, o número de usuários virtuais aumenta gradualmente de 100 até 15000. O contador `successfulRequests` contabiliza as requisições que retornam o status 200, enquanto `failRequests` conta as falhas.

**Executando o Teste**

Com o ambiente configurado, execute os seguintes comandos para rodar o Breakpoint Test:

1. **Suba os contêineres:**

```bash
docker-compose up -d
```

2. **Execute o teste com k6:**

```bash
docker run --net=aula4_my_net --rm -i grafana/k6 run -o influxdb=http://influxdb:8086/k6 - <script.js
```

Este comando utiliza a imagem do k6 para executar o script de teste. As métricas serão enviadas para o InfluxDB, que podem ser visualizadas no Grafana.

### Análise dos Resultados

Agora que o teste foi executado, vamos analisar os resultados:

1. **Observe o momento em que o número de requisições bem-sucedidas (`successful_requests`) começa a diminuir.**
2. **Verifique o aumento das requisições falhas (`fail_requests`).**

Esses indicadores ajudarão a identificar o ponto exato em que o sistema começou a falhar sob a carga crescente, revelando seu limite máximo de operação.

### Conclusão

O Breakpoint Testing é uma etapa essencial para entender os limites do seu sistema e garantir que ele esteja preparado para suportar picos de tráfego intenso. Ao identificar o ponto de quebra, você pode planejar melhor a escalabilidade e alocar recursos de maneira eficiente. Com o ambiente Docker configurado, você pode repetir esses testes sempre que houver uma nova versão da sua aplicação, garantindo que o sistema esteja sempre preparado para o uso.

Na próxima aula, vamos configurar e executar nossos testes em uma rede blockchain.
