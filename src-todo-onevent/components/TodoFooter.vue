<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="checkAll"/>
    </label>
    <span>
          <span>已完成{{completeSize}} / 全部{{todoList.length}}</span>
        </span>
    <button class="btn btn-danger" @click="deleteAllComplete">清除已完成任务</button>
  </div>
</template>

<script>
  import PubSub from 'pubsub-js'
  export default {
    name: 'TodoFooter',
    data(){
      return{

      }
    },
    props:{
      todoList: Array
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
          this.$emit('checkAllTodo', value)
        }
      }
    },
    methods:{
      deleteAllComplete(){
        this.$emit('deleteCompletedTodo')
      }
    }
  }
</script>

<style scoped>
  /*footer*/
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }
</style>
