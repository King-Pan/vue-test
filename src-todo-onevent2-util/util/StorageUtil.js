/*
使用localStorage存储数据的工具模块
向外暴露(选择)
1. 函数
2. 对象

选择标准: 函数只有一个功能，对象可以提供多个功能(一个功能:函数，还是多个:对象)

1. 读取
2. 写
 */
const TODO_LIST_KEY = 'todoList_key'
export default {
  saveTodoList(todoList){
    window.localStorage.setItem(TODO_LIST_KEY,JSON.stringify(todoList))
  },
  readTodoList(){
    return JSON.parse(window.localStorage.getItem(TODO_LIST_KEY)||'[]')
  }
}

