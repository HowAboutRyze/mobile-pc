<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body,html {
  /* 以640为设计宽度，1px = 1000 / 640 = 1.5625 ，设置根节点字体为100px，即156.25vw */
  font-size: 156.25vw;
}
#app {
  font-size: .06rem;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
