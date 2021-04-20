<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import { getCountryCode } from '@/api/geolocation';
import VideoService from '@/service/video-service';
import { getVideoByIds } from '@/api/video';
import { addVideo } from '@/store/player';

export default defineComponent({
  name: 'App',
  setup() {
    onMounted(() => {
      getCountryCode();

      try {
        const idsStr = VideoService.getPlayListIdsFrCookie();
        if (idsStr) {
          const ids: string[] = JSON.parse(idsStr);

          getVideoByIds(ids).then((resp) => {
            if (resp.status === 200) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              resp.data.items.forEach((data: any) => {
                const video = VideoService.parse(data);
                addVideo(video);
              });
            }
          });
        }
      } catch (error) {}
    });
  },
});
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inconsolata&display=swap');

html,
body {
  position: relative;
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  font-family: 'Inconsolata', 'Microsoft JhengHei', Arial, Helvetica, sans-serif, monospace;
  overflow: auto;
}

.vert-align-mid {
  display: inline-block;
  width: 0;
  height: 100%;
  vertical-align: middle;
}
</style>
