<template>
  <div class="container">
    <Search/>
    <UsersMain/>
  </div>
</template>

<script>
  import Search from './components/Search'
  import Main from './components/Main'
  export default {
    name: 'App',
    data(){
      return{

      }
    },
    components:{
      Search,
      UsersMain:Main
    }
  }
</script>

<style scoped>
</style>
