<template>
  <div
    ref="playListBlockRef"
    class="play-list-block"
    :style="state.showAnchor ? { borderBottom: '3px solid #aaaaaa' } : undefined"
    :draggable="state.draggable"
    @dragstart="onDragStart"
    @dragover="onDragOver"
    @dragleave="hideAnchor"
    @dragend="hideAnchor"
    @drop="onDrop"
  >
    <div
      v-if="deviceInfo && !deviceInfo.mobile"
      class="play-list-block-drag"
      @mouseenter="enableDrag"
      @mouseleave="disableDrag"
    >
      <Drag></Drag>
    </div>
    <div v-if="deviceInfo && deviceInfo.mobile" class="play-list-block-move">
      <ArrowUp @click="moveUp"></ArrowUp>
      <ArrowDown @click="moveDown"></ArrowDown>
    </div>
    <div class="play-list-block-thumbnail" @click="playVideo">
      <img :src="props.videoData.thumbnailUrl" />
      <div v-if="state.showPlaying" class="play-list-block-thumbnail-playing">
        <Play></Play>
      </div>
    </div>
    <div class="play-list-block-content" @click="playVideo">
      <Tooltip :content="props.videoData.title">
        <div class="play-list-block-title">{{ props.videoData.title }}</div>
      </Tooltip>
      <div class="play-list-block-channel-title">{{ props.videoData.channelTitle }}</div>
    </div>
    <div class="play-list-block-remove" @click="doRemoveVideo">
      <Clear></Clear>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive, ref, watch } from 'vue';

import player, { moveVideo, removeVideo, setCurrentVideo } from '@/store/player';
import { Video } from '@/interface/video';
import Tooltip from '@/components/Tooltip.vue';
import { Drag, Clear, ArrowUp, ArrowDown, Play } from '@/components/icons';
import { getDeviceInfo } from '@/util/deviceDetector-util';

export default defineComponent({
  name: 'PlayListBlock',
  components: { Tooltip, Drag, Clear, ArrowUp, ArrowDown, Play },
  props: {
    index: { type: Number, required: true },
    videoData: { type: Object as PropType<Video>, required: true },
    dragIndex: { type: Number, required: true },
    setDragIndex: { type: Function, required: true },
  },
  setup(props) {
    const state = reactive({
      draggable: false,
      showAnchor: false,
      showPlaying: false,
    });
    const playListBlockRef = ref<HTMLDivElement | null>(null);
    const deviceInfo = getDeviceInfo();

    watch(
      () => player.state.currentVideo,
      () => {
        const currentVideo = player.state.currentVideo;
        if (!currentVideo.video) {
          state.showPlaying = false;
          return;
        }

        if (currentVideo.index === props.index && currentVideo.video.id === props.videoData.id) {
          state.showPlaying = true;
        } else {
          state.showPlaying = false;
        }
      },
    );

    const enableDrag = () => {
      state.draggable = true;
    };

    const disableDrag = () => {
      state.draggable = false;
    };

    const hideAnchor = () => {
      if (state.showAnchor) {
        state.showAnchor = false;
      }
    };

    const onDragStart = () => {
      props.setDragIndex(props.index);
    };

    const onDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!state.showAnchor) {
        state.showAnchor = true;
      }
    };

    const onDrop = (e: DragEvent) => {
      e.stopPropagation();

      if (props.dragIndex < 0) {
        return;
      }
      moveVideo(props.dragIndex, props.index + 1);

      hideAnchor();
    };

    const moveUp = () => {
      if (props.index === 0) {
        return;
      }
      moveVideo(props.index, props.index - 1);
    };

    const moveDown = () => {
      if (props.index === player.state.list.length - 1) {
        return;
      }
      moveVideo(props.index, props.index + 2);
    };

    const doRemoveVideo = () => {
      removeVideo(props.index);
    };

    const playVideo = () => {
      setCurrentVideo(props.index, props.videoData);
    };

    return {
      props,
      state,
      enableDrag,
      disableDrag,
      onDragStart,
      onDragOver,
      hideAnchor,
      onDrop,
      moveUp,
      moveDown,
      playListBlockRef,
      doRemoveVideo,
      deviceInfo,
      playVideo,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/css/breakpoint.scss';
@import '@/assets/css/theme.scss';

.play-list-block {
  padding: 2.5px 0;
  // white-space: nowrap;

  .play-list-block-drag,
  .play-list-block-move,
  .play-list-block-thumbnail,
  .play-list-block-content,
  .play-list-block-remove {
    display: inline-block;
    vertical-align: middle;
  }

  .play-list-block-drag {
    width: 20px;
    height: 55px;
    background-color: rgba(0, 0, 0, 0.15);
    cursor: grab;

    svg {
      display: block;
      margin: 15px 0;
      width: 100%;
      height: 25px;
    }
  }

  .play-list-block-move {
    width: 20px;
    height: 55px;
    background-color: rgba(0, 0, 0, 0.15);
    cursor: grab;

    svg {
      display: block;
      margin: 2.5px 0;
      width: 100%;
      height: 25px;
    }
  }

  .play-list-block-thumbnail {
    position: relative;
    width: 80px;
    height: 55px;
    background-color: #000000;
    cursor: pointer;

    img {
      margin: 5px 0;
      width: 100%;
    }

    .play-list-block-thumbnail-playing {
      position: absolute;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);

      svg {
        display: block;
        width: 25px;
        height: 25px;
        color: theme(red);
      }
    }
  }

  .play-list-block-content {
    margin-left: 2px;
    width: calc(100% - 122px);
    cursor: pointer;

    .play-list-block-title {
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #000000;
      overflow: hidden;
    }
    .play-list-block-channel-title {
      font-size: 14px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  .play-list-block-remove {
    width: 20px;
    background-color: rgba(0, 0, 0, 0.15);
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.25);
    }

    &:active {
      background-color: rgba(0, 0, 0, 0.15);
    }

    svg {
      display: block;
      margin: 15px 0;
      width: 100%;
      height: 25px;
    }
  }
}
</style>
