<template>
  <div id="header">
    <div class="login"><Login></Login></div>
    <img class="logo" src="@/assets/img/logo.png" />
    <div class="title">YT-Player</div>
    <div class="menu-btn">
      <MenuIcon class="icon" @click="menuOnClick"></MenuIcon>
    </div>
    <div class="side-menu" :style="{ right: `${state.showMenu ? 0 : -300}px` }">
      <SideMenu :showHeader="false"></SideMenu>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

import SideMenu from '@/components/SideMenu.vue';
import { MenuIcon } from '@/components/icons';
import Login from '@/components/Login.vue';

export default defineComponent({
  name: 'Header',
  components: { MenuIcon, SideMenu, Login },
  setup() {
    const state = reactive({ showMenu: false });

    const menuOnClick = () => {
      state.showMenu = !state.showMenu;
    };

    return { state, menuOnClick };
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/css/breakpoint.scss';
@import '@/assets/css/theme.scss';

#header {
  position: relative;
  height: 100%;
  background-color: theme(red);

  .login {
    display: none;
    margin-left: 1px;
    width: 30px;
    height: 30px;
    vertical-align: middle;

    @include breakpoint(l) {
      display: inline-block;
    }
  }

  .logo {
    display: inline-block;
    margin: 2px 0 3px 3px;
    height: calc(100% - 5px);
    vertical-align: middle;
  }

  .title {
    display: inline-block;
    margin-left: 5px;
    font-size: 26px;
    font-weight: bold;
    font-style: italic;
    color: theme(white);
    vertical-align: middle;
  }

  .menu-btn {
    position: absolute;
    top: 0;
    right: 0;
    color: theme(white);

    .icon {
      display: block;
      margin: 2.5px 3px 2.5px 0;
      width: 30px;
      height: 30px;
      cursor: pointer;

      &:hover {
        background-color: rgba(0, 0, 0, 0.15);
      }

      &:active {
        color: theme(gray);
      }
    }
  }

  .side-menu {
    position: absolute;
    top: 100%;
    right: 0;
    width: 300px;
    height: calc(100vh - 35px);
    transition: right 0.2s;
  }
}
</style>
