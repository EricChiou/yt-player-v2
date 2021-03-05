<template>
  <div class="play-list-add">
    <input ref="addVideoInputRef" class="play-list-add-input" placeholder="URL / Video ID" />
    <button class="play-list-add-btn" @click="doAddVideo">
      <Add></Add>
    </button>
  </div>
  <div class="play-list-title">
    Play List
    <div
      v-if="state.playMode === PlayMode.normal"
      class="play-mode play-mode-disable"
      @click="changePlayMode"
    >
      <RepeatAll></RepeatAll>
    </div>
    <div v-if="state.playMode !== PlayMode.normal" class="play-mode" @click="changePlayMode">
      <RepeatAll v-if="state.playMode === PlayMode.repeatAll"></RepeatAll>
      <RepeatOne v-if="state.playMode === PlayMode.repeatOne"></RepeatOne>
      <Random v-if="state.playMode === PlayMode.reandom"></Random>
    </div>
  </div>
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
import { defineComponent, reactive, watch, ref } from 'vue';

import player, { moveVideo, addVideo } from '@/store/player';
import PlayListBlock from './playListBlock/PlayListBlock.vue';
import { RepeatAll, RepeatOne, Random, Add } from '@/components/icons';
import { PlayMode } from '@/constants/player';
import VideoService from '@/service/video-service';
import { getVideoByIds } from '@/api/video';

export default defineComponent({
  name: 'PlayList',
  components: { PlayListBlock, RepeatAll, RepeatOne, Random, Add },
  setup() {
    const state = reactive({
      dragIndex: -1,
      playMode: PlayMode.normal,
    });
    const addVideoInputRef = ref<HTMLInputElement | null>(null);

    watch(
      () => player.state.playMode,
      () => {
        state.playMode = player.state.playMode;
      },
    );

    watch(
      () => player.state.list,
      () => {
        VideoService.savePlayListIds2Cookie();
      },
    );

    const changePlayMode = () => {
      switch (player.state.playMode) {
        case PlayMode.normal:
          player.state.playMode = PlayMode.repeatAll;
          break;
        case PlayMode.repeatAll:
          player.state.playMode = PlayMode.repeatOne;
          break;
        case PlayMode.repeatOne:
          player.state.playMode = PlayMode.reandom;
          break;
        case PlayMode.reandom:
          player.state.playMode = PlayMode.normal;
          break;
      }
    };

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

    const doAddVideo = () => {
      if (!addVideoInputRef.value || !addVideoInputRef.value.value) {
        return;
      }

      let videoId = addVideoInputRef.value.value;
      const inputValueSep = videoId.split('?');

      if (inputValueSep.length === 2) {
        for (const kvStr of inputValueSep[1].split('&')) {
          const kv = kvStr.split('=');
          if (kv.length === 2 && kv[0] === 'v') {
            videoId = kv[1];
            break;
          }
        }
      }

      getVideoByIds([videoId]).then((resp) => {
        if (resp.status === 200) {
          const video = VideoService.parse(resp.data.items[0]);
          addVideo(video);
        }
      });
    };

    return {
      state,
      player,
      setDragIndex,
      onDragOver,
      onDrop,
      PlayMode,
      changePlayMode,
      addVideoInputRef,
      doAddVideo,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/css/breakpoint.scss';
@import '@/assets/css/theme.scss';

.play-list-add {
  padding: 0 5px;
  height: 30px;

  .play-list-add-input {
    margin-top: 2px;
    width: 200px;
    height: 22px;
    font-size: 16px;
    outline: none;
  }

  .play-list-add-btn {
    display: inline-block;
    margin-top: 2px;
    padding: 0;
    background-color: theme(gray);
    border: 1px solid theme(gray, deep);
    border-radius: 2px;
    outline: none;
    vertical-align: top;
    cursor: pointer;

    &:active {
      background-color: theme(gray, deep);
    }

    svg {
      display: block;
      width: 26px;
      height: 26px;
    }
  }
}

.play-list-title {
  padding: 0 5px;
  height: 30px;
  font-size: 22px;
  line-height: 30px;
  box-shadow: 0px 1px 3px -2px theme(gray, deep);

  .play-mode {
    display: inline-block;
    padding: 1px;
    color: theme(red);
    vertical-align: top;
    cursor: pointer;

    svg {
      display: block;
      width: 28px;
      height: 28px;
    }
  }

  .play-mode-disable {
    color: theme(gray, deep);
  }
}

#play-list {
  height: calc(100% - 30px - 30px);
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
