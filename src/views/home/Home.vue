<template>
  <div class="container">
    <NavbarHome />
    <div class="mid">
      <SidebarComputer/>
      <SidebarMobile />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavbarHome from '../../components/navbarHome/NavbarHome.vue';
import SidebarComputer from '../../components/sidebar/computer/Sidebar.vue';
import SidebarMobile from '../../components/sidebar/mobile/Sidebar.vue';

export default {
  name: 'Home',
  data() {
    return {};
  },
  components: {
    SidebarComputer,
    SidebarMobile,
    NavbarHome,
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
