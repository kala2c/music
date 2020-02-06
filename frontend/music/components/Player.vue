<template>
  <div class="player">
    <audio 
      id="player"
      style="display: none"
      :src="musicUrl" 
      controls="controls"
    ></audio>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Player from './Player'
let _ = require('lodash')
export default {
  components: {
    Player
  },
  data() {
    return {
      player: null,
      // currentTime: 0,
      // duration: 0,
      // progressWidth: 375
    }
  },
  computed: {
    ...mapState(['currentTime', 'duration', 'process', 'isPlay', 'playType', 'playList', 'musicSelectedIndex']),
    musicSelected() {
      return this.playList[this.musicSelectedIndex] || null
    },
    musicUrl() {
      return this.musicSelected ? this.musicSelected.url : ''
    },
    // process() {
    //   let process = this.currentTime / this.duration
    //   return process.toFixed(2)
    // },
  },
  watch: {
    musicUrl(val) {
      this.init()
    },
    isPlay() {
      if (!this.musicSelected) return
      if (this.isPlay) {
        this.player.play()
      } else {
        this.player.pause()
      }
    },
    process() {
      this.player.currentTime = this.duration*this.process
    }
  },
  methods: {
    ...mapMutations(['nextMusic', 'setCurrentTime', 'setDuration']),
    computeProcess() {
      let process = this.currentTime / this.duration
      return process.toFixed(2)
    },
    init() {
      // 获取播放器的已播放时长和总时长
      // this.$store.state.currentTime = 0
      // this.$store.state.duration = parseInt(this.player.duration) || 300  //往往歌曲载入完成时才能拿到该属性 因此下面还会获取
      // 歌曲开始载入时
      this.player.addEventListener('loadstart', e => {
        // console.log(e)
      })
      // 歌曲载入完成时
      this.player.addEventListener('canplaythrough', e => {
        // 当前播放时间
        // this.player.currentTime = this.currentTime
        this.setCurrentTime(this.player.currentTime)
        // 获取歌曲总时长
        this.setDuration(parseInt(this.player.duration))
        if (this.isPlay) {
          this.player.play()
        }
      })
    }
  },
  mounted() {
    // 获取播放器的dom对象
    this.player = document.querySelector('#player')
    // 初始化
    // this.init()
    // if (localStorage.getItem('music-isPlay')) {
      // this.player.autoplay = true
      // this.player.addEventListener('canplaythrough', e => {
        // 当前播放时间
        // console.log(this.currentTime)
        // this.setCurrentTime(this.player.currentTime)
        // 获取歌曲总时长
        // this.setDuration(parseInt(this.player.duration))
        // if (localStorage.getItem('music-isPlay')) {
        //   this.player.play()
        //   this.player.currentTime = this.currentTime
        // }
      // })
    // }
    // 监听已播放时长变化
    this.player.addEventListener('timeupdate', _.throttle((e) => {
      this.setCurrentTime(this.player.currentTime)
      // console.log(this.player.ended, this.currentTime, this.duration)
      // console.log(this.process)
      if (this.player.ended) {
        this.setCurrentTime(0)
        this.nextMusic()
      }
    }, 1000))
  }
}
</script>