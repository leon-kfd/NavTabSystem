<template>
  <div id="app">
    <Home v-if="!$store.state.reloadFlag" />
  </div>
</template>

<script>
import Home from '@/views/home'
export default {
  components: {
    Home
  }
}
</script>

<style lang="scss">
body {
  font-family: 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial,
    sans-serif;
}
</style>
