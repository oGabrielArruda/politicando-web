import Vue from 'vue';
import VueRouter from 'vue-router';
import Initial from '../views/initial/Initial.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Initial',
    component: Initial,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
