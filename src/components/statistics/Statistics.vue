<template>
  <div class="container" :class="{ 'move': isOpen }">
    <button :class="{ 'show': !mobileView }" @click="showNav">
      <i class="fas fa-bars"></i>
    </button>
    <div class="content">
      <Carousel />
      <GastosChart :politico="5322" />
    </div>
  </div>
</template>
<script>
import Carousel from '../carousel/Carousel.vue';
import GastosChart from '../gastosChart/GastosChart.vue';

export default {
  name: 'Statistics',
  data() {
    return {
      mobileView: false,
      isOpen: false,
    };
  },
  components: {
    Carousel,
    GastosChart,
  },
  methods: {
    handleView() {
      this.mobileView = window.innerWidth <= 1125;
      console.log(this.mobileView);
    },
    showNav() {
      this.isOpen = !this.isOpen;
    },
  },
  created() {
    this.handleView();
    window.addEventListener('resize', this.handleView);
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
