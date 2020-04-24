<template>
  <div class="container">
    <form>
      <img
        src="https://avatars2.githubusercontent.com/u/47468017?s=400&u=55cae324327ac3651093aace03e997ac44f2c9f5&v=4"
        alt=""
        class="usersImage"
      /> <br>
      <div class="select-file-container">
        <label for="seletorArquivo">
        Alterar foto de perfil
        </label>
        <input type="file" name="seletorArquivo" id="seletorArquivo" @change="changePhoto()" />
      </div>
      <div class="input-group">
        <label>Nome : </label>
        <input type="text" name="usersName" id="usersName">

        <label>Email : </label>
        <input type="email" name="usersEmail" id="usersEmail">

        <label>Senha : </label>
        <input type="password" name="usersPassword" id="usersPassword">

        <label id="seg">Seguindo {{ numPoliticosSeguindo }} políticos</label>
      </div>

      <div class="button-group">
        <button id="btnAlterar">Salvar alterações</button>
        <button id="btnDesconectar">Desconectar</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      numPoliticosSeguindo: 10,
    };
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
