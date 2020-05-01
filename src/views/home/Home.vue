<template>
  <div class="container">
    <Sidebar :usuario="user" />
    <router-view></router-view>
  </div>
</template>

<script>
import Sidebar from '../../components/sidebar/Sidebar.vue';


export default {
  name: 'Home',
  data() {
    return {
    };
  },
  components: {
    Sidebar,
  },
  computed: {
    user() {
      console.log(this.$store.state.user);
      return this.$store.state.user;
    },
  },
  created() {
    this.$router.push({ name: 'Feed' });
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
