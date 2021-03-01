<template>
  <div
    :id="
      state.innerWidth < 1024
        ? 'home-mobile'
        : state.mode === 'normal'
        ? 'home-normal'
        : state.mode === 'theater'
        ? 'home-theater'
        : 'home-normal'
    "
  >
    <div v-if="state.innerWidth < 1024" class="header"><Header></Header></div>
    <div class="palyer">palyer</div>
    <div v-if="state.innerWidth > 1023" class="side-menu"><SideMenu></SideMenu></div>
    <div class="content">content</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, onUnmounted } from 'vue';

import Header from '@/components/Header.vue';
import SideMenu from '@/components/SideMenu.vue';

export default defineComponent({
  name: 'Home',
  components: { Header, SideMenu },
  setup() {
    const state = reactive({
      innerWidth: window.innerWidth,
      mode: 'normal',
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

    return {
      state,
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
  }
}

#home-normal {
  .palyer {
    margin-left: 300px;
    width: calc(100% - 300px);
    height: calc(100vh - 45px);
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
    height: calc(100vh - 45px);
  }

  .side-menu {
    flex-basis: 300px;
    justify-content: flex-start;
    align-items: stretch;
    min-height: 100vh;
  }

  .content {
    flex-basis: calc(100% - 300px);
    justify-content: flex-start;
    align-items: stretch;
  }
}

#home-mobile {
  .palyer {
    margin-top: 35px;
    width: 100%;
    height: calc(100vh - 35px - 45px);
  }

  .side-menu {
    display: none;
  }

  .content {
    width: 100%;
  }
}
</style>
