<template>
  <nav>
    <img src="../../assets/initial/logo.png" />
    <div class="form-group">
      <input name="email" type="text" placeholder="Endereço de email" />
      <input name="senha" type="text" placeholder="Senha" />
      <button>Entrar</button>
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
};
</script>

<style lang="scss" src="./styles.scss" scoped />
