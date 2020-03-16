<template>
  <div class="container">
    <div class="search-container">
      <input type="text" name="Search" placeholder="Digite o nome do político..." />
      <button type="button">Pesquisar</button>
    </div>
    <Table />
  </div>
</template>

<script>
import Table from '../table/Table.vue';

export default {
  name: 'Search',
  data() {
    return {};
  },
  components: {
    Table,
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
