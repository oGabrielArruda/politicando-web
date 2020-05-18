<template>
    <div>
      <div>
       <PropostasPieChart :politico="politicoMain"/>
      </div>
        <div :key="politico.id" v-for="politico in politicosComp">
            <PropostasPieChart :politico="politico"/>
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
