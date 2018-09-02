<template>
  <div>
    <h2 v-if="firstView">输入用户名搜索</h2>
    <h2 v-if="loading">Loading ......</h2>
    <h2 v-if="errorMsg">{{errorMsg}}</h2>
    <div class="row">
      <div class="card" v-for="(user,index) in users" :key="index">
        <a :href="user.url" target="_blank">
          <img :src="user.avatar_url" style='width: 100px'/>
        </a>
        <p class="card-text">{{user.name}}</p>
      </div>

    </div>
  </div>

</template>

<script>
  import PubSub from 'pubsub-js'
  import axios from 'axios'
  export default {
    name: 'Main',
    data(){
      return{
        firstView: true,
        loading: false,
        errorMsg: '',
        users:[]
      }
    },
    mounted(){
      //初始化异步请求
      //订阅搜索的消息
      PubSub.subscribe('search',(msg,searchName)=>{
        //需要发ajax请求，搜索
        const url = `https://api.github.com/search/users?q=${searchName}`
        //更新状态(请求中)
        this.loading = true
        this.firstView = false
        this.users = []
        this.errorMsg = ''
        //发送ajax请求
        axios.get(url).then(
          response => {
            const result = response.data
            const users = result.items.map(item => ({
              url: item.html_url,
              avatar_url: item.avatar_url,
              name: item.login
            }))

            this.loading = false
            this.users = users
          }
        ).catch(error =>{
          //失败，更新失败的状态
          this.loading = false
          this.errorMsg = '请求失败'
        })
      })
    },
    methods: {

    }
  }
</script>

<style scoped>
  .card {
    float: left;
    width: 33.333%;
    padding: .75rem;
    margin-bottom: 2rem;
    border: 1px solid #efefef;
    text-align: center;
  }

  .card > img {
    margin-bottom: .75rem;
    border-radius: 100px;
  }

  .card-text {
    font-size: 85%;
  }
</style>
