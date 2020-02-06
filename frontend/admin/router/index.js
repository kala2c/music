import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import MusicManage from '../views/MusicManage'
import MusicCreate from '../views/MusicCreate'
import GroupsManage from '../views/GroupsManage'
import GroupsCreate from '../views/GroupsCreate'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/music/manage',
    component: MusicManage
  },
  {
    path: '/music/create',
    component: MusicCreate
  },
  {
    path: '/groups/manage',
    component: GroupsManage
  },
  {
    path: '/groups/create',
    component: GroupsCreate
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
