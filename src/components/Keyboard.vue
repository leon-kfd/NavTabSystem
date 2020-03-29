<template>
  <div id="Keyboard">
    <div class="keys-wrapper"
         v-for="(item,key) in keyboardMap"
         :key="key"
         :class="{hidden: item.span}"
         :style="{width: `${item.span ? item.span * 4.5 : 9}%`}">
      <div class="keys-box"
           @click="handleKeyClick(key)">
        <div class="keys">
          <div class="keys-name">{{key}}</div>
          <div class="plus-box"
               v-if="!userSettingKeyMap[key]">
            <svg class="icon"
                 viewBox="0 0 1024 1024"
                 width="20"
                 height="20">
              <path d="M896 469.333333H554.666667V128a42.666667 42.666667 0 0 0-85.333334 0v341.333333H128a42.666667 42.666667 0 0 0 0 85.333334h341.333333v341.333333a42.666667 42.666667 0 0 0 85.333334 0V554.666667h341.333333a42.666667 42.666667 0 0 0 0-85.333334z"></path>
            </svg>
          </div>
          <div class="icon-box"
               v-if="userSettingKeyMap[key]">
            <img class="icon"
                 :src="`${userSettingKeyMap[key].url.match(/^(\w+:\/\/)?([^\/]+)/i) ? userSettingKeyMap[key].url.match(/^(\w+:\/\/)?([^\/]+)/i)[0] : ''}/favicon.ico`"
                 alt="link">
          </div>
          <div class="mark-text"
               v-if="userSettingKeyMap[key] && userSettingKeyMap[key].remark">{{userSettingKeyMap[key].remark}}</div>
        </div>
      </div>
    </div>
    <div class="keys-wrapper"
         style="width: 9.08%">
      <div class="keys-box">
        <div class="keys"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Keyboard',
  data () {
    return {
      keyboardMap: {
        tab: {
          span: 1
        },
        Q: {
          keyCode: 81
        },
        W: {
          keyCode: 87
        },
        E: {
          keyCode: 69
        },
        R: {
          keyCode: 82
        },
        T: {
          keyCode: 84
        },
        Y: {
          keyCode: 89
        },
        U: {
          keyCode: 85
        },
        I: {
          keyCode: 73
        },
        O: {
          keyCode: 79
        },
        P: {
          keyCode: 80
        },
        brackets: {
          span: 1
        },
        caps: {
          span: 2
        },
        A: {
          keyCode: 65
        },
        S: {
          keyCode: 83
        },
        D: {
          keyCode: 68
        },
        F: {
          keyCode: 70
        },
        G: {
          keyCode: 71
        },
        H: {
          keyCode: 72
        },
        J: {
          keyCode: 74
        },
        K: {
          keyCode: 75
        },
        L: {
          keyCode: 76
        },
        semi: {
          span: 2
        },
        shift: {
          span: 3
        },
        Z: {
          keyCode: 90
        },
        X: {
          keyCode: 88
        },
        C: {
          keyCode: 67
        },
        V: {
          keyCode: 86
        },
        B: {
          keyCode: 66
        },
        N: {
          keyCode: 78
        },
        M: {
          keyCode: 77
        }
      },
      userSettingKeyMap: {
        B: {
          url: 'http://www.baidu.com',
          remark: '百度'
        },
        J: {
          url: 'https://juejin.im/timeline',
          remark: '掘金'
        },
        K: {
          url: 'http://kongfandong.cn',
          remark: '个人博客'
        }
      }
    }
  },
  mounted () {
    document.addEventListener('keydown', this.handleKeyboardKeydown)
  },
  methods: {
    handleKeyboardKeydown (e) {
      const keyCode = e.keyCode
      const key = Object.keys(this.keyboardMap).find(key => this.keyboardMap[key].keyCode === keyCode)
      if (key && this.userSettingKeyMap[key]) {
        window.open(this.userSettingKeyMap[key].url)
      }
    },
    handleKeyClick (key) {
      if (key && this.userSettingKeyMap[key]) {
        window.open(this.userSettingKeyMap[key].url)
      }
    }
  }
}
</script>

<style lang="scss" scope>
#Keyboard {
  display: flex;
  flex-wrap: wrap;
  max-width: 900px;
  margin: 1.5rem auto;
  overflow: hidden;
  .keys-wrapper {
    box-sizing: border-box;
    padding: 5px;
    .keys-box {
      width: 100%;
      padding-bottom: 100%;
      background: #fff;
      position: relative;
      border-radius: 4px;
      cursor: pointer;
      box-shadow: 0 0.3px 1px #aab, 0 0.5px 2px #ccd;
      transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
      &:hover {
        box-shadow: 0 0.3px 4px #aab, 0 0.5px 6px #ccd;
        transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
      }
      .keys {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        .keys-name {
          position: absolute;
          top: 4px;
          left: 4px;
          font-weight: bold;
          font-size: 14px;
          color: #262626;
        }
        .icon-box,
        .plus-box {
          position: absolute;
          width: 50%;
          height: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: space-around;
        }
        .icon-box {
          top: calc(50% - 5px);
          .icon {
            width: 28px;
            height: 28px;
          }
        }
        .plus-box {
          top: 50%;
          svg path {
            fill: #d2d4d6;
          }
        }
        .mark-text {
          position: absolute;
          width: 100%;
          bottom: 4px;
          line-height: 20px;
          text-align: center;
          padding: 0 6px;
          height: 20px;
          font-size: 12px;
          color: #363636;
          font-weight: 500;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
    &.hidden {
      .keys-box {
        height: 0;
        padding-bottom: 0;
        visibility: hidden;
      }
    }
  }
}
</style>
