<template>
  <mt-button type="primary"  @click.native="handleClick" style="width:100%">primary</mt-button>
</template>

<script>
  import {Toast} from 'mint-ui'
  export default {
    name: 'App',
    data(){
      return{

      }
    },
    methods:{
      handleClick(){
        Toast('提示信息')
      }
    }
  }
</script>

<style scoped>
</style>
