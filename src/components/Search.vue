<template>
  <div id="Search">
    <div class="search-engine-box"
         @click.stop="showEngine = !showEngine">
      <img v-if="activeEngineItem.iconType === 'local' || activeEngineItem.iconType==='network'" :src="activeEngineItem.iconPath"
            alt="icon"
            width="24"
            height="24">
      <img v-if="activeEngineItem.iconType === 'api'" :src="`http://favicon.cccyun.cc/${activeEngineItem.link}`"
            alt="icon"
            width="24"
            height="24">
      <div v-if="activeEngineItem.iconType === 'text'" class="no-icon">{{activeEngineItem.name.slice(0,1)}}</div>
    </div>
    <transition name="fadeInUp">
      <div class="engine-selecotr"
           ref="engineSelecotr"
           v-show="showEngine">
        <div class="engine-list-item"
             v-for="(item,index) in $store.state.engineList"
             :key="index"
             @click="handleChangeEngine(index)">
          <img v-if="item.iconType === 'local' || item.iconType==='network'" :src="item.iconPath"
                alt="icon"
                width="24"
                height="24">
          <img v-if="item.iconType === 'api'" :src="`http://favicon.cccyun.cc/${item.link}`"
                alt="icon"
                width="24"
                height="24">
          <div v-if="item.iconType === 'text'" class="no-icon">{{item.name.slice(0,1)}}</div>
          <div class="text">{{item.name}}</div>
        </div>
      </div>
    </transition>
    <input class="search-input-box"
           v-model="searchKey"
           @keydown.stop="handleInputKeyDown"
           @focus="handleInputFocus"
           @blur="handleInputBlur"
           tabindex="-1" />
    <div class="search-btn"
         @click="handleSearchBtnClick">
      <svg viewBox="0 0 1024 1024"
           width="22"
           height="22">
        <path d="M419.405333 0c231.683703 0 419.456512 185.265077 419.456512 413.724553a408.862625 408.862625 0 0 1-101.179298 269.55557l275.748132 280.098278a35.108244 35.108244 0 0 1-0.767673 50.154634 36.336521 36.336521 0 0 1-50.819951-0.716495l-275.49224-279.944743a421.19657 421.19657 0 0 1-266.945482 94.628488C187.823987 827.500285 0 642.235208 0 413.724553 0 185.265077 187.823987 0 419.405333 0z m0 70.932983c-191.918243 0-347.499965 153.483416-347.499965 342.79157 0 189.359333 155.581722 342.842749 347.499965 342.842749s347.551143-153.534594 347.551144-342.842749c0-189.359333-155.581722-342.791571-347.499965-342.79157z"></path>
      </svg>
    </div>
    <transition name="fadeInUp">
      <div class="tab-tooltips"
           v-show="showTabTips">
        <div class="main">按Tab键可快速切换搜索引擎</div>
        <div class="no-more"
             @click="hanldeNoShowMore">不再提示</div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'Search',
  data () {
    return {
      activeEngine: 0,
      showEngine: false,
      searchKey: '',
      showTabTips: false
    }
  },
  mounted () {
    document.addEventListener('click', (e) => {
      if (this.showEngine && !this.$refs.engineSelecotr.contains(e.target)) {
        this.showEngine = false
      }
    })
  },
  computed: {
    activeEngineItem () {
      return this.$store.state.engineList[this.activeEngine]
    }
  },
  methods: {
    handleChangeEngine (index) {
      this.activeEngine = index
      this.showEngine = false
    },
    handleInputKeyDown (e) {
      if (e.keyCode === 9) {
        if (e.shiftKey) {
          this.activeEngine = this.activeEngine <= 0 ? this.$store.state.engineList.length - 1 : --this.activeEngine
          e.preventDefault()
        } else {
          this.activeEngine = this.activeEngine >= this.$store.state.engineList.length - 1 ? 0 : ++this.activeEngine
          e.preventDefault()
        }
      }
      if (e.keyCode === 13) {
        this.handleSearchBtnClick()
      }
    },
    handleSearchBtnClick () {
      let link = this.$store.state.engineList[this.activeEngine].link
      if (/\[0\]/.test(link)) {
        link = link.replace(/\[0\]/, this.searchKey)
      } else {
        link = link + this.searchKey
      }
      window.open(link)
    },
    handleInputFocus () {
      if (!localStorage.getItem('tabTipsNoShow')) {
        this.showTabTips = true
      }
    },
    handleInputBlur () {
      this.showTabTips = false
    },
    hanldeNoShowMore () {
      this.showTabTips = false
      localStorage.setItem('tabTipsNoShow', 1)
    }
  }
}
</script>
<style lang='scss' scoped>
#Search {
  display: flex;
  width: 100%;
  max-width: 600px;
  margin: 1.5rem auto;
  height: 2.4rem;
  border-radius: 4px;
  box-shadow: 0 0 5px #262626;
  align-items: center;
  transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
  position: relative;
  background: #fff;
  &:hover {
    box-shadow: 0 0 10px #262626;
    transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  .search-engine-box {
    padding: 0 12px;
    display: inline-flex;
    border-right: 1px solid #ccc;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    .no-icon {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: #abb;
      color: #fff;
      font-weight: bold;
      font-size: 16px;
    }
  }
  .engine-selecotr {
    position: absolute;
    padding: 5px;
    top: 3.4rem;
    left: 0;
    width: auto;
    display: flex;
    border-radius: 4px;
    flex-wrap: wrap;
    background: #fff;
    filter: drop-shadow(0 0 8px #ccc);
    &::before {
      position: absolute;
      content: '';
      width: 0;
      height: 0;
      top: -8px;
      left: 14px;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid #fff;
    }
    .engine-list-item {
      padding: 5px 10px;
      cursor: pointer;
      border-radius: 3px;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      .text {
        line-height: 18px;
        font-size: 12px;
        color: #889;
        width: 100%;
        text-align: center;
      }
      .no-icon {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: #abb;
        color: #fff;
        font-weight: bold;
        font-size: 16px;
      }
      &:hover {
        background: #d9d9e4;
      }
    }
  }
  .search-input-box {
    flex: 1;
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    background: transparent;
    padding: 0 10px;
    font-size: 1rem;
    font-weight: 500;
    color: #363640;
  }
  .search-btn {
    width: 2rem;
    height: 2rem;
    margin-right: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-around;
    svg path {
      fill: #262626;
    }
  }
  .tab-tooltips {
    position: absolute;
    padding: 6px 3px 6px 8px;
    top: 3.4rem;
    left: 50px;
    width: auto;
    border-radius: 4px;
    background: #f5e2cd;
    display: flex;
    filter: drop-shadow(0 0 5px rgb(150, 92, 57));
    align-items: center;
    &::before {
      position: absolute;
      content: '';
      width: 0;
      height: 0;
      top: -8px;
      left: 14px;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid #f5e2cd;
    }
    .main {
      font-size: 14px;
      color: #ff933b;
      margin-right: 10px;
    }
    .no-more {
      font-size: 14px;
      color: rgb(122, 122, 119);
      padding: 3px 5px;
      cursor: pointer;
      border-radius: 3px;
      &:hover {
        background: #c2ccda;
      }
    }
  }
}
</style>
<style>
input::placeholder {
  color: #aab;
  font-size: 12px;
}
</style>
