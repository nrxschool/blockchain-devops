# Aula 4.1: Introdução aos Testes de Carga

## Introdução

Os testes de carga são cruciais para garantir que uma aplicação, especialmente em ambientes de produção, funcione de maneira eficiente sob diversas condições. Eles ajudam a identificar gargalos, falhas de desempenho e limitações da infraestrutura antes que os usuários finais sejam impactados.

### O que são Testes de Carga?

Testes de carga simulam um grande número de usuários ou requisições simultâneas para avaliar como um sistema responde sob estresse. Esses testes permitem:

- Medir o tempo de resposta.
- Avaliar a estabilidade.
- Identificar limites de capacidade.
- Otimizar o uso de recursos.

### Por que Fazer Testes de Carga?

Em ambientes de blockchain, onde a performance e a escalabilidade são cruciais, os testes de carga são ainda mais importantes. Eles garantem que a rede pode suportar grandes volumes de transações sem comprometer a segurança ou a eficiência.

## Arquitetura do K6

O **K6** é uma ferramenta moderna e open-source para executar testes de carga. Desenvolvido com foco em simplicidade e escalabilidade usando a linguagem Go, ele oferece uma maneira eficiente de simular cargas de trabalho e monitorar o desempenho de aplicações web e APIs usando scripts em JavaScript.

### Principais Características do K6

- **Suporte a Virtual Users (VUs)**: O K6 simula usuários virtuais para gerar carga no sistema.
- **Escalabilidade**: Pode ser executado localmente, em containers Docker ou em clusters Kubernetes para suportar grandes volumes de testes.
- **Suporte a Scripts em JavaScript**: Os scripts de teste são escritos em JavaScript, facilitando a criação e manutenção dos testes.
- **Integração com Grafana**: O K6 se integra facilmente com o Grafana para visualização de métricas de desempenho em tempo real.

## Instalando e Configurando o K6 via Docker

1. **Instalar o Docker:** A essa altura do curso com certeza você já tem o docker instalado certo?

2. **Script de teste:** Vamos criar um script simples com o nome `simples.js` que já irei explicar cada item dele:

```javascript
// IMPORTS
//
// Na primeira parte do script
// importamos as bibliotecas e
// outros artefatos necessários
// para os testes.
//
import http from "k6/http";
import { sleep } from "k6";

// SETUPS
//
// Na segunda parte do script
// definimos como será o nosso
// ambiente de teste
//
export const options = {
  vus: 10,
  duration: "10s",
};

// EXECUTION
//
// Por fim na terceira parte do
// script colocamos a lógica do
// que queremos validar com o
// nosso teste.
//
export default function () {
  http.get("http://host.docker.internal:8080");
  sleep(1);
}
```

3. **Rodando target: ** Antes de executar nosso teste, precisamos de um alvo, pra isso vamos usar o `nginx` com o comando:

```bash
docker run -d -p 8080:80 nginx
```

4. **Executar o K6: ** Para rodar o teste de carga, use o comando na mesma pasta do arquivo `script.js`:

```bash
docker run --rm -i grafana/k6 run - <simples.js
```

5. **Analisar os resultados:** Agora vamos analisar o resultado do nosso teste:

```bash
http_req_blocked...............: avg=279.58µs min=917ns    med=5.97µs  max=2.96ms  p(90)=595.54µs p(95)=2.65ms
http_req_connecting............: avg=121.97µs min=0s       med=0s      max=1.3ms   p(90)=109.5µs  p(95)=1.22ms
http_req_duration..............: avg=3.87ms   min=1.15ms   med=4.31ms  max=7.68ms  p(90)=5.57ms   p(95)=7.12ms
{ expected_response:true }.....: avg=3.87ms   min=1.15ms   med=4.31ms  max=7.68ms  p(90)=5.57ms   p(95)=7.12ms
http_req_receiving.............: avg=82.24µs  min=8.16µs   med=44.85µs max=634.7µs p(90)=144.91µs p(95)=227.97µs
http_req_sending...............: avg=31.77µs  min=3.83µs   med=18.66µs max=693µs   p(90)=55.2µs   p(95)=67.72µs
http_req_tls_handshaking.......: avg=0s       min=0s       med=0s      max=0s      p(90)=0s       p(95)=0s
http_req_waiting...............: avg=3.76ms   min=737.37µs med=4.22ms  max=7.56ms  p(90)=5.42ms   p(95)=7.05ms
iteration_duration.............: avg=1s       min=1s       med=1s      max=1.01s   p(90)=1s       p(95)=1.01s
data_received..................: 85 kB  8.5 kB/s
data_sent......................: 9.1 kB 904 B/s
http_reqs......................: 100    9.931617/s
http_req_failed................: 0.00%  ✓ 0        ✗ 100
iterations.....................: 100    9.931617/s
vus............................: 10     min=10     max=10
vus_max........................: 10     min=10     max=10
```

