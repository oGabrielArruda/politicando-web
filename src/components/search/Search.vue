<template>
  <div class="search-container" :class="{ 'border-search': showBorder }">
    <div>
      <i class="fas fa-search teste" style=""></i>
    </div>
    <input
      type="text"
      name="Search"
      placeholder="Digite o nome do político..."
      v-model="nameFilter"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Search',
  props: ['size', 'showBorder'],
  data() {
    return {
      nameFilter: '',
    };
  },
  methods: {
    ...mapActions({
      changeNameFilter: 'classification/changeNameFilter',
    }),
  },
  watch: {
    nameFilter() {
      this.changeNameFilter(this.nameFilter);
    },
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
