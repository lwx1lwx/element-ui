<template>
  <el-radio-group v-model="radio" @input="change">
    <el-radio :label="3">备选项</el-radio>
    <el-radio :label="6">备选项</el-radio>
    <el-radio :label="9">备选项</el-radio>
  </el-radio-group>
</template>

<script>
  export default {
    data () {
      return {
        radio: 3
      };
    },
    methods: {
      change (e) {
        console.log(e)
      }
    }
  }
</script>