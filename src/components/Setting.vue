<template>
  <div id="Setting">
    <div class="setting-icon"
         @click="handleSettingIconClick">
      <svg class="icon svg-text-color icon-shadow"
           v-if="!animationFlag"
           :class="{active: !settingDialog}"
           viewBox="0 0 1024 1024"
           width="30"
           height="30">
        <path d="M512 429.056A82.944 82.944 0 0 0 429.056 512 82.944 82.944 0 0 0 512 594.7904 82.944 82.944 0 0 0 594.8928 512a82.944 82.944 0 0 0-82.944-82.8928z m0 248.6784A165.9904 165.9904 0 0 1 346.2144 512 165.9904 165.9904 0 0 1 512 346.1632 165.9904 165.9904 0 0 1 677.7856 512 165.9904 165.9904 0 0 1 512 677.7344z m-0.1536 103.6288c53.76 0 103.168 21.76 136.8576 58.4704l78.848-45.568a184.2688 184.2688 0 0 1 17.2544-147.0976c26.7776-46.7456 70.5024-78.848 119.5008-89.7024V466.432a183.3984 183.3984 0 0 1-118.784-88.576c-27.0336-46.592-32.9216-100.5056-17.92-148.2752l-78.848-45.568a183.808 183.808 0 0 1-136.6016 58.4704c-53.76 0-103.168-21.7088-136.9088-58.4192l-78.848 45.568a184.32 184.32 0 0 1-17.2544 147.0976c-26.7264 46.7456-70.4512 78.848-119.4496 89.7024v90.9824a183.3984 183.3984 0 0 1 118.784 88.5248c27.0336 46.6432 32.9216 100.5568 17.92 148.3264l78.848 45.5168a183.808 183.808 0 0 1 135.5264-58.4704h1.0752z m-124.9792 154.4704a41.3696 41.3696 0 0 1-20.6848-5.5296l-143.5648-82.8928a41.5744 41.5744 0 0 1-15.104-56.7808l2.2016-3.7888c16.9984-29.4912 16.1792-66.2528-2.304-98.1504-19.0976-33.3824-50.432-52.3776-84.6848-52.3776H118.272a41.472 41.472 0 0 1-41.472-41.472V429.056a41.472 41.472 0 0 1 41.472-41.472h4.4544c34.2528 0 65.5872-18.944 83.8144-50.7904 0.0512-0.1536 0.9728-1.6896 1.024-1.8944 18.3296-31.5904 19.1488-68.352 2.048-97.9456l-2.0992-3.6864a41.3696 41.3696 0 0 1 15.104-56.7808l143.5648-82.8928a41.472 41.472 0 0 1 56.6272 15.1552l2.2528 3.9936c16.9984 29.3888 48.9984 46.8992 85.6576 46.8992h0.7168c38.5024 0 70.5024-17.5104 87.4496-46.8992l2.304-3.9424a41.472 41.472 0 0 1 56.576-15.2064l143.616 82.944a41.472 41.472 0 0 1 15.1552 56.6784l-2.2528 3.7888c-17.0496 29.5424-16.1792 66.304 2.304 98.2528 19.0976 33.3824 50.432 52.3776 84.6848 52.3776h4.4544a41.472 41.472 0 0 1 41.472 41.472v165.7344a41.472 41.472 0 0 1-41.472 41.472h-4.4544c-34.2528 0-65.5872 18.9952-83.8144 50.8416l-1.0752 1.8432c-18.2784 31.5904-19.1488 68.352-2.048 97.9456l2.2016 3.7888a41.5232 41.5232 0 0 1-15.1552 56.6784l-143.5648 82.944a41.5744 41.5744 0 0 1-56.6272-15.2576l-2.304-3.9424c-16.9472-29.3888-48.9472-46.8992-85.6576-46.8992h-0.6656c-38.5024 0-70.5024 17.5104-87.5008 46.8992l-2.2528 3.9936a41.472 41.472 0 0 1-35.9424 20.6848z"></path>
      </svg>
      <svg class="icon"
           v-if="animationFlag"
           :class="{active: settingDialog}"
           viewBox="0 0 1024 1024"
           width="30"
           height="30">
        <path d="M519.02036023 459.47959989L221.8941505 162.35411435a37.07885742 37.07885742 0 1 0-52.45354772 52.40502656l297.12476134 297.15010821L169.44060278 809.05863314a37.07885742 37.07885742 0 1 0 52.42964924 52.42892505l297.15010821-297.12476136 297.15010822 297.12476136a37.07885742 37.07885742 0 1 0 52.42892504-52.40430237l-297.12476135-297.1740067 297.12476135-297.12548553a37.07885742 37.07885742 0 1 0-52.42892504-52.42964924L519.04498291 459.47959989z"></path>
      </svg>
    </div>
    <div class="setting-content"
         :class="{active: settingDialog}">
      <engine-setting v-if="loadFlag" />
      <background-setting v-if="loadFlag" />
      <sync-setting v-if="loadFlag" />
    </div>
    <div v-if="animationFlag" class="setting-mask" :class="{active: settingDialog}" @click="close"></div>
  </div>
</template>

<script>
export default {
  name: 'Setting',
  components: {
    EngineSetting: () => import('./setting/EngineSetting'),
    BackgroundSetting: () => import('./setting/BackgroundSetting'),
    SyncSetting: () => import('./setting/SyncSetting')
  },
  data () {
    return {
      settingDialog: false,
      loadFlag: false,
      animationFlag: false
    }
  },
  methods: {
    handleSettingIconClick () {
      this.settingDialog ? this.close() : this.open()
      this.loadFlag = true
      if (this.settingDialog) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    },
    open () {
      this.animationFlag = true
      setTimeout(() => {
        this.settingDialog = true
      })
    },
    close () {
      this.settingDialog = false
      setTimeout(() => {
        this.animationFlag = false
      }, 400)
    }
  }
}
</script>
<style lang='scss' scoped>
#Setting {
  .setting-icon {
    position: fixed;
    right: 0.8em;
    top: 0.8em;
    cursor: pointer;
    transition: all 0.4s ease-in-out;
    width: 30px;
    height: 30px;
    z-index: 999;
    .icon {
      transform: scale(0);
      transition: all 0.4s ease-in-out;
      &.active {
        transform: scale(1);
      }
    }
    .icon-shadow {
      filter: drop-shadow(0 0 2px#262626)
    }
  }
  .setting-content {
    position: fixed;
    background: #fff;
    box-shadow: 0 0 8px #ccc;
    right: 0;
    top: 0;
    width: 100vw;
    height: 100%;
    max-width: 540px;
    z-index: 998;
    transform: translateX(100%);
    transition: all 0.4s ease-in-out;
    padding: 10px;
    overflow-y: auto;
    &.active {
      transform: translateX(0);
    }
  }
  .setting-mask {
    position: fixed;
    background: rgba(0,0,0,.8);
    right: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 997;
    opacity: 0;
    transition: all 0.4s ease-in-out;
    &.active {
      opacity: 1;
    }
  }
}
</style>
