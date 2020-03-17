<template>
    <div class="background">
        <form id="formulario">
            <label for="nome">Primeiro Nome</label>
            <input type="text" name="nome" id="nome" />
            <label for="sobrenome">Último nome</label>
            <input type="text" name="sobrenome" id="sobrenome" />
            <label for="email">E-mail</label>
            <input type="text" name="email" id="email" />
            <label for="senha">Senha</label>
            <input type="password" name="senha" id="senha" />
        </form>
    </div>
</template>
<script>
export default {
  data() {
    return {

    };
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped />
