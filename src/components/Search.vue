<template>
  <div id="Search">
    <div class="search-engine-box"
         @click.stop="showEngine = !showEngine">
      <svg viewBox="0 0 1024 1024"
           width="24"
           height="24">
        <path :d="engineList[activeEngine].iconPath"></path>
      </svg>
    </div>
    <transition name="fadeInUp">
      <div class="engine-selecotr"
           ref="engineSelecotr"
           v-show="showEngine">
        <div class="engine-list-item"
             v-for="(item,index) in engineList"
             :key="index"
             @click="handleChangeEngine(index)">
          <svg viewBox="0 0 1024 1024"
               width="24"
               height="24">
            <path :d="item.iconPath"></path>
          </svg>
          <div class="text">{{item.name}}</div>
        </div>
      </div>
    </transition>
    <input class="search-input-box"
           v-model="searchKey"
           @keydown.stop="handleInputKeyDown"
           tabindex="-1" />
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
      engineList: [
        {
          name: 'Bing',
          iconPath: 'M213.333333 128v682.666667l158.72 85.333333L768 674.986667v-174.506667L416.853333 381.866667l68.693334 165.973333L594.773333 597.333333 371.2 721.92V182.186667L213.333333 128',
          link: 'https://cn.bing.com/search?q='
        },
        {
          name: '百度',
          iconPath: 'M226.522 536.053c96.993-20.839 83.792-136.761 80.878-162.089-4.758-39.065-50.691-107.346-113.075-101.952-78.499 7.036-89.957 120.445-89.957 120.445C93.748 444.857 129.764 556.857 226.522 536.053zM329.512 737.61c-2.848 8.175-9.18 29.014-3.686 47.173 10.822 40.707 46.168 42.55 46.168 42.55l50.792 0L422.786 703.169 368.41 703.169C343.952 710.473 332.159 729.468 329.512 737.61zM406.537 341.666c53.572 0 96.859-61.646 96.859-137.9 0-76.12-43.287-137.767-96.859-137.767-53.472 0-96.892 61.646-96.892 137.767C309.645 280.019 353.065 341.666 406.537 341.666zM637.241 350.779c71.598 9.281 117.632-67.141 126.777-125.035 9.349-57.827-36.854-125.036-87.544-136.561-50.791-11.659-114.213 69.688-119.976 122.757C549.597 276.803 565.779 341.566 637.241 350.779zM812.666 691.174c0 0-110.761-85.701-175.425-178.305-87.645-136.593-212.177-81.011-253.822-11.558-41.478 69.452-106.106 113.375-115.286 125-9.314 11.458-133.813 78.666-106.173 201.423 27.64 122.69 124.7 120.345 124.7 120.345s71.53 7.036 154.519-11.524c83.021-18.428 154.484 4.59 154.484 4.59s193.919 64.929 246.988-60.072C895.655 756.037 812.666 691.174 812.666 691.174zM480.881 877.253 354.807 877.253c-54.443-10.855-76.12-48.044-78.867-54.343-2.68-6.433-18.125-36.317-9.951-87.109 23.52-76.12 90.627-81.614 90.627-81.614l67.107 0 0-82.485 57.157 0.871L480.88 877.253zM715.674 876.382l-145.07 0c-56.219-14.508-58.866-54.444-58.866-54.444L511.738 661.49l58.866-0.938 0 144.199c3.586 15.345 22.682 18.159 22.682 18.159l59.771 0L653.057 661.49l62.618 0L715.675 876.382zM921.051 448.006c0-27.708-23.018-111.13-108.385-111.13-85.501 0-96.925 78.732-96.925 134.382 0 53.136 4.489 127.313 110.695 124.935C932.677 593.846 921.051 475.881 921.051 448.006z',
          link: 'https://www.baidu.com/s?wd='
        },
        {
          name: 'Google',
          iconPath: 'M832.768 448H512v128h248.874667c-25.258667 101.930667-110.72 192.768-248.874667 192.768-141.568 0-256.768-115.157333-256.768-256.768S370.432 255.232 512 255.232c66.688 0 130.474667 26.922667 179.669333 75.818667l90.24-90.837334C708.522667 167.381333 612.693333 127.232 512 127.232c-212.181333 0-384.768 172.586667-384.768 384.768S299.818667 896.768 512 896.768c240.853333 0 384.768-195.626667 384.768-384.768a64 64 0 0 0-64-64z',
          link: 'https://www.google.com/search?q='
        }
      ],
      searchKey: ''
    }
  },
  mounted () {
    document.addEventListener('click', (e) => {
      if (this.showEngine && !this.$refs.engineSelecotr.contains(e.target)) {
        this.showEngine = false
      }
    })
  },
  methods: {
    handleChangeEngine (index) {
      this.activeEngine = index
      this.showEngine = false
    },
    handleInputKeyDown (e) {
      if (e.keyCode === 9) {
        this.activeEngine = this.activeEngine >= this.engineList.length - 1 ? 0 : ++this.activeEngine
        e.preventDefault()
      }
      if (e.keyCode === 13) {
        window.open(this.engineList[this.activeEngine].link + encodeURIComponent(this.searchKey))
      }
    },
    handleSearchBtnClick () {
      window.open(this.engineList[this.activeEngine].link + encodeURIComponent(this.searchKey))
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
  box-shadow: 0 0.3px 1px #aab, 0 0.5px 2px #ccd;
  align-items: center;
  transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
  position: relative;
  background: #fff;
  &:hover {
    box-shadow: 0 0.3px 4px #aab, 0 0.5px 6px #ccd;
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
    height: 60px;
    padding: 5px;
    top: 3.4rem;
    left: 0;
    width: auto;
    display: flex;
    border-radius: 4px;
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
</style>
