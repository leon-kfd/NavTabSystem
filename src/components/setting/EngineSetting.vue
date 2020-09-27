<template>
  <div id="EngineSetting">
    <div class="title">搜索引擎设置</div>
    <div class="warning">通过拖拽下方可更换切换引擎顺序或添加新的引擎</div>
    <div class="content">
      <button class="btn btn-small btn-add" @click="handleAddNewEngine">添加</button>
      <div class="text s-title">当前引擎组</div>
      <draggable :list="engineList"
                 :group="{ name: 'engine',pull: engineList.length > 1 }"
                 @end="handleDragEnd">
        <transition-group type="transition"
                          name="flip-list"
                          class="now-engine-list engine-list">
          <div class="engine-list-item"
               v-for="item in engineList"
               :key="item.name">
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
        </transition-group>
      </draggable>
      <div class="text s-title">备用引擎组</div>
      <draggable :list="backupEngineList"
                 group="engine"
                 @end="handleDragEnd">
        <transition-group type="transition"
                          name="flip-list"
                          class="backupEngineList engine-list">
          <div class="engine-list-item"
               v-for="item in backupEngineList"
               :key="item.name">
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
        </transition-group>
      </draggable>
    </div>

    <animation-dialog ref="addDialog"
                      class="an-dialog"
                      customClass="add-dialog"
                      width="500px"
                      height="500px"
                      animationMode
                      appendToBody>
      <div class="title">添加自定义引擎</div>
      <div class="form">
        <div class="form-item">
          <div class="label">引擎名称</div>
          <div class="content">
            <input type="text" v-model.lazy="addEngineForm.name" placeholder="Name" @keydown.stop>
          </div>
        </div>
        <div class="form-item">
          <div class="label">引擎地址</div>
          <div class="content">
            <input type="text" v-model.lazy="addEngineForm.link" placeholder="Link" @keydown.stop>
            <div class="tips">默认搜索内容会被拼接到引擎地址末尾, 也可以使用 <b>[0]</b> 对原地址搜索关键词进行占位</div>
            <div class="tips">例如: <b>https://juejin.im/search?query=[0]&type=all</b></div>
          </div>
        </div>
        <div class="form-item">
          <div class="label">引擎图标</div>
          <div class="content">
            <div class="radio-box" v-for="item in iconTypeList" :key="item.value" 
                  :class="{active: item.value === addEngineForm.iconType}" 
                  @click="addEngineForm.iconType = item.value">
              <div class="radio-icon">{{item.value === addEngineForm.iconType ? '🔵' : '⚪'}}</div>
              <div class="radio-text">{{item.label}}</div>
            </div>
          </div>
        </div>
        <div class="form-item" v-if="addEngineForm.iconType === 'network'">
          <div class="label">图片地址</div>
          <div class="content">
            <input type="text" v-model.lazy="addEngineForm.iconPath" placeholder="IconPath" @keydown.stop>
          </div>
        </div>
        <div class="form-item">
          <div class="label">图标预览</div>
          <div class="content">
            <div class="icon-img-preview-box">
              <template v-if="showIconPreview">
                <img v-if="addEngineForm.iconType==='network'" :src="addEngineForm.iconPath"
                  alt="icon"
                  width="24"
                  height="24">
                <img v-if="addEngineForm.iconType === 'api'" :src="`http://favicon.cccyun.cc/${addEngineForm.link}`"
                    alt="icon"
                    width="24"
                    height="24">
                <div v-if="addEngineForm.iconType === 'text'" class="no-icon">{{addEngineForm.name.slice(0,1)}}</div>
              </template>
              <div v-else class="icon-img-preview"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <button tyle="button"
                class="btn btn-primary" @click="handleAddNewEngineSubmit">添加</button>
      </div>
    </animation-dialog>
  </div>
</template>

