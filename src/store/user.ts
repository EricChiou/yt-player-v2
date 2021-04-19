import { createStore } from 'vuex';

import { UserStatus, UserInterface } from '@/constants/user';

const actions = {
  setUserStatus: 'setUserStatus',
  setUserInterface: 'setUserInterface',
};

const store = createStore({
  state: {
    status: UserStatus.logout,
    userInterface: { name: null } as UserInterface,
  },
  mutations: {
    [actions.setUserStatus](state, status: UserStatus) {
      state.status = status;
    },
    [actions.setUserInterface](state, userInterface: UserInterface) {
      state.userInterface = userInterface;
    },
  },
  actions: {
    [actions.setUserStatus]({ commit }, status: UserStatus) {
      commit(actions.setUserStatus, status);
    },
    [actions.setUserInterface]({ commit }, userInterface: UserInterface) {
      commit(actions.setUserInterface, userInterface);
    },
  },
});

export default store;

export const setUserStatus = (status: UserStatus) => {
  store.dispatch(actions.setUserStatus, status);
};

export const setUserInterface = (userInterface: UserInterface) => {
  store.dispatch(actions.setUserInterface, userInterface);
};
