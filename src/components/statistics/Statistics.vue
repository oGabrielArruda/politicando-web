<template>
  <div class="container" :class="{ 'move': isOpen }">
    <button :class="{ 'show': !mobileView }" @click="showNav">
      <i class="fas fa-bars"></i>
    </button>
    <div class="content">
      <Carousel />
      <button @click="updateRouter('Gastos')">
        Gastos
      </button>
      <button @click="updateRouter('Presencas')">
        Presenças
      </button>
      <button @click="updateRouter('Propostas')">
        Propostas
      </button>
      <div class="select-group">
        <SelectPolitico
        @onChange="handlePolitico"
        :url="'/PoliticoItems/filtrado?size=5&page=1'"
        :text="'Selecione o político para comparar os gastos'"
        :multiple="true"
        />
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import Carousel from '../carousel/Carousel.vue';
import SelectPolitico from '../selectpolitico/SelectPolitico.vue';

export default {
  data() {
    return {
      politicos: [],
      mobileView: false,
      isOpen: false,
    };
  },
  components: {
    Carousel,
    SelectPolitico,
  },
  methods: {
    handleView() {
      this.mobileView = window.innerWidth <= 1230;
    },
    showNav() {
      this.isOpen = !this.isOpen;
    },
    updateRouter(routeName) {
      this.$router.push({ name: routeName });
    },
    ...mapActions({
      changeSelects: 'carousel/changeSelects',
    }),
    handlePolitico(values) {
      this.changeSelects(values);
    },
  },
  created() {
    this.handleView();
    window.addEventListener('resize', this.handleView);
  },
  beforeRouteLeave(to, from, next) {
    this.changeSelects([]);
    next();
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped />
