<template>
  <div class="main-layout-header"></div>
  <div v-if="state.showSideMenu" class="main-layout-side-menu">
    <SideMenu></SideMenu>
  </div>
  <div class="main-layout-content">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive } from 'vue';

import SideMenu from '@/components/SideMenu.vue';

export default defineComponent({
  name: 'MainLayout',
  components: { SideMenu },
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

.main-layout-header {
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

.main-layout-side-menu {
  display: inline-block;
  width: 300px;
  height: 100vh;
  vertical-align: top;

  @include breakpoint(l) {
    display: none;
  }
}

.main-layout-content {
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
