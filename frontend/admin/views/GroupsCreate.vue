<template>
  <div class="create">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="列表名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="列表logo">
        <el-input v-model="form.logo"></el-input>
      </el-form-item>
      <el-form-item label="列表介绍">
        <el-input v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <!-- <el-button>取消</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from '../api/api'
export default {
  data() {
    return {
      form: {
        name: '',
        logo: '/singer/default.png',
        desc: '歌曲列表'
      }
    }
  },
  methods: {
    async onSubmit() {
      let res = await api.createGroups({data: this.form})
      if (res) {
        this.$message(res.data.msg)
      }
    }
  }
}
</script>

