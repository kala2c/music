<template>
  <div class="play-card">
    <head-bar :title="musicSelected.name" :left="'chevron-down'" @left="close"></head-bar>
    <div class="singer">—— {{ musicSelected.singer }} ——</div>
    <div class="disk-wrap">
      <div class="disk"></div>
    </div>
    <div class="lrc">
      <p>暂无歌词</p>
    </div>
    <div class="progress-wrap">
      <p>{{startTime}}</p>
      <div class="progress" id="card-progress" @click="changeProcess">
        <span class="vernier" :style="{left: vernierLeft+'px'}"></span>
      </div>
      <p>{{endTime}}</p>
    </div>
    <div class="control">
      <div class="play-side" @click="switchHandle">
        <img :src="`/play-icon/${playType}.png`" alt="">
      </div>
      <div class="play-control">
        <div class="left" @click="prevMusic">
          <span><i class="fa fa-step-backward"></i></span>
        </div>
        <div class="play" @click="invertIsPlay"
          :style="`width: ${isPlay?50:45}px; paddingLeft: ${isPlay?0:5}px`">
          <span><i :class="`fa fa-${isPlay?`pause`:`play`}`"></i></span>
        </div>
        <div class="right" @click="nextMusic">
          <span><i class="fa fa-step-forward"></i></span>
        </div>
      </div>
      <div class="play-side" @click="toPlayList">
        <div><span><i class="fa fa-bars"></i></span></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import HeadBar from '../components/HeadBar'
export default {
  components: {
    HeadBar
  },
  data() {
    return {
      progressWidth: 360
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
    },
    startTime() {
      let m = Math.floor(this.currentTime/60) 
      m = m < 10 ? '0'+m : m
      let s = parseInt(this.currentTime%60)
      s = s < 10 ? '0'+s : s
      return m+':'+s
    },
    endTime() {
      let m = Math.floor(this.duration/60) 
      m = m < 10 ? '0'+m : m
      let s = parseInt(this.duration%60)
      s = s < 10 ? '0'+s : s
      return m+':'+s
    }
  },
  watch: {

  },
  methods: {
    ...mapMutations(['switchPlayType', 'prevMusic', 'nextMusic', 'invertIsPlay', 'setProcess']),
    switchHandle() {
      this.switchPlayType()
    },
    close() {
      this.$store.state.CtrlBarShow = true
      this.$router.go(-1)
    },
    toPlayList() {
      this.$parent.openPlayList()
      // this.$el.openPlayList()
      // this.$router.push({
      //   path: '/playlist'
      // })
      // this.$store.state.cardShow = false
    },
    changeProcess() {
      let rate = (event.clientX-65) / this.progressWidth
      rate = rate.toFixed(2)
      this.setProcess(rate)
    }
  },
  mounted() {
    this.$store.state.CtrlBarShow = false
    this.$parent.closePlayList()
    // let progress = document
    let progress = document.querySelector('#card-progress')
    this.progressWidth = parseInt(getComputedStyle(progress, null)['width'])
  }
}
</script>

<style lang="scss" scoped>
.play-card {
  .singer {
    text-align: center;
    margin-top: 30px;
    padding: 5px 0;
  }
  .disk-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    .disk {
      width: 250px;
      height: 250px;
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
      width: 50px;
      height: 50px;
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
  }
  .lrc {
    height: 50px;
    text-align: center;
    line-height: 50px;
  }
  .progress-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    p {
      padding: 0 10px;
    }
    .progress {
      position: relative;
      width: 100%;
      height: 5px;
      background-color: #eee;
      .vernier {
        position: absolute;
        z-index: 30;
        top: -5px;
        left: -7.5px;
        width: 15px;
        height: 15px;
        border: .5px solid #ccc;
        border-radius: 50%;
        background-color: #fff;
      }
    }
  }
  .control {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    .play-side {
      display: flex;
      align-items: center;
      padding: 0 20px;
      font-size: 1.5em;
      img {
        width: 30px;
        height: 30px;
      }
    }
    .play-control {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.5em;
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        margin: 0 10px;
        border: 3px solid #2c3e50;
        border-radius: 50%;
      }
      // .play {
      //   width: 45px;
      //   padding-left: 5px;        
      // }
      span {
        padding: 0 20px;
      }
    }
  }
}
</style>

