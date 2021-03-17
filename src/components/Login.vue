<template>
  <div :class="btnClass">
    <Power class="login-svg" @click="showDialog"></Power>
    <Dialog :show="state.showDialog" :close="closeDialog">
      <div class="login-dialog-block">
        <div class="login-dialog-header">
          <Power class="login-dialog-header-svg"></Power>
          <span class="login-dialog-header-text">Login</span>
          <Clear class="login-dialog-header-close" @click="closeDialog"></Clear>
        </div>
        <template v-if="!isLogin">
          <div class="login-dialog-body">
            <div class="login-dialog-body-row">
              &nbsp;Account: <BaseInput :style="inputStyle"></BaseInput>
            </div>
            <div class="login-dialog-body-row">
              Password: <BaseInput :style="inputStyle"></BaseInput>
            </div>
          </div>
          <div class="login-dialog-footer">
            <BaseButton :type="ButtonType.confirm" :style="loginBtnStyle" @click="doLogin">
              Login
            </BaseButton>
          </div>
        </template>
        <template v-if="isLogin">
          <div class="login-dialog-body">
            <div class="login-dialog-body-option"><Setting></Setting>&nbsp;&nbsp;Settings</div>
            <div class="login-dialog-body-option">
              <Password></Password>&nbsp;&nbsp;Change Password
            </div>
            <div class="login-dialog-body-option" @click="doLogout">
              <Logout></Logout>&nbsp;&nbsp;Logout
            </div>
          </div>
        </template>
      </div>
    </Dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';

import { Power, Clear, Setting, Password, Logout } from '@/components/icons';
import user, { setUserStatus } from '@/store/user';
import { UserStatus } from '@/constants/user';
import Dialog from '@/components/Dialog.vue';
import { BaseInput, BaseButton, ButtonType } from '@/components/common';

export default defineComponent({
  name: 'Login',
  components: { Power, Dialog, Clear, BaseInput, BaseButton, Setting, Password, Logout },
  setup() {
    const state = reactive({
      showDialog: false,
    });
    const inputStyle = { width: '194px' };
    const loginBtnStyle = { fontSize: '16px' };

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
    const isLogin = computed(() => user.state.status === UserStatus.login);

    const showDialog = () => {
      state.showDialog = true;
    };

    const closeDialog = () => {
      state.showDialog = false;
    };

    const doLogin = () => {
      setUserStatus(UserStatus.login);
      state.showDialog = false;
    };

    const doLogout = () => {
      setUserStatus(UserStatus.logout);
      state.showDialog = false;
    };

    return {
      state,
      btnClass,
      showDialog,
      closeDialog,
      inputStyle,
      ButtonType,
      loginBtnStyle,
      isLogin,
      doLogin,
      doLogout,
    };
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
  color: theme(gray, deep);

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
    color: theme(black);
    background-color: theme(white, deep);
    vertical-align: middle;

    .login-dialog-header {
      position: relative;
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

      .login-dialog-header-close {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        padding: 1px;
        width: 28px;
        height: 28px;
        cursor: pointer;
      }
    }

    .login-dialog-body {
      .login-dialog-body-row {
        margin-top: 10px;
        padding: 0 10px;
      }

      .login-dialog-body-option {
        padding: 10px 15px;
        font-size: 18px;
        text-align: left;
        cursor: pointer;

        &:hover {
          background-color: rgba(0, 0, 0, 0.15);
        }

        &:active {
          background-color: rgba(0, 0, 0, 0.2);
        }

        svg {
          vertical-align: middle;
        }
      }
    }

    .login-dialog-footer {
      margin: 10px 0;
      text-align: center;
    }
  }
}

.active {
  color: theme(white);
}
</style>
