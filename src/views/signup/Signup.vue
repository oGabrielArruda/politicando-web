<template>
    <div class="container">
      <img id='logo' src="../../assets/initial/logo.png">
      <div class="background">
          <form id="formulario">
            <label for="seletorArquivo" id="fotoUser"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/><path d="M0 0h24v24H0z" fill="none"/></svg></label>
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
