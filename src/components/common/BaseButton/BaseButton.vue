<template>
  <button :class="btnClass" :style="props.style" :disabled="props.disabled" @click="props.click">
    <slot></slot>
  </button>
</template>
<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';

import { ButtonType } from './constants';

export default defineComponent({
  name: 'BaseButton',
  props: {
    type: {
      type: String as PropType<ButtonType>,
      default: ButtonType.normal,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    style: Object,
    click: Function,
  },
  setup(props) {
    const btnClass = computed(() => {
      let className = 'base-btn';
      switch (props.type) {
        case ButtonType.normal:
          className += ' base-btn-normal';
          break;
        case ButtonType.confirm:
          className += ' base-btn-confirm';
          break;
      }

      if (props.disabled) {
        className += ' base-btn-disabled';
      }

      return className;
    });

    return { props, btnClass };
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/css/breakpoint.scss';
@import '@/assets/css/theme.scss';

.base-btn {
  padding: 2px 3px;
  border: 1px solid theme(gray, deep);
  outline: none;
  cursor: pointer;
}

.base-btn-disabled {
  cursor: not-allowed;
}

.base-btn-normal {
  color: theme(black);
  background-color: theme(gray);
}

.base-btn-confirm {
  color: theme(white);
  background-color: theme(red);
  border: 1px solid theme(red);

  &:active {
    border: 1px solid theme(gray);
  }
}
</style>
