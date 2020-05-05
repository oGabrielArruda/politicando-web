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
      />
      <SelectPolitico
        @onChange="handlePolitico"
        :url="'/PoliticoItems/filtrado?size=5&page=1'"
        :text="'Selecione o político para comparar os gastos'"
      />
      <SelectPolitico
        @onChange="handlePolitico"
        :url="'/PoliticoItems/filtrado?size=5&page=1'"
        :text="'Selecione o político para comparar os gastos'"
      />
      </div>
      <GastosChart :politico="getObj" :politicos="politicos" :inserirMais="true" />
      <GastosDivididos :politico="getObj"/>
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
      if (values.value === null) { // se removeu o político
        this.removePolitico(values.lastValue);
      } else { // se adicionou o político
        this.substituiPolitico(values.lastValue, values.value);
      }
    },
    substituiPolitico(antigoP, novoP) {
      if (antigoP === null) {
        this.addPolitico(novoP);
      } else {
        this.politicos = this.politicos.map((t) => {
          if (t.id !== antigoP.id) { return t; }
          return novoP;
        });
      }
    },
    addPolitico(politico) {
      this.politicos.push(politico);
    },
    removePolitico(politico) {
      if (politico === null) { return; }
      this.politicos = this.politicos.filter((t) => t.id !== politico.id);
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
