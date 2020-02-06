<template>
  <div id="app">
    <div class="header">
      <div class="left">
        <div class="logo">
          <h2>m u s i c</h2>
        </div>
      </div>
      <div class="right">
        <head-bar></head-bar>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <side-bar></side-bar>  
      </div>
      <div class="right">
        <router-view class="container"/>
        <foot-bar></foot-bar>
      </div>
    </div>
  </div>
</template>

<script>
import HeadBar from './components/HeadBar'
import SideBar from './components/SideBar'
import FootBar from './components/FootBar'
export default {
  components: {
    HeadBar,
    SideBar,
    FootBar
  }  
}
</script>


<style>
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
  overflow: hidden;
}
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.left {
  float: left;
  width: 200px;
}
.right {
  box-sizing: border-box;
  margin-left: 200px;
}
.header {
  background-color: #393d49;
}
.header .logo {
  width: 200px;
  height: 62px;
  background-color: #393d49;
  color: #fff;
  text-align: center;
  line-height: 62px;
}
.content {
  height: 100%;
}
.content .left {
  height: 100%;
}
.content .right {
  box-sizing: border-box;
  height: 100%;
  padding-bottom: 110px;
  overflow: auto;
  margin-left: 200px;
}
.content .right .container {
  padding: 10px 20px;
}
</style>
