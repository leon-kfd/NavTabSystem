import Vue from 'vue'
import Vuex from 'vuex'
import { getBase64ByAjax, getToday, getLocalStorage } from '@/utils/helper'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    engineList: [
      {
        name: 'Bing-CN',
        link: 'https://cn.bing.com/search?q=',
        iconType: 'local',
        iconPath: './icons/bing.svg'
      },
      {
        name: 'Bing-EN',
        link: 'https://cn.bing.com/search?ensearch=1&q=',
        iconType: 'local',
        iconPath: './icons/bing-en.svg'
      },
      {
        name: '百度',
        link: 'https://www.baidu.com/s?wd=',
        iconType: 'local',
        iconPath: './icons/baidu.svg'
      },
      {
        name: '有道词典',
        link: 'http://dict.youdao.com/w/',
        iconType: 'local',
        iconPath: './icons/youdao.svg'
      }
    ],
    backupEngineList: [
      {
        name: 'Google',
        link: 'https://www.google.com/search?q=',
        iconType: 'local',
        iconPath: './icons/google.svg'
      },
      {
        name: '搜狗',
        link: 'https://www.sogou.com/tx?query=',
        iconType: 'local',
        iconPath: './icons/sougou.svg'
      },
      {
        name: 'Bilibili',
        link: 'https://search.bilibili.com/all?keyword=',
        iconType: 'local',
        iconPath: './icons/bilibili.svg'
      },
      {
        name: '淘宝',
        link: 'https://s.taobao.com/search?q=',
        iconType: 'local',
        iconPath: './icons/taobao.svg'
      }
    ],
    unsplashImgList: [],
    downloadingImgInfo: null,
    downloadingImgBase64: '',
    downloadingProcess: 0,
    cacheImg: {},
    reloadFlag: false
  },
  mutations: {
    setEngineList (state, engineList) {
      state.engineList = engineList
    },
    setBackupEngineList (state, backupEngineList) {
      state.backupEngineList = backupEngineList
    },
    setUnsplashImgList (state, unsplashImgList) {
      state.unsplashImgList = unsplashImgList
    },
    setDownloadingImgInfo (state, downloadingImgInfo) {
      state.downloadingImgInfo = downloadingImgInfo
    },
    setDownloadingProcess (state, downloadingProcess) {
      state.downloadingProcess = downloadingProcess
    },
    setDefaultImgBase64 (state) {
      const userTodayImgCache = getLocalStorage('userTodayImgCache')
      if (userTodayImgCache && userTodayImgCache.base64) {
        document.body.style.setProperty('--textColor', '#f8f8f9')
        document.body.style.setProperty('--textShadowColor', '#262626')
        state.downloadingImgBase64 = userTodayImgCache.base64
      }
    },
    setDownloadingImgBase64 (state, base64) {
      document.body.style.setProperty('--textColor', base64 ? '#f8f8f9' : '#262626')
      document.body.style.setProperty('--textShadowColor', base64 ? '#262626' : 'transparent')
      state.downloadingImgBase64 = base64
      const userTodayImgCache = {
        date: getToday(),
        base64
      }
      const toJson = JSON.stringify(userTodayImgCache)
      if (toJson.length < 3.5 * 1024 * 1024) {
        localStorage.setItem('userTodayImgCache', JSON.stringify(userTodayImgCache))
      }
    },
    setCacheImg (state, { imgId, base64 }) {
      state.cacheImg = {
        ...state.cacheImg,
        [imgId]: base64
      }
    },
    setReloadFlag (state, flag) {
      state.reloadFlag = flag
    }
  },
  actions: {
    getDownloadingImg ({ commit, state }, downloadingImg) {
      const imgId = downloadingImg.id
      if (state.cacheImg[imgId]) {
        commit('setDownloadingImgBase64', state.cacheImg[imgId])
      } else {
        let imgURL
        if (document.body.clientWidth >= 1440) {
          imgURL = downloadingImg.urls.regular.replace('w=1080', 'w=1920').replace('q=80', 'q=70')
        } else {
          imgURL = downloadingImg.urls.regular.replace('q=80', 'q=70')
        }
        commit('setDownloadingImgInfo', downloadingImg)
        commit('setDownloadingProcess', 0)
        const processFn = (e) => {
          const process = ~~(e.loaded / e.total * 100)
          commit('setDownloadingProcess', process)
        }
        getBase64ByAjax(imgURL, 'image/png', processFn).then(data => {
          const dataURL = data
          commit('setDownloadingImgBase64', dataURL)
          commit('setCacheImg', { imgId, base64: dataURL })
          commit('setDownloadingImgInfo', null)
        })
      }
    },
    reload({ commit, state }) {
      commit('setReloadFlag', true)
      Vue.nextTick(() => {
        commit('setReloadFlag', false)
      })
    }
  },
  modules: {
  }
})
