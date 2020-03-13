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
          <img src="../../assets/initial/propostas.png" alt="Propostas" />
          <div>
            <h3>O que está sendo proposto?</h3>
            <p>
              Veja o que seus políticos escolhidos estão fazendo.
              Propostas, discursos e votos estarão disponíveis e claros.
            </p>
          </div>
        </div>
        <div class="item">
          <img src="../../assets/initial/estatisticas.png" alt="Estatisticas" />
          <div>
            <h3>O que as estatísticas dizem?</h3>
            <p>
              Visualize todos os dados dos políticos em tempo real.
              Tais como gastos, faltas, processos e dados do partido.
            </p>
          </div>
        </div>
        <div class="item">
          <img src="../../assets/initial/noticias.png" alt="Noticias" />
          <div>
            <h3>O que a mídia diz?</h3>
            <p>Tenha acesso a todas as notícias referentes aos políticos.</p>
          </div>
        </div>
      </div>
    </div>
    <img src="../../assets/initial/binoculos.png" />
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {};
  },
};
</script>

<style lang="scss">
header {
  height: 90vh;
  background: url("../../assets/initial/wave.svg") no-repeat;
  background-position: bottom;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  .information {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .title {
      display: flex;
      flex-direction: column;
      margin-bottom: 40px;

      h2 {
        font-size: 50px;
        font-weight: bold;
        color: #3e3f4b;
      }

      h1 {
        font-size: 60px;
        font-weight: bold;
        color: #444552;
      }

      h4 {
        font-size: 40px;
        font-weight: bold;
        color: rgb(255, 255, 255);
      }
    }

    .list {
      display: flex;
      flex-direction: column;
      width: 75%;

      .item {
        display: flex;
        flex-direction: row;
        margin-top: 15px;

        & > div {
          display: flex;
          flex-direction: column;
          margin-left: 10px;

          & > h3 {
            color: #3e3f4b;
            font-weight: bold;
            margin-bottom: 3px;
          }

          & > p {
            color: rgb(255, 255, 255);
            font-weight: bold;
          }
        }
      }
    }
  }
}

@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}
@mixin for-tablet-portrait-up {
  @media (min-width: 600px) {
    @content;
  }
}
@mixin for-tablet-landscape-up {
  @media (min-width: 900px) {
    @content;
  }
}
@mixin for-desktop-up {
  @media (min-width: 1200px) {
    @content;
  }
}
@mixin for-big-desktop-up {
  @media (min-width: 1800px) {
    @content;
  }
}
</style>
