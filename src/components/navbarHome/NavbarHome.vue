<template>
  <div class="container-nav">
    <nav>
      <div class="content-left" :class="{ 'reduce': closeSidebarComputer }" v-if="isComputer">
        <button class="button-side" @click="changeSidebarComputer(!closeSidebarComputer)">
          <i class="fas fa-bars"></i>
        </button>
      </div>
      <div class="content-main" :class="{ 'expand': closeSidebarComputer }">
        <button
          class="button-side"
          @click="changeSidebarMobile(false)"
          v-if="!isComputer"
        >
          <i class="fas fa-bars"></i>
        </button>
        <div class="content-mid">
          <img
            src="../../assets/navbar/P.png"
            alt="Logo"
            :class="{ 'resize': namesNavigation.length === 0 }"
            @click="isComputer || (namesNavigation.length > 0 && changeNavbarMobile(false))"
          />
          <ul>
            <li
              v-for="(nameNavigation, index) in namesNavigation"
              v-bind="nameNavigation"
              :key="index"
              @click="pushRouter(index)"
              :class="{ 'selected': buttonSelectedNav === index }"
            >{{ nameNavigation.name }}</li>
            <!--<li>Eventos</li>
            <li>Votações</li>-->
          </ul>
          <!--<button>
            <i class="fas fa-angle-double-down"></i>
          </button>-->
        </div>
        <div class="content-right">
          <p> {{ user.nome }}</p>
          <button @click="pushRouterByName('Profile')">
            <img :src="user.imgPerfil || require('../../assets/signup/user.svg')" alt />
          </button>
        </div>
      </div>
    </nav>
    <NavMobile />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import NavMobile from './navMobile/NavMobile.vue';

export default {
  name: 'NavbarHome',
  data() {
    return {
      isComputer: true,
    };
  },
  components: {
    NavMobile,
  },
  methods: {
    ...mapActions({
      changeSidebarComputer: 'navigation/changeSidebarComputer',
      changeSidebarMobile: 'navigation/changeSidebarMobile',
      changeSelectedNav: 'navigation/changeSelectedNav',
      changeNavbarMobile: 'navigation/changeNavbarMobile',
    }),
    pushRouter(i) {
      if (this.buttonSelectedNav === i) {
        this.$toast.error(`Você já está em ${this.namesNavigation[i].name}`);
        return;
      }
      this.changeSelectedNav(i);
      this.$router.push({ path: this.namesNavigation[i].route });
    },
    pushRouterByName(routeName) {
      this.$router.push({ name: routeName });
    },
    handleView() {
      if (window.innerWidth <= 1000) {
        this.isComputer = false;
        this.changeSidebarComputer(false);
      } else {
        this.isComputer = true;
        this.changeSidebarComputer(true);
        this.changeSidebarMobile(true);
      }
    },
  },
  computed: {
    ...mapGetters({
      buttonSelectedNav: 'navigation/buttonSelectedNav',
      closeSidebarComputer: 'navigation/closeSidebarComputer',
      namesNavigation: 'navigation/namesNavigation',
      user: 'auth/user',
    }),
  },
  beforeMount() {
    window.addEventListener('resize', this.handleView);
    this.handleView();
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
