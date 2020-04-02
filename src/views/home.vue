<template>
  <div id="home">
    <div class="clock-wrapper center">
      <Clock />
    </div>
    <div class="search-wrapper center">
      <Search :engineList="engineList" />
    </div>
    <div class="keyboard-wrapper center">
      <Keyboard />
    </div>
    <div class="setting-wrapper">
      <Setting :engineList="engineList"
               :backupEngineList="backupEngineList" />
    </div>
    <div class="background-wrapper">
      <Background />
    </div>
  </div>
</template>

<script>
import Clock from '@/components/Clock'
import Search from '@/components/Search'
import Keyboard from '@/components/Keyboard'
import Setting from '@/components/Setting'
import Background from '@/components/Background'
export default {
  components: {
    Clock,
    Search,
    Keyboard,
    Setting,
    Background
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
          name: '有道词典',
          iconPath: require('@/assets/img/icon/youdao.svg'),
          link: 'http://dict.youdao.com/w/'
        }
      ],
      backupEngineList: [
        {
          name: 'Google',
          iconPath: require('@/assets/img/icon/google.svg'),
          link: 'https://www.google.com/search?q='
        },
        {
          name: '搜狗',
          iconPath: require('@/assets/img/icon/sougou.svg'),
          link: 'https://www.sogou.com/tx?query='
        },
        {
          name: 'Bilibili',
          iconPath: require('@/assets/img/icon/bilibili.svg'),
          link: 'https://search.bilibili.com/all?keyword='
        },
        {
          name: '淘宝',
          iconPath: require('@/assets/img/icon/taobao.svg'),
          link: 'https://s.taobao.com/search?q='
        }
      ],
      allEngineList: []
    }
  },
  mounted () {
    this.allEngineList = [
      ...JSON.parse(JSON.stringify(this.engineList)),
      ...JSON.parse(JSON.stringify(this.backupEngineList))
    ]
    if (localStorage.getItem('engineList')) {
      this.engineList = JSON.parse(localStorage.getItem('engineList'))
      this.engineNameList = this.engineList.map(item => item.name)
      this.backupEngineList = this.allEngineList.filter(item => !this.engineNameList.includes(item.name))
    }
  }
}
</script>
<style lang='scss' scoped>
.center {
  text-align: center;
}
.clock-wrapper {
  cursor: default;
  font-size: 8rem;
  letter-spacing: -5px;
  color: var(--textColor);
  user-select: none;
  margin-top: 10vh;
  padding: 0 1rem;
}
.search-wrapper {
  margin-bottom: 100px;
  padding: 0 1rem;
}
</style>
<style lang='scss'>
body {
  --textColor: #f8f8f9;
}
.svg-text-color {
  path {
    fill: var(--textColor);
  }
}
@media screen and (max-width: 820px) {
  .keyboard-wrapper {
    display: none;
  }
}
</style>
