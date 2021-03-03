import { createStore } from 'vuex';

const actions = {
  setCountryCode: 'setCountryCode',
};

const store = createStore({
  state: {
    countryCode: '',
  },
  mutations: {
    [actions.setCountryCode](state, countryCode: string) {
      state.countryCode = countryCode;
    },
  },
  actions: {
    setCountryCode({ commit }, countryCode: string) {
      commit(actions.setCountryCode, countryCode);
    },
  },
});

export default store;

export const setCountryCode = (countryCode: string) => {
  store.dispatch(actions.setCountryCode, countryCode);
};
