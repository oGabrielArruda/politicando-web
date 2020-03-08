<template>
  <div>
    <nav-initial />
    <Pesquisa id="pesq"/>
  </div>
</template>

<script>
import NavInitial from "../shared/NavInitial";
import Pesquisa from "../shared/pesquisa/Pesquisa.vue";

export default {
  name: "Home",
  //data(){return{}},
  components: {
    "nav-initial": NavInitial,
     Pesquisa,
  }
};
</script>

<style>
  #pesq{
    margin-top:300px;
    }

</style>
