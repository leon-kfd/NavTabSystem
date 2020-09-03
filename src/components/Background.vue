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
import { getToday, ajaxGet } from '@/utils/helper'
export default {
  name: 'Background',
  data () {
    return {
      userTodayImgCache: ''
    }
  },
  computed: {
    bgImg () {
      return this.$store.state.downloadingImgBase64
    }
  },
  mounted () {
    this.setDefaultPhoto()
    this.getPhotoList()
  },
  methods: {
    setDefaultPhoto () {
      try {
        this.userTodayImgCache = JSON.parse(localStorage.getItem('userTodayImgCache'))
      } catch (e) {
        // do nothing
      }
      if (this.userTodayImgCache) {
        this.$store.commit('setDownloadingImgBase64', this.userTodayImgCache.base64)
      }
    },
    getPhotoList () {
      ajaxGet('http://kongfandong.cn/photos').then(data => {
        const res = JSON.parse(data)
        const imgList = res.data.list
        this.$store.commit('setUnsplashImgList', imgList)
        const today = getToday()
        if ((!this.userTodayImgCache || this.userTodayImgCache.date !== today) && imgList.length > 0) {
          this.$store.dispatch('getDownloadingImg', imgList[0])
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
