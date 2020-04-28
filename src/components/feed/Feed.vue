<template>
  <div class="container" :class="{ 'move-sidebar': isOpenSidebar }">
    <button :class="{ 'show': !mobileView }" @click="showSidebar">
      <i class="fas fa-bars"></i>
    </button>
    <div class="content">
      <div class="container-nav" :class="{ 'move-navbar': isOpenNavbar }">
        <nav>
          <div>
            <button
              v-for="(button, index) in buttons"
              :key="index"
              v-bind="button"
              :class="[getDefaultClass(index), getActiveClass(index)]"
              @click="enableButton(index)"
            >
              <p>{{ button.text }}</p>
              <img
                :src="require(`../../assets/sidebar/${button.srcName}.svg`)"
                :class="{ 'size-image': isOpenNavbar }"
              />
            </button>
          </div>
          <button @click="showNavbar">
            <img src="../../assets/sidebar/arrow.svg" :class="{ 'rotate-arrow': isOpenNavbar }" />
          </button>
        </nav>
      </div>
      <Carousel />
      <router-view></router-view>
    </div>
    <ExtraInfo :partido="getPartido" :loading="getLoading" />
  </div>
</template>
<script>
import Carousel from '../carousel/Carousel.vue';
import ExtraInfo from '../extraInfo/ExtraInfo.vue';
import api from '../../config/api';

export default {
  name: 'Feed',
  data() {
    return {
      mobileView: false,
      isOpenSidebar: false,
      isOpenNavbar: false,
      isOpenInfo: false,
      buttons: [
        {
          text: 'Notícias',
          srcName: 'news',
          isActive: true,
          classActive: 'selected-news',
        },
        {
          text: 'Eventos',
          srcName: 'event',
          isActive: false,
          classActive: 'selected-event',
        },
        {
          text: 'Votações',
          srcName: 'voting',
          isActive: false,
          classActive: 'selected-voting',
        },
      ],
      buttonSelected: 0,
      partido: {},
      loadingPartido: false,
    };
  },
  components: {
    Carousel,
    ExtraInfo,
  },
  methods: {
    handleView() {
      this.mobileView = window.innerWidth <= 1230;
    },
    showSidebar() {
      this.isOpenSidebar = !this.isOpenSidebar;
    },
    showNavbar() {
      this.isOpenNavbar = !this.isOpenNavbar;
    },
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
    enableButton(i) {
      this.buttons[this.buttonSelected].isActive = false;
      this.buttons[i].isActive = true;
      this.buttonSelected = i;

      this.pushRouter(i);
    },
    getDefaultClass(i) {
      return this.buttons[i].srcName;
    },
    getActiveClass(i) {
      if (this.buttonSelected === i) {
        return this.buttons[i].classActive;
      }
      return '';
    },
    async searchPartido({ partido }) {
      const response = await api.get(`/Partidos/${partido}`);

      this.partido = response.data;
      this.loadingPartido = false;
      console.log(this.partido);
    },
  },
  computed: {
    politicoEscolhido() {
      return this.$store.state.politicoCarrossel;
    },
    getPartido() {
      return this.partido;
    },
    getLoading() {
      return !this.loadingPartido;
    },
  },
  watch: {
    politicoEscolhido() {
      this.loadingPartido = true;
      this.searchPartido(this.politicoEscolhido);
    },
  },
  created() {
    this.handleView();
    window.addEventListener('resize', this.handleView);
    this.$router.push({ name: 'Noticias' });
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