5.1. **Limpando os dados:** Vamos converter os dados em uma tabela para facilitar o entendimento. E pra isso vamos extrair 2 tabelas para melhor agrupar os dados e vamos criar uma nova de legenda para entender cada informação no detalhe.

5.2. **Tabela Legenda**: Nessa tabela temos a descrição do que significa cada item:

| Item  | Descrição                                                                       |
| ----- | ------------------------------------------------------------------------------- |
| p(95) | Percentil 95, 95% das requisições tiveram um tempo menor ou igual a este valor. |
| p(90) | Percentil 90, 90% das requisições tiveram um tempo menor ou igual a este valor. |
| med   | Mediana (valor central)                                                         |
| max   | Tempo Máximo                                                                    |
| avg   | Tempo Médio                                                                     |
| min   | Tempo Mínimo                                                                    |

5.3. **Tabela A**

| Descrição da Métrica       | Interpretação                                     | Média        | Mínimo       | Mediana     | Máximo      | p(90)          | p(95)          | Unidade |
| -------------------------- | ------------------------------------------------- | ------------ | ------------ | ----------- | ----------- | -------------- | -------------- | ------- |
| http_req_blocked           | Tempo gasto esperando antes da requisição iniciar | avg=279.58µs | min=917ns    | med=5.97µs  | max=2.96ms  | p(90)=595.54µs | p(95)=2.65ms   | µs      |
| http_req_connecting        | Tempo para estabelecer a conexão TCP              | avg=121.97µs | min=0s       | med=0s      | max=1.3ms   | p(90)=109.5µs  | p(95)=1.22ms   | µs      |
| http_req_duration          | Duração total da requisição                       | avg=3.87ms   | min=1.15ms   | med=4.31ms  | max=7.68ms  | p(90)=5.57ms   | p(95)=7.12ms   | ms      |
| { expected_response:true } | Duração da requisição com resposta esperada       | avg=3.87ms   | min=1.15ms   | med=4.31ms  | max=7.68ms  | p(90)=5.57ms   | p(95)=7.12ms   | ms      |
| http_req_receiving         | Tempo para receber os dados da resposta           | avg=82.24µs  | min=8.16µs   | med=44.85µs | max=634.7µs | p(90)=144.91µs | p(95)=227.97µs | µs      |
| http_req_sending           | Tempo para enviar os dados da requisição          | avg=31.77µs  | min=3.83µs   | med=18.66µs | max=693µs   | p(90)=55.2µs   | p(95)=67.72µs  | µs      |
| http_req_tls_handshaking   | Tempo para completar o handshake TLS              | avg=0s       | min=0s       | med=0s      | max=0s      | p(90)=0s       | p(95)=0s       | s       |
| http_req_waiting           | Tempo de espera pela resposta após o envio        | avg=3.76ms   | min=737.37µs | med=4.22ms  | max=7.56ms  | p(90)=5.42ms   | p(95)=7.05ms   | ms      |
| iteration_duration         | Duração total de cada iteração                    | avg=1s       | min=1s       | med=1s      | max=1.01s   | p(90)=1s       | p(95)=1.01s    | s       |

5.4. **Tabela B**

