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

<style lang="scss" src="./styles.scss" scoped />
