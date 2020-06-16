<template>
  <div class="container">
    <div class="content" :class="{ 'expand': closeSidebarComputer }">
      <Carousel />
      <div class="select-group">
        <SelectPolitico
        @onChange="handlePolitico"
        :url="'/PoliticoItems/filtrado?'"
        :text="'Selecione o político para comparar os gastos'"
        :multiple="true"
        />
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Carousel from '../carousel/Carousel.vue';
import SelectPolitico from '../selectpolitico/SelectPolitico.vue';

export default {
  data() {
    return {
      politicos: [],
    };
  },
  components: {
    Carousel,
    SelectPolitico,
  },
  methods: {
    ...mapActions({
      changeSelects: 'carousel/changeSelects',
      changeSelectedSide: 'navigation/changeSelectedSide',
      changeNamesNav: 'navigation/changeNamesNav',
    }),
    updateRouter(routeName) {
      this.$router.push({ name: routeName });
    },
    handlePolitico(values) {
      this.changeSelects(values);
    },
  },
  computed: {
    ...mapGetters({
      closeSidebarComputer: 'navigation/closeSidebarComputer',
    }),
  },
  beforeRouteLeave(to, from, next) {
    this.changeSelects([]);
    next();
  },
  beforeMount() {
    this.changeSelectedSide(1);
    this.changeNamesNav(
      [
        { name: 'Gastos', route: '/home/estatisticas/gastos' },
        { name: 'Presenças', route: '/home/estatisticas/presencas' },
        { name: 'Propostas', route: '/home/estatisticas/propostas' },
      ],
    );
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped />
