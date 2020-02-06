import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isPlay: false,
    playType: 'random',
    musicSelectedIndex: 0,
    currentTime: 0,
    duration: 300,
    process: 0,
    oldCurrentTime: 0,
    CtrlBarShow: true,
    playList: [
      {
        id: 1,
        name: "告白气球",
        singer: "周杰伦",
        url: "http://static.c2wei.cn/1.mp3"
      },
      {
        id: 2,
        name: "睡公主",
        singer: "邓紫棋",
        url: "http://qn.clw-music.c2wei.cn/22.mp3"
      },
      // {
      //   id: 3,
      //   name: "北京北京",
      //   singer: "邓紫棋",
      //   url: "http://static.c2wei.cn/3.mp3"
      // },
      // {
      //   id: 4,
      //   name: "爱过那张脸",
      //   singer: "李代沫",
      //   url: "http://qn.clw-music.c2wei.cn/4.mp3"
      // }
    ]
  },
  mutations: {
    invertIsPlay(state) {
      state.isPlay = !state.isPlay
      localStorage.setItem('music-isPlay', state.isPlay)
    },
    setCurrentTime(state, time) {
      state.currentTime = time
      if (time - state.oldCurrentTime > 5) {
        localStorage.setItem('music-currentTime', state.currentTime)
        state.oldCurrentTime = time
      }
    },
    setDuration(state, time) {
      state.duration = time
    },
    setProcess(state, rate) {
      state.process = rate
    },
    pushMusic(state, { music, play }) {
      let currentIndex = -1
      state.playList.forEach((item, index) => {
        if (item.id === music.id) {
          currentIndex = index
        }
      })
      if (currentIndex === -1) {
        state.playList.push(music)
        localStorage.setItem('music-playList', JSON.stringify(state.playList))
        if (play) {
          state.musicSelectedIndex = state.playList.length-1
          state.isPlay = true
        }
      } else {
        if (play) {
          state.musicSelectedIndex = currentIndex
          state.isPlay = true
        }
      }
    },
    selectMusic(state, {music}) {
      let currentIndex = -1
      state.playList.forEach((item, index) => {
        if (item.id === music.id) {
          currentIndex = index
        }
      })
      if (currentIndex === -1) {
        return
      }
      state.musicSelectedIndex = currentIndex
      localStorage.setItem('music-musicSelectedIndex', state.musicSelectedIndex)
    },
    deleteMusic(state, { music }) {
      let currentIndex = -1
      state.playList.forEach((item, index) => {
        if (item.id === music.id) {
          currentIndex = index
        }
      })
      if (currentIndex === -1) {
        return
      }
      state.playList.splice(currentIndex, 1)
      if (currentIndex < state.musicSelectedIndex) {
        state.musicSelectedIndex --
      }
      if (state.musicSelectedIndex === currentIndex) {
        this.commit("nextMusic")
      }
      localStorage.setItem('music-musicSelectedIndex', state.musicSelectedIndex)      
    },
    switchPlayType(state, playType) {
      let playTypeList = ['sequence', 'random', 'single']
      if (playType) {
        if (playTypeList.indexOf(playType) > -1) {
          state.playType = playType
        }
      } else {
        let currentPlayTypeIndex = playTypeList.indexOf(state.playType)
        if (currentPlayTypeIndex < 0) currentPlayTypeIndex = 0
        let playTypeIndex = (currentPlayTypeIndex+1)%playTypeList.length
        state.playType = playTypeList[playTypeIndex]
      }
      localStorage.setItem('music-playType', state.playType)
    },
    nextMusic(state) {
      if (state.playList.length < 1) return
      // 如果是单曲循环或列表只有一首歌 只重置进度
      if (state.playType == 'single' || state.playList.length < 2) {
        state.player.currentTime = 0 
      }
      switch (state.playType) {
        case 'sequence':
          state.musicSelectedIndex ++ 
          if (state.musicSelectedIndex > state.playList.length-1) {
            state.musicSelectedIndex = 0
          }
          break
        case 'random':
          let oldIndex = state.musicSelectedIndex
          let newIndex = Math.floor(Math.random()*state.playList.length)
          while (oldIndex === newIndex && state.playList.length > 1) {
            newIndex = Math.floor(Math.random()*state.playList.length)
          }
          state.musicSelectedIndex = newIndex
          break
        case 'single':
          return
          break
      }
      localStorage.setItem('music-musicSelectedIndex', state.musicSelectedIndex)
    },
    prevMusic(state) {
      if (state.playList.length < 1) return
      // 如果是单曲循环或列表只有一首歌 只重置进度
      if (state.playType == 'single' || state.playList.length < 2) {
        state.player.currentTime = 0 
      }
      switch (state.playType) {
        case 'sequence':
          state.musicSelectedIndex -- 
          if (state.musicSelectedIndex < 0) {
            state.musicSelectedIndex = state.playList.length-1
          }
          break
        case 'random':
          let oldIndex = state.musicSelectedIndex
          let newIndex = Math.floor(Math.random()*state.playList.length)
          while (oldIndex === newIndex && state.playList.length > 1) {
            newIndex = Math.floor(Math.random()*state.playList.length)
          }
          state.musicSelectedIndex = newIndex
          break
        case 'single':
          return
          break
      }
      localStorage.setItem('music-musicSelectedIndex', state.musicSelectedIndex)
    }
  },
  actions: {
  },
  modules: {
  }
})
