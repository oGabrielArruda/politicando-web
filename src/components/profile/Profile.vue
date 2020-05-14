<template>
  <div class="container" :class="{ move: open }">
    <button :class="{ show: !mobileView }" @click="showNav">
      <i class="fas fa-bars"></i>
    </button>

    <ModalEdit ref="modal" @onSuccess="sucessModalSubmit"/>

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
        <input type="file" id="select-file" @change="changePhoto()" disabled />
      </div>
      <div class="input-container">
        <div class="input-group">
          <div>
            <label>Nome</label>
            <input type="text" id="nome" name="name" v-model="user.nome" disabled />
          </div>
          <div>
            <label>Sobrenome</label>
            <input type="text" id="sobrenome" name="surname" v-model="user.sobrenome" disabled />
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
              v-model="user.novaSenha"
              disabled
            />
          </div>
          <div>
            <label>Confirmar nova senha</label>
            <input type="password" id="confirma" name="newPassword" disabled />
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

          <div>
            <button
              class="btnCancelar"
              v-if="this.editing"
              :disabled="false"
              @click="cancelarEdicao()"
              type="button"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
      <hr />

      <div class="button-group">
        <div class="cancelar">
          <button
            class="btnCancelar"
            v-if="this.editing"
            :disabled="false"
            @click="cancelarEdicao()"
            type="button"
          >
            Cancelar
          </button>
        </div>
        <button id="btnAlterar" :disabled="false" @click="alterarInformacoes()" type="button">
          Editar
        </button>
        <button id="btnDesconectar" type="button" @click="excluirConta()">Desconectar</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { mask } from 'vue-the-mask';
import axios from 'axios';
import ModalEdit from '../modalEdit/ModalEdit.vue';
import api from '../../config/api';

export default {
  name: 'Profile',
  data() {
    return {
      saveEnabled: false,
      user: {},
      mobileView: false,
      cidadeFetch: '',
      estadoFetch: '',
      editing: false,
      open: false,
      methodInbutton: 'disconnectUser',
    };
  },
  components: {
    ModalEdit,
  },
  directives: {
    mask,
  },
  methods: {
    ...mapActions({
      signOut: 'auth/signOut',
      signIn: 'auth/signIn',
    }),
    changePhoto() {
      const inpFile = document.querySelector('#select-file');
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
    cancelarEdicao() {
      this.editing = false;
      const foto = document.querySelector('#select-file');
      const nome = document.querySelector('#nome');
      const sobrenome = document.querySelector('#sobrenome');
      const novaSenha = document.querySelector('#novaSenha');
      const confirmar = document.querySelector('#confirma');
      const Cep = document.querySelector('#usersCep');
      const btnDesconectar = document.querySelector('#btnDesconectar');
      const btnSalvar = document.querySelector('#btnAlterar');
      foto.disabled = true;
      nome.disabled = true;
      sobrenome.disabled = true;
      novaSenha.disabled = true;
      confirmar.disabled = true;
      Cep.disabled = true;
      btnDesconectar.textContent = 'Desconectar';
      btnSalvar.textContent = 'Editar';
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
        this.$refs.modal.showModal();
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
        this.$refs.modal.showModal();
      } else {
        this.disconnectUser();
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
    async update(senha) {
      const userComSenha = this.user;
      userComSenha.senha = senha;
      await api.put('/Users/update', userComSenha);

      if (this.novaSenha) {
        await this.signIn({ email: this.user.email, senha: userComSenha.novaSenha });
      } else {
        await this.signIn({ email: this.user.email, senha: userComSenha.senha });
      }
      this.user = JSON.parse(JSON.stringify(this.stateUser));
    },
    handleView() {
      this.mobileView = window.innerWidth <= 1125;
    },
    showNav() {
      this.open = !this.open;
    },
    async disconnectUser() {
      this.$router.push({ name: 'Initial' });
      await this.signOut();
    },
    async sucessModalSubmit(values) {
      try {
        await this.update(values.senha);
      } catch (erro) {
        console.log(erro);
      }
      this.cancelarEdicao();
      this.$toast.success('Perfil alterado com sucesso!');
    },
  },
  computed: {
    ...mapGetters({
      userState: 'auth/user',
    }),
    stateUser() {
      return this.$store.state.user;
    },
  },
  created() {
    this.handleView();
    window.addEventListener('resize', this.handleView);
  },
  async mounted() {
    this.changePhoto();
    this.user = JSON.parse(JSON.stringify(this.userState));
    await this.fetchCep(this.user.cep);
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
