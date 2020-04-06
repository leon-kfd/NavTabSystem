<template>
  <div id="BackgroundSetting">
    <div class="title">背景图设置</div>
    <div class="content">
      <div class="img-list">
        <div class="img-list-item"
             v-for="(item,index) in imgList"
             :key="index">
          <BackgroundImage :img="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackgroundImage from './BackgroundImage'
export default {
  name: 'BackgroundSetting',
  components: {
    BackgroundImage
  },
  computed: {
    imgList () {
      return this.$store.state.unsplashImgList ? this.$store.state.unsplashImgList.slice(0, 9) : []
    }
  }
}
</script>

<style scoped lang="scss">
.title {
  padding: 0 12px;
  margin: 10px 0;
  font-size: 20px;
  font-weight: bold;
  border-left: 5px solid var(--primaryColor);
}
.img-list {
  display: flex;
  flex-wrap: wrap;
  .img-list-item {
    padding: 8px;
    width: 33.3%;
  }
}
</style>
