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
          <img v-if="slide !== ''" :src="slide.foto" @error="replaceByDefault" />
          <img v-else src="../../assets/carousel/no-photo-follow.jpg" />
          <figcaption v-if="slide !== '' && slide.id !== user.idDep && slide.id !== user.idSen"
          class="figPolitico-carousel">
                   {{slide.nome}}<br>
          </figcaption>
          <figcaption v-else-if="slide !== ''" class="figMeuPolitico-carousel">
            {{ slide.nome }} <br>
          </figcaption>
        </figure>
      </slide>
    </Carousel3d>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
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
    preencherSlides() {
      while (this.slides.length < 3) {
        this.slides.push('');
      }
    },
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
  },
  components: {
    Carousel3d,
    Slide,
  },
  async mounted() {
    try {
      const politicosAsync = api.get(`/Users/following/${this.user.id}`);
      const politicos = await politicosAsync;
      this.slides = politicos.data.politicos;

      this.preencherSlides();

      this.changeSelected(this.slides[0]);
    } catch (erro) {
      console.log(`Erro:${erro}`);
    }
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped />
