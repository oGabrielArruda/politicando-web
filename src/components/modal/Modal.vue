<template>
  <div class="container-modal">
    <div class="modal-window" v-if="isOpen">
      <div>
        <button type="button" class="button-close" @click="showModal">
          <i class="fas fa-times"></i>
        </button>

        <form @submit.prevent="submit">
          <p class="text"> {{ text }} </p>
          <p>Seu e-mail</p>
          <input name="email" type="text" placeholder="email@exemplo.com" v-model="form.email" />
          <p>Sua senha</p>
          <input name="senha" type="password" placeholder="exemplo123" v-model="form.senha" />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
    <Loading v-if="loading"/>

  </div>


</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Loading from '../loading/Loading.vue';

export default {
  name: 'Modal',
  data() {
    return {
      isOpen: false,
      isLoading: false,
      text: '',
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
    showModal() {
      this.isOpen = !this.isOpen;
      if (this.authenticated) {
        this.text = 'Confirme seus dados';
      }
    },
    async submit() {
      if (!this.form.email || !this.form.senha) {
        this.$toast.error('Preencha todos os campos!');
        return;
      }

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
      user: 'auth/user',
      authenticated: 'auth/authenticated',
    }),
    loading() {
      return this.isLoading;
    },
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
