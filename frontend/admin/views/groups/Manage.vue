<template>
  <div class="manage">

  </div>
</template>

<script>
  import api from '../../api/api'
  export default {
    data() {
      return {
        groupList: []
      }
    },
    methods: {
      change() {
      }
    },
    created() {
      let res = api.getGroupsList()
      this.groupList = res.data
    }
  }
</script>

