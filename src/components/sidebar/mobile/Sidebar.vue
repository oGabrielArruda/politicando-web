<template>
  <div class="aside-container" :class="{ 'open': !closeSidebarMobile }">
    <div @click="actionSide()" />
    <aside>
      <div class="content">
        <div class="items">
          <button
            :class="{ 'selected': buttonSelectedSide === 0 }"
            @click="pushRouter(0, 'Você já está no início', '/home/feed/recentes')"
          >
            <img
              :src="buttonSelectedSide === 0
          ? require('../../../assets/sidebar/home-selected.svg')
          : require('../../../assets/sidebar/home.svg')"
            />
            <p>Início</p>
          </button>
          <button
            :class="{ 'selected': buttonSelectedSide === 1 }"
            @click="pushRouter(1, 'Você já está nas estatísticas', '/home/estatisticas/gastos')"
          >
            <img
              :src="buttonSelectedSide === 1
          ? require('../../../assets/sidebar/chart-selected.svg')
          : require('../../../assets/sidebar/chart.svg')"
            />
            <p>Estatísticas</p>
          </button>
          <button
            :class="{ 'selected': buttonSelectedSide === 2 }"
            @click="pushRouter(2, 'Você já está na classificação', '/home/classificacao')"
          >
            <img
              :src="buttonSelectedSide === 2
          ? require('../../../assets/sidebar/classification-selected.svg')
          : require('../../../assets/sidebar/classification.svg')"
            />
            <p>Classificação</p>
          </button>
        </div>
      </div>
      <button type="button" @click="disconnectUser">
        <i class="fas fa-door-open"></i>
      </button>
    </aside>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Sidebar',
  components: {},
  data() {
    return {
      profileIsActive: false,
    };
  },
  props: ['usuario'],
  methods: {
    ...mapActions({
      signOut: 'auth/signOut',
      changeSelectedSide: 'navigation/changeSelectedSide',
      changeSidebarMobile: 'navigation/changeSidebarMobile',
    }),
    pushRouter(i, message, route) {
      if (this.buttonSelectedSide === i) {
        this.$toast.error(message);
        return;
      }

      this.changeSelectedSide(i);
      this.$router.push({ path: route });
    },
    actionSide() {
      this.changeSidebarMobile(true);
    },
    async disconnectUser() {
      this.$router.push({ name: 'Initial' });
      await this.signOut();
    },
  },
  computed: {
    ...mapGetters({
      buttonSelectedSide: 'navigation/buttonSelectedSide',
      closeSidebarMobile: 'navigation/closeSidebarMobile',
    }),
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
