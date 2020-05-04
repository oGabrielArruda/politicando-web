import Vue from 'vue';

import Carousel3d from 'vue-carousel-3d';
import axios from 'axios';
import VueAxios from 'vue-axios';
import AsyncComputed from 'vue-async-computed';
import vSelect from 'vue-select';
import Toast from 'vue-toastification';

import App from './App.vue';
import router from './router';
import store from './store';

import './assets/styles.scss';
import 'vue-select/src/scss/vue-select.scss';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all';
import 'vue-toastification/dist/index.css';

import './store/modules/auth/subscriber';

Vue.use(AsyncComputed);
Vue.use(VueAxios, axios);
Vue.use(Carousel3d);
Vue.use(vSelect);
Vue.use(Toast, {
  timeout: 3000,
});

Vue.config.productionTip = false;

store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
});
