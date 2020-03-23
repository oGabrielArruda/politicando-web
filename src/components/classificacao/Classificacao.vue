<template>
    <div class="container">
        <Search class="search" />
    </div>
</template>
<script>
import Search from '../search/Search.vue';

export default {
  data() {
    return {

    };
  },
  components: {
    Search,
  },
};
</script>
<style lang="scss" scoped>
    .search{
        margin-top: 27%;
        margin-left: 25%;
        width: 800px;
    }
</style>
