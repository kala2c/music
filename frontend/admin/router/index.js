import Vue from 'vue'
import Layout from '../layout/index'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/music/manage',
        component: () => import('../views/music/Manage')
      },
      {
        path: '/music/create',
        component: () => import('../views/music/Create')
      },
      {
        path: '/groups/manage',
        component: () => import('../views/groups/Manage')
      },
      {
        path: '/groups/create',
        component: () => import('../views/groups/Create')
      }
    ]
  },

]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
