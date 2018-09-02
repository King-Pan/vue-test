<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <TodoHeader ref="header"/>
      <TodoList :todoList="todoList"/>
      <!--<TodoFooter ref="footer" :todoList="todoList"/>-->
      <todo-footer  ref="footer">
        <!--slot插槽对于的属性和方法，都应该写在插槽所在的父组件里-->
        <input type="checkbox" v-model="checkAll" slot="checkAll"/>
        <span slot="count">已完成{{completeSize}} / 全部{{todoList.length}}</span>
        <button slot="delete" class="btn btn-danger" @click="deleteCompletedTodo" v-show="completeSize > 0">清除已完成任务</button>
      </todo-footer>
    </div>
  </div>
</template>

<script>
  import TodoHeader from '@/components/TodoHeader'
  import TodoList from '@/components/TodoList'
  import TodoFooter from '@/components/TodoFooter'
  import PubSub from 'pubsub-js'
  import storageUtil from './util/StorageUtil'
  export default {
    name: 'App',
    data(){
      return {
        todoList: storageUtil.readTodoList()
      }
    },
    computed:{
      completeSize () {
        return this.todoList.reduce((preTotal, todo) => preTotal + (todo.complete?1:0) ,0)
      },
      checkAll: {
        get (){
          return this.completeSize === this.todoList.length && this.completeSize > 0
        },
        set (value){
          this.checkAllTodo(value)
        }
      }
    },
    components: {TodoFooter, TodoList, TodoHeader},
    mounted(){
      this.$refs.header.$on('addTodoItem',  this.addTodoItem)
      PubSub.subscribe('deleteTodoItem', (msg,index)=>{
        this.deleteTodoItem(index)
      })
    },
    watch:{
      todoList:{
        deep: true,
        // handler: function (value) {
        //   storageUtil.saveTodoList(value)
        // }
        handler: storageUtil.saveTodoList
      }
    },
    methods:{
      addTodoItem(todo){
        this.todoList.unshift(todo)
      },
      deleteTodoItem(index){
        this.todoList.splice(index,1)
      },
      deleteCompletedTodo(){
        this.todoList = this.todoList.filter(todo=> !todo.complete)
      },
      checkAllTodo(isAll){
        this.todoList.forEach(todo=> {
          todo.complete = isAll
        })
      }
    }
  }
</script>

<style scoped>
  /*app*/
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>
