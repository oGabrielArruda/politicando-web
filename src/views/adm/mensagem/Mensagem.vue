<template>
    <div class="card">
        <h1> {{msg.id}} </h1>
        <h1> {{msg.mensagem}} </h1>
        <h1> {{msg.email}} </h1>
        <h1> {{msg.data}} </h1>
        <h1> {{msg.statusF}} </h1>
        <h1> {{msg.tipo}} </h1>
    </div>
</template>

<script>
export default {
  name: 'Mensagem',
  data() {
    return {
    };
  },
  props: ['msg'],
};
</script>

<style lang="scss" src="./styles.scss" scoped />
