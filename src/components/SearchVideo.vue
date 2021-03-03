<template>
  <div id="search-video">Search Video</div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

import setting from '@/store/setting';
import { getTrendingVideos } from '@/api/video';

export default defineComponent({
  name: 'SearchVideo',
  setup() {
    const nextPageToken = ref('');

    const doGetTrendingVideos = () => {
      if (!setting.state.countryCode) {
        return;
      }

      const countryCode = setting.state.countryCode;
      getTrendingVideos(countryCode, nextPageToken.value).then((resp) => {
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
#search-video {
}
</style>
