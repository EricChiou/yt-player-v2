import { createStore } from 'vuex';

import { Video } from '@/interface/video';

const actions = {
  addVideo: 'addVideo',
  removeVideo: 'removeVideo',
  moveVideo: 'moveVideo',
  insertVideo: 'insertVideo',
};

const store = createStore({
  state: {
    list: [] as Video[],
  },
  mutations: {
    [actions.addVideo](state, video: Video) {
      const newList = [...state.list, video];
      state.list = newList;
    },
    [actions.removeVideo](state, index: number) {
      if (!state.list[index]) { return; }

      const newList = [...state.list];
      newList.splice(index, 1);
      state.list = newList;
    },
    [actions.moveVideo](state, payload: { from: number; to: number }) {
      const from = payload.from;
      const to = payload.to;
      if (from === to || from < 0 || to < 0) { return; }
      if (!state.list[from] || to > state.list.length + 1) { return; }

      const newList = [...state.list];
      const video = state.list[from];

      newList.splice(to, 0, video);
      newList.splice(from < to ? from : from + 1, 1);

      state.list = newList;
    },
    [actions.insertVideo](state, payload: { index: number; video: Video }) {
      const newList = [...state.list];
      state.list = newList.splice(payload.index, 0, payload.video);
    },
  },
  actions: {
    addVideo({ commit }, video: Video) {
      commit(actions.addVideo, video);
    },
    removeVideo({ commit }, index: number) {
      commit(actions.removeVideo, index);
    },
    moveVideo({ commit }, payload: { from: number; to: number }) {
      commit(actions.moveVideo, payload);
    },
    insertVideo({ commit }, payload: { index: number; video: Video }) {
      commit(actions.insertVideo, payload);
    },
  },
});

export default store;

export const addVideo = (video: Video) => {
  store.dispatch(actions.addVideo, video);
};

export const removeVideo = (index: number) => {
  store.dispatch(actions.removeVideo, index);
};

export const moveVideo = (from: number, to: number) => {
  store.dispatch(actions.moveVideo, { from, to });
};

export const insertVideo = (index: number, video: Video) => {
  store.dispatch(actions.insertVideo, { index, video });
};
