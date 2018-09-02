<template>
  <div>
    <div v-if="!repo.name">loading</div>
    <div v-else>most start repo is <a :href="repo.url">{{repo.name}}</a></div>
  </div>
</template>

<script>


  export default {
    name: 'App',
    data(){
      return{
        repo: {
          name: '',
          url:''
        }
      }
    },
    mounted(){
      //发ajax请求获取数据
      const url = 'https://api.github.com/search/repositories?q=v&sort=stars'

      this.$http.get(url).then(
        response =>{
          //成功获取结果
          const result = response.data

          //得到第一个item
          const mostRepo = result.items[0]
          console.log(mostRepo.owner.html_url)
          this.repo.url = mostRepo.owner.html_url
          this.repo.name = mostRepo.name

        },
        response =>{
          alert('请求失败')
        }
      )
    }
  }
</script>

<style scoped>
</style>
