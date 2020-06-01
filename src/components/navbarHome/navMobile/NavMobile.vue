<template>
  <div class="nav-mobile-container" :class="{ 'open': !closeNavbarMobile }">
    <nav>
      <button type="button" class="button-close" @click="changeNavbarMobile(true)">
        <i class="fas fa-times"></i>
      </button>

      <ul>
        <li
          v-for="(nameNavigation, index) in namesNavigation"
          v-bind="nameNavigation"
          :key="index"
          @click="pushRouter(index)"
          :class="{ 'selected': buttonSelectedNav === index }"
        >{{ nameNavigation.name }}</li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'NavMobile',
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      changeSelectedNav: 'navigation/changeSelectedNav',
      changeNavbarMobile: 'navigation/changeNavbarMobile',
    }),
    pushRouter(i) {
      if (this.buttonSelectedNav === i) {
        this.$toast.error(`Você já está em ${this.namesNavigation[i].name}`);
        return;
      }

      this.changeSelectedNav(i);
      this.$router.push({ path: this.namesNavigation[i].route });
    },
  },
  computed: {
    ...mapGetters({
      buttonSelectedNav: 'navigation/buttonSelectedNav',
      namesNavigation: 'navigation/namesNavigation',
      closeNavbarMobile: 'navigation/closeNavbarMobile',
    }),
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
