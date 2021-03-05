import { createStore } from 'vuex';

import { Video } from '@/interface/video';
import { PlayMode } from '@/constants/player';

const actions = {
  addVideo: 'addVideo',
  removeVideo: 'removeVideo',
  moveVideo: 'moveVideo',
  insertVideo: 'insertVideo',
  setCurrentVideo: 'setCurrentVideo',
};

const store = createStore({
  state: {
    list: [] as Video[],
    currentVideo: { index: -1, video: null as Video | null },
    playMode: PlayMode.reandom,
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
    [actions.setCurrentVideo](state, payload: { index: number; video: Video }) {
      state.currentVideo = payload;
    },

  },
  actions: {
    [actions.addVideo]({ commit }, video: Video) {
      commit(actions.addVideo, video);
    },
    [actions.removeVideo]({ commit }, index: number) {
      commit(actions.removeVideo, index);
    },
    [actions.moveVideo]({ commit }, payload: { from: number; to: number }) {
      commit(actions.moveVideo, payload);
    },
    [actions.insertVideo]({ commit }, payload: { index: number; video: Video }) {
      commit(actions.insertVideo, payload);
    },
    [actions.setCurrentVideo]({ commit }, payload: { index: number; video: Video }) {
      commit(actions.setCurrentVideo, payload);
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

export const setCurrentVideo = (index: number, video: Video | null) => {
  store.dispatch(actions.setCurrentVideo, { index, video });
};

const playNormal = (videoList: Video[], currentIndex: number) => {
  if (videoList[currentIndex + 1]) {
    store.dispatch(actions.setCurrentVideo, {
      index: currentIndex + 1,
      video: videoList[currentIndex + 1],
    });
  } else {
    store.dispatch(actions.setCurrentVideo, { index: -1, video: null });
  }
};

const playRepeatAll = (videoList: Video[], currentIndex: number) => {
  if (videoList[currentIndex + 1]) {
    store.dispatch(actions.setCurrentVideo, {
      index: currentIndex + 1,
      video: videoList[currentIndex + 1],
    });
  } else if (videoList[0]) {
    store.dispatch(actions.setCurrentVideo, { index: 0, video: videoList[0] });
  } else {
    store.dispatch(actions.setCurrentVideo, { index: -1, video: null });
  }
};

const playRepeatOne = (videoList: Video[], currentIndex: number) => {
  if (videoList[currentIndex]) {
    store.dispatch(actions.setCurrentVideo, {
      index: currentIndex,
      video: videoList[currentIndex],
    });
  } else {
    store.dispatch(actions.setCurrentVideo, { index: -1, video: null });
  }
};

const playRandom = (videoList: Video[]) => {
  const random = Math.floor(Math.random() * videoList.length);
  if (videoList[random]) {
    store.dispatch(actions.setCurrentVideo, { index: random, video: videoList[random] });
  } else {
    store.dispatch(actions.setCurrentVideo, { index: -1, video: null });
  }
};

export const playNextVideo = () => {
  const videoList = store.state.list;
  const currentIndex = store.state.currentVideo.index;

  switch (store.state.playMode) {
    case PlayMode.normal:
      playNormal(videoList, currentIndex);
      break;
    case PlayMode.repeatAll:
      playRepeatAll(videoList, currentIndex);
      break;
    case PlayMode.repeatOne:
      playRepeatOne(videoList, currentIndex);
      break;
    case PlayMode.reandom: {
      playRandom(videoList);
      break;
    }
  }
};
