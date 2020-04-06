// import Vue from 'vue'
// import Vuex from 'vuex'
import { getBase64Image, getToday } from '@/utils/helper'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    engineList: [
      {
        name: 'Bing-CN',
        iconPath: require('@/assets/img/icon/bing.svg'),
        link: 'https://cn.bing.com/search?q='
      },
      {
        name: 'Bing-EN',
        iconPath: require('@/assets/img/icon/bing-en.svg'),
        link: 'https://cn.bing.com/search?ensearch=1&q='
      },
      {
        name: '百度',
        iconPath: require('@/assets/img/icon/baidu.svg'),
        link: 'https://www.baidu.com/s?wd='
      },
      {
        name: '有道词典',
        iconPath: require('@/assets/img/icon/youdao.svg'),
        link: 'http://dict.youdao.com/w/'
      }
    ],
    backupEngineList: [
      {
        name: 'Google',
        iconPath: require('@/assets/img/icon/google.svg'),
        link: 'https://www.google.com/search?q='
      },
      {
        name: '搜狗',
        iconPath: require('@/assets/img/icon/sougou.svg'),
        link: 'https://www.sogou.com/tx?query='
      },
      {
        name: 'Bilibili',
        iconPath: require('@/assets/img/icon/bilibili.svg'),
        link: 'https://search.bilibili.com/all?keyword='
      },
      {
        name: '淘宝',
        iconPath: require('@/assets/img/icon/taobao.svg'),
        link: 'https://s.taobao.com/search?q='
      }
    ],
    unsplashImgList: [],
    downloadingImgInfo: null,
    downloadingImgEl: null,
    downloadingImgBase64: '',
    cacheImg: {}
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
    setDownloadingImgEl (state, downloadingImgEl) {
      state.downloadingImgEl = downloadingImgEl
    },
    setDownloadingImgBase64 (state, base64) {
      document.body.style.setProperty('--textColor', base64 ? '#f8f8f9' : '#262626')
      document.body.style.setProperty('--textShadowColor', base64 ? '#262626' : 'transparent')
      state.downloadingImgBase64 = base64
    },
    setCacheImg (state, { imgId, base64 }) {
      state.cacheImg = {
        ...state.cacheImg,
        [imgId]: base64
      }
    }
  },
  actions: {
    getDownloadingImg ({ commit, state }, downloadingImg) {
      const imgId = downloadingImg.id
      if (state.cacheImg[imgId]) {
        commit('setDownloadingImgBase64', state.cacheImg[imgId])
      } else {
        const imgURL = downloadingImg.urls.regular.replace('w=1080', 'w=1440').replace('q=80', 'q=75')
        // const imgURL = downloadingImg.urls.regular
        const img = new Image()
        img.src = imgURL
        img.crossOrigin = 'anonymous'
        commit('setDownloadingImgInfo', downloadingImg)
        commit('setDownloadingImgEl', img)
        img.onload = function () {
          const dataURL = getBase64Image(img)
          commit('setDownloadingImgBase64', dataURL)
          commit('setCacheImg', { imgId, base64: dataURL })
          commit('setDownloadingImgInfo', null)
          commit('setDownloadingImgEl', null)
          const userTodayImgInfo = {
            ...downloadingImg,
            date: getToday()
          }
          localStorage.setItem('userTodayImgInfo', JSON.stringify(userTodayImgInfo))
        }
      }
    }
  },
  modules: {
  }
})
