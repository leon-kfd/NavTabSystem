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
          <input v-for="(item,index) in importKeyArr" :key="index" type="text" class="import-input" maxlength="1"
                @paste.prevent="handlePaste"
                @click.prevent="handleImportInputClick"
                @keydown.stop="handleImportInputKeyDown"
                v-model="importKeyArr[index]">
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
// import MD5 from 'crypto-js/md5'
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
      importKeyArr: ['', '', '', '', '']
    }
  },
  watch: {
    importKeyArr (val) {
      const emptyIndex = val.findIndex(item => !item)
      if (emptyIndex > 0) {
        this.$nextTick(() => {
          document.querySelectorAll('.import-input')[emptyIndex].focus()
        })
      }
    },
    exportKey () {
      this.handleSavaConfig()
    }
  },
  methods: {
    handleImportInputClick (e) {
      const activeLength = this.importKeyArr.filter(item => item).length
      const index = activeLength === this.importKeyArr.length ? activeLength - 1 : activeLength
      document.querySelectorAll('.import-input')[index].focus()
    },
    handleImportInputKeyDown (e) {
      const { keyCode } = e
      if (keyCode === 8) {
        e.preventDefault()
        const els = document.querySelectorAll('.import-input')
        const el = e.target
        const index = [].indexOf.call(els, el)
        this.$set(this.importKeyArr, index, '')
        this.$nextTick(() => {
          const activeLength = this.importKeyArr.filter(item => item).length
          if (activeLength > 0) {
            this.$nextTick(() => {
              els[activeLength - 1].focus()
            })
          }
        })
      }
    },
    handlePaste (e) {
      if (e.clipboardData.items[0].kind === 'string') {
        e.clipboardData.items[0].getAsString((str) => {
          if (/^[0-9A-Z]{5}$/.test(str)) {
            this.importKeyArr = str.split('')
            document.querySelectorAll('.import-input')[this.importKeyArr.length - 1].focus()
          } else {
            this.$warning('格式不符合,粘贴失败')
          }
        })
      }
    },
    showImport () {
      this.$refs.importDialog.open()
      this.$nextTick(() => {
        this.handleImportInputClick()
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
      const importKey = this.importKeyArr.join('')
      if (/^[0-9A-Z]{5}$/.test(importKey)) {
        ajaxPost(`${this.$baseURL}/getImport`, {
          importKey
        }).then(data => {
          const res = JSON.parse(data)
          if (res.errCode === 200) {
            try {
              const importValue = JSON.parse(res.data)
              if (confirm('已找到相应同步配置，配置会覆盖本地浏览器历史数据，是否继续？')) {
                localStorage.setItem('userSettingKeyMap', JSON.stringify(importValue.userSettingKeyMap))
                localStorage.setItem('engineList', JSON.stringify(importValue.engineList))
                this.$success('同步配置成功')
                this.$refs.importDialog.close()
              }
            } catch (e) {
              this.$error('没有找到对应的同步配置，请检查密钥')
            }
          } else {
            this.$error('没有找到对应的同步配置，请检查密钥')
          }
        })
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
.btn {
  position: relative;
  padding: 12px 24px;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1;
  color: white;
  background: #2e5adb;
  border: none;
  outline: none;
  overflow: hidden;
  cursor: pointer;
  // filter: drop-shadow(0 2px 8px rgba(39, 94, 254, 0.32));
  transition: 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  margin: 0 8px;
  &:hover {
    filter: drop-shadow(0 2px 8px rgba(39, 94, 254, 0.32));
  }
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
    display:inline-flex;
    .import-input {
      flex: 1;
      width: 100%;
      font-size: 44px;
      font-weight: bold;
      color: #262626;
      height: 50px;
      line-height: 50px;
      font-family: MingLiU,DotumChe,Fixedsys,Terminal,MS Mincho;
      text-align: center;
      margin: 0 4px;
      overflow: hidden;
      outline: none;
      border: none;
      border-bottom: 2px solid #ccc;
    }
  }
}
</style>
