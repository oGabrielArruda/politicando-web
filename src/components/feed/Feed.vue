<template>
  <div class="container">
    <div class="content" :class="{ 'expand': closeSidebarComputer }">
      <Carousel />
      <router-view></router-view>
    </div>
    <ExtraInfo :partido="getPartido" :loading="getLoading" v-if="getFirstTime" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Carousel from '../carousel/Carousel.vue';
import ExtraInfo from '../extraInfo/ExtraInfo.vue';
import api from '../../config/api';

export default {
  name: 'Feed',
  data() {
    return {
      isOpenInfo: false,
      partido: {},
      loadingPartido: false,
      firstTime: true,
    };
  },
  components: {
    Carousel,
    ExtraInfo,
  },
  methods: {
    ...mapActions({
      changeSelectedSide: 'navigation/changeSelectedSide',
      changeNamesNav: 'navigation/changeNamesNav',
    }),
    showInfo() {
      this.isOpenInfo = !this.isOpenInfo;
    },
    pushRouter(i) {
      switch (i) {
        case 1:
          this.$router.push({ name: 'Eventos' });
          break;
        case 2:
          this.$router.push({ name: 'Votacoes' });
          break;
        default:
          this.$router.push({ name: 'Noticias' });
          break;
      }
    },
    async searchPartido({ partido }) {
      try {
        const response = await api.get(`/Partidos/${partido}`);
        this.partido = response.data;
        this.loadingPartido = false;
      } catch (err) {
        console.log(err);
      }

      this.firstTime = false;
    },
  },
  computed: {
    ...mapGetters({
      politicoSelected: 'carousel/politicoSelected',
      closeSidebarComputer: 'navigation/closeSidebarComputer',
    }),
    getPartido() {
      return this.partido;
    },
    getLoading() {
      return !this.loadingPartido;
    },
    getFirstTime() {
      return !this.firstTime;
    },
  },
  watch: {
    politicoSelected() {
      this.loadingPartido = true;
      console.log(this.politicoSelected);
      this.searchPartido(this.politicoSelected);
    },
  },
  beforeMount() {
    this.changeSelectedSide(0);
    this.changeNamesNav(
      [
        { name: 'Notícias', route: '/home/feed/noticias' },
        { name: 'Eventos', route: '/home/feed/eventos' },
        { name: 'Votações', route: '/home/feed/votacoes' },
      ],
    );
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
