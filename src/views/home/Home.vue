<template>
  <div class="container">
    <Sidebar />
    <router-view></router-view>
  </div>
</template>

<script>
import Sidebar from '../../components/sidebar/Sidebar.vue';

export default {
  name: 'Home',
  data() {
    return {};
  },
  components: {
    Sidebar,
  },
  created() {
    this.$router.push({ name: 'Feed' });
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
