<template>
  <div v-if="showDialog" :class="dialogClass" @click="closeDialog">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'Dialog',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    close: Function,
    mask: {
      type: Boolean,
      default: true,
    },
    closeByClick: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const showDialog = computed(() => props.show);
    const dialogClass = computed(() =>
      props.mask ? 'dialog-container dialog-mask' : 'dialog-container',
    );

    const closeDialog = (e: MouseEvent) => {
      if (!props.closeByClick || !props.close) {
        return;
      }

      const target = e.target as HTMLDivElement;
      if (target.className.indexOf('dialog-container') > -1) {
        props.close();
      }
    };

    return { showDialog, dialogClass, closeDialog };
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/css/breakpoint.scss';
@import '@/assets/css/theme.scss';

.dialog-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: center;
  z-index: 999;
}

.dialog-mask {
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
