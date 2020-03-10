<template>
  <header>
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
    <img src="../../../assets/initial/mapa.png" />
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
  height: 90vh;
  background: url("../../../assets/initial/wave.svg") no-repeat;
  background-position: bottom;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
}

header .information {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

@media (max-width: 1000px) {
  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  header .information {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
