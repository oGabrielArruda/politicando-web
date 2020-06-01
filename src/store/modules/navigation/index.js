export default {
  namespaced: true,
  state: {
    buttonSelectedSide: -1,
    buttonSelectedNav: -1,
    closeSidebarComputer: true,
    closeSidebarMobile: true,
    closeNavbarMobile: true,
    namesNavigation: [],
  },
  getters: {
    buttonSelectedSide(state) {
      return state.buttonSelectedSide;
    },
    buttonSelectedNav(state) {
      return state.buttonSelectedNav;
    },
    closeSidebarComputer(state) {
      return state.closeSidebarComputer;
    },
    closeSidebarMobile(state) {
      return state.closeSidebarMobile;
    },
    closeNavbarMobile(state) {
      return state.closeNavbarMobile;
    },
    namesNavigation(state) {
      return state.namesNavigation;
    },
  },
  mutations: {
    SET_BUTTON_SELECTED_SIDE(state, payload) {
      state.buttonSelectedSide = payload;
    },
    SET_BUTTON_SELECTED_NAV(state, payload) {
      state.buttonSelectedNav = payload;
    },
    SET_SIDEBAR_COMPUTER(state, payload) {
      state.closeSidebarComputer = payload;
    },
    SET_SIDEBAR_MOBILE(state, payload) {
      state.closeSidebarMobile = payload;
    },
    SET_NAVBAR_MOBILE(state, payload) {
      state.closeNavbarMobile = payload;
    },
    SET_NAMES_NAV(state, payload) {
      state.buttonSelectedNav = -1;
      state.namesNavigation = payload;
    },
  },
  actions: {
    changeSelectedSide({ commit }, payload) {
      commit('SET_BUTTON_SELECTED_SIDE', payload);
    },
    changeSelectedNav({ commit }, payload) {
      commit('SET_BUTTON_SELECTED_NAV', payload);
    },
    changeSidebarComputer({ commit }, payload) {
      commit('SET_SIDEBAR_COMPUTER', payload);
    },
    changeSidebarMobile({ commit }, payload) {
      commit('SET_SIDEBAR_MOBILE', payload);
    },
    changeNavbarMobile({ commit }, payload) {
      commit('SET_NAVBAR_MOBILE', payload);
    },
    changeNamesNav({ commit }, payload) {
      commit('SET_NAMES_NAV', payload);
    },
  },
};
