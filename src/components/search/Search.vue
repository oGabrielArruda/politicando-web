<template>
  <div class="container">
    <div class="search-container">
      <input
        type="text"
        name="Search"
        placeholder="Digite o nome do político..."
        v-on:input="changeNome($event)"
      />
      <button type="button">Pesquisar</button>
    </div>
    <Table :filtroNome="filtroNome" :size="size" />
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
  props: ['size'],
  methods: {
    changeNome(event) {
      this.filtroNome = `&nome=${event.target.value.replace(' ', '%20')}`;
      console.log(this.filtroNome);
    },
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
