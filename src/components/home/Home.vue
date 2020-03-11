<template>
  <div class="container">
    <Navbar />
    <Header />
    <Wave />
  </div>
</template>

<script>
import Navbar from "./navbar/Navbar";
import Header from "./header/Header";

export default {
  name: "Home",
  //data(){return{}},
  components: {
    Navbar,
    Header
  }
};
</script>
<style>
.container {
  height: 100vh;
  background: url("../../assets/initial/oval.svg") no-repeat;
  background-position: right top; 
}

@media (orientation: landscape) and (max-width : 1024px){
}
</style>
