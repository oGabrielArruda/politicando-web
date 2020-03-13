<template>
  <div class="container">
    <Navbar />
    <Header />
  </div>
</template>

<script>
import Navbar from '../../components/navbar/Navbar.vue';
import Header from '../../components/header/Header.vue';

export default {
  name: 'Home',
  // data(){return{}},
  components: {
    Navbar,
    Header,
  },
};
</script>
<style lang="scss">
.container {
  height: 100vh;
  background: rgba(39, 197, 91, 0.726);
}
</style>
