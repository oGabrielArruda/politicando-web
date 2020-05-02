export default {
  namespaced: true,
  state: {
    selected: null,
  },
  getters: {
    politicoSelected(state) {
      console.log('entrou');
      return state.selected;
    },
  },
  mutations: {
    SET_SELECTED(state, payload) {
      state.selected = payload;
    },
  },
  actions: {
    changeSelected({ commit }, payload) {
      commit('SET_SELECTED', payload);
    },
  },
};
