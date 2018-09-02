<template>
  <ul class="todo-main">
    <TodoItem v-for="(todo,index) in todoList" :key="index" :todo="todo" :index="index" :deleteTodoItem="deleteTodoItem"></TodoItem>
  </ul>
</template>

<script>

  import TodoItem from './TodoItem'
  export default {
    name: 'TodoList',
    components:{
      TodoItem
    },
    props:{
      todoList: Array,
      deleteTodoItem: Function
    }
  }
</script>

<style scoped>
  /*main*/
  .todo-main {
    margin-left: 0px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
  }

  .todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
  }

</style>
