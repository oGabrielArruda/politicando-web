<template>
    <div>
        <PresencasChart
        :politicos="politicos"/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PresencasChart from '../../presencasChart/PresencasChart.vue';

export default {
  name: 'PresencasArea',
  components: {
    PresencasChart,
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
};
</script>

<style>

</style>
