<template>
  <div class="img-box"
       :class="{'is-downloading': img.id === downloadingImgId}"
       :style="{background: img.color}"
       @click="handleImgClick">
    <img :src="img.urls.thumb"
         :alt="img.description">
    <div class="is-downloading-bar"
         v-if="img.id === downloadingImgId"
         :style="{
           background: `linear-gradient(90deg, #606bff ${downloadingImgPercent}%, #c9c9d2 0%, #c9c9d2 100%)`
          }"></div>
  </div>
</template>

<script>
export default {
  name: 'BackgroundImage',
  props: {
    img: Object
  },
  computed: {
    downloadingImgId () {
      return this.$store.state.downloadingImgInfo ? this.$store.state.downloadingImgInfo.id : ''
    },
    downloadingImgPercent () {
      return this.$store.state.downloadingProcess || 0
    }
  },
  methods: {
    handleImgClick () {
      if (this.img.id === this.downloadingImgId) {
        this.$store.commit('setDownloadingImgInfo', null)
        this.$store.commit('setDownloadingImgEl', null)
      } else {
        this.$store.dispatch('getDownloadingImg', this.img)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.img-box {
  position: relative;
  width: 100%;
  padding-bottom: 66.6%;
  background: #c8c8c8;
  cursor: pointer;
  &:after {
    content: '设为背景图';
    font-size: 13px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #fff;
    background: rgba(0, 0, 0, 0.6);
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
    z-index: 990;
  }
  &:hover:after {
    opacity: 1;
    visibility: visible;
    transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  &.is-downloading:after {
    content: '';
    opacity: 1;
    visibility: visible;
  }
  // .is-downloading-bar {
  //   position: absolute;
  //   width: 80%;
  //   height: 6px;
  //   border-radius: 3px;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%, -50%);
  //   z-index: 999;
  //   background: linear-gradient(
  //     45deg,
  //     #fff 5%,
  //     #a4cfe9 5%,
  //     #a4cfe9 15%,
  //     #fff 15%,
  //     #fff 25%,
  //     #a4cfe9 25%,
  //     #a4cfe9 35%,
  //     #fff 35%,
  //     #fff 45%,
  //     #a4cfe9 45%,
  //     #a4cfe9 55%,
  //     #fff 55%,
  //     #fff 65%,
  //     #a4cfe9 65%,
  //     #a4cfe9 75%,
  //     #fff 75%,
  //     #fff 85%,
  //     #a4cfe9 85%,
  //     #a4cfe9 95%,
  //     #fff 95%,
  //     #fff
  //   );
  //   background-position: 0 0;
  //   background-size: 200% 100%;
  //   animation: move 2s linear infinite;
  //   animation-fill-mode: backwards;
  // }
  .is-downloading-bar {
    position: absolute;
    width: 80%;
    height: 6px;
    border-radius: 3px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
@keyframes move {
  to {
    background-position: -200% 0;
  }
}
</style>
