<template>
  <div class="create">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="歌曲名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="歌手">
        <el-input v-model="form.singer"></el-input>
      </el-form-item>
      <el-form-item label="列表">
        <el-select v-model="form.groups_id" placeholder="列表">
          <el-option
            v-for="group in groups"
            :key="group.id"
            :label="group.name"
            :value="group.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-input type="hidden" v-model="form.url"></el-input>
      </el-form-item>
    </el-form>
    <el-upload
      class="upload-demo"
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      :data="uploadData"
      :before-upload="handleUpload"
      :on-success="handleSuccess"
      :file-list="fileList"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">提交</el-button>
      <div slot="tip" class="el-upload__tip">只能上传mp3文件，且不超过6MB</div>
    </el-upload>
  </div>
</template>
<script>
import api from '../api/api'
  export default {
    data() {
      return {
        fileList: [],
        form: {
          name: '',
          singer: '',
          groups_id: ''
        },
        uploadData: {
          
        },
        groups: [],

      };
    },
    watch: {
      form(value) {
        console.log(value)
      },
      uploadData: {}
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleUpload(file) {
        // 
      },
      handleSuccess(response, file, fileList) {
        console.log(response)
      }
    },
    async mounted() {
      let groups = await api.getGroupsList()
      this.groups = groups.data

      let res = await api.getUploadToken()
      console.log(res)
      this.form.uploadToken = res.data.token
    }
  }
</script>