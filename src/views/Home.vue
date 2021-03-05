<template>
  <div
    :id="
      state.innerWidth < 1024
        ? 'home-mobile'
        : state.mode === Mode.normal
        ? 'home-normal'
        : state.mode === Mode.theater
        ? 'home-theater'
        : 'home-normal'
    "
  >
    <div v-if="state.innerWidth < 1024" class="header"><Header></Header></div>
    <div class="palyer"><Player></Player></div>
    <div v-if="state.innerWidth > 1023" class="side-menu"><SideMenu></SideMenu></div>
    <div class="content">
      <SearchVideo :changeMode="changeMode"></SearchVideo>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, onUnmounted } from 'vue';

import Header from '@/components/Header.vue';
import SideMenu from '@/components/SideMenu.vue';
import Player from '@/components/Player.vue';
import SearchVideo from '@/components/SearchVideo.vue';

export enum Mode {
  normal = 'normal',
  theater = 'theater',
}

export default defineComponent({
  name: 'Home',
  components: { Header, SideMenu, Player, SearchVideo },
  setup() {
    const state = reactive({
      innerWidth: window.innerWidth,
      mode: Mode.normal,
    });

    const resize = () => {
      state.innerWidth = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener('resize', resize);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', resize);
    });

    const changeMode = (mode: Mode) => {
      state.mode = mode;
    };

    return {
      Mode,
      state,
      changeMode,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/css/breakpoint.scss';
@import '@/assets/css/theme.scss';

#home-normal,
#home-theater,
#home-mobile {
  .header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: 35px;
    z-index: 999;
  }
}

#home-normal {
  .palyer {
    margin-left: 300px;
    width: calc(100% - 300px);
    height: calc(100vh - 40px);
  }

  .side-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 300px;
    height: 100vh;
  }

  .content {
    margin-left: 300px;
    width: calc(100% - 300px);
  }
}

#home-theater {
  display: flex;
  flex-wrap: wrap;

  .palyer {
    flex-basis: 100%;
    height: 100vh;
  }

  .side-menu {
    justify-content: flex-start;
    align-items: stretch;
    width: 300px;
    min-height: 100vh;
  }

  .content {
    justify-content: flex-start;
    align-items: stretch;
    width: calc(100% - 300px);
  }
}

#home-mobile {
  .palyer {
    margin-top: 35px;
    width: 100%;
    height: calc(100vh - 35px - 40px);

    @include breakpoint(l) {
      height: calc(100vh - 35px - 35px);
    }
  }

  .side-menu {
    display: none;
  }

  .content {
    width: 100%;
  }
}
</style>
