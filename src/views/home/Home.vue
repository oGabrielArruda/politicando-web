<template>
  <div class="background">
    <div class="container">
      <Navbar />
      <Header />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '../../components/navbar/Navbar.vue';
import Header from '../../components/header/Header.vue';
import Footer from '../../components/footer/Footer.vue';

export default {
  name: 'Home',
  // data(){return{}},
  components: {
    Navbar,
    Header,
    Footer,
  },
};
</script>
<style lang="scss">
@mixin background-portrait {
  @media (max-width: 399px) and (orientation: portrait) {
    @content;
  }
}

@mixin background-landscape {
  @media (max-width: 570px) and (orientation: landscape) {
    @content;
  }
}

.background {
  height: 100vh;
  background: #27c55bb9;

  .container {
    background: url("../../assets/initial/wave2.svg") no-repeat top,
      url("../../assets/initial/wave.svg") no-repeat bottom;

    @include background-portrait {
      background: none;
    }

    @include background-landscape {
      background: none;
    }
  }
}
</style>
