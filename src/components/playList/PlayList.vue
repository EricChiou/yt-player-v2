<template>
  <div id="play-list" @dragover="onDragOver" @drop="onDrop">
    <PlayListBlock
      v-for="(video, index) in player.state.list"
      :key="`${video.id}_${index}`"
      :index="index"
      :videoData="video"
      :onDrag="onDrag"
    ></PlayListBlock>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

import player, { moveVideo } from '@/store/player';
import PlayListBlock from './playListBlock/PlayListBlock.vue';
import { Video } from '@/interface/video';

export default defineComponent({
  name: 'PlayList',
  components: { PlayListBlock },
  setup() {
    const state = reactive({
      dragVideoIndex: -1,
      dragVideo: null,
    } as { dragVideo: Video | null; dragVideoIndex: number });

    const onDrag = (index: number, video: Video) => {
      state.dragVideoIndex = index;
      state.dragVideo = video;
    };

    const onDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const onDrop = () => {
      moveVideo(state.dragVideoIndex, player.state.list.length - 1);
      console.log(player.state.list);
    };

    return {
      player,
      onDrag,
      onDragOver,
      onDrop,
    };
  },
});
</script>
<style lang="scss" scoped>
#play-list {
  height: 100%;
  overflow: auto;
}
</style>
