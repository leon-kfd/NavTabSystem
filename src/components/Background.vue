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
import axios from 'axios'
import { getToday } from '@/utils/helper'
export default {
  name: 'Background',
  data () {
    return {
      // bgImg: require('@/assets/img/bg.jpg')
    }
  },
  computed: {
    bgImg () {
      return this.$store.state.downloadingImgBase64
    }
  },
  mounted () {
    this.getPhotoList()
  },
  methods: {
    getPhotoList () {
      axios.get('http://localhost:5001/photos').then(data => {
        const imgList = data.data.data.list
        this.$store.commit('setUnsplashImgList', imgList)
        const today = getToday()
        if (localStorage.getItem('userTodayImgInfo')) {
          const userTodayImgInfo = JSON.parse(localStorage.getItem('userTodayImgInfo'))
          if (userTodayImgInfo.date === today) {
            this.$store.dispatch('getDownloadingImg', userTodayImgInfo)
            return
          }
        }
        if (imgList.length > 0) {
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
