<template>
    <div class="container">
        <Search class="search" />
    </div>
</template>
<script>
import Search from '../search/Search.vue';

export default {
  name: 'Classification',
  data() {
    return {

    };
  },
  components: {
    Search,
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped />
