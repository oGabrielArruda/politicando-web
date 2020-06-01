<template>
    <div class="graficos">
        <div class="pie-chart">
            <PresencasChart
            :politicos="politicos"/>
        </div>
        <div class="bar-chart">
            <PresencasBarGraph :politicos="politicos" />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PresencasChart from '../../presencasChart/PresencasChart.vue';
import PresencasBarGraph from '../../presencasBarGraph/PresencasBarGraph.vue';

export default {
  name: 'PresencasArea',
  components: {
    PresencasChart,
    PresencasBarGraph,
  },
  methods: {
    ...mapActions({
      changeSelectedNav: 'navigation/changeSelectedNav',
    }),
  },
  computed: {
    ...mapGetters({
      politicoSelected: 'carousel/politicoSelected',
      politicosSelecteds: 'carousel/politicosSelects',
    }),
    politicos() {
      let arr = [];
      arr.push(this.politicoSelected);
      if (this.politicosSelecteds) { arr = arr.concat(this.politicosSelecteds); }
      return arr;
    },
  },
  beforeMount() {
    this.changeSelectedNav(1);
  },
};
</script>

<style lang="scss" src="./style.scss" />
