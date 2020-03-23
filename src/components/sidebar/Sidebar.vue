<template>
  <nav>
    <div class="content">
      <div class="profile">
        <img src="https://avatars2.githubusercontent.com/u/47468017?s=400&u=55cae324327ac3651093aace03e997ac44f2c9f5&v=4" alt="User" />
        <div>
          <h1>Pedro Nunes</h1>
          <button type="button">Ver perfil</button>
        </div>
      </div>
      <div class="division"></div>
      <div class="items">
        <button type="button" class="selection">
          <img src="../../assets/sidebar/feed.svg" alt="Feed" />
          <p>Feed de Notícias</p>
        </button>
        <button type="button">
          <img src="../../assets/sidebar/chart.svg" alt="Chart" />
          <p>Estatísticas</p>
        </button>
        <button type="button" v-on:click="pushClassificacao">
          <img src="../../assets/sidebar/classification.svg" alt="Classification" />
          <p>Classificação</p>
        </button>
      </div>
    </div>
    <button type="button">
      <i class="fas fa-sign-out-alt"></i>
    </button>
  </nav>
</template>

<script>
export default {
  name: 'Sidebar',
  components: {},
  data() {},
  methods: {
    pushClassificacao() {
      this.$router.push({ name: 'Classificacao' });
    },
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
