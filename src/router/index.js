import Vue from 'vue';
import VueRouter from 'vue-router';
import beforeEach from './beforeEach';

import Initial from '../views/initial/Initial.vue';
import Signup from '../views/signup/Signup.vue';
import Home from '../views/home/Home.vue';
import PerfilPolitico from '../views/perfilPolitico/PerfilPolitico.vue';
import Feed from '../components/feed/Feed.vue';
import Classification from '../components/classification/Classification.vue';
import Statistics from '../components/statistics/Statistics.vue';
import Profile from '../components/profile/Profile.vue';
import Contato from '../views/contato/Contato.vue';
import Adm from '../views/adm/Adm.vue';

import Recents from '../components/feed/recents/Recents.vue';
import News from '../components/feed/news/News.vue';
import Events from '../components/feed/events/Events.vue';
import Voting from '../components/feed/voting/Voting.vue';

import GastosArea from '../components/statistics/gastosArea/GastosArea.vue';
import PresencasArea from '../components/statistics/presencasArea/PresencasArea.vue';
import PropostasArea from '../components/statistics/propostasArea/PropostasArea.vue';

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
    path: '/teste',
    name: 'PerfilPolitico',
    component: PerfilPolitico,
  },
  {
    path: '/contato',
    name: 'Contato',
    component: Contato,
  },
  {
    path: '/adm',
    name: 'Adm',
    component: Adm,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'feed',
        name: 'Feed',
        component: Feed,
        children: [
          {
            path: 'recentes',
            name: 'Recentes',
            component: Recents,
          },
          {
            path: 'noticias',
            name: 'Noticias',
            component: News,
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
        children: [
          {
            path: 'gastos',
            name: 'Gastos',
            component: GastosArea,
          },
          {
            path: 'presencas',
            name: 'Presencas',
            component: PresencasArea,
          },
          {
            path: 'propostas',
            name: 'Propostas',
            component: PropostasArea,
          },
        ],
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
  mode: 'history',
  routes,
});

router.beforeEach(beforeEach);

export default router;
