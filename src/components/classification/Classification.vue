<template>
    <div class="container">
        <Search :size="8" class="search" />
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
