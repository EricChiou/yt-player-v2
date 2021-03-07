<template>
  <div id="side-menu">
    <div v-if="props.showHeader" class="header">
      <img class="logo" src="@/assets/img/logo.png" />
      <div class="title">YT-Player</div>
      <div class="side-menu-login">
        <Login></Login>
      </div>
    </div>
    <div
      class="content"
      :style="{
        height: `${props.showHeader ? 'calc(100% - 40px - 50px)' : 'calc(100% - 50px)'}`,
      }"
    >
      <PlayList></PlayList>
    </div>
    <div class="footer">
      <div class="line">
        <a href="https://www.calicomoomoo.ml/entrance/" target="_blank">
          <span class="text">入口網站</span>
        </a>
        |
        <a href="https://github.com/EricChiou/yt-player-v2" target="_blank">
          <img src="@/assets/img/github.png" /> <span class="text">Github</span>
        </a>
      </div>
      <div class="line">© 2021 Calico & MooMoo</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import PlayList from '@/components/playList/PlayList.vue';
import Login from '@/components/Login.vue';

export default defineComponent({
  name: 'SideMenu',
  components: { PlayList, Login },
  props: {
    showHeader: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    return { props };
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/css/breakpoint.scss';
@import '@/assets/css/theme.scss';

#side-menu {
  width: 100%;
  height: 100%;
  color: theme(gray, deep);
  background-color: theme(gray);

  .header {
    height: 40px;
    background-color: theme(red);

    @include breakpoint(l) {
      display: none;
    }

    .logo {
      display: inline-block;
      margin: 2px 0 3px 3px;
      width: 35px;
      height: 35px;
      vertical-align: middle;
    }

    .title {
      display: inline-block;
      margin: 0 0 2px 5px;
      width: calc(100% - 5px - 38px - 40px);
      font-size: 30px;
      font-weight: bold;
      font-style: italic;
      color: theme(white);
      vertical-align: middle;
    }

    .side-menu-login {
      display: inline-block;
      padding: 5px;
      width: 30px;
      height: 30px;
      vertical-align: middle;
    }
  }

  .footer {
    height: 50px;
    text-align: center;
    box-shadow: 0px -1px 3px -2px theme(gray, deep);

    .line {
      padding: 2.5px;
      height: 20px;
      line-height: 20px;

      img {
        display: inline-block;
        width: 20px;
        height: 20px;
        vertical-align: middle;
      }

      a {
        color: theme(gray, deep);
        text-decoration: none;

        .text {
          display: inline-block;
          vertical-align: middle;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
