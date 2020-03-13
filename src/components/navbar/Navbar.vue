<template>
  <nav>
    <img src="../../assets/initial/logo2.png" />
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
<style lang="scss">
nav {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 15px 0;
  height: 10vh;
  background: transparent;

  img {
    height: 70px;
    margin-bottom: -15px;
  }

  .form-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 5%;

    input {
      border: none;
      margin-right: 3%;
      background: #ffffff;
      padding: 8px 15px;
      border-radius: 4px;
    }

    button {
      border: none;
      background: #ffffff;
      padding: 8px 25px;
      border-radius: 4px;
      color: #444552;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s;

      &:hover {
        background: rgb(14, 180, 89);
      }
    }
  }
}

::placeholder {
  /* Most modern browsers support this now. */
  color: rgb(99, 99, 99);
}

/*@media (max-width: 1000px) {
  nav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  nav > img {
    margin-bottom: 5px;
  }
}
@media (orientation: landscape) and (max-width: 1024px) {
  nav {
    align-items: center;
    padding-top: 50px;
  }
}*/

@mixin for-phone-only {
  @media (max-width: 599px) { @content; }
}
@mixin for-tablet-portrait-up {
  @media (min-width: 600px) { @content; }
}
@mixin for-tablet-landscape-up {
  @media (min-width: 900px) { @content; }
}
@mixin for-desktop-up {
  @media (min-width: 1200px) { @content; }
}
@mixin for-big-desktop-up {
  @media (min-width: 1800px) { @content; }
}
</style>
