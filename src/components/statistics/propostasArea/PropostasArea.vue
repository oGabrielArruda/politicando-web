<template>
    <div>
      <div>
        <select v-model="anoEscolhido">
         <option value=0 selected> Todos os Anos </option>
         <option :key="ano" v-for="ano in anos"> {{ ano }} </option>
       </select>
       <PropostasPieChart :politico="politicoMain" :ano="anoEscolhido" />
      </div>
        <div :key="politico.id" v-for="politico in politicosComp">
            <PropostasPieChart :politico="politico" :ano="anoEscolhido" />
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
