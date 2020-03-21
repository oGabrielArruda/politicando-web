<template>
    <div class="container">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
      <img id='logo' src="../../assets/initial/logo.png">
      <div class="background">
          <form id="formulario">
            <label for="seletorArquivo" id="fotoUser">Icone de Conta aqui</label>
            <input type="file" name="seletorArquivo" id="seletorArquivo">
            <input type="text" name="nome" id="nome" placeholder="Digite seu nome" />
            <input type="text" name="sobrenome" id="sobrenome" placeholder="Digite seu sobrenome"/>
            <input type="email" name="email" id="email" placeholder="Digite seu email"/>
            <input type="password" name="senha" id="senha" placeholder="Digite sua senha"/>
            <input type="password" name="confirma" id="confirma" placeholder="Confirma a senha"/>
            <input type="search" name="deputado" id="deputado"
            placeholder="Selecione o ultimo deputado que votou">
            <input type="search" name="senador" id="senador"
            placeholder="Selecione o ultimo senador que votou">
            <input type="button" value="Cadastrar" id="btnCadastrar">
            <input type="button" value="Ja tenho uma conta" id="btnJaTemConta">
          </form>
      </div>
    </div>
</template>
<script>

export default {
  data() {
    return {

    };
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped />
