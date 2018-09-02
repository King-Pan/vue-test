<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <TodoHeader @addTodoItem="addTodoItem"/>
      <TodoList :todoList="todoList"/>
      <TodoFooter :todoList="todoList" @deleteCompletedTodo="deleteCompletedTodo" @checkAllTodo="checkAllTodo" />
    </div>
  </div>
</template>

<script>
  import TodoHeader from '@/components/TodoHeader'
  import TodoList from '@/components/TodoList'
  import TodoFooter from '@/components/TodoFooter'
  import PubSub from 'pubsub-js'
  export default {
    name: 'App',
    data(){
      return {
        todoList:[{
          title:'吃饭',
          complete: false
        },{
          title:'睡觉',
          complete: true
        },{
          title: 'coding',
          complete: false
        },{
          title: '打豆豆',
          complete: false
        }]
      }
    },
    components: {TodoFooter, TodoList, TodoHeader},
    mounted(){
      this.$on('addTodoItem',  this.addTodoItem)
      PubSub.subscribe('deleteTodoItem', (msg,index)=>{
        this.deleteTodoItem(index)
      })
      this.$on('deleteCompletedTodo',  this.deleteCompletedTodo)
      this.$on('checkAllTodo',  this.checkAllTodo)
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
