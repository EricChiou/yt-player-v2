<template>
  <div id="search-video">
    <div class="search-video-header">
      <div class="search-block">
        <div class="vert-align-mid"></div>
        <TrendingVideo :click="refreshTrendingVideos"></TrendingVideo>
        <div class="search-video-input-container">
          <input
            class="search-video-input"
            :value="state.keyword"
            @change="keywordOnChnage"
            @keypress="keywordOnKeyPress"
          />
        </div>
        <Search :click="refreshSearchVideos"></Search>
        <ViewList :click="showCollectionList"></ViewList>
      </div>
      <div class="mode-block">
        <div class="vert-align-mid"></div>
        <NormalMode :click="change2NormalMode"></NormalMode>
        <TheaterMode :click="change2TheaterMode"></TheaterMode>
      </div>
    </div>
    <div class="search-video-list">
      <template v-if="!state.listType">
        <VideoBlock
          v-for="video in state.videosList"
          :key="video.id"
          :videoData="video"
        ></VideoBlock>
      </template>
      <div class="search-video-loading" v-if="state.onLoading">
        <img src="@/assets/img/loading.gif" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent, ref, watch, PropType, reactive, onMounted, onUnmounted } from 'vue';
import { AxiosResponse } from 'axios';

import setting from '@/store/setting';
import { getTrendingVideos, searchVideo } from '@/api/video';
import { Mode } from '@/views/Home.vue';
import VideoService from '@/service/video-service';
import VideoBlock from '@/components/VideoBlock.vue';
import NormalMode from './searchVideoBtn/NormalMode.vue';
import TheaterMode from './searchVideoBtn/TheaterMode.vue';
import Search from './searchVideoBtn/Search.vue';
import ViewList from './searchVideoBtn/ViewList.vue';
import TrendingVideo from './searchVideoBtn/TrendingVideo.vue';

export default defineComponent({
  name: 'SearchVideo',
  components: { NormalMode, TheaterMode, TrendingVideo, Search, ViewList, VideoBlock },
  props: {
    changeMode: {
      type: Function as PropType<(mode: Mode) => void>,
      required: true,
    },
  },
  setup(props) {
    const mainCollectionName = 'main';
    const state = reactive({
      videosList: [],
      keyword: '',
      onLoading: false,
      listType: '',
    });
    const nextPageToken = ref('');

    const updateTrendingVideos = () => {
      if (!setting.state.countryCode || state.onLoading) {
        return;
      }

      state.onLoading = true;
      const countryCode = setting.state.countryCode;
      getTrendingVideos(countryCode, nextPageToken.value)
        .then((resp: AxiosResponse) => {
          if (resp.status === 200) {
            state.videosList = state.videosList.concat(
              resp.data.items.map((data: any) => VideoService.parse(data)),
            );
            nextPageToken.value = resp.data.nextPageToken;
          }
        })
        .finally(() => {
          state.onLoading = false;
        });
    };

    const refreshTrendingVideos = () => {
      state.listType = '';
      state.keyword = '';
      state.videosList = [];
      nextPageToken.value = '';
      updateTrendingVideos();
    };

    const showCollectionList = () => {
      state.listType = mainCollectionName;
    };

    watch(
      () => setting.state.countryCode,
      (value, oldValue) => {
        if (value !== oldValue) {
          refreshTrendingVideos();
        }
      },
    );

    const change2NormalMode = () => {
      props.changeMode(Mode.normal);
    };

    const change2TheaterMode = () => {
      props.changeMode(Mode.theater);
    };

    const updateSearchVideos = (keyword: string) => {
      if (!keyword || !setting.state.countryCode || state.onLoading) {
        return;
      }

      state.onLoading = true;
      const countryCode = setting.state.countryCode;
      searchVideo(keyword, countryCode, nextPageToken.value)
        .then((resp: AxiosResponse) => {
          if (resp.status === 200) {
            state.videosList = state.videosList.concat(
              resp.data.items.map((data: any) => VideoService.parse(data)),
            );
            nextPageToken.value = resp.data.nextPageToken;
          }
        })
        .finally(() => {
          state.onLoading = false;
        });
    };

    const refreshSearchVideos = () => {
      if (!state.keyword || state.onLoading) {
        return;
      }

      state.listType = '';
      state.videosList = [];
      nextPageToken.value = '';
      updateSearchVideos(state.keyword);
    };

    const keywordOnChnage = (e: Event) => {
      const ele = e.target as HTMLInputElement;
      state.keyword = ele.value.trim();
    };

    const keywordOnKeyPress = (e: KeyboardEvent) => {
      const ele = e.target as HTMLInputElement;
      if (e.code === 'Enter' && ele.value) {
        state.keyword = ele.value.trim();
        refreshSearchVideos();
      }
    };

    const onScroll = (e: Event) => {
      const ele = e.target as HTMLBodyElement;
      if (ele.scrollHeight - ele.scrollTop < ele.clientHeight + 50) {
        if (state.listType) {
        } else {
          if (state.keyword) {
            updateSearchVideos(state.keyword);
          } else {
            updateTrendingVideos();
          }
        }
      }
    };

    onMounted(() => {
      document.body.addEventListener('scroll', onScroll);
    });

    onUnmounted(() => {
      document.body.removeEventListener('scroll', onScroll);
    });

    return {
      state,
      change2NormalMode,
      change2TheaterMode,
      refreshTrendingVideos,
      keywordOnChnage,
      keywordOnKeyPress,
      refreshSearchVideos,
      showCollectionList,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/css/breakpoint.scss';
@import '@/assets/css/theme.scss';

#search-video {
  min-height: 100vh;

  .search-video-header {
    height: 40px;
    background-color: theme(red);

    .search-block {
      display: inline-block;
      margin-left: 5px;
      width: calc(100% - 5px - 100px);
      height: 100%;
      vertical-align: top;

      @include breakpoint(l) {
        width: calc(100% - 5px);
      }

      .search-video-input-container {
        display: inline-block;
        vertical-align: middle;
        border-radius: 2px;
        overflow: hidden;

        .search-video-input {
          width: 180px;
          height: 24px;
          font-size: 16px;
          outline: none;
        }
      }
    }

    .mode-block {
      display: inline-block;
      margin-right: 4px;
      width: 96px;
      height: 100%;
      text-align: right;
      vertical-align: top;

      @include breakpoint(l) {
        display: none;
      }
    }

    @include breakpoint(l) {
      height: 35px;
    }
  }

  .search-video-list {
    margin: 0 5px;
    width: calc(100% - 10px);

    .search-video-loading {
      margin: 5px 0;
      text-align: center;

      img {
        width: 80px;
      }
    }
  }
}
</style>
