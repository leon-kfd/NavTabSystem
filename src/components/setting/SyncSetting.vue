<template>
  <div id="SyncSetting">
    <div class="title">同步设置</div>
    <div class="content">
      <button class="btn btn-import" @click="showImport">配置导入</button>
      <button class="btn btn-export" @click="showExport">配置导出</button>
    </div>
    <animation-dialog ref="importDialog"
                      class="an-dialog"
                      customClass="import-dialog"
                      width="275px"
                      height="275px"
                      animationMode
                      appendToBody>
      <div class="title">Import</div>
      <div class="import-key">
        <div class="import-input-wrapper">
          <input type="text" ref="importInput" v-model="importKey" class="import-input" maxlength="5" @keydown.stop>
          <div class="line"></div>
        </div>
      </div>
      <div class="footer">
        <button tyle="button"
                class="btn btn-primary" @click="handleImport">Import</button>
      </div>
    </animation-dialog>
    <animation-dialog ref="exportDialog"
                      class="an-dialog"
                      customClass="export-dialog"
                      width="275px"
                      height="275px"
                      animationMode
                      appendToBody>
      <div class="title">Export</div>
      <div class="export-key">{{exportKey}}</div>
      <div class="footer">
        <button tyle="button"
                class="btn btn-primary" @click="handleExportKeyCopy">Copy</button>
      </div>
    </animation-dialog>
  </div>
</template>

<script>
import AnimationDialog from 'howdyjs/lib/animation-dialog'
import md5 from 'js-md5'
import { ajaxPost, getLocalStorage, execCopy } from '@/utils/helper'
export default {
  name: 'SyncSetting',
  components: {
    AnimationDialog
  },
  data () {
    return {
      exportKey: '',
      exportValue: '',
      importKey: ''
    }
  },
  watch: {
    exportKey () {
      this.handleSavaConfig()
    }
  },
  methods: {
    prevent () {
      // do nothing
    },
    showImport () {
      this.$refs.importDialog.open()
      this.$nextTick(() => {
        this.$refs.importInput.focus()
      })
    },
    showExport () {
      this.$refs.exportDialog.open()
      let result = {}
      const userSettingKeyMap = getLocalStorage('userSettingKeyMap')
      const engineList = getLocalStorage('engineList')
      if (userSettingKeyMap) result = { ...result, userSettingKeyMap }
      if (engineList) result = { ...result, engineList }
      const toMd5 = md5(JSON.stringify(result))
      const format = parseInt(`0x${toMd5}`, 16).toString(36).toUpperCase().slice(0, 5)
      this.exportKey = format
      this.exportValue = JSON.stringify(result)
    },
    handleExportKeyCopy () {
      if (execCopy(this.exportKey)) {
        this.$success('复制成功')
        this.$refs.exportDialog.close()
      } else {
        this.$error('复制失败')
      }
    },
    handleImport () {
      const importKey = this.importKey
      if (!importKey) return
      if (/^[0-9A-Z]{5}$/.test(importKey)) {
        ajaxPost(`${this.$baseURL}/getImport`, {
          importKey
        }).then(data => {
          const res = JSON.parse(data)
          if (res.errCode === 200) {
            const importValue = JSON.parse(res.data)
            if (confirm('已找到相应同步配置，配置会覆盖本地浏览器历史数据，是否继续？')) {
              importValue.userSettingKeyMap && localStorage.setItem('userSettingKeyMap', JSON.stringify(importValue.userSettingKeyMap))
              importValue.engineList && localStorage.setItem('engineList', JSON.stringify(importValue.engineList))
              this.$success('同步配置成功')
              this.$refs.importDialog.close()
              this.$parent.handleSettingIconClick()
              setTimeout(() => {
                this.$store.dispatch('reload')
              }, 400)
            }
          } else {
            this.$error('没有找到对应的同步配置，请检查密钥')
          }
        })
      } else {
        this.$error('密钥格式不合法')
      }
    },
    handleSavaConfig () {
      if (this.exportKey && this.exportValue) {
        ajaxPost(`${this.$baseURL}/saveExport`, {
          exportKey: this.exportKey,
          exportValue: this.exportValue
        }).then(data => {
          const res = JSON.parse(data)
          if (res.errCode === 200) {
            // nothing
          } else {
            this.$error('导出配置失败')
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.animation-dialog-wrapper {
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
}
.title {
  padding: 0 12px;
  margin: 10px 0 15px;
  font-size: 20px;
  font-weight: bold;
  border-left: 5px solid var(--primaryColor);
}
.export-dialog,
.import-dialog {
  .title {
    margin-top: 0;
  }
  .export-key,
  .import-key {
    text-align: center;
    font-weight: bold;
    font-size: 44px;
    color: #262626;
    padding: 40px 0;
    letter-spacing: 4px;
  }
  .footer {
    text-align: center;
  }
  .import-input-wrapper {
    position: relative;
    width: 240px;
    margin: 0 auto;
    height: 60px;
    .import-input {
      width: 100%;
      font-size: 44px;
      font-weight: bold;
      color: #262626;
      height: 58px;
      line-height: 58px;
      font-family: MingLiU,DotumChe,Fixedsys,Terminal,MS Mincho;
      text-align: center;
      overflow: hidden;
      outline: none;
      border: none;
      border-bottom: 2px solid #ccc;
      border-radius: 0;
      letter-spacing: 5px;
      padding: 0;
    }
    .line {
      position: absolute;
      bottom: 0;
      width: 0;
      left: 50%;
      transform:translateX(-50%);
      border-bottom: 2px solid  #2e5adb;
      transition: all .4s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    .import-input:focus + .line{
      width: 100%;
      transition: all .4s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
  }
}
</style>
