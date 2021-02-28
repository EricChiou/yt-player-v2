<template>
  <div class="header"></div>
  <div v-if="state.showSideMenu" class="side-menu"></div>
  <div class="main"><slot></slot></div>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive } from 'vue';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const state = reactive({ showSideMenu: window.innerWidth > 1023 });
    const menuStyle = {
      display: 'block',
      width: '30px',
      height: '30px',
      cursor: 'pointer',
    };

    const resize = () => {
      if (window.innerWidth < 1024 && state.showSideMenu) {
        state.showSideMenu = false;
      }
      if (window.innerWidth > 1023 && !state.showSideMenu) {
        state.showSideMenu = true;
      }
    };

    const menuOnClick = () => {
      console.log('menuOnClick');
    };

    onMounted(() => {
      window.addEventListener('resize', resize);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', resize);
    });

    return { state, menuStyle, menuOnClick };
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/css/breakpoint.scss';
@import '@/assets/css/theme.scss';

.header {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 35px;

  @include breakpoint(l) {
    display: block;
  }
}

.side-menu {
  display: inline-block;
  width: 300px;
  height: 100vh;
  vertical-align: top;

  @include breakpoint(l) {
    display: none;
  }
}

.main {
  display: inline-block;
  width: calc(100% - 300px);
  height: 100vh;
  vertical-align: top;

  @include breakpoint(l) {
    margin-top: 35px;
    width: 100%;
    height: calc(100vh - 35px);
  }
}
</style>
