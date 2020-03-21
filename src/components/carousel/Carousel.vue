<template>
    <div>
        <Carousel3d :listData="slides" :key="slides.length" :width="216" :height="288">
            <slide v-bind:key="slide" v-for="(slide, i) in slides" :index="i">
                <figure>
                  <img :src="slide.foto">
                  <figcaption>
                   {{slide.nome}}<br>
                   {{slide.tipo}}<br>
                   {{slide.partido}}<br>
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
  components: {
    Carousel3d,
    Slide,
  },
  async mounted() {
    try {
      const response = await api.get('/politicos?');
      this.slides = response.data;
      console.log(response.data);
    } catch (erro) {
      console.log(`Erro:${erro}`);
    }
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped />
