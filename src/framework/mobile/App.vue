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
  /* 以640为设计宽度，1000为计算基数，100vw为屏幕宽度，1000 * 100vw / 640 = 156.25vw */
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
