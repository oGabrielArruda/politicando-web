<template>
  <nav>
    <img src="../../assets/initial/logo.png" />
    <div class="form-group">
      <button type="button" class="button-signIn" @click="signIn">Minha Conta</button>
      <button type="button" class="button-signUp">Criar Conta</button>
    </div>

    <div class="modal-window" :class="{ 'close': !isOpen }">
      <div>
        <button type="button" class="button-close" @click="signIn">
          <i class="fas fa-times"></i>
        </button>

        <form @submit="logar">
          <p>Seu e-mail</p>
          <input name="email" type="text" placeholder="email@exemplo.com" v-model="email" />
          <p>Sua senha</p>
          <input name="senha" type="password" placeholder="exemplo123" v-model="senha" />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
import api from '../../config/api';

export default {
  name: 'Navbar',
  data() {
    return {
      isOpen: false,
      email: '',
      senha: '',
    };
  },
  methods: {
    signUp() {
      this.$router.push({ name: 'Signup' });
    },
    signIn() {
      this.isOpen = !this.isOpen;
    },
    async logar(event) {
      event.preventDefault();
      try {
        const objLogin = {
          email: this.email,
          senha: this.senha,
        };
        const response = await api.post('/Users/login', objLogin);
        const user = response.data;
        this.$router.push({ name: 'Home' });
        console.log(user);
      } catch (erro) {
        console.log(erro);
      }
    },
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
