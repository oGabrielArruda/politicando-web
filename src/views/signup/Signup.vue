<template>
  <div class="container">
    <img id="logo" src="../../assets/initial/logo2.png" />
    <form @submit="submit">
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
          <input class="margin-style" type="text" name="nome" placeholder="Nome" v-model="nome" />
          <input type="text" name="sobrenome" placeholder="Sobrenome" v-model="sobrenome"/>
        </div>
        <input type="email" name="email" placeholder="Email" v-model="email"/>
        <div class="input-group">
          <input class="margin-style" type="password" name="senha" placeholder="Senha"
           v-model="senha" />
          <input type="password" name="confirma" placeholder="Confirme a senha" />
        </div>
        <div class="select-group">
          <SelectPolitico :url="urlDeputados" :text="'Selecione o deputado em que você votou!'"
           @onChange="changeDep" @onDelete=" idDep = 0" />
          <SelectPolitico :url="urlSenadores" :text="'Selecione o senador em que você votou!'"
          @onChange="changeSen" @onDelete="idSen = 0"/>
        </div>
      </div>
      <div class="button-group">
        <button type="button" id="button-haveAccount">Já tenho uma conta</button>
        <button type="submit" id="button-register">Cadastrar</button>
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
import api from '../../config/api';

export default {
  data() {
    return {
      options: [],
      urlDeputados: '/PoliticoItems/filtrado?tipo=1&size=5&page=1',
      urlSenadores: '/PoliticoItems/filtrado?tipo=2&size=5&page=1',
      nome: '',
      sobrenome: '',
      email: '',
      senha: '',
      imgSrc: '',
      idDep: 0,
      idSen: 0,
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
          this.imgSrc = fileReader.result;
        });

        fileReader.readAsDataURL(file);
      }
    },
    changeDep(values) {
      this.idDep = values.value.id;
    },
    changeSen(values) {
      this.idSen = values.value.id;
    },
    async submit(event) {
      event.preventDefault();
      console.log('submit');
      console.log(this.imgSrc);
      try {
        const objPost = {
          email: this.email,
          senha: this.senha,
          nome: this.nome,
          sobrenome: this.sobrenome,
          imgPerfil: this.imgSrc,
          idDep: this.idDep,
          idSen: this.idSen,
        };
        const response = await api.post('/Users/signup', objPost);
        this.$router.push({ name: 'Initial' });
        console.log(response.data);
      } catch (erro) {
        console.log(erro);
      }
    },
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped />
