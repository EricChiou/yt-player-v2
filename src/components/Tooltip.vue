<template>
  <div
    ref="toolTipRef"
    class="tooltip"
    :style="props.style"
    @mouseenter="startCountDown"
    @mouseleave="clearCountDown"
  >
    <slot></slot>
    <div
      v-if="state.show"
      class="tooltip-block"
      :style="{ top: `${state.top}px`, left: `${state.left}px`, width: `${state.width}px` }"
    >
      {{ props.content }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
  name: 'Tooltip',
  props: {
    style: Object,
    content: [String, Number, Object, Function],
  },
  setup(props) {
    const state = reactive({
      show: false,
      top: 0,
      left: 0,
      width: 0,
    });
    const toolTipRef = ref<HTMLDivElement | null>(null);
    const countDown = ref<number | null>(null);

    const clearCountDown = () => {
      if (countDown.value) {
        clearTimeout(countDown.value);
        countDown.value = null;
      }

      state.show = false;
    };

    const startCountDown = () => {
      if (window.innerWidth < 768) {
        return;
      }

      clearCountDown();

      countDown.value = window.setTimeout(() => {
        if (toolTipRef.value) {
          const clientRect = toolTipRef.value.getBoundingClientRect();
          state.top = clientRect.top + toolTipRef.value.clientHeight;
          state.left = clientRect.left;
          state.width = toolTipRef.value.clientWidth;
        }

        state.show = true;
      }, 500);
    };

    return { props, state, toolTipRef, startCountDown, clearCountDown };
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/css/breakpoint.scss';
@import '@/assets/css/theme.scss';

.tooltip {
  .tooltip-block {
    position: fixed;
    padding: 0 2px 2px 2px;
    white-space: initial;
    background-color: theme(white, deep);
    border: 1px solid #000000;
    z-index: 99;
  }
}
</style>
