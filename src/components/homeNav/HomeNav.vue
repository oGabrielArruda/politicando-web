<template>
  <div class="container-nav">
    <nav>
      <ul>
        <li class="notice selected-notice">
          <p>Notícias</p>
          <img src="../../assets/sidebar/feed.svg" />
        </li>
        <li class="event selected-event">
          <p>Eventos</p>
          <img src="../../assets/sidebar/events.svg" />
        </li>
        <li class="voting selected-voting">
          <p>Votações</p>
          <img src="../../assets/sidebar/voting.svg" />
        </li>
      </ul>
      <button>
        <i class="fas fa-angle-double-down"></i>
      </button>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'HomeNav',
  data() {
    return {};
  },
};
</script>

<style>
</style>
