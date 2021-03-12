<template>
  <input
    class="base-input"
    :type="props.type"
    :style="props.style"
    :disabled="props.disabled"
    @change="props.change"
    @focus="props.focus"
    @blur="props.blur"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseInput',
  props: {
    type: {
      type: String,
      default: 'text',
    },
    style: Object,
    disabled: {
      type: Boolean,
      default: false,
    },
    change: Function,
    focus: Function,
    blur: Function,
  },
  setup(props) {
    return { props };
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/css/breakpoint.scss';
@import '@/assets/css/theme.scss';

.base-input {
  display: inline-block;
  padding: 1px 2px;
  height: 22px;
  font-size: 16px;
  border: 1px solid theme(gray, deep);
  border-radius: 2px;
  outline: none;
  vertical-align: middle;
}
</style>
