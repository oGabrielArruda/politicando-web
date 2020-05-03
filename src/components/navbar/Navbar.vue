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
    <Loading v-if="loading" />
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Loading from '../loading/Loading.vue';

export default {
  name: 'Navbar',
  data() {
    return {
      isOpen: false,
      isLoading: false,
      form: {
        email: '',
        senha: '',
      },
    };
  },
  components: {
    Loading,
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
      this.isLoading = true;

      try {
        await this.signIn(this.form);

        this.isLoading = false;
        this.$toast.success(`Seja bem-vindo ${(this.user).nome}`);
        this.$router.push({ name: 'Home' });
      } catch (err) {
        this.isLoading = false;
        this.$toast.error('E-mail ou senha incorretos');
      }
    },
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
    }),
    loading() {
      return this.isLoading;
    },
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
