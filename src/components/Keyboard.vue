<template>
  <div id="Keyboard">
    <div class="keys-wrapper"
         v-for="(item,key) in keyboardMap"
         :key="key"
         :class="{hidden: item.span}"
         :style="{width: `${item.span ? item.span * 4.5 : 9}%`}">
      <div class="keys-box"
           @click="handleKeyClick($event, key)">
        <div class="keys">
          <div class="keys-name">{{key}}</div>
          <div class="edit-icon-box"
               v-if="userSettingKeyMap[key]"
               @click.stop="showDialog($event,key)">
            <svg t="1586182329293"
                 class="icon"
                 viewBox="0 0 1024 1024"
                 width="14"
                 height="14">
              <path d="M231.08266667 509.49688889c-0.11377778 51.76888889-41.87022222 93.52533333-93.75288889 93.41155556-51.65511111-0.11377778-93.63911111-42.09777778-93.52533333-93.86666667 0-51.54133333 42.21155555-93.52533333 93.98044444-93.41155556 51.65511111 0.11377778 93.29777778 41.984 93.29777778 93.86666667z m656.49777778-93.75288889c51.76888889 0 93.86666667 41.87022222 93.86666666 93.52533333 0.11377778 51.65511111-41.87022222 93.75288889-93.63911111 93.75288889-51.88266667 0-93.75288889-41.64266667-93.75288889-93.52533333s41.64266667-93.75288889 93.52533334-93.75288889zM512.45511111 603.02222222c-51.65511111 0-93.98044445-42.43911111-93.75288889-93.75288889 0.34133333-51.76888889 42.21155555-93.52533333 93.98044445-93.52533333 51.65511111 0 93.86666667 42.21155555 93.63911111 93.75288889-0.11377778 51.65511111-42.09777778 93.52533333-93.86666667 93.52533333z"
                    p-id="2155"></path>
            </svg>
          </div>
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
                 :src="userSettingKeyMap[key].url ? `http://favicon.cccyun.cc/${userSettingKeyMap[key].url}`: ''"
                 alt="link"
                 @error="handleImgError">
            <div class="no-icon" style="visibility:hidden">{{userSettingKeyMap[key].remark.slice(0,1)}}</div>
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
    <animation-dialog ref="dialog"
                      class="an-dialog"
                      customClass="key-edit-dialog"
                      width="300px"
                      height="300px"
                      @beforeClose="handleDialogClose">
      <div class="edit-content"
           v-show="editingActive"
           @keydown.stop="">
        <div class="editing-key">{{editingInfo.key}}</div>
        <div class="row-input"
             :class="{active: editingInfo.url.length>0}">
          <input type="text"
                 v-model="editingInfo.url">
          <div class="label">URL</div>
          <div class="line"></div>
        </div>
        <div class="row-input"
             :class="{active: editingInfo.remark.length>0}">
          <input type="text"
                 v-model="editingInfo.remark">
          <div class="label">Remark</div>
          <div class="line"></div>
        </div>
        <div class="footer clear">
          <button tyle="button"
                  class="btn btn-danger fl"
                  :disabled="!editingInfo.url && !editingInfo.remark"
                  @click="clearEidtInfo">Clear</button>
          <button tyle="button"
                  class="btn btn-primary fr"
                  @click="handleUserKeySave">Save</button>
        </div>
      </div>
    </animation-dialog>
  </div>
</template>

