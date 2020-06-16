<template>
  <nav>
    <img src="../../assets/initial/logo.png" />
    <div class="form-group">
      <button type="button" class="button-signIn" @click="showModal">Minha Conta</button>
      <button type="button" class="button-signUp" @click="signUp">Criar Conta</button>
    </div>
    <Modal id="modal" ref="modal" />
    <Loading v-if="loading" />
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Loading from '../loading/Loading.vue';
import Modal from '../modal/Modal.vue';

export default {
  name: 'Navbar',
  data() {
    return {
      isLoading: false,
      form: {
        email: '',
        senha: '',
      },
    };
  },
  components: {
    Loading,
    Modal,
  },
  methods: {
    ...mapActions({
      signIn: 'auth/signIn',
    }),
    signUp() {
      this.$router.push({ name: 'Signup' });
    },
    showModal() {
      if (this.authenticated) {
        this.$router.push({ path: 'home/feed' });
      }
      this.$refs.modal.showModal();
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
