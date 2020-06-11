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
      @on-main-slide-click="changeToProfile"
    >
      <slide v-bind:key="slide.id" v-for="(slide, i) in slides" :index="i" class="slide">
        <figure v-if="!slide.addButton">
          <img :src="slide.foto" @error="replaceByDefault" />
          <figcaption
            :class="{ 'changeColor': slide.id === user.idDep || slide.id === user.idSen }"
          >{{ slide.nome }}</figcaption>
        </figure>
        <div v-else>
          <button @click="pushRouter">
            <i class="fas fa-plus"></i>
          </button>
        </div>
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
      changeProfileSelected: 'profile/changeSelected',
    }),
    onAfterSlideChange(index) {
      this.changeSelected(this.slides[index]);
    },
    replaceByDefault(e) {
      e.target.src = img;
    },
    preencherSlides() {
      while (this.slides.length < 5) {
        this.slides.push({
          addButton: true,
        });
      }
    },
    pushRouter() {
      this.$router.push({ name: 'Classificacao' });
    },
    changeToProfile(index) {
      console.log('aaa');
      this.changeProfileSelected(this.slides[index]);
      this.$router.push({ name: 'PerfilPolitico' });
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

      if (this.slides.length < 5) {
        this.preencherSlides();
      } else {
        this.slides.push({ addButton: true });
      }


      this.changeSelected(this.slides[0]);
    } catch (erro) {
      console.log(`Erro:${erro}`);
    }
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped />
