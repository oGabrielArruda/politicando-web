<template>
  <div class="background">
    <div class="header">
      <Navbar />
      <Header />
    </div>
    <div class="light-bar"></div>
    <Classification />
    <Footer />
  </div>
</template>

<script>
import Navbar from '../../components/navbar/Navbar.vue';
import Header from '../../components/header/Header.vue';
import Classification from './classification/Classification.vue';
import Footer from '../../components/footer/Footer.vue';

export default {
  name: 'Initial',
  // data(){return{}},
  components: {
    Navbar,
    Header,
    Classification,
    Footer,
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
