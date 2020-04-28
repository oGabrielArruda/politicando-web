<template>
  <div class="container-info" @click="showInfo()" :class="{ 'open-info': isOpenInfo }">
    <header>
      <p>Partido de Acir Gurgacz</p>
    </header>
    <main>
      <img src="http://www.camara.leg.br/internet/Deputado/img/partidos/AVANTE.gif" />
      <div>
        <h1>Liderança</h1>
        <div>
          <img src="http://www.camara.gov.br/internet/deputado/bandep/160510.jpg" />
          <p>Luis Tibé</p>
        </div>
      </div>
      <p>
        <span>No momento possuem 7 membros</span>
      </p>
    </main>
  </div>
</template>

<script>
export default {
  name: 'ExtraInfo',
  data() {
    return {
      isOpenInfo: false,
    };
  },
  methods: {
    showInfo() {
      this.isOpenInfo = !this.isOpenInfo;
    },
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
