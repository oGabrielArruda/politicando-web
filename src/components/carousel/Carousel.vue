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
          <figcaption v-if="slide !== ''">
                   {{slide.nome}}<br>
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
        console.log(this.slides);
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
      const senadorAsync = api.get(`/PoliticoItems/senadores/${this.user.idSen}`);
      const deputadoAsync = api.get(`/PoliticoItems/deputados/${this.user.idDep}`);
      const outrosPoliticosAsync = api.get('/Users/following');

      const senador = await senadorAsync;
      this.slides.push(senador.data);
      const deputado = await deputadoAsync;
      this.slides.push(deputado.data);

      const outrosPoliticos = await outrosPoliticosAsync;
      if (outrosPoliticos.data.seguindo > 2) {
        this.slides = this.slides.concat(outrosPoliticos.data.politicos);
      }

      this.preencherSlides();

      this.changeSelected(this.slides[0]);
    } catch (erro) {
      console.log(`Erro:${erro}`);
    }
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped />
