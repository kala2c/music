<template>
  <div id="app">
    <router-view/>
    <control-bar v-show="CtrlBarShow" @openCard="openCard" @togglePlayList="togglePlayList"></control-bar>
    <player></player>
    <play-list v-show="playListShow" @close="closePlayList"></play-list>
  </div>
</template>

<script>
import ControlBar from './components/ControlBar'
import Player from './components/Player'
import PlayList from './components/PlayList' 
import { mapState } from 'vuex'
export default {
  components: {
    ControlBar,
    Player,
    PlayList
  },
  data() {
    return {
      playListShow: false
    }
  },
  methods: {
    openCard() {
      this.$router.push({
        path: '/playcard'
      })
    },
    openPlayList() {
      this.playListShow = true
    },
    closePlayList() {
      this.playListShow = false
    },
    togglePlayList() {
      this.playListShow = !this.playListShow
    }
  },
  computed: {
    ...mapState(['CtrlBarShow'])
  },
  watch: {
    CtrlBarShow(value) {
      if (value) {
        this.$el.style.paddingBottom = 0
      } else {
        this.$el.style.paddingBottom = '60px'
      }
    }
  },
  created() {
    let data = this.$store.state
    let musicSelectedIndex = localStorage.getItem('music-musicSelectedIndex')
    ,  isPlay = localStorage.getItem('music-isPlay')
    , playType = localStorage.getItem('music-playType')
    , currentTime = localStorage.getItem('music-currentTime')
    , playList = localStorage.getItem('music-playList')
    if (musicSelectedIndex) {
      data.musicSelectedIndex = parseInt(musicSelectedIndex)
    }

    // let data = this.$store.state

    // if (isPlay) {
    //   data.isPlay = isPlay
    // }
    if (playType) {
      data.playType = playType
    }
    // if (currentTime) {
    //     data.currentTime = currentTime
      // let rate = currentTime / this.$store.state.duration
    // }
    if (playList) {
      data.playList = JSON.parse(playList)
    }
  }
}
</script>

<style lang="scss">
@import url('./assets/font-awesome-4.7.0/css/font-awesome.min.css');

* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: inherit;
}
ul,
ol {
  list-style: none;
}
h1,
h2,
h3,
h4 {
  font: inherit;
}
input,
select,
button {
  font: inherit;
}
html,
body {
  height: 100%;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
}
// control-bar高60px 因此app底部留出60px;
// control-bar绝对定位在底部
#app {
  box-sizing: border-box;
  height: 100%;
  padding-bottom: 60px;
  overflow: hidden;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
