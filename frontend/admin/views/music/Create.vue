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
    </el-form>
    <el-upload
      class="upload-demo"
      ref="upload"
      action="http://up-z0.qiniup.com"
      :data="uploadData"
      :on-change="handleChange"
      :on-success="handleSuccess"
      :file-list="fileList"
      :limit="1"
      :multiple="false"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">提交</el-button>
      <div slot="tip" class="el-upload__tip">只能上传mp3文件，且不超过6MB</div>
    </el-upload>
  </div>
</template>
<script>
import api from '../../api/api'
  export default {
    data() {
      return {
        fileList: [],
        form: {
          name: '',
          singer: '',
          groups_id: '',
          url: '1'
        },
        uploadData: {
          token: ''
        },
        groups: [],

      };
    },
    watch: {
      form: {
        handler(newVal, oldVal) {
          if (newVal.name.indexOf('mqms') > 1) {
            this.form.name = newVal.name.split('[')[0].trim()
          }
        },
        deep: true
      },
      uploadData(value) {
        console.log(value)
      }
    },
    methods: {
      submitUpload() {
        let canSubmit = true
        if (!this.form.name) {
          console.log(this.form.name)
          canSubmit = false
        }
        if (!this.form.singer) {
          console.log(this.form.singer)
          canSubmit = false
        }
        if (!this.form.groups_id) {
          console.log(this.form.groups_id)
          canSubmit = false
        }
        if (canSubmit) {
          this.$refs.upload.submit();
        } else {
          this.$alert('请将歌曲信息填写完整')
        }
      },
      handleChange(file, fileList) {
        if (file.name.split('.').length === 2) {
          let [filename, filetype] = file.name.split('.')
          if (filename.split('-').length === 2) {
            let [singer, songname] = filename.split('-')
            this.$set(this.form, 'singer', singer.trim())
            // this.form.singer = singer.trim()
            this.form.name = songname.trim()
          }
        } else if (file.name.split('-').length === 2) {
          let [singer, songname] = file.name.split('-')
          this.form.singer = singer
          this.form.name = songname.trim()
        }
      },
      async handleSuccess(response, file, fileList) {
        console.log(response)
        this.form.url = 'http://qn.clw-music.c2wei.cn/'+response.key
        let res = await api.createMusic({
          method: 'post',
          data: this.form
        })
        if (res) {
          this.$message(res.data.msg)
          this.fileList = []
          this.form.name = ''
          this.form.url = ''
          this.getToken()
        }
      },
      async getToken() {
        let res = await api.getUploadToken()
        this.uploadData.token = res.data.token
      }
    },
    async mounted() {
      let groups = await api.getGroupsList()
      this.groups = groups.data
      this.getToken()
    }
  }
</script>
