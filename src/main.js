import Vue from 'vue';
import Carousel3d from 'vue-carousel-3d';
import App from './App.vue';
import router from './router';
import store from './store';


import './assets/styles.scss';

Vue.use(Carousel3d);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
