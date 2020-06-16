<template>
  <div class="container" :class="{ 'expand': closeSidebarComputer }">
    <Search :size="8" :showBorder="false" class="search" />
    <Table :size="8" :showBorder="false" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Search from '../search/Search.vue';
import Table from '../table/Table.vue';

export default {
  name: 'Classification',
  data() {
    return { };
  },
  components: {
    Search,
    Table,
  },
  methods: {
    ...mapActions({
      changeSelectedSide: 'navigation/changeSelectedSide',
      changeNamesNav: 'navigation/changeNamesNav',
    }),
  },
  computed: {
    ...mapGetters({
      closeSidebarComputer: 'navigation/closeSidebarComputer',
    }),
  },
  beforeMount() {
    this.changeSelectedSide(2);
    this.changeNamesNav([]);
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped />
