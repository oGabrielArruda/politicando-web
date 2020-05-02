<template>
  <nav>
    <img src="../../assets/initial/logo.png" />
    <div class="form-group">
      <button type="button" class="button-signIn" @click="showModal">Minha Conta</button>
      <button type="button" class="button-signUp" @click="signUp">Criar Conta</button>
    </div>

    <div class="modal-window" :class="{ 'close': !isOpen }">
      <div>
        <button type="button" class="button-close" @click="showModal">
          <i class="fas fa-times"></i>
        </button>

        <form @submit.prevent="submit">
          <p>Seu e-mail</p>
          <input name="email" type="text" placeholder="email@exemplo.com" v-model="form.email" />
          <p>Sua senha</p>
          <input name="senha" type="password" placeholder="exemplo123" v-model="form.senha" />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Navbar',
  data() {
    return {
      isOpen: false,
      form: {
        email: '',
        senha: '',
      },
    };
  },
  methods: {
    ...mapActions({
      signIn: 'auth/signIn',
    }),
    signUp() {
      this.$router.push({ name: 'Signup' });
    },
    showModal() {
      if (!this.isOpen && this.authenticated) {
        console.log('autenticado');
        this.$router.push({ path: 'home/feed/noticias' });
      } else {
        this.isOpen = !this.isOpen;
      }
    },
    async submit() {
      try {
        await this.signIn(this.form);
        console.log('deu certo');
        this.$router.push({ name: 'Home' });
      } catch (err) {
        console.log('deu errado');
      }
    },
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
    }),
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
