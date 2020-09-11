<template>
  <div id="Background">
    <div class="bg-box"
         :style="{
            backgroundImage: `url(${bgImg})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center'
          }"></div>
  </div>
</template>

<script>
import { getToday, ajaxGet, getLocalStorage } from '@/utils/helper'
export default {
  name: 'Background',
  computed: {
    bgImg () {
      return this.$store.state.downloadingImgBase64
    }
  },
  mounted () {
    this.$store.commit('setDefaultImgBase64')
    this.getPhotoList()
  },
  methods: {
    getPhotoList () {
      ajaxGet(`${this.$baseURL}/photos`).then(data => {
        const res = JSON.parse(data)
        if (res.errCode === 200) {
          const imgList = res.data.list
          this.$store.commit('setUnsplashImgList', imgList)
          const today = getToday()
          const userTodayImgCache = getLocalStorage('userTodayImgCache')
          if ((!userTodayImgCache || userTodayImgCache.date !== today) && imgList.length > 0) {
            this.$store.dispatch('getDownloadingImg', imgList[0])
          }
        } else {
          this.$error('获取每日图片列表失败')
        }
      })
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
  transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
}
</style>
