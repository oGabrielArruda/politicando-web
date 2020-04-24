<template>
  <div class="container" :class="{ 'move': isOpen }">
    <button :class="{ 'show': !mobileView }" @click="showNav">
      <i class="fas fa-bars"></i>
    </button>
    <div>
      <Search :size="8" class="search" />
    </div>
  </div>
</template>
<script>
import Search from '../search/Search.vue';

export default {
  name: 'Classification',
  data() {
    return {
      mobileView: false,
      isOpen: false,
    };
  },
  components: {
    Search,
  },
  methods: {
    handleView() {
      this.mobileView = window.innerWidth <= 1125;
      console.log(this.mobileView);
    },
    showNav() {
      this.isOpen = !this.isOpen;
      console.log(this.isOpen);
    },
  },
  created() {
    this.handleView();
    window.addEventListener('resize', this.handleView);
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped />
