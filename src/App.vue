<template>
  <div id="app">
    <nav-initial />
  </div>
</template>

<script>
import navInitial from './components/initial/NavInitial'
export default {
  name: 'app',
  data () {
    return {

    }
  },

  components:{
    "nav-initial": navInitial,
  }
};
</script>

<style>

</style>