| Descrição da Métrica | Interpretação                               | Total  | Taxa       | Valor Sucesso | Valor Falha | Mínimo | Máximo | Unidade  |
| -------------------- | ------------------------------------------- | ------ | ---------- | ------------- | ----------- | ------ | ------ | -------- |
| data_received        | Quantidade total de dados recebidos         | 85 kB  | 8.5 kB/s   | -             | -           | -      | -      | kB       |
| data_sent            | Quantidade total de dados enviados          | 9.1 kB | 904 B/s    | -             | -           | -      | -      | kB       |
| http_reqs            | Número total de requisições HTTP            | 100    | 9.931617/s | -             | -           | -      | -      | contagem |
| iterations           | Número total de iterações realizadas        | 100    | 9.931617/s | -             | -           | -      | -      | contagem |
| http_req_failed      | Percentual de requisições HTTP que falharam | 0.00%  | -          | ✓ 0           | ✗ 100       | -      | -      | %        |
| vus                  | Número de usuários virtuais (VUs)           | 10     | -          | -             | -           | min=10 | max=10 | contagem |
| vus_max              | Número máximo de usuários virtuais (VUs)    | 10     | -          | -             | -           | min=10 | max=10 | contagem |

5.5. **Análise de Dados:** Vamos analisar de perto uma linha especifica, aqui podemos ver que das 100 requests no total 90% demoraram 5.57ms para completar e 95% demoraram 7.12ms sendo que a média nos diz 3.87ms e o mínimo foi de 1.15ms.

```bash
http_req_duration..............: avg=3.87ms   min=1.15ms   med=4.31ms  max=7.68ms  p(90)=5.57ms   p(95)=7.12ms
```

## Customizadno o script de teste

Agora que você aprendeu sobre o processo de executar testes de carga vamos modificar o nosso script de teste para aprender um pouco mais sobre o k6, salve ele com outro nome, `script.js` por exemplo:

```javascript
import { check } from "k6";
import http from "k6/http";

export const options = {
  vus: 10,
  duration: "10s",
  // THREASHOLDS
  //
  // Garantir que menos de 1% das requisições falhem
  // Garantir que 95% das requisições sejam concluídas em menos de 200ms.
  //
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<200"],
  },
};

export default function () {
  const res = http.get("http://host.docker.internal:8080");
  // CHECK
  //
  // Validar se o status da resposta é 200.
  // Validar se o tamanho do body em bytes é 615 bytes.
  //
  check(res, {
    "is status 200": (r) => r.status === 200,
    "body size is 615 bytes": (r) => r.body.length == 615,
  });
}
```

Adicionamos 2 coisas o `thresholds` que é limites para que o teste falhe caso seja extrapolado e o `check` para validar a porcentagem de retornos com sucesso.

Eles podem parecer iguais mas não são, veja quando o limite de um `thresholds` é exedido o teste irá falhar, isso já não acontece com o `check`. É frequentemente útil combinar ambos para obter o melhor dos dois.

### Integrando Nginx + InfluxDB + Grafana e K6

Agora vamos amarrar tudo para ver como a aplicação degrada com gráficos.

Pra isso vamos fazer com que o k6 envie os resultados dos testes para o influxDB que é um banco de dados open-source de séries temporais muito utilizado para monitoramento em tempo real.

Depois vamos coletar esses dados via Grafana e gerar alguns gráficos. Tudo isso vai rodar junto no docker-compose:

- **[docker-compose.yml](./docker-compose.yml)**

Junto com o influxDB e o Grafana eu adicionei um nginx simples para usarmos como alvo dos testes.

Agora precisamos abrir o grafana e configurar o influxDB como fonte de dados, isso bem simples basta ir em:

```
> localhost:3000 > login (use: admin, passworld: admin) >
> menu lateral esquerdo > connections >
> datasource > Add new data source >
> procurar por influxDB > preencher os campos URL: http:influxdb:8086 e Database: k6 >
> salve & teste
```

Pronto, agora vamos criar um novo dasboard com o json que temos aqui no repositorio indo em:

```
> menu lateral esquerdo > Dashboards >
> New > Import > cole o json ou procure o arquivo >
> no último itemK6 selecione o influxDB.
```

Agora vamos rodar nosso container docker que tem o k6 para executar os testes com um comando extra para que ele envie os resultados para o influxDB

```
docker run --rm -i grafana/k6 run -o influxdb=http://influxdb:8086 - <script.js
```

Agora é só abrir o Grafana e acompanhar os resultados

## Conclusão

Nesta aula, você aprendeu:

- Sobre a importância dos testes de carga
- A arquitetura do K6
- Como criar e executar scripts de teste básicos e costumizados.
- Como integrar K6 com Grafana e InfluxDB

Na próxima aula, vamos aprender sobre como executar os principais tipos de testes de carga, começando pelo Smoke Testing
