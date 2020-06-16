<template>
  <div class="container">
    <!--<button :class="{ 'show': !mobileView }" @click="showSidebar">
      <i class="fas fa-bars"></i>
    </button>-->
    <div class="content" :class="{ 'expand': closeSidebarComputer }">
      <!--<div class="container-nav" :class="{ 'move-navbar': isOpenNavbar }">
        <nav>
          <div>
            <button
              v-for="(button, index) in buttons"
              :key="index"
              v-bind="button"
              :class="{ 'selected': button.isActive }"
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
      </div>-->
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
      mobileView: false,
      isOpenSidebar: false,
      // isOpenNavbar: false,
      isOpenInfo: false,
      /* buttons: [
        {
          text: 'Notícias',
          srcName: 'news',
          isActive: true,
        },
        {
          text: 'Eventos',
          srcName: 'event',
          isActive: false,
        },
        {
          text: 'Votações',
          srcName: 'voting',
          isActive: false,
        },
      ],
      buttonSelected: 0, */
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
    handleView() {
      this.mobileView = window.innerWidth <= 1230;
    },
    /* showSidebar() {
      this.isOpenSidebar = !this.isOpenSidebar;
    },
    showNavbar() {
      this.isOpenNavbar = !this.isOpenNavbar;
    }, */
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
    /* enableButton(i) {
      this.buttons[this.buttonSelected].isActive = false;
      this.buttons[i].isActive = true;
      this.buttonSelected = i;

      this.pushRouter(i);
    }, */
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
  mounted() {
    this.handleView();
    window.addEventListener('resize', this.handleView);
    // this.$router.push({ name: 'Noticias' });
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
