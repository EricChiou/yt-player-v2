import { createStore } from 'vuex';

import { UserStatus } from '@/constants/user';

const actions = {
  setUserStatus: 'setUserStatus',
};

const store = createStore({
  state: {
    status: UserStatus.logout,
  },
  mutations: {
    [actions.setUserStatus](state, status: UserStatus) {
      state.status = status;
    },
  },
  actions: {
    [actions.setUserStatus]({ commit }, status: UserStatus) {
      commit(actions.setUserStatus, status);
    },
  },
});

export default store;

export const setUserStatus = (status: UserStatus) => {
  store.dispatch(actions.setUserStatus, status);
};
