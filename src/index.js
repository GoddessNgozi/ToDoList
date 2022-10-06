import './style.css';
import ToDoList from './modules/todolist.js';

class Todo {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

document.addEventListener('DOMContentLoaded', ToDoList.checkStatus, ToDoList.displayTodos());

const form = document.querySelector('.toDoForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const description = document.querySelector('.description');
  const todo = new Todo(description.value, false, ToDoList.getTodos().length);
  ToDoList.addTodo(todo);
  ToDoList.displayTodo(todo);
  form.reset();
});

const clear = document.querySelector('.clear-completed');
clear.addEventListener('click', () => {
  ToDoList.clearCompleted();
});
