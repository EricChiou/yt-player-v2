<template>
  <div id="search-video">
    <div class="search-video-header">
      <div class="search-block"></div>
      <div class="mode-block"><TheaterMode></TheaterMode></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { AxiosResponse } from 'axios';

import setting from '@/store/setting';
import { getTrendingVideos } from '@/api/video';
import { TheaterMode } from '@/components/icons';

export default defineComponent({
  name: 'SearchVideo',
  components: { TheaterMode },
  setup() {
    const nextPageToken = ref('');

    const doGetTrendingVideos = () => {
      if (!setting.state.countryCode) {
        return;
      }

      const countryCode = setting.state.countryCode;
      getTrendingVideos(countryCode, nextPageToken.value).then((resp: AxiosResponse) => {
        if (resp.status === 200) {
          console.log(resp.data);
          nextPageToken.value = resp.data.nextPageToken;
        }
      });
    };

    watch(
      () => setting.state.countryCode,
      () => {
        doGetTrendingVideos();
      },
    );
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/css/breakpoint.scss';
@import '@/assets/css/theme.scss';

#search-video {
  .search-video-header {
    height: 40px;
    background-color: theme(red);

    .search-block {
      display: inline-block;
      width: calc(100% - 100px);
    }

    .mode-block {
      display: inline-block;
      width: 100px;
    }
  }
}
</style>
