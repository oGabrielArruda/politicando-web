import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    politicoId: 0,
  },
  mutations: {
    set_politicoId: (state, id) => {
      state.politicoId = id;
    },
  },
  actions: {
    changePoliticoId({ commit }, id) {
      commit('set_politicoId', id);
    },
  },
  modules: {
  },
});
