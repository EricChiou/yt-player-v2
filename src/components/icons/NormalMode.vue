<template>
  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      fill="currentColor"
      d="M19 5H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 12H5V7h14v10z"
    />
    <line x1="9" y1="6.5" x2="9" y2="18.5" stroke-width="2" stroke="currentColor"></line>
  </svg>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NormalMode',
});
</script>
