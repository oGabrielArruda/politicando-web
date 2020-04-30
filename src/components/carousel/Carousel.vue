<template>
  <div class="container-all">
    <Carousel3d
      :controls-visible="true"
      :listData="slides"
      :key="slides.length"
      :perspective="0"
      :space="200"
      :width="131.91"
      :height="139"
      @after-slide-change="onAfterSlideChange"
    >
      <slide v-bind:key="slide.id" v-for="(slide, i) in slides" :index="i">
        <figure>
          <img :src="slide.foto" />
          <figcaption>
                   {{slide.nome}}<br>
          </figcaption>
        </figure>
      </slide>
    </Carousel3d>
  </div>
</template>
<script>
import { Carousel3d, Slide } from 'vue-carousel-3d';
import api from '../../config/api';

export default {
  name: 'Carousel',
  data() {
    return {
      slides: [],
    };
  },
  methods: {
    onAfterSlideChange(index) {
      this.$store.dispatch('changePoliticoCarrossel', this.slides[index]);
    },
  },
  components: {
    Carousel3d,
    Slide,
  },
  async mounted() {
    try {
      const response = await api.get('/PoliticoItems/filtrado?size=15&page=1&tipo=2');
      this.slides = response.data;
      this.$store.dispatch('changePoliticoCarrossel', this.slides[0]);
    } catch (erro) {
      console.log(`Erro:${erro}`);
    }
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped />
