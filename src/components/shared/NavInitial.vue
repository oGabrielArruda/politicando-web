<template>
  <nav>
    <img :src="logoSrc" id="logo">
    <div id="inputs">
      <input name="email" id="email" type="text" placeholder="Endereço de email" />
      <input name="senha" id="senha" type="text" placeholder="Senha" />
      <button id="btn"><b>Entrar</b></button>
    </div>
  </nav>
</template>
<script>
export default {
  name: "NavInitial",
  data() {
    return {
      logoSrc: "./src/assets/logo2.PNG",
    };
  }
};
</script>
<style>
nav {
    position: absolute;
    top: 0;
    right: 0;
  padding: 0.3%;
  height: 60.3px;
  background-color: white;
  width:99.9%;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

#logo{
    width: 320px;
    height: 70px;
    margin-bottom: -15px;
}

#inputs{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 3%;
    
}

#btn{
    padding: 0 3.8%;
    text-align: center;
    background-color: #1FC468;
    border-style: none;
    color:white;
    border-radius: 3px;
    height: 27px;
    width: 100%;
}

input{
    text-indent: 10px;
    border-radius: 3px;
    height: 27px;
    border-style: none;
    margin-right: 2.7%;
    background-color: rgb(214, 210, 210);
}
</style>
