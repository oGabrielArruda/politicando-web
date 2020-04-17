import Vue from 'vue';
import VueRouter from 'vue-router';
import Initial from '../views/initial/Initial.vue';
import Signup from '../views/signup/Signup.vue';
import Home from '../views/home/Home.vue';
import Feed from '../components/feed/Feed.vue';
import Classification from '../components/classification/Classification.vue';
import Statistics from '../components/statistics/Statistics.vue';
import UsersProfile from '../components/usersProfile/UsersProfile.vue';


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
    children: [
      {
        path: 'feed',
        name: 'Feed',
        component: Feed,
      },
      {
        path: 'classificacao',
        name: 'Classificacao',
        component: Classification,
      },
      {
        path: 'estatisticas',
        name: 'Estatisticas',
        component: Statistics,
      },
      {
        path: 'usersProfile',
        name: 'UsersProfile',
        component: UsersProfile,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
