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

        <form>
          <p>Seu e-mail</p>
          <input name="email" type="text" placeholder="email@exemplo.com" />
          <p>Sua senha</p>
          <input name="senha" type="password" placeholder="exemplo123" />
          <button type="button">Entrar</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    signUp() {
      this.$router.push({ name: 'Signup' });
    },
    signIn() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
