<template>
  <div class="container" :class="{ move: open }">
    <button :class="{ show: !mobileView }" @click="showNav">
      <i class="fas fa-bars"></i>
    </button>
    <div class="modal-window" :class="{ close: !isOpen }">
      <div>

        <button type="button" class="button-close" @click="alterarInformacoes">
          <i class="fas fa-times"></i>
        </button>

        <form @submit.prevent="submit">
          <p>Seu e-mail</p>
          <input name="email" type="text" placeholder="email@exemplo.com" />
          <p>Sua senha</p>
          <input name="senha" type="password" placeholder="exemplo123" />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
    <form>
      <div class="file-container">
        <label for="select-file">
          <img
            :src="user.imgPerfil || require('../../assets/signup/user.svg')"
            alt
            class="usersImage"
            id="imgUser"
          />
        </label>
        <input type="file" id="select-file" @change="changePhoto()" disabled  />
      </div>
      <div class="input-container">
        <div class="input-group">
          <div>
            <label>Nome</label>
            <input
              type="text"
              id="nome"
              name="name"
              v-model="user.nome"
              disabled

            />
          </div>
          <div>
            <label>Sobrenome</label>
            <input
              type="text"
              id="sobrenome"
              name="surname"
              v-model="user.sobrenome"
              disabled

            />
          </div>
        </div>

        <hr />

        <div class="input-group">
          <div>
            <label>Nova senha</label>
            <input
              type="password"
              id="novaSenha"
              name="newPassword"
              v-model="user.senha"
              disabled

            />
          </div>
          <div>
            <label>Confirmar nova senha</label>
            <input type="password" id="confirma" name="newPassword" disabled  />
          </div>
        </div>

        <hr />

        <div class="input-group">
          <div>
            <label>Cep:</label>
            <input
              type="text"
              name="usersCep"
              id="usersCep"
              v-model="user.cep"
              v-mask="'#####-###'"
              @input="changeCep"
              disabled

            />
          </div>

          <div>
            <label>Cidade:</label>
            <input type="text" name="usersCidade" id="usersCidade" v-model="cidadeFetch" disabled />
          </div>

          <div>
            <label>Estado:</label>
            <input type="text" name="usersEstado" id="usersEstado" v-model="estadoFetch" disabled />
          </div>
        </div>
      </div>
      <hr />
      <div class="button-group">
        <button id="btnAlterar" :disabled="false" @click="alterarInformacoes()" type="button">
          Editar
        </button>
        <button id="btnDesconectar" type="button" @click="excluirConta()">Desconectar</button>
      </div>
    </form>
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
      saveEnabled: false,
      user: {},
      mobileView: false,
      isOpen: false,
      cidadeFetch: '',
      estadoFetch: '',
      editing: false,
      open: false,
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
    alterarInformacoes() {
      const foto = document.querySelector('#select-file');
      const nome = document.querySelector('#nome');
      const sobrenome = document.querySelector('#sobrenome');
      const novaSenha = document.querySelector('#novaSenha');
      const confirmar = document.querySelector('#confirma');
      const Cep = document.querySelector('#usersCep');


      const btnDesconectar = document.querySelector('#btnDesconectar');
      const btnSalvar = document.querySelector('#btnAlterar');

      if (this.editing) {
        if (!this.isOpen && this.authenticated) {
          console.log('autenticado');
          this.$router.push({ path: 'home/feed/noticias' });
        } else {
          this.isOpen = !this.isOpen;
        }
      } else {
        nome.disabled = false;
        sobrenome.disabled = false;
        novaSenha.disabled = false;
        confirmar.disabled = false;
        Cep.disabled = false;
        foto.disabled = false;


        this.editing = true;
        btnDesconectar.textContent = 'Excluir Conta';
        btnSalvar.textContent = 'Salvar';
      }
    },
    excluirConta() {
      if (this.editing) {
        if (!this.isOpen && this.authenticated) {
          console.log('autenticado');
          this.$router.push({ path: 'home/feed/noticias' });
        } else {
          this.isOpen = !this.isOpen;
        }
      } else {
        console.log('as');
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
        const responseCep = await axios.get(`https://api.postmon.com.br/v1/cep/${cep}`);
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