<script>
// import AnimationDialog from '@/components/animation-dialog'
import AnimationDialog from 'howdyjs/lib/animation-dialog'
export default {
  name: 'Keyboard',
  components: {
    AnimationDialog
  },
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
      userSettingKeyMap: {},
      editingActive: false,
      editingInfo: {
        key: '',
        url: '',
        remark: ''
      }
    }
  },
  mounted () {
    document.addEventListener('keydown', this.handleKeyboardKeydown)
    if (localStorage.getItem('userSettingKeyMap')) {
      this.userSettingKeyMap = JSON.parse(localStorage.getItem('userSettingKeyMap'))
    }
  },
  methods: {
    handleKeyboardKeydown (e) {
      const keyCode = e.keyCode
      const key = Object.keys(this.keyboardMap).find(key => this.keyboardMap[key].keyCode === keyCode)
      if (key && this.userSettingKeyMap[key]) {
        window.open(this.userSettingKeyMap[key].url)
      }
    },
    handleKeyClick ($event, key) {
      if (key && this.userSettingKeyMap[key]) {
        window.open(this.userSettingKeyMap[key].url)
      } else {
        this.$refs.dialog.open($event.currentTarget)
        this.editingInfo.key = key
        setTimeout(() => {
          this.editingActive = true
        }, 200)
      }
    },
    handleDialogClose () {
      setTimeout(() => {
        this.editingInfo.key = ''
        this.editingInfo.url = ''
        this.editingInfo.remark = ''
        this.editingActive = false
      }, 200)
    },
    showDialog ($event, key) {
      const el = $event.currentTarget.parentNode.parentNode
      this.$refs.dialog.open(el)
      this.editingInfo.key = key
      const { url, remark } = this.userSettingKeyMap[key]
      this.editingInfo.url = url
      this.editingInfo.remark = remark
      setTimeout(() => {
        this.editingActive = true
      }, 200)
    },
    clearEidtInfo () {
      if (this.editingInfo.url && this.editingInfo.remark) {
        if (confirm('确定清除该按键绑定的网页吗?')) {
          this.editingInfo.url = ''
          this.editingInfo.remark = ''
          delete this.userSettingKeyMap[this.editingInfo.key]
          localStorage.setItem('userSettingKeyMap', JSON.stringify(this.userSettingKeyMap))
          this.handleDialogClose()
          this.$refs.dialog.close()
        }
      }
    },
    handleUserKeySave () {
      if (!this.editingInfo.url || !this.editingInfo.remark) return
      if (/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/.test(this.editingInfo.url)) {
        if (!(/https?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/.test(this.editingInfo.url))) {
          this.editingInfo.url = 'http://' + this.editingInfo.url
        }
        this.userSettingKeyMap[this.editingInfo.key] = {
          url: this.editingInfo.url,
          remark: this.editingInfo.remark
        }
        localStorage.setItem('userSettingKeyMap', JSON.stringify(this.userSettingKeyMap))
        this.handleDialogClose()
        this.$refs.dialog.close()
      } else {
        alert('URL地址不正确')
      }
    },
    handleImgError (e) {
      const el = e.currentTarget
      el.style.visibility = 'hidden'
      el.nextElementSibling.style.visibility = 'visible'
    }
  }
}
</script>

<style lang="scss" scope>
#Keyboard {
  display: flex;
  flex-wrap: wrap;
  max-width: 1020px;
  margin: 1.5rem auto;
  overflow: hidden;
  .keys-wrapper {
    box-sizing: border-box;
    padding: 8px;
    .keys-box {
      width: 100%;
      padding-bottom: 100%;
      background: #fff;
      position: relative;
      border-radius: 4px;
      cursor: pointer;
      box-shadow: 0 0 5px #262626;
      transition: box-shadow 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
      &.is-open {
        visibility: hidden;
      }
      &:hover {
        box-shadow: 0 0 10px #262626;
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
          font-size: 15px;
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
          border-radius: 50%;
          position: relative;
          display: block;
          .icon {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 28px;
            height: 28px;
            transform: translate(-50%, -50%);
            z-index: 99;
            background: #fff;
          }
          .no-icon {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: #abb;
            color: #fff;
            font-weight: bold;
            font-size: 18px;
            line-height: 28px;
            transform: translate(-50%, -50%);
          }
        }
        .plus-box {
          top: 50%;
          svg path {
            fill: #9898a2;
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
        .edit-icon-box {
          position: absolute;
          right: 2px;
          top: 2px;
          border-radius: 50%;
          width: 22px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          z-index: 2;
          svg path {
            fill: #262626;
          }
          &:hover {
            background: #e2e2e5;
          }
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
  .edit-content {
    overflow: hidden;
    .editing-key {
      font-size: 36px;
      font-weight: bold;
      margin-bottom: 30px;
    }
    .row-input {
      margin: 35px 0;
      position: relative;
      input {
        width: 100%;
        box-sizing: border-box;
        outline: none;
        border: none;
        height: 32px;
        line-height: 32px;
        box-shadow: 0 2px 0 #ccc;
        padding: 0 4px;
        font-size: 18px;
        color: #363640;
        appearance: none;
      }
      .label {
        position: absolute;
        top: 7px;
        left: 5px;
        font-size: 18px;
        color: #767682;
        font-weight: bold;
        pointer-events: none;
        transition: all 0.4s;
      }
      input:focus + .label {
        transform: translate(-8px, -22px) scale(0.8);
        font-weight: bold;
        color: var(--primaryColor);
        transition: all 0.4s;
      }
      &.active .label {
        transform: translate(-8px, -22px) scale(0.8);
        font-weight: bold;
        color: #262626;
        transition: all 0.4s;
      }
      .line {
        position: absolute;
        left: 0;
        width: 100%;
        border-bottom: 2px solid var(--primaryColor);
        transform: scale(0);
        transition: transform 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
      }
      input:focus ~ .line {
        transform: scale(1);
        transition: transform 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
      }
    }
    .footer {
      text-align: right;
      margin: 40px 0 0;
      .btn {
        background: none;
        border: none;
        padding: 8px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
        font-size: 18px;
        transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
      }
      .btn-primary {
        background: var(--primaryColor);
        color: #fff;
        &:hover {
          background: #454ecf;
          transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
      }
      .btn-danger {
        color: #ce3c3c;
        &:hover {
          background: rgb(255, 234, 234);
          transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
      }
    }
  }
}
.key-edit-dialog {
  border-radius: 4px;
}
</style>
