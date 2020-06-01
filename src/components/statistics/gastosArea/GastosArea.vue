<template>
  <div class="main-content">
    <GastosChart :politico="getObj" :politicos="politicosComp" />
    <GastosTable :politicos="unionArraysPoliticos" />
    <div class="main-graph">
      <div class="select-ano-tipos">
        <select v-model="anoTipoGastos">
          <option selected value=0> Todos os anos </option>
          <option :key="ano" v-for="ano in anos"> {{ ano }} </option>
        </select>
      </div>
      <div class="text-politico-donut">
        <img :src="politicoSelected.foto" />
        <h1>{{ politicoSelected.nome }}</h1>
      </div>
      <GastosDivididos :politico="getObj" :ano="anoTipoGastosComp" />
    </div>
    <div class="donut-sequence">
      <div :key="politico.id" v-for="politico in politicosComp">
        <div class="text-politico-donut">
          <img :src="politico.foto" />
          <h1>{{ politico.nome }}</h1>
        </div>
        <GastosDivididos :politico="politico" :ano="anoTipoGastosComp" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import GastosChart from '../../gastosChart/GastosChart.vue';
import GastosDivididos from '../../gastosDivididos/GastosDivididos.vue';
import GastosTable from '../../gastosTable/GastosTable.vue';

export default {
  name: 'GastosArea',
  data() {
    return {
      obj: {},
      anos: [2019, 2020],
      anoTipoGastos: 0,
    };
  },
  components: {
    GastosChart,
    GastosDivididos,
    GastosTable,
  },
  props: ['politicos'],
  methods: {
    ...mapActions({
      changeSelectedNav: 'navigation/changeSelectedNav',
    }),
  },
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
    unionArraysPoliticos() {
      let arr = [];
      arr.push(this.politicoSelected);

      if (this.politicosSelects) {
        arr = arr.concat(this.politicosSelects);
      }

      return arr;
    },
    anoTipoGastosComp() {
      return this.anoTipoGastos;
    },
  },
  beforeMount() {
    this.changeSelectedNav(0);
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped />
