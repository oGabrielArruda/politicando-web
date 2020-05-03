<template>
  <div class="container" :class="{ move: isOpen }">
    <button :class="{ show: !mobileView }" @click="showNav">
      <i class="fas fa-bars"></i>
    </button>
    <div class="content">
      <form>
        <img
          v-if="user.imgPerfil !== '' && user.imgPerfil !== null"
          :src="user.imgPerfil"
          alt=""
          class="usersImage"
          id="imgUser"
        />
        <img v-else src="../../assets/signup/user.svg" alt="" class="usersImage" id="imgUser" />
        <br />
        <div class="select-file-container">
          <label for="seletorArquivo">
            Alterar foto de perfil
          </label>
          <input type="file" name="seletorArquivo" id="seletorArquivo" @change="changePhoto()" />
        </div>
        <div class="input-group">
          <label>Nome: </label>
          <input type="text" name="usersName" id="usersName" v-model="user.nome" />

          <label>Sobrenome: </label>
          <input type="text" name="usersSurname" id="usersSurname" v-model="user.sobrenome" />

          <label>Email: </label>
          <input type="email" name="usersEmail" id="usersEmail" v-model="user.email" />

          <label>Cep: </label>
          <input type="text" name="usersCep" id="usersCep"
          v-model="user.cep" v-mask="'#####-###'" @input="changeCep"/>

          <label>Cidade: </label>
          <input type="text" name="usersCidade" id="usersCidade" v-model="cidadeFetch"  disabled />

          <label>Estado: </label>
          <input type="text" name="usersEstado" id="usersEstado" v-model="estadoFetch" disabled />

          <label>Senha: </label>
          <input type="password" name="usersPassword" id="usersPassword" v-model="user.senha" />

          <label id="seg">Seguindo {{ numPoliticosSeguindo }} políticos</label>
        </div>

        <div class="button-group">
          <button id="btnAlterar" :disabled="false">Salvar alterações</button>
          <button id="btnDesconectar">Desconectar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mask } from 'vue-the-mask';
import axios from 'axios';
// import api from '../../config/api';

export default {
  name: 'Profile',
  data() {
    return {
      numPoliticosSeguindo: 10,
      saveEnabled: false,
      user: {},
      mobileView: false,
      isOpen: false,
      cidadeFetch: '',
      estadoFetch: '',
    };
  },
  directives: {
    mask,
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
          this.user.imgPerfil = fileReader.result;
        });

        fileReader.readAsDataURL(file);
      }
    },
    async changeCep(event) {
      if (event.target.value.length !== 9) {
        this.cidadeFetch = '';
        this.estadoFetch = '';
      }
      await this.fetchCep(event.target.value);
    },
    async fetchCep(cep) {
      try {
        const responseCep = await axios
          .get(`https://api.postmon.com.br/v1/cep/${cep}`);
        this.cidadeFetch = responseCep.data.cidade;
        this.estadoFetch = responseCep.data.estado;
      } catch (erro) {
        console.log(erro);
      }
    },
    /* async update(event) {
      event.preventDefault();

      try {
        const response = await api.put('/Users/update', this.user);
        this.$store.dispatch('changeUser', response.data);
        this.user = JSON.parse(JSON.stringify(this.stateUser));
      } catch (erro) {
        console.log(erro);
      }
    }, */
    handleView() {
      this.mobileView = window.innerWidth <= 1125;
      console.log(this.mobileView);
    },
    showNav() {
      this.isOpen = !this.isOpen;
    },
  },
  computed: {
    ...mapGetters({
      userState: 'auth/user',
    }),
    /* stateUser() {
      return this.$store.state.user;
    }, */
  },
  created() {
    this.handleView();
    window.addEventListener('resize', this.handleView);
    console.log(this.$store.state.politicoCarrossel);
  },
  async mounted() {
    this.changePhoto();
    this.user = JSON.parse(JSON.stringify(this.userState));
    await this.fetchCep(this.user.cep);
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
