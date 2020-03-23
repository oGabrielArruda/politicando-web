import Vue from 'vue';
import Carousel3d from 'vue-carousel-3d';
import axios from 'axios';
import VueAxios from 'vue-axios';
import AsyncComputed from 'vue-async-computed';

import App from './App.vue';
import router from './router';
import store from './store';

import './assets/styles.scss';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all';

Vue.use(AsyncComputed);
Vue.use(VueAxios, axios);
Vue.use(Carousel3d);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
