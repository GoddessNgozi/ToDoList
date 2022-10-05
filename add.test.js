/** @jest-environment jsdom */
import ToDoList from './src/modules/todolist.js';

class Todo {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

test('working', () => {
  document.body.innerHTML = '<ul class="list"></ul>';
  const data = new Todo('hello', true, 1);
  ToDoList.displayTodo(data);
  const numberli = document.querySelectorAll('.list li');
  expect(numberli).toHaveLength(1);
});
