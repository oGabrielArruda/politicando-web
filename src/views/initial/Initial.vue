<template>
  <div class="background">
    <div class="header">
      <Navbar />
      <Header />
    </div>
    <div class="light-bar"></div>
    <main>
      <h1>Qual o melhor político de acordo com o seu filtro?</h1>
      <Search :size="10" :showBorder="true" />
      <Table :size="10" :showBorder="true"/>
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from '../../components/navbar/Navbar.vue';
import Header from '../../components/header/Header.vue';
import Search from '../../components/search/Search.vue';
import Table from '../../components/table/Table.vue';
import Footer from '../../components/footer/Footer.vue';

export default {
  name: 'Initial',
  data() {
    return {};
  },
  components: {
    Navbar,
    Header,
    Search,
    Table,
    Footer,
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
