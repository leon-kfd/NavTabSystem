<template>
  <div id="BackgroundSetting">
    <div class="clear">
      <div class="title fl">背景图设置</div>
      <div class="tips fr">{{date}}, UNSPLASH</div>
    </div>
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
import { getToday } from '@/utils/helper'
export default {
  name: 'BackgroundSetting',
  components: {
    BackgroundImage
  },
  data () {
    return {
      date: getToday()
    }
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
.tips {
  padding: 0 12px;
  margin: 13px 0 10px;
  font-size: 14px;
  color: #889;
  line-height: 26px;
  font-weight: bold;
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
