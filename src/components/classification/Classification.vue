<template>
  <div class="container" :class="{ 'expand': closeSidebarComputer }">
    <!--<button :class="{ 'show': !mobileView }" @click="showNav">
      <i class="fas fa-bars"></i>
    </button>-->
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
    return {
      // mobileView: false,
      // isOpen: false,
    };
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
    /* handleView() {
      this.mobileView = window.innerWidth <= 1125;
    }, */
    /* showNav() {
      this.isOpen = !this.isOpen;
      console.log(this.isOpen);
    }, */
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
  created() {
    // this.handleView();
    // window.addEventListener('resize', this.handleView);
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped />
