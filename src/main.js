import Vue from 'vue'
import App from './App.vue'
window.axios = require('axios')
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import { routes } from './routes';


Vue.use(VueRouter);
Vue.use(VueAxios, axios);

const router = new VueRouter({
  routes: routes,
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
