<template>
  <div class="container">
    <Sidebar :usuario="user" />
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

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
    ...mapGetters({
      user: 'auth/user',
    }),
  },
  created() {
    this.$router.push({ name: 'Feed' });
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
