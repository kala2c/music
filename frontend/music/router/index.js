import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import List from '../views/List'
// import PlayList from '../views/PlayList'
import PlayCard from '../views/PlayCard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  // {
  //   path: '/playlist',
  //   component: PlayList
  // },
  {
    path: '/list',
    component: List
  },
  {
    path: '/playcard',
    component: PlayCard
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
