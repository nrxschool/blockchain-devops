Aqui está a versão expandida para a Aula 6.2 sobre o padrão ERC20, conforme solicitado:

---

# Aula 6.2: Padrão ERC20

## Introdução

Bem-vindos à nossa aula sobre o **Padrão ERC-20**, um dos pilares fundamentais do ecossistema Ethereum. O ERC-20 define um conjunto de regras que um token na blockchain Ethereum deve seguir para ser compatível com outros contratos e serviços dentro da rede.

Nesta aula, vamos entender o que são **Ethereum Improvement Proposals (EIPs)**, focar na implementação de um **token ERC-20** com uma vulnerabilidade intencional de controle de acesso (que corrigiremos mais tarde), e escrever testes automatizados para garantir que nosso contrato esteja funcionando corretamente. No final da aula, faremos o deploy local desse token, configuraremos o Metamask para interagir com ele, e realizaremos transferências.

## O que são EIPs

Os **Ethereum Improvement Proposals (EIPs)** são documentos que especificam novos recursos ou processos para a Ethereum. Eles são utilizados para sugerir mudanças técnicas no protocolo, melhorias na rede ou introduzir novos padrões para contratos e tokens.

Um dos EIPs mais famosos é o **EIP-20**, que define o padrão de tokens **ERC-20**. Esse padrão garante que todos os tokens ERC-20 tenham um conjunto básico de funções e eventos, como `transfer`, `approve`, `transferFrom` e `totalSupply`, permitindo que esses tokens sejam facilmente integrados a carteiras, exchanges e outros contratos inteligentes.

- **ERC-20**: O ERC-20 é o padrão mais utilizado para tokens fungíveis. Esses tokens são intercambiáveis (um token é igual ao outro) e podem representar qualquer ativo digital, como moedas, pontos de recompensa ou ações.

---

## Implementando um ERC-20

Agora que entendemos o que são EIPs e o papel do ERC-20, vamos implementar um contrato simples que segue esse padrão.

1. **Criando o token ERC-20**:

   - Definiremos as funções básicas exigidas pelo padrão ERC-20, como `totalSupply`, `balanceOf`, `transfer`, `approve` e `transferFrom`.
   - Utilizaremos a biblioteca **OpenZeppelin**, que fornece implementações seguras e auditadas de contratos ERC-20, para evitar reinventar a roda.

2. **Função `mint` com bug de Access Control**:
   - Vamos implementar uma função `mint` que permite a criação de novos tokens.
   - No entanto, nesta implementação inicial, vamos deliberadamente deixar uma vulnerabilidade: **qualquer pessoa poderá chamar a função `mint`** e criar tokens, o que é um problema grave de controle de acesso. Esse bug será corrigido mais tarde na aula, mas serve como uma lição importante sobre a segurança em contratos inteligentes.

---

## Escrevendo testes automatizados para ERC-20

Testes automatizados são essenciais no desenvolvimento de contratos inteligentes, já que eles ajudam a detectar erros e vulnerabilidades antes de realizar o deploy em uma rede pública. Vamos configurar um ambiente de testes para nosso contrato ERC-20 usando o **Hardhat** ou o **Foundry**.

1. **Escrevendo testes para funções básicas**:

   - Testar a funcionalidade do `transfer` entre contas.
   - Verificar o comportamento de `approve` e `transferFrom`.
   - Certificar-se de que o `totalSupply` aumenta corretamente quando a função `mint` é chamada.

2. **Testando a vulnerabilidade de controle de acesso**:
   - Um dos testes mais importantes será verificar quem pode chamar a função `mint`.
   - O teste deverá falhar, pois nossa implementação inicial deixa essa função aberta para qualquer usuário, o que leva à vulnerabilidade.

---

## Corrigindo a vulnerabilidade de Access Control

Agora que nossos testes mostraram a vulnerabilidade de controle de acesso, vamos corrigi-la.

1. **Introduzindo controle de acesso**:

   - Vamos modificar a função `mint` para que apenas o **dono do contrato** ou um endereço autorizado possa criar novos tokens.
   - Utilizaremos o modificador **`onlyOwner`** da biblioteca OpenZeppelin, que permite restringir o acesso de certas funções para o dono do contrato.

2. **Reescrevendo os testes**:
   - Após a correção, reescreveremos nossos testes para garantir que a função `mint` só possa ser chamada por usuários autorizados.
   - O teste agora deverá passar, indicando que a vulnerabilidade foi corrigida.

---

## Deploy local, Configuração Metamask e Transferências

Com o contrato corrigido e testado, podemos realizar o **deploy** localmente e interagir com o token usando uma carteira como o **Metamask**.

1. **Deploy local**:

   - Usaremos ferramentas como Hardhat ou Foundry para realizar o deploy em uma blockchain local ou testnet, como **Goerli** ou **Sepolia**.
   - Ao realizar o deploy, você verá o endereço do contrato na blockchain, e poderá começar a interagir com ele.

2. **Configurando o Metamask**:

   - Adicionaremos o token criado no Metamask para que possamos ver os saldos e realizar transferências.
   - No Metamask, vamos adicionar o endereço do contrato e configurar as propriedades do token, como nome e símbolo.

3. **Realizando transferências**:
   - Com o contrato ativo e o Metamask configurado, faremos transferências entre diferentes contas para demonstrar a funcionalidade do token ERC-20.
   - Vamos testar as transferências diretamente pela interface do Metamask e observar as transações ocorrendo na rede.

---

## Recapitulação

Nesta aula, exploramos:

- O que são **EIPs** e como o **EIP-20** define o padrão ERC-20 para tokens fungíveis.
- Implementamos um **contrato ERC-20 básico** com uma função `mint` vulnerável a ataques de controle de acesso.
- Escrevemos **testes automatizados** para garantir o funcionamento correto do token e detectamos a vulnerabilidade.
- Corrigimos a vulnerabilidade introduzindo um controle de acesso adequado.
- Fizemos o **deploy do contrato** localmente e configuramos o **Metamask** para interagir com o token.

---

## Conclusão

O **padrão ERC-20** é amplamente utilizado e tem uma grande importância no ecossistema Ethereum. Compreender sua implementação e os possíveis pontos de vulnerabilidade é essencial para garantir que seus tokens funcionem de forma segura e eficiente. Os tokens ERC-20 estão no coração de muitos projetos DeFi e são a base para muitos tokens no mercado hoje.

---

## Lição de casa

1. **Implementar um token ERC-20** usando a biblioteca OpenZeppelin com uma função `mint` segura.
2. **Escrever testes automatizados** para todas as funções do token, incluindo a verificação de controle de acesso.
3. Realizar o **deploy local** do contrato e testar a funcionalidade de transferências com o Metamask.
4. Opcional: Fazer o deploy do seu token em uma **testnet pública** como Goerli ou Sepolia e compartilhar o endereço com colegas para testar.

---

## Próxima Aula

Na próxima aula, vamos continuar estudando sobre segurança e entender como realizar e corrigir um ataque de `Reentrancia`.
