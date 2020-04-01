<template>
  <div id="home">
    <div class="center-wrapper clock-wrapper">
      <Clock />
    </div>
    <div class="center-wrapper search-wrapper">
      <Search :engineList="engineList" />
    </div>
    <div class="center-wrapper keyboard-wrapper">
      <Keyboard />
    </div>
    <div class="setting-wrapper">
      <Setting :engineList.sync="engineList" />
    </div>
  </div>
</template>

<script>
import Clock from '@/components/Clock'
import Search from '@/components/Search'
import Keyboard from '@/components/Keyboard'
import Setting from '@/components/Setting'
export default {
  components: {
    Clock,
    Search,
    Keyboard,
    Setting
  },
  data () {
    return {
      engineList: [
        {
          name: 'Bing-CN',
          iconPath: require('@/assets/img/icon/bing.svg'),
          link: 'https://cn.bing.com/search?q='
        },
        {
          name: 'Bing-EN',
          iconPath: require('@/assets/img/icon/bing-en.svg'),
          link: 'https://cn.bing.com/search?ensearch=1&q='
        },
        {
          name: '百度',
          iconPath: require('@/assets/img/icon/baidu.svg'),
          link: 'https://www.baidu.com/s?wd='
        },
        {
          name: 'Google',
          iconPath: require('@/assets/img/icon/google.svg'),
          link: 'https://www.google.com/search?q='
        },
        {
          name: '有道词典',
          iconPath: require('@/assets/img/icon/youdao.svg'),
          link: 'http://dict.youdao.com/w/'
        }
      ]
    }
  }
}
</script>
<style lang='scss' scoped>
.center-wrapper {
  text-align: center;
  margin: 1rem;
}
.clock-wrapper {
  cursor: default;
  font-size: 8rem;
  letter-spacing: -5px;
  color: var(--textColor);
  user-select: none;
  margin-top: 10vh;
}
.search-wrapper {
  margin-bottom: 100px;
}
</style>
<style lang='scss'>
body {
  --textColor: #262626;
}
@media screen and (max-width: 820px) {
  .keyboard-wrapper {
    display: none;
  }
}
</style>
