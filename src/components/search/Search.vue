<template>
  <div class="container">
    <div class="search-container" :class="{ 'border-search': showBorder }">
      <div>
        <i class="fas fa-search teste" style=""></i>
      </div>
      <input
        type="text"
        name="Search"
        placeholder="Digite o nome do político..."
        v-model="filtroNome"
      />
      <!--<button type="button">Pesquisar</button>-->
    </div>
    <Table :filtroNome="filtroNome" :size="size" :showBorder="showBorder" />
  </div>
</template>

<script>
import Table from '../table/Table.vue';

export default {
  name: 'Search',
  data() {
    return {
      filtroNome: '',
    };
  },
  components: {
    Table,
  },
  props: ['size', 'showBorder'],
};
</script>

<style lang="scss" src="./styles.scss" scoped />
