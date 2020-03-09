<template>
  <div>
    <Navbar />
    <Header />
  </div>
</template>

<script>
import Navbar from "./navbar/Navbar";
import Header from './header/Header';

export default {
  name: "Home",
  //data(){return{}},
  components: {
    Navbar,
    Header,
  },
};
</script>

<style>
</style>
