<template>
  <div class="container" :class="{ 'move': isOpen }">
    <button :class="{ 'show': !mobileView }" @click="showNav">
      <i class="fas fa-bars"></i>
    </button>
    <div class="content">
      <Carousel />
      <h1>asdsada</h1>
      <h1>asdsada</h1>
      <h1>asdsada</h1>
      <h1>asdsada</h1>
      <h1>asdsada</h1>
      <h1>asdsada</h1>
      <h1>asdsada</h1>
      <h1>asdsada</h1>
      <h1>asdsada</h1>
      <h1>asdsada</h1>
      <h1>asdsada</h1>
      <h1>asdsada</h1>
      <h1>12</h1>
      <h1>12</h1>
      <h1>12</h1>
      <h1>12</h1>
      <h1>12</h1>
      <h1>12</h1>
      <h1>12</h1>
      <h1>12</h1>
      <h1>12</h1>
      <h1>12</h1>
    </div>
    <ExtraInfo />
  </div>
</template>
<script>
import Carousel from '../carousel/Carousel.vue';
import ExtraInfo from '../extraInfo/ExtraInfo.vue';

export default {
  name: 'Feed',
  data() {
    return {
      mobileView: false,
      isOpen: false,
    };
  },
  components: {
    Carousel,
    ExtraInfo,
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
