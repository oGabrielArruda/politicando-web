<template>
  <div class="container">
    <!--<button :class="{ 'show': !mobileView }" @click="showNav">
      <i class="fas fa-bars"></i>
    </button>-->
    <div class="content" :class="{ 'expand': closeSidebarComputer }">
      <Carousel />
      <!--<button @click="updateRouter('Gastos')">
        Gastos
      </button>
      <button @click="updateRouter('Presencas')">
        Presenças
      </button>
      <button @click="updateRouter('Propostas')">
        Propostas
      </button>-->
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
      // mobileView: false,
      // isOpen: false,
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
    /* handleView() {
      this.mobileView = window.innerWidth <= 1230;
    },*-/
    /* showNav() {
      this.isOpen = !this.isOpen;
    }, */
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
  created() {
    // this.handleView();
    // window.addEventListener('resize', this.handleView);
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
