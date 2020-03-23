<template>
  <div class="container">
    <img id="logo" src="../../assets/initial/logo2.png" />
    <form action>
      <div class="input-container">
        <div class="file-group">
          <label for="seletorArquivo">Icone de Conta aqui</label>
          <input type="file" name="seletorArquivo" />
        </div>
        <div class="input-group">
          <input class="margin-style" type="text" name="nome" placeholder="Nome" />
          <input type="text" name="sobrenome" placeholder="Sobrenome" />
        </div>
        <input type="email" name="email" placeholder="Email" />
        <div class="input-group">
          <input class="margin-style" type="password" name="senha" placeholder="Senha" />
          <input type="password" name="confirma" placeholder="Confirme a senha" />
        </div>
        <input type="search" name="deputado" placeholder="Selecione o ultimo deputado que votou" />
        <input type="search" name="senador" placeholder="Selecione o ultimo senador que votou" />
      </div>
      <div class="button-group">
        <button type="button" id="button-haveAccount" >Já tenho uma conta</button>
        <button type="button" id="button-register" >Cadastrar</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped />
