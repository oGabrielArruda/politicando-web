<template>
  <div class="container">
    <div class="content">
      <Carousel />
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
    return {};
  },
  components: {
    Carousel,
    ExtraInfo,
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
