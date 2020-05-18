<template>
    <div>
        <div :key="politico" v-for="politico in politicos">
            <!-- <PropostasPieChart :politico="politico"/> -->
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import PropostasPieChart from '../../propostasPieChart/PropostasPieChart.vue';

export default {
  name: 'PropostasArea',
  components: {
    // PropostasPieChart,
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
    politicos() {
      let arr = [];
      arr.push(this.politicoSelected);
      if (this.politicosSelects) {
        arr = arr.concat(this.politicosSelects);
      }
      return arr;
    },
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
