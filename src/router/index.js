import Vue from 'vue';
import VueRouter from 'vue-router';
import Initial from '../views/initial/Initial.vue';
import Signup from '../views/signup/Signup.vue';
import Home from '../views/home/Home.vue';
import Feed from '../components/feed/Feed.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Initial',
    component: Initial,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/home',
    component: Home,
    children: [{ path: 'feed', name: 'Feed', component: Feed }],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
