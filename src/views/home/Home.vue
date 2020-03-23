<template>
<div>
  <router-view>
    <h1>TESTE</h1>
  </router-view>
</div>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {

    };
  },
  components: {

  },
  created() {
    this.$router.push({ name: 'Feed' });
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
