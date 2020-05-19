<template>
    <div class="main-content">
      <div class="main-graph">
        <div class="select-ano-tipo">
          <select v-model="anoEscolhido">
            <option value=0 selected> Todos os Anos </option>
            <option :key="ano" v-for="ano in anos"> {{ ano }} </option>
          </select>
        </div>
        <div>
          <div class="politico-main-info">
            <img :src="politicoMain.foto" />
            <h1>{{ politicoMain.nome }}</h1>
          </div>
          <PropostasPieChart :politico="politicoMain" :ano="anoEscolhido" />
        </div>
      </div>

      <div class="prop-sequence">
        <div :key="politico.id" v-for="politico in politicosComp">
          <div class="politico-info-pie">
            <img :src="politico.foto" />
            <h1>{{ politico.nome }}</h1>
          </div>
          <PropostasPieChart :politico="politico" :ano="anoEscolhido" :subGraph="true" />
        </div>
      </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PropostasPieChart from '../../propostasPieChart/PropostasPieChart.vue';

export default {
  name: 'PropostasArea',
  components: {
    PropostasPieChart,
  },
  data() {
    return {
      anos: [2019, 2020],
      anoEscolhido: 0,
    };
  },
  computed: {
    ...mapGetters({
      politicoSelected: 'carousel/politicoSelected',
      politicosSelects: 'carousel/politicosSelects',
    }),
    politicoMain() {
      return this.politicoSelected;
    },
    politicosComp() {
      return this.politicosSelects;
    },
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
