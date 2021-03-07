<template>
  <div :class="btnClass">
    <Power class="login-svg" @click="showDialog"></Power>
    <Dialog :show="state.showDialog" :close="closeDialog">
      <div class="login-dialog-block">
        <div class="login-dialog-header">
          <Power class="login-dialog-header-svg"></Power>
          <span class="login-dialog-header-text">Login</span>
        </div>
      </div>
    </Dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';

import { Power } from '@/components/icons';
import user from '@/store/user';
import { UserStatus } from '@/constants/user';
import Dialog from '@/components/Dialog.vue';

export default defineComponent({
  name: 'Login',
  components: { Power, Dialog },
  setup() {
    const state = reactive({
      showDialog: false,
    });

    const btnClass = computed(() => {
      switch (user.state.status) {
        case UserStatus.logout:
          return 'login';
        case UserStatus.login:
          return 'login active';
        default:
          return 'login';
      }
    });

    const showDialog = () => {
      state.showDialog = true;
    };

    const closeDialog = () => {
      state.showDialog = false;
    };

    return { state, btnClass, showDialog, closeDialog };
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/css/breakpoint.scss';
@import '@/assets/css/theme.scss';

.login {
  display: inline-block;
  width: 100%;
  height: 100%;

  .login-svg {
    display: block;
    width: 100%;
    height: 100%;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    &:active {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }

  .login-dialog-block {
    display: inline-block;
    position: relative;
    margin-top: 20vh;
    width: 300px;
    max-height: 60vh;
    text-align: left;
    background-color: theme(white, deep);
    vertical-align: middle;

    .login-dialog-header {
      height: 30px;
      font-size: 18px;
      font-weight: bold;
      color: theme(white);
      background-color: theme(red);

      .login-dialog-header-svg {
        display: inline-block;
        margin: 2px 3px 2px 2px;
        width: 26px;
        height: 26px;
        vertical-align: middle;
      }

      .login-dialog-header-text {
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}

.active {
  color: theme(green);
}
</style>
