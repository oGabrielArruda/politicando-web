<template>
<div>
    <Feed />
</div>
</template>
<script>
import Feed from '../../components/feed/Feed.vue';

export default {
  name: 'Home',
  data() {
    return {

    };
  },
  components: {
    Feed,
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
