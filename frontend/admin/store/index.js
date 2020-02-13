import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routes: [
      {
        id: 1,
        title: '歌曲管理',
        link: [
          {
            id: 1,
            name: '添加歌曲',
            path: '/music/create'
          },
          {
            id: 2,
            name: '歌曲列表',
            path: '/music/manage'
          }
        ]
      },
      {
        id: 2,
        title: '列表管理',
        link: [
          {
            id: 1,
            name: '添加列表',
            path: '/groups/create'
          },
          {
            id: 2,
            name: '列表管理',
            path: '/groups/manage'
          }
        ]
      },
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
