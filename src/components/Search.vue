<template>
  <div id="Search">
    <div class="search-engine-box"
         @click.stop="showEngine = !showEngine">
      <img :src="$store.state.engineList[activeEngine].iconPath"
           width="24"
           height="24"
           alt="Icon">
    </div>
    <transition name="fadeInUp">
      <div class="engine-selecotr"
           ref="engineSelecotr"
           v-show="showEngine">
        <div class="engine-list-item"
             v-for="(item,index) in $store.state.engineList"
             :key="index"
             @click="handleChangeEngine(index)">
          <img :src="item.iconPath"
               alt="icon"
               width="24"
               height="24">
          <div class="text">{{item.name}}</div>
        </div>
      </div>
    </transition>
    <input class="search-input-box"
           v-model="searchKey"
           @keydown.stop="handleInputKeyDown"
           tabindex="-1"
           :placeholder="placeholder" />
    <div class="search-btn"
         @click="handleSearchBtnClick">
      <svg viewBox="0 0 1024 1024"
           width="22"
           height="22">
        <path d="M419.405333 0c231.683703 0 419.456512 185.265077 419.456512 413.724553a408.862625 408.862625 0 0 1-101.179298 269.55557l275.748132 280.098278a35.108244 35.108244 0 0 1-0.767673 50.154634 36.336521 36.336521 0 0 1-50.819951-0.716495l-275.49224-279.944743a421.19657 421.19657 0 0 1-266.945482 94.628488C187.823987 827.500285 0 642.235208 0 413.724553 0 185.265077 187.823987 0 419.405333 0z m0 70.932983c-191.918243 0-347.499965 153.483416-347.499965 342.79157 0 189.359333 155.581722 342.842749 347.499965 342.842749s347.551143-153.534594 347.551144-342.842749c0-189.359333-155.581722-342.791571-347.499965-342.79157z"></path>
      </svg>
    </div>
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
      placeholder: '按Tab键快速切换搜索引擎'
    }
  },
  mounted () {
    document.addEventListener('click', (e) => {
      if (this.showEngine && !this.$refs.engineSelecotr.contains(e.target)) {
        this.showEngine = false
      }
    })
    // if (!localStorage.getItem('ignoreTips')) {
    //   this.placeholder = '按Tab键快速切换搜索引擎'
    //   localStorage.setItem('ignoreTips', 1)
    // }
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
        window.open(this.$store.state.engineList[this.activeEngine].link + encodeURIComponent(this.searchKey))
      }
    },
    handleSearchBtnClick () {
      window.open(this.$store.state.engineList[this.activeEngine].link + encodeURIComponent(this.searchKey))
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
    svg path {
      fill: var(--textColor);
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
      .text {
        line-height: 18px;
        font-size: 12px;
        color: #889;
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
    font-size: 1.2rem;
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
}
input::-webkit-input-placeholder {
  color: #aab;
  font-size: 12px;
}
input::-moz-placeholder {
  color: #aab;
  font-size: 12px;
}
input:-moz-placeholder {
  color: #aab;
  font-size: 12px;
}
input:-ms-input-placeholder {
  color: #aab;
  font-size: 12px;
}
</style>
