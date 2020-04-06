<template>
  <div id="EngineSetting">
    <div class="title">搜索引擎设置</div>
    <div class="warning">通过拖拽下方可更换切换引擎顺序或添加新的引擎</div>
    <div class="content">
      <div class="text">当前引擎组</div>
      <draggable :list="engineList"
                 :group="{ name: 'engine',pull: engineList.length > 1 }"
                 @end="handleDragEnd">
        <transition-group type="transition"
                          name="flip-list"
                          class="now-engine-list engine-list">
          <div class="engine-list-item"
               v-for="item in engineList"
               :key="item.name">
            <img :src="item.iconPath"
                 alt="icon"
                 width="24"
                 height="24">
            <div class="text">{{item.name}}</div>
          </div>
        </transition-group>
      </draggable>
      <div class="text">备用引擎组</div>
      <draggable :list="backupEngineList"
                 group="engine"
                 @end="handleDragEnd">
        <transition-group type="transition"
                          name="flip-list"
                          class="backupEngineList engine-list">
          <div class="engine-list-item"
               v-for="item in backupEngineList"
               :key="item.name">
            <img :src="item.iconPath"
                 alt="icon"
                 width="24"
                 height="24">
            <div class="text">{{item.name}}</div>
          </div>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'EngineSetting',
  components: {
    draggable
  },
  data () {
    return {
      dragDisabled: false,
      engineList: [],
      backupEngineList: []
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
  padding-bottom: 15px;
  margin-bottom: 15px;
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
  .text {
    font-size: 14px;
    color: #778;
    margin: 0 10px;
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
    text-align: center;
    width: 70px;
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
.flip-list-move {
  transition: transform 0.5s;
}
</style>
