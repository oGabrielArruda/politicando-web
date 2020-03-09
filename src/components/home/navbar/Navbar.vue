<template>
  <nav>
    <img :src="logoSrc" />
    <div class="form-group">
      <input name="email" type="text" placeholder="Endereço de email" />
      <input name="senha" type="text" placeholder="Senha" />
      <button>Entrar</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      logoSrc: "./src/assets/Logo.png"
    };
  }
};
</script>

<style>
nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin: 15px 0;
}

nav > img {
  height: 70px;
  margin-bottom: -15px;
}

nav .form-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 5%;

}

nav .form-group input {
  border: none;
  margin-right: 3%;
  background: #DBDBDB;
  padding: 8px 15px;
  border-radius: 4px;
}

::placeholder { /* Most modern browsers support this now. */
   color: rgb(99, 99, 99);
}

nav .form-group button {
  border: none;
  background: #1FC468;
  padding: 8px 25px;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;;
}
</style>
