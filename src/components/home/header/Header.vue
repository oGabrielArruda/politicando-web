<template>
  <header>
    <div class="container">
      <div class="information">
        <div class="title">
          <h2>Olá!</h2>
          <h1>Que tal supervisionar</h1>
          <h4>quem você votou?</h4>
        </div>
        <div class="list">
          <div class="item">
            <img src="../../../assets/initial/propostas.png" alt="Propostas" />
            <div>
              <h3>O que está sendo proposto?</h3>
              <p>Veja o que seus políticos escolhidos estão fazendo. Propostas, discursos e votos estarão disponíveis e claros.</p>
            </div>
          </div>
          <div class="item">
            <img src="../../../assets/initial/estatisticas.png" alt="Estatisticas" />
            <div>
              <h3>O que as estatísticas dizem?</h3>
              <p>Visualize todos os dados dos políticos em tempo real. Tais como gastos, faltas, processos e dados do partido.</p>
            </div>
          </div>
          <div class="item">
            <img src="../../../assets/initial/noticias.png" alt="Noticias" />
            <div>
              <h3>O que a mídia diz?</h3>
              <p>Tenha acesso a todas as notícias referentes aos políticos.</p>
            </div>
          </div>
        </div>
      </div>
      <img src="../../../assets/initial/map-lupa2.png" />
    </div>
    <!--<svg
      width="1440"
      height="426"
      viewBox="0 0 1440 426"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1440 128L1392 106.7C1344 85 1248 43 1152 74.7C1056 107 960 213 864 234.7C768 256 672 192 576 165.3C480 139 384 149 288 176C192 203 96 245 48 266.7L0 288V320H48C96 320 192 320 288 320C384 320 480 320 576 320C672 320 768 320 864 320C960 320 1056 320 1152 320C1248 320 1344 320 1392 320H1440V128Z"
        fill="#13B423"
        fill-opacity="0.71"
      />
      <path
        d="M0 383.6L48 390.656C96 397.844 192 411.756 288 401.256C384 390.556 480 355.444 576 348.256C672 341.2 768 362.4 864 371.244C960 379.956 1056 376.644 1152 367.7C1248 358.756 1344 344.844 1392 337.656L1440 330.6V320H1392C1344 320 1248 320 1152 320C1056 320 960 320 864 320C768 320 672 320 576 320C480 320 384 320 288 320C192 320 96 320 48 320H0V383.6Z"
        fill="#13B423"
        fill-opacity="0.71"
      />
    </svg>-->
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  }
};
</script>

<style>
header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 150px;
  margin-top: 50px;
}

header > svg {
  display: block;
  margin-top: -250px;
  z-index: -999999;
}

header .container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

header .container > img {
  height: 55%;
  width: 35%;
}

header .information .title {
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
}

header .information .title h2 {
  font-size: 50px;
  font-weight: bold;
  color: #3e3f4b;
}

header .information .title h1 {
  font-size: 60px;
  font-weight: bold;
  color: #444552;
}

header .information .title h4 {
  font-size: 40px;
  font-weight: bold;
  color: rgb(143, 143, 143);
}

header .information .list {
  display: flex;
  flex-direction: column;
  width: 75%;
}

header .information .list .item {
  display: flex;
  flex-direction: row;
  margin-top: 15px;
}

header .information .list .item > div {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

header .information .list .item > div h3 {
  color: #3e3f4b;
  margin-bottom: 3px;
}

header .information .list .item > div p {
  color: rgb(107, 107, 107);
  font-weight: bold;
}
</style>
