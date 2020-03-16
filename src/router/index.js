import Vue from 'vue';
import VueRouter from 'vue-router';
import Initial from '../views/initial/Initial.vue';
import Home from '../views/home/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Initial',
    component: Initial,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
