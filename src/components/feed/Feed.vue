<template>
<div>
    <Carousel />
</div>
</template>
<script>
import Carousel from '../carousel/Carousel.vue';

export default {
  name: 'Feed',
  data() {
    return {

    };
  },
  components: {
    Carousel,
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
