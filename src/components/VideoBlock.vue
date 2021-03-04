<template>
  <div class="video-block">
    <div class="video-block-img-container">
      <div class="video-block-img-block">
        <img class="video-block-img" :src="video.thumbnailUrl" />
      </div>
      <div class="video-block-mask">
        <div class="vert-align-mid"></div>
        <span class="video-block-mask-text">+</span>
      </div>
    </div>
    <Tooltip :content="video.title">
      <div class="video-block-title">
        {{ video.title }}
      </div>
    </Tooltip>
    <Tooltip :content="video.channelTitle">
      <div class="video-block-channel-title">{{ video.channelTitle }}</div>
    </Tooltip>
    <div class="video-block-views">
      <template v-if="video.viewCount"><Eye></Eye>{{ video.viewCount }}</template>
    </div>
    <div class="video-block-publish">{{ publishedAt }}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Tooltip from '@/components/Tooltip.vue';
import { Video } from '@/interface/video';
import { Eye } from '@/components/icons';

export default defineComponent({
  name: 'VideoBlock',
  components: { Eye, Tooltip },
  props: {
    videoData: {
      type: Object as PropType<Video>,
      required: true,
    },
  },

  setup(props) {
    const publishedAt = props.videoData.publishedAt
      .slice(0, 16)
      .replace('T', ' ')
      .replaceAll('-', '/');

    return { video: props.videoData, publishedAt };
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/css/breakpoint.scss';
@import '@/assets/css/theme.scss';

.video-block {
  display: inline-block;
  margin: 5px;
  width: calc(100% / 8 - 10px);
  vertical-align: top;

  @include breakpoint(xxxl) {
    width: calc(100% / 6 - 10px);
  }

  @include breakpoint(xxl) {
    width: calc(100% / 4 - 10px);
  }

  @include breakpoint(l) {
    width: calc(100% / 3 - 10px);
  }

  @include breakpoint(m) {
    width: calc(100% / 2 - 10px);
  }

  @include breakpoint(s) {
    width: calc(100% - 10px);
  }

  .video-block-img-container {
    position: relative;
    padding-top: 56.25%;
    width: 100%;
    cursor: pointer;

    .video-block-img-block {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;

      .video-block-img {
        width: 100%;
        height: 100%;
      }
    }

    .video-block-mask {
      display: none;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      font-size: 80px;
      font-weight: bold;
      text-align: center;
      color: theme(gray);
      background-color: rgba(0, 0, 0, 0.3);

      &:active {
        color: theme(white, deep);
      }

      .video-block-mask-text {
        display: inline-block;
        vertical-align: middle;
      }
    }

    &:hover {
      .video-block-mask {
        display: block;

        @include breakpoint(m) {
          display: none;
        }
      }
    }
  }

  .video-block-title {
    height: 22px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .video-block-channel-title,
  .video-block-views,
  .video-block-publish {
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: theme(gray, deep);
    overflow: hidden;
  }

  .video-block-channel-title {
    height: 19px;
  }

  .video-block-views {
    display: inline-block;
    width: calc(100% - 112px);
    height: 15px;

    svg {
      margin-right: 2px;
      width: 14px;
      height: 14px;
      vertical-align: top;
    }
  }

  .video-block-publish {
    display: inline-block;
    width: 112px;
    height: 15px;
  }
}
</style>
