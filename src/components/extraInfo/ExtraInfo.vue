<template>
  <div class="container-info" @click="showInfo()" :class="{ 'open-info': isOpenInfo }">
    <header>
      <p>SOBRE O PARTIDO</p>
    </header>
    <main v-if="loading">
      <div class="header">
        <p>{{ partido.nome }}</p>
        <img :src="partido.urlLogo" @error="replaceByDefault" />
      </div>
      <div class="content">
        <h1>Liderança</h1>
        <div>
          <img :src="partido.status.lider.foto" />
          <p>{{ partido.status.lider.nome }}</p>
        </div>
      </div>
      <p>
        <span>No momento possuem {{ partido.status.totalMembros }} membros</span>
      </p>
    </main>
    <div class="fa-2x loading" v-else>
      <i class="fas fa-sync fa-spin"></i>
    </div>
  </div>
</template>

<script>
import img from '../../assets/feed/no-photo.svg';

export default {
  name: 'ExtraInfo',
  props: ['partido', 'loading'],
  data() {
    return {
      isOpenInfo: false,
    };
  },
  methods: {
    showInfo() {
      this.isOpenInfo = !this.isOpenInfo;
    },
    replaceByDefault(e) {
      e.target.src = img;
    },
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
