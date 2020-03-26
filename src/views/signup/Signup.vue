<template>
  <div class="container">
    <img id="logo" src="../../assets/initial/logo2.png" />
    <form action>
      <div class="input-container">
        <div class="file-group">
          <label for="seletorArquivo">Icone de Conta aqui</label>
          <input type="file" name="seletorArquivo" id="seletorArquivo"/>
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
        <SelectPolitico :url="urlDeputados" :text="'Selecione o deputado em que você votou!'" />
        <SelectPolitico :url="urlSenadores" :text="'Selecione o senador em que você votou!'" />
      </div>
      <div class="button-group">
        <button type="button" id="button-haveAccount" >Já tenho uma conta</button>
        <button type="button" id="button-register" >Cadastrar</button>
      </div>
    </form>
  </div>
</template>
<script>
import SelectPolitico from './selectpolitico/SelectPolitico.vue';

export default {
  data() {
    return {
      options: [],
      urlDeputados: '/PoliticoItems/filtrado?tipo=1&size=5',
      urlSenadores: '/PoliticoItems/filtrado?tipo=2&size=5',
    };
  },
  components: {
    SelectPolitico,
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped />
