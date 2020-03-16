<template>
    <div>
        <Carousel3d>
            <slide v-bind:key="slide" v-for="(slide, i) in slides" :index="i">
                <img src="https://placehold.it/360x270">
            </slide>
        </Carousel3d>
    </div>
</template>
<script>
import { Carousel3d, Slide } from 'vue-carousel-3d';

export default {
  name: 'Carousel',
  data() {
    return {
      slides: [1, 2, 3, 4, 5],
    };
  },
  components: {
    Carousel3d,
    Slide,
  },
};
</script>
<style>

</style>
