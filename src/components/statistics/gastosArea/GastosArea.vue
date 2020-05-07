<template>
  <div>
    <div>
    <GastosChart :politico="getObj" :politicos="politicosComp"  />
    </div>
    <div class="donut-graph">
      <div class="text-politico-donut">
        <img :src="politicoSelected.foto" />
        <h1> {{ politicoSelected.nome }} </h1>
      </div>
      <GastosDivididos :politico="getObj" />
    </div>

    <div class="donut-sequence">
    <div class="donut-graph" :key="politico.id" v-for="politico in politicosComp">
      <div class="text-politico-donut">
        <img :src="politico.foto" />
        <h1> {{ politico.nome }} </h1>
      </div>
        <GastosDivididos :politico="politico" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import GastosChart from '../../gastosChart/GastosChart.vue';
import GastosDivididos from '../../gastosDivididos/GastosDivididos.vue';

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
    GastosChart,
    GastosDivididos,
  },
  props: ['politicos'],
  computed: {
    ...mapGetters({
      politicoSelected: 'carousel/politicoSelected',
      politicosSelects: 'carousel/politicosSelects',
    }),
    getObj() {
      return this.politicoSelected;
    },
    politicosComp() {
      return this.politicosSelects;
    },
  },
  methods: {
    handleView() {
      this.mobileView = window.innerWidth <= 1125;
    },
  },
  created() {
    this.handleView();
    window.addEventListener('resize', this.handleView);
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped />
