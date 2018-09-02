import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
Vue.use(VueResource) //申明使用，内部会给vm对象和组件对象添加一个属性$http :$http.get/$http.post
import {Button,Swipe} from 'mint-ui'
//注册全家组件
Vue.component(Button.name, Button)
Vue.component(Swipe.name, Swipe)
new Vue({
  el: '#app',
  components:{
    App
  },
  template: '<App/>'
})
