<template>
  <div id="player">
    <div id="yt-player"></div>
  </div>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent, reactive, onMounted } from 'vue';

export default defineComponent({
  name: 'Player',
  setup() {
    const state = reactive({
      ytPlayer: null,
    });

    const onReady = () => {
      console.log('onReady');
    };

    const onStateChange = () => {
      console.log('onStateChange');
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
