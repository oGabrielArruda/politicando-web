import Vue from 'vue';
import VueRouter from 'vue-router';
import Initial from '../views/initial/Initial.vue';
import Signup from '../views/signup/Signup.vue';
import Home from '../views/home/Home.vue';
import Feed from '../components/feed/Feed.vue';
import Classification from '../components/classification/Classification.vue';
import Statistics from '../components/statistics/Statistics.vue';
import Profile from '../components/profile/Profile.vue';

import News from '../components/feed/news/News.vue';
import Events from '../components/feed/events/Events.vue';
import Voting from '../components/feed/voting/Voting.vue';


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
        children: [
          {
            path: 'noticias',
            name: 'Noticias',
            component: News,
            props: true,
          },
          {
            path: 'eventos',
            name: 'Eventos',
            component: Events,
          },
          {
            path: 'votacoes',
            name: 'Votacoes',
            component: Voting,
          },
        ],
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
        path: 'profile',
        name: 'Profile',
        component: Profile,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
