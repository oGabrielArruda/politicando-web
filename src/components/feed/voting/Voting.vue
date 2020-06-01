<template>
  <div class="teste">
    <h1>Votações</h1>
    <h1>Votações</h1>
    <h1>Votações</h1>
    <h1>Votações</h1>
    <h1>Votações</h1>
    <h1>Votações</h1>
    <h1>Votações</h1>
    <h1>Votações</h1>
    <h1>Votações</h1>
    <h1>Votações</h1>
    <h1>Votações</h1>
    <h1>Votações</h1>
    <h1>Votações</h1>
    <h1>Votações</h1>
    <h1>Votações</h1>
    <h1>Votações</h1>
    <h1>Votações</h1>
    <h1>Votações</h1>
    <h1>Votações</h1>
    <h1>Votações</h1>
    <h1>Votações</h1>
    <h1>Votações</h1>
    <h1>Votações</h1>
    <h1>Votações</h1>
    <h1>Votações</h1>
    <h1>Votações</h1>
    <h1>Votações</h1>
    <h1>Votações</h1>
    <h1>Votações</h1>
    <h1>Votações</h1>
    <h1>Votações</h1>
    <h1>Votações</h1>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Voting',
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      changeSelectedNav: 'navigation/changeSelectedNav',
    }),
  },
  beforeMount() {
    this.changeSelectedNav(2);
  },
};
</script>

<style scoped lang="scss" >
.teste {
  width: 100%;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
