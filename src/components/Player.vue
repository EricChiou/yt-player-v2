<template>
  <div id="player">
    <div id="yt-player"></div>
  </div>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent, reactive, onMounted, watch } from 'vue';

import player, { playNextVideo } from '@/store/player';

export default defineComponent({
  name: 'Player',
  setup() {
    const state = reactive({
      ytPlayer: null as any,
    });

    const onReady = () => {
      console.log('YT Player onReady');
    };

    const onStateChange = (e: any) => {
      console.log('onStateChange');
      if (e.data === 0) {
        playNextVideo();
      }
    };

    const initYtPlayer = () => {
      if ((window as any).YT && (window as any).YT.Player) {
        state.ytPlayer = new (window as any).YT.Player('yt-player', {
          width: '100%',
          height: '100%',
          events: {
            onReady: onReady,
            onStateChange: onStateChange,
          },
        });
      } else {
        setTimeout(() => {
          initYtPlayer();
        }, 500);
      }
    };

    watch(
      () => player.state.currentVideo,
      () => {
        if (!state.ytPlayer || !player.state.currentVideo.video) {
          return;
        }

        state.ytPlayer.loadVideoById(player.state.currentVideo.video.id);
      },
    );

    onMounted(() => {
      initYtPlayer();
    });

    return { state };
  },
});
</script>
<style lang="scss" scoped>
#player {
  width: 100%;
  height: 100%;
}
</style>
