<template>
  <div class="container" :class="{ 'move': isOpen }">
    <button :class="{ 'show': !mobileView }" @click="showNav">
      <i class="fas fa-bars"></i>
    </button>
    <div class="content">
      <Carousel />
      <div class="select-group">
      <SelectPolitico
        @onChange="handlePolitico"
        :url="'/PoliticoItems/filtrado?size=5&page=1'"
        :text="'Selecione o político para comparar os gastos'"
        :multiple="true"
      />
      </div>
      <GastosChart :politico="getObj" :politicos="politicos"  />
      <div class="donut-graph">
        <img :src="politicoSelected.foto" />
        <h1> {{ politicoSelected.nome }} </h1>
        <GastosDivididos :politico="getObj" />
      </div>
      <div class="donut-graph" :key="politico.id" v-for="politico in politicosComp">
        <img :src="politico.foto" />
        <h1> {{ politico.nome }} </h1>
        <GastosDivididos :politico="politico" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Carousel from '../carousel/Carousel.vue';
import SelectPolitico from '../selectpolitico/SelectPolitico.vue';
import GastosChart from '../gastosChart/GastosChart.vue';
import GastosDivididos from '../gastosDivididos/GastosDivididos.vue';

export default {
  name: 'Statistics',
  data() {
    return {
      mobileView: false,
      isOpen: false,
      obj: {},
      politicos: [],
    };
  },
  components: {
    Carousel,
    GastosChart,
    GastosDivididos,
    SelectPolitico,
  },
  methods: {
    handleView() {
      this.mobileView = window.innerWidth <= 1125;
    },
    showNav() {
      this.isOpen = !this.isOpen;
    },
    handlePolitico(values) {
      this.politicos = values;
    },
  },
  computed: {
    ...mapGetters({
      politicoSelected: 'carousel/politicoSelected',
    }),
    getObj() {
      return this.politicoSelected;
    },
    politicosComp() {
      return this.politicos;
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
