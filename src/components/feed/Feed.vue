<template>
  <div class="container" :class="{ 'move-sidebar': isOpenSidebar }">
    <button :class="{ 'show': !mobileView }" @click="showSidebar">
      <i class="fas fa-bars"></i>
    </button>
    <div class="content">
      <div class="container-nav" :class="{ 'move-navbar': isOpenNavbar }" >
        <nav>
          <div>
            <!--<button class="notice selected-notice">
              <p>Notícias</p>
              <img src="../../assets/sidebar/feed.svg" />
            </button>
            <button class="event selected-event">
              <p>Eventos</p>
              <img src="../../assets/sidebar/events.svg" />
            </button>
            <button class="voting selected-voting">
              <p>Votações</p>
              <img src="../../assets/sidebar/voting.svg" />
            </button>-->
            <button
              v-for="(button, index) in buttons"
              :key="index"
              v-bind="button"
              :class="[getDefaultClass(index), getActiveClass(index)]"
              @click="enableButton(index)"
            >
              <p>{{ button.text }}</p>
              <img :src="require(`../../assets/sidebar/${button.srcName}.svg`)"
                   :class="{ 'size-image': isOpenNavbar }" />
            </button>
          </div>
          <button @click="showNavbar">
            <img src="../../assets/sidebar/arrow.svg" :class="{ 'rotate-arrow': isOpenNavbar }" >
          </button>
        </nav>
      </div>
      <Carousel />
      <h1>asdsada</h1>
      <h1>asdsada</h1>
      <h1>asdsada</h1>
      <h1>asdsada</h1>
      <h1>asdsada</h1>
      <h1>asdsada</h1>
      <h1>asdsada</h1>
      <h1>asdsada</h1>
      <h1>asdsada</h1>
      <h1>asdsada</h1>
      <h1>asdsada</h1>
      <h1>asdsada</h1>
      <h1>12</h1>
      <h1>12</h1>
      <h1>12</h1>
      <h1>12</h1>
      <h1>12</h1>
      <h1>12</h1>
      <h1>12</h1>
      <h1>12</h1>
      <h1>12</h1>
      <h1>12</h1>
    </div>
    <ExtraInfo />
  </div>
</template>
<script>
import Carousel from '../carousel/Carousel.vue';
import ExtraInfo from '../extraInfo/ExtraInfo.vue';

export default {
  name: 'Feed',
  data() {
    return {
      mobileView: false,
      isOpenSidebar: false,
      isOpenNavbar: false,
      buttons: [
        {
          text: 'Notícias',
          srcName: 'notice',
          isActive: true,
          classActive: 'selected-notice',
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
    };
  },
  components: {
    Carousel,
    ExtraInfo,
  },
  methods: {
    handleView() {
      this.mobileView = window.innerWidth <= 1125;
    },
    showSidebar() {
      this.isOpenSidebar = !this.isOpenSidebar;
    },
    showNavbar() {
      this.isOpenNavbar = !this.isOpenNavbar;
    },
    pushRouter(i) {
      switch (i) {
        case 1:
          // this.$router.push({ name: '' });
          break;
        case 2:
          // this.$router.push({ name: '' });
          break;
        default:
          // this.$router.push({ name: '' });
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
  },
  created() {
    this.handleView();
    window.addEventListener('resize', this.handleView);
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
