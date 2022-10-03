import './style.css';
import ToDoList from './modules/todolist.js';

class Todo {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

window.onload = ToDoList.displayTodos();
document.addEventListener('DOMContentLoaded', ToDoList.checkStatus);

const form = document.querySelector('.toDoForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const description = document.querySelector('.description').value;
  const todo = new Todo(description, false, ToDoList.getTodos().length);
  ToDoList.addTodo(todo);
  ToDoList.displayTodo(todo);
  form.reset();
});

const clear = document.querySelector('.clear-completed');
clear.addEventListener('click', () => {
  const checkers = document.querySelectorAll('.checker');
  checkers.forEach((check) => {
    if (check.id === 'true') {
      check.parentElement.remove();
    }
  });
  let todos = ToDoList.getTodos();
  todos = todos.filter((todo) => todo.completed !== true);
  todos.forEach((todo, index) => {
    todo.index = index;
  });
  localStorage.setItem('todos', JSON.stringify(todos));
  ToDoList.emptyList();
});
