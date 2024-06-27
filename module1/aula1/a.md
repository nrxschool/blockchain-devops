---
marp: true
style: |
  section {
    background-color: #fdf6e3; /* Cor de fundo do Gaia */
    color: #002b36; /* Cor das letras do Gaia */
    font-size: 25px; /* Tamanho da fonte */
    position: relative;
    padding-top: 0px; /* Adiciona espaçamento ao topo do slide */
  }
  .wallet img {
    position: absolute;
    bottom: -50px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    z-index: -1;
    background-color: #fdf6e3; /* Cor de fundo do slide */
    width: 100%; /* Faz a imagem ocupar toda a largura */
  }
---

# Slide 1

- Definição: O que são wallets.
- Tipos de Wallets: Hardware, software, paper, etc.
- Com funcionam:

  1. Criar Seed
  2. Transformar Seed em PrivateKey
  3. Calcular PublicKey pela PrivateKey
  4. Resumir a PublicKey em um Address (opcional)

<div class="wallet">
  <img
    src="./wallet.png"
    alt="bottom-image"
  >
</div>
