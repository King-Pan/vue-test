<template>
  <li @mouseenter="handlerEnter(true)" @mouseleave="handlerEnter(false)" :style="{background:bgColor}">
    <label>
      <input type="checkbox" v-model="todo.complete"/>
      <span>{{todo.title}}</span>
    </label>
    <span class="btn btn-danger" style="float:right" v-show="isShow" @click="deleteItem">删除</span>
  </li>
</template>

<script>
  export default {
    name: 'TodoItem',
    data(){
      return {
        isShow: false,
        bgColor: '#aaaaa'
      }
    },
    props:{
      todo:Object,
      index: Number,
      deleteTodoItem:Function
    },
    methods:{
      handlerEnter(isEnter){
        if(isEnter){
          this.isShow = true
          this.bgColor = '#eeeeee'
        }else{
          this.isShow = false
          this.bgColor = '#ffffff'
        }
        console.log(isEnter)
      },
      deleteItem(){
        console.log(this.index)
        this.deleteTodoItem(this.index)
      }
    }
  }
</script>

<style scoped>
  /*item*/
  li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
  }

  li label {
    float: left;
    cursor: pointer;
  }

  li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
  }

  li button {
    float: right;
    display: none;
    margin-top: 3px;
  }

  li:before {
    content: initial;
  }

  li:last-child {
    border-bottom: none;
  }
</style>
