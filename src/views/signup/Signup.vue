<template>
  <div class="container">
    <img id="logo" src="../../assets/initial/logo2.png" />
    <form>
      <div class="input-container">
        <div class="file-group">
          <div class="image-container">
            <img src="../../assets/signup/user.svg" alt="User-Icon" id="imgUser"/>
          </div>
          <div class="select-file-container">
            <label for="seletorArquivo">
              <i class="fas fa-plus"></i>
            </label>
          </div>
          <input type="file" name="seletorArquivo" id="seletorArquivo" @change="changePhoto()"/>
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
        <div class="select-group">
          <SelectPolitico :url="urlDeputados" :text="'Selecione o deputado em que você votou!'" />
          <SelectPolitico :url="urlSenadores" :text="'Selecione o senador em que você votou!'" />
        </div>
      </div>
      <div class="button-group">
        <button type="button" id="button-haveAccount">Já tenho uma conta</button>
        <button type="button" id="button-register">Cadastrar</button>
      </div>
      <div class="warning-group">
        <img src="../../assets/signup/rotate.svg" alt="User-Icon" />
        <h2>VIRE A TELA PARA SE CADASTRAR</h2>
      </div>
    </form>
  </div>
</template>
<script>
import SelectPolitico from '../../components/selectpolitico/SelectPolitico.vue';

export default {
  data() {
    return {
      options: [],
      urlDeputados: '/PoliticoItems/filtrado?tipo=1&size=5&page=1',
      urlSenadores: '/PoliticoItems/filtrado?tipo=2&size=5&page=1',
    };
  },
  components: {
    SelectPolitico,
  },
  methods: {
    changePhoto() {
      const inpFile = document.querySelector('#seletorArquivo');
      const image = document.querySelector('#imgUser');

      const file = inpFile.files[0];

      if (file && file.type.includes('image')) {
        const fileReader = new FileReader();

        fileReader.addEventListener('load', () => {
          image.setAttribute('src', fileReader.result);
        });

        fileReader.readAsDataURL(file);
      }
    },
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped />
