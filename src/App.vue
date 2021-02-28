<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <router-view />
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inconsolata&display=swap');

html,
body {
  position: relative;
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  font-family: 'Inconsolata', 'Microsoft JhengHei', Arial, Helvetica, sans-serif, monospace;
  overflow: auto;
}

.vert-align-mid {
  display: inline-block;
  width: 0;
  height: 100%;
  vertical-align: middle;
}
</style>
