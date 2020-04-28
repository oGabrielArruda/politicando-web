<template>
  <div class="container-info" @click="showInfo()" :class="{ 'open-info': isOpenInfo }">
    <header>
      <p>SOBRE O PARTIDO</p>
    </header>
    <main>
      <img :src="partido.urlLogo" @error="replaceByDefault" />
      <div>
        <h1>Liderança</h1>
        <div>
          <img :src="partido.status.lider.foto" />
          <p>Luis Tibé</p>
        </div>
      </div>
      <p>
        <span>No momento possuem {{ partido.status.totalMembros }} membros</span>
      </p>
    </main>
  </div>
</template>

<script>
import img from '../../assets/feed/no-photo.svg';

export default {
  name: 'ExtraInfo',
  props: ['partido'],
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
