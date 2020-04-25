<template>
  <nav>
    <img src="../../assets/initial/logo.png" />
    <div class="form-group">
      <a href="#open-modal"><button class="btnEntrar">Entrar</button></a>
      <button class="btnCriar">Criar Conta</button>
    </div>

    <div id="open-modal" class="modal-window">
      <div>
        <a href="#" title="Close" class="modal-close"><i class="far fa-times-circle"></i> </a>

        <input name="email" type="text" placeholder="Endereço de email" />
            <input name="senha" type="text" placeholder="Senha" />
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      logoSrc: '.',
    };
  },
  methods: {
    signUp() {
      this.$router.push({ name: 'Signup' });
    },
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
