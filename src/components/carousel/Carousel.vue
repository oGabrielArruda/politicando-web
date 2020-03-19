<template>
    <div>
        <Carousel3d>
            <slide v-bind:key="slide" v-for="(slide, i) in slides" :index="i">
                <figure>
                  <img :src="slide.img">
                  <figcaption>
                   {{slide.nome}}<br>
                   {{slide.partido}}
                  </figcaption>
                </figure>
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
      slides: [{
        img: 'https://www.camara.leg.br/internet/deputado/bandep/160976.jpgmaior.jpg',
        nome: 'Tiririca',
        partido: 'PST',
      },
      {
        img: 'https://pbs.twimg.com/profile_images/1080956386937372675/kjGyt06n_400x400.jpg',
        nome: 'Jairzinho',
        partido: 'PSL',
      },
      {
        img: 'https://ogimg.infoglobo.com.br/in/22881633-553-0aa/FT1086A/652/WhatsApp-Image-2018-07-12-at-22.02.04.jpeg.jpg',
        nome: 'LULA',
        partido: 'PT',
      }],
    };
  },
  components: {
    Carousel3d,
    Slide,
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped />
