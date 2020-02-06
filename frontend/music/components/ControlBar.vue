<template>
  <div class="control-bar">
    <div class="progress" id="progress" @click="changeProcess">
      <span class="vernier" :style="{left: vernierLeft+'px'}"></span>
    </div>
    <div class="disk"></div>
    <div v-if="musicSelected" class="content" @click="$emit('openCard')">
      <p>{{musicSelected.name}}-{{musicSelected.singer}}</p>
    </div>
    <div v-else class="content">
      <p>未选择歌曲</p>
    </div>
    <div class="right">
      <span @click="play">
        <i class="fa" :class="{'fa-play-circle-o': !isPlay, 'fa-pause-circle-o': isPlay}"></i>
      </span>
      <span class="next" @click="next">
        <i class="fa fa-play"></i>
      </span>
      <span @click="toPlayList">
        <i class="fa fa-bars"></i>
      </span>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
let _ = require('lodash')
export default {
  components: {
    // Player
  },
  data() {
    return {
      progressWidth: 375
    }
  },
  computed: {
    ...mapState(['currentTime', 'duration', 'isPlay', 'playType', 'playList', 'musicSelectedIndex']),
    musicSelected() {
      return this.playList[this.musicSelectedIndex] || null
    },
    // 这个进度非store的process 根据player的currentTime计算
    process() {
      let process = this.currentTime / this.duration
      return process.toFixed(2)
    },
    vernierLeft() {
      return Math.round(this.progressWidth*this.process)-7.5
    }
  },
  watch: {
    musicUrl(val) {
      this.init()
    }
  },
  methods: {
    ...mapMutations(['nextMusic', 'invertIsPlay', 'setCurrentTime', 'setProcess']),
    play() {
      if (!this.musicSelected) return
      this.invertIsPlay()
    },
    // 下一曲
    next() {
      this.nextMusic();
    },
    toPlayList() {
      // let path = '/playlist'
      // if (this.$route.path === path) {
      //   this.$router.go(-1)
      // } else {
      //   this.$router.push({
      //     path
      //   })
      // }
      this.$emit('togglePlayList')
    },
    changeProcess() {
      let rate = event.clientX / this.progressWidth
      rate = rate.toFixed(2)
      this.setProcess(rate)
    }
  },
  mounted() {
    // 进度条宽度
    // this.progressWidth = window.innerWidth
    let progress = document.querySelector('#progress')
    this.progressWidth = parseInt(getComputedStyle(progress, null)['width'])
  }
}
</script>

<style scoped lang="scss">
.control-bar {
  position: absolute;
  z-index: 20;
  bottom: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  border-top: 1px solid #eee; 
  background-color: #fff;
  .progress {
    position: absolute;
    top: -5px;
    width: 100%;
    height: 5px;
    background-color: #1e9fff;
    .vernier {
      position: absolute;
      z-index: 30;
      top: -5px;
      left: -7.5px;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .disk {
    position: absolute;
    top: -5px;
    left: 5px;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background-image: radial-gradient(circle, #444 0%, #333 100%);
    background-size: cover;
    background-position: center;
    animation: roll 5s infinite linear;
  }
  .disk::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-image: linear-gradient(45deg, white, #dabad1);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    transform: translate3d(-50%, -50%, 0)
  }
  @keyframes roll {
    0% {
      transform: rotate(0deg);
    } 
    100% {
      transform: rotate(360deg);
    }
  }
  .content {
    display: flex;
    flex: 1;
    padding-left: 70px;
  }
  .right {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1.5em;
    span {
      padding-right: 20px;
    }
    span.next {
      font-size: .7em;
    }
  }
}
</style>