<script>
import AnimationDialog from 'howdyjs/lib/animation-dialog'
import draggable from 'vuedraggable'
const iconTypeList = [
  {
    label: 'API获取',
    value: 'api'
  },
  {
    label: '文字图标',
    value: 'text'
  },
  {
    label: '网络图片',
    value: 'network'
  }
]
export default {
  name: 'EngineSetting',
  components: {
    draggable,
    AnimationDialog
  },
  data () {
    return {
      iconTypeList,
      dragDisabled: false,
      engineList: [],
      backupEngineList: [],
      addEngineForm: {
        name: '',
        link: '',
        iconType: 'api',
        iconPath: ''
      }
    }
  },
  computed: {
    showIconPreview () {
      const { name, link, iconType, iconPath } = this.addEngineForm
      return (iconType === 'api' && link) || (iconType === 'network' && iconPath) || (iconType === 'text' && name)
    }
  },
  mounted () {
    this.engineList = JSON.parse(JSON.stringify(this.$store.state.engineList))
    this.backupEngineList = JSON.parse(JSON.stringify(this.$store.state.backupEngineList))
  },
  methods: {
    handleDragEnd () {
      localStorage.setItem('engineList', JSON.stringify(this.engineList))
      this.$store.commit('setEngineList', this.engineList)
      this.$store.commit('setBackupEngineList', this.backupEngineList)
    },
    handleAddNewEngine () {
      this.$refs.addDialog.open()
    },
    handleAddNewEngineSubmit () {
      const { name, link, iconType, iconPath } = this.addEngineForm
      if (!name || !link || !iconType) {
        this.$warning('请完成表单')
        return
      }
      if (iconType === 'network' && !iconPath) {
        this.$warning('请完成表单')
        return
      }
      this.engineList.push({
        name, link, iconType, iconPath
      })
      localStorage.setItem('engineList', JSON.stringify(this.engineList))
      this.$store.commit('setEngineList', this.engineList)
      this.addEngineForm = {
        name: '',
        link: '',
        iconType: 'api',
        iconPath: ''
      }
      this.$refs.addDialog.close()
    }
  }
}
</script>

<style scoped lang="scss">
.warning {
  width: 100%;
  padding: 5px 10px;
  font-size: 12px;
  box-sizing: border-box;
  color: #ff933b;
  border: 1px solid #ffc392;
  background: rgb(245, 226, 205);
  border-radius: 3px;
  margin-bottom: 8px;
}
#EngineSetting {
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
}
.title {
  padding: 0 12px;
  margin: 10px 0;
  font-size: 20px;
  font-weight: bold;
  border-left: 5px solid var(--primaryColor);
}
.content {
  position: relative;
  .text {
    font-size: 14px;
    color: #778;
    margin: 0 10px;
  }
  .s-title {
    margin-bottom: 8px;
  }
  .btn-add {
    position:absolute;
    right: 0;
    top: 0;
  }
}
.engine-list {
  display: flex;
  padding: 5px;
  flex-wrap: wrap;
  .engine-list-item {
    padding: 5px 0;
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
.flip-list-move {
  transition: transform 0.5s;
}

.form {
  padding: 10px 20px;
  .form-item {
    margin-bottom: 15px;
    display: flex;
    .label {
      width: 80px;
      margin-right: 16px;
      text-align: right;
      height: 32px;
      line-height: 32px;
    }
    .content {
      width: 100%;
      flex: 1;
      padding-right: 10px;
      input {
        outline: none;
        width: 100%;
        height: 32px;
        border: 2px solid #767682;
        line-height: 28px;
        padding: 0 6px;
        font-size: 14px;
        box-sizing: border-box;
        font-size: 16px;
        &:focus {
          border: 2px solid var(--primaryColor);
          box-shadow:  0 0 3px var(--primaryColor);
        }
      }
      .tips {
        font-size: 12px;
        color: rgb(128, 127, 127);
        margin-top: 5px;
        b {
          color: #363636;
        }
      }
      .radio-box {
        display: inline-flex;
        cursor: pointer;
        align-items: center;
        height: 32px;
        width: 100%;
        .radio-icon {
          font-size: 18px;
          margin-right: 5px;
        }
        .radio-text {
          font-size: 14px;
          color:#667;
          padding-right: 20px;
          padding-top: 1px;
        }
        &.active {
          .radio-text {
            color: #0078D7;
          }
        }
      }
      .icon-img-preview-box {
        display: flex;
        align-items: center;
        height: 32px;
        .icon-img-preview {
          width: 24px;
          height: 24px;
          background: #ccc;
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
      }
    }
  }
}
.add-dialog {
  position:relative;
  .footer {
    text-align: center;
    position: absolute;
    bottom: 30px;
    width: 100%;
  }
}

</style>
