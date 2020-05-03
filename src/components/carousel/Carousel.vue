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
          <img :src="slide.foto" @error="replaceByDefault" />
          <figcaption>
                   {{slide.nome}}<br>
          </figcaption>
        </figure>
      </slide>
    </Carousel3d>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { Carousel3d, Slide } from 'vue-carousel-3d';
import api from '../../config/api';

import img from '../../assets/carousel/no-photo.jpg';

export default {
  name: 'Carousel',
  data() {
    return {
      slides: [],
    };
  },
  methods: {
    ...mapActions({
      changeSelected: 'carousel/changeSelected',
    }),
    onAfterSlideChange(index) {
      this.changeSelected(this.slides[index]);
    },
    replaceByDefault(e) {
      e.target.src = img;
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
      this.changeSelected(this.slides[0]);
    } catch (erro) {
      console.log(`Erro:${erro}`);
    }
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped />
