<template>
  <div class="background">
    <div class="header">
      <Navbar />
      <Header />
    </div>
    <div class="teste"></div>
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
/* header responsive bg */
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

/* footer responsive bg */
@mixin footer-mobile-low {
  @media (max-width: 590px) {
    @content;
  }
}

.background {
  height: 100vh;
  background: #27c55bb9;

  .header {
    background: url("../../assets/initial/wave2.svg") no-repeat top,
      url("../../assets/initial/wave.svg") no-repeat bottom;

    @include background-portrait {
      background: none;
    }

    @include background-landscape {
      background: none;
    }
  }

  .teste {
    margin-top: -2px;
    height: 4px;
    background: #fff;
  }
}
</style>
