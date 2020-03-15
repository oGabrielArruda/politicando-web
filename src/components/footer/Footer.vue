<template>
  <div id="container">
    <img id="logo" src="../../assets/initial/logo.png" />

    <div id="informacoes">
      <div class="textos">
        <h2>Links Rápidos</h2>
        <p>Sobre Nós</p>
        <p>Nossa Logo</p>
        <p>Contato</p>
      </div>

      <div class="textos">
        <h2>Coisas Legais</h2>
        <p>Disclaimer</p>
        <p>Financing</p>
        <p>Privacy Policy</p>
        <p>Terms of Service</p>
      </div>

      <div class="textos">
        <h2>Redes Sociais</h2>
        <p>Facebook</p>
        <p>Twitter</p>
        <p>Instagram</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {};
  },
};
</script>

<style lang="scss">
#container {
  display: flex;
  flex-direction: row;
  margin-top: 100px;
  background: url("../../assets/initial/footer.svg") no-repeat bottom;
  height: 47vh;
  justify-content: space-around;
  align-items: flex-start;

  #logo {
    height: 90px;
  }

  #informacoes {
    display: flex;
    flex-direction: row;
    width: 60vw;
    justify-content: space-evenly;
    p {
      margin-top: 20px;
      font-size: 13pt;
    }
  }
}
</style>
