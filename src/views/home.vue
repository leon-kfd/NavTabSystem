<template>
  <div id="home">
    <div class="clock-wrapper center">
      <Clock />
    </div>
    <div class="search-wrapper center">
      <Search />
    </div>
    <div class="keyboard-wrapper center">
      <Keyboard />
    </div>
    <div class="setting-wrapper">
      <Setting />
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

    }
  },
  mounted () {
    if (localStorage.getItem('engineList')) {
      const allEngineList = [
        ...JSON.parse(JSON.stringify(this.$store.state.engineList)),
        ...JSON.parse(JSON.stringify(this.$store.state.backupEngineList))
      ]
      const engineList = JSON.parse(localStorage.getItem('engineList'))
      const engineNameList = engineList.map(item => item.name)
      const backupEngineList = allEngineList.filter(item => !engineNameList.includes(item.name))
      this.$store.commit('setEngineList', engineList)
      this.$store.commit('setBackupEngineList', backupEngineList)
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
  --textColor: #262626;
  --textShadowColor: transparent;
  --primaryColor: #606bff;
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
