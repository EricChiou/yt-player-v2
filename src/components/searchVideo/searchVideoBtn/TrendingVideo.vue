<template>
  <button class="search-video-btn" @click="onClick">
    <Icon></Icon>
  </button>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import { Fire as Icon } from '@/components/icons';

export default defineComponent({
  name: 'TrendingVideo',
  components: { Icon },
  props: {
    click: Function,
  },
  setup(props) {
    return { onClick: props.click };
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/css/breakpoint.scss';
@import '@/assets/css/theme.scss';

.search-video-btn {
  display: inline-block;
  margin-right: 1px;
  padding: 0;
  background-color: theme(gray);
  border: 1px solid theme(gray, deep);
  border-radius: 2px;
  outline: none;
  vertical-align: middle;
  cursor: pointer;

  &:active {
    background-color: theme(gray, deep);
  }

  svg {
    display: block;
    width: 28px;
    height: 28px;
  }
}
</style>
