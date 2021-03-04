<template>
  <div class="play-list-block" :draggable="state.draggable" @dragstart="onDragStart">
    <div class="play-list-block-drag" @mouseenter="enableDrag" @mouseleave="disableDrag">
      <Drag></Drag>
    </div>
    <div class="play-list-block-thumbnail">
      <img :src="props.videoData.thumbnailUrl" />
    </div>
    <div class="play-list-block-content">
      <Tooltip :content="props.videoData.title">
        <div class="play-list-block-title">{{ props.videoData.title }}</div>
      </Tooltip>
      <div class="play-list-block-channel-title">{{ props.videoData.channelTitle }}</div>
    </div>
    <div class="play-list-block-remove">
      <Clear></Clear>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue';

import { Video } from '@/interface/video';
import Tooltip from '@/components/Tooltip.vue';
import { Drag, Clear } from '@/components/icons';

export default defineComponent({
  name: 'PlayListBlock',
  components: { Tooltip, Drag, Clear },
  props: {
    index: Number,
    videoData: { type: Object as PropType<Video>, required: true },
    onDrag: { type: Function, required: true },
  },
  setup(props) {
    const state = reactive({
      draggable: false,
    });

    const enableDrag = () => {
      state.draggable = true;
    };

    const disableDrag = () => {
      state.draggable = false;
    };

    const onDragStart = () => {
      props.onDrag(props.index, props.videoData);
    };

    return { props, state, enableDrag, disableDrag, onDragStart };
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/css/breakpoint.scss';
@import '@/assets/css/theme.scss';

.play-list-block {
  padding: 2.5px 0;

  .play-list-block-drag,
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

  .play-list-block-thumbnail {
    width: 80px;
    height: 55px;
    background-color: #000000;

    img {
      margin: 5px 0;
      width: 100%;
    }
  }

  .play-list-block-content {
    margin-left: 2px;
    width: 178px;

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
