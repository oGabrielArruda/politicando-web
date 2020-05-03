<template>
  <div class="container" :class="{ 'move': isOpen }">
    <button :class="{ 'show': !mobileView }" @click="showNav">
      <i class="fas fa-bars"></i>
    </button>
    <div class="content">
      <Carousel />
      <GastosChart :politico="getObj" :inserirMais="true" />
      <GastosDivididos :politico="getObj"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Carousel from '../carousel/Carousel.vue';
import GastosChart from '../gastosChart/GastosChart.vue';
import GastosDivididos from '../gastosDivididos/GastosDivididos.vue';

export default {
  name: 'Statistics',
  data() {
    return {
      mobileView: false,
      isOpen: false,
      obj: {},
    };
  },
  components: {
    Carousel,
    GastosChart,
    GastosDivididos,
  },
  methods: {
    handleView() {
      this.mobileView = window.innerWidth <= 1125;
    },
    showNav() {
      this.isOpen = !this.isOpen;
    },
  },
  computed: {
    ...mapGetters({
      politicoSelected: 'carousel/politicoSelected',
    }),
    getObj() {
      return this.politicoSelected;
    },
  },
  /* watch: {
    politicoSelected() {
      this.obj = this.politicoSelected;
    },
  }, */
  created() {
    this.handleView();
    window.addEventListener('resize', this.handleView);
    // console.log(this.$store.state.politicoCarrossel);
  },
  /* mounted() {
    this.obj = this.politicoSelected;
    console.log(this.obj);
  }, */
};
</script>

<style lang="scss" src="./styles.scss" scoped />
