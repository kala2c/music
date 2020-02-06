<template>
  <div class="music-manage">
    <el-table
      :data="list"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="歌名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="singer"
        label="歌手"
        width="180">
      </el-table-column>
      <el-table-column
        prop="url"
        label="远端地址">
      </el-table-column>
      <el-table-column
        prop="groups_id"
        label="所属列表">
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="创建时间">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// @ is an alias to /src
// import HeadBar from '../components/HeadBar.vue'
import api from '../api/api'
export default {
  name: 'home',
  components: {
    // HeadBar
  },
  data() {
    return {
      list: []
    }
  },
  async mounted() {
    let list = await api.getMusicList()
    this.list = list.data
  }
}
</script>
