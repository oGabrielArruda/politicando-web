<template>
  <div class="container">
    <form>
      <img
        v-if="user.imgPerfil !== ''"
        :src="user.imgPerfil"
        alt=""
        class="usersImage"
      />
      <img
      v-else
      src="../../assets/signup/user.svg"
      alt=""
      class="usersImage" />
      <br>
      <div class="select-file-container">
        <label for="seletorArquivo">
        Alterar foto de perfil
        </label>
        <input type="file" name="seletorArquivo" id="seletorArquivo" @change="changePhoto()" />
      </div>
      <div class="input-group">
        <label>Nome : </label>
        <input type="text" name="usersName" id="usersName" :value="user.nome">

        <label>Email : </label>
        <input type="email" name="usersEmail" id="usersEmail" :value="user.email">

        <label>Senha : </label>
        <input type="password" name="usersPassword" id="usersPassword" :value="user.senha">

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
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
