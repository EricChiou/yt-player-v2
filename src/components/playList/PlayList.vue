<template>
  <div id="play-list" @dragover="onDragOver" @drop="onDrop">
    <PlayListBlock
      v-for="(video, index) in player.state.list"
      :key="`${video.id}_${index}`"
      :index="index"
      :videoData="video"
      :dragIndex="state.dragIndex"
      :setDragIndex="setDragIndex"
    ></PlayListBlock>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

import player, { moveVideo } from '@/store/player';
import PlayListBlock from './playListBlock/PlayListBlock.vue';

export default defineComponent({
  name: 'PlayList',
  components: { PlayListBlock },
  setup() {
    const state = reactive({
      dragIndex: -1,
    });

    const setDragIndex = (index: number) => {
      state.dragIndex = index;
    };

    const onDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const onDrop = () => {
      if (state.dragIndex < 0) {
        return;
      }
      moveVideo(state.dragIndex, player.state.list.length);
    };

    return {
      state,
      player,
      setDragIndex,
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

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #bababa;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #909090;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #787878;
  }

  scrollbar-color: #909090 #bababa;
  scrollbar-width: thin;
}
</style>
