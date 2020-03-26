<template>
  <main>
    <h1>Qual o melhor político de acordo com o seu filtro?</h1>
    <Search :size="10"/>
  </main>
</template>

<script>
import Search from '../../../components/search/Search.vue';

export default {
  name: 'Classification',
  data() {
    return {};
  },
  components: {
    Search,
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
