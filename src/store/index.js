import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    politicoCarrossel: {},
  },
  mutations: {
    set_politicoCarrossel: (state, politico) => {
      state.politicoCarrossel = politico;
    },
  },
  actions: {
    changePoliticoCarrossel({ commit }, politico) {
      commit('set_politicoCarrossel', politico);
    },
  },
  modules: {
  },
});
