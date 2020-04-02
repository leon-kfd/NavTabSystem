<template>
  <div id="Background">
    <div class="bg-box"
         :style="{background: `url(${bgImg}) center center no-repeat`, backgroundSize: 'cover'}"></div>
  </div>
</template>

<script>
export default {
  name: 'Background',
  data () {
    return {
      bgImg: require('@/assets/img/bg.jpg')
    }
  }
}
</script>
<style lang='scss' scoped>
.bg-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}
</style>
