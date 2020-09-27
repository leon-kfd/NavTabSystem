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
.btn {
  position: relative;
  padding: 12px 24px;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1;
  color: white;
  background: #2e5adb;
  border: none;
  outline: none;
  overflow: hidden;
  cursor: pointer;
  // filter: drop-shadow(0 2px 8px rgba(39, 94, 254, 0.32));
  transition: 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  margin: 0 8px;
  &.btn-small {
    font-size: 12px;
    padding: 6px 12px;
  }
  &:hover {
    filter: drop-shadow(0 2px 8px rgba(39, 94, 254, 0.32));
  }
}
</style>
