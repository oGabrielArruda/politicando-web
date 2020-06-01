export default {
  namespaced: true,
  state: {
    nameFilter: null,
  },
  getters: {
    nameFilter(state) {
      return state.nameFilter;
    },
  },
  mutations: {
    SET_NAME_FILTER(state, payload) {
      state.nameFilter = payload;
    },
  },
  actions: {
    changeNameFilter({ commit }, payload) {
      commit('SET_NAME_FILTER', payload);
    },
  },
};
