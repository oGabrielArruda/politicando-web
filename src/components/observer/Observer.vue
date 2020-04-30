<template>
<div class="observer" style="height: 50px;">
</div>
</template>

<script>
export default {
  name: 'Observer',
  data() {
    return {
      observer: null,
    };
  },
  mounted() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.$emit('intersect');
      }
    });

    this.observer.observe(this.$el);
  },
};
</script>

<style>

</style>
