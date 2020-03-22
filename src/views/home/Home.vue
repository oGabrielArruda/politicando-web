<template>
<div>
  <router-view>

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
