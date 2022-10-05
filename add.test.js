/** @jest-environment jsdom */
import ToDoList from './src/modules/todolist.js';

class Todo {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}
describe('add and remove', () => {
  test('Adding', () => {
    document.body.innerHTML = '<ul class="list"></ul>';
    const data = new Todo('hello', true, 1);
    ToDoList.displayTodo(data);
    const numberli = document.querySelectorAll('.list li');
    expect(numberli).toHaveLength(1);
  });

  test('removing', () => {
    document.body.innerHTML = '<ul class="list"><li class="removed"><input type="checkbox" id="true"/> <input type="test" id="input0" value="book1"/> <i id="vertical0" class="fa fa-ellipsis-vertical"></i><i id="0" class="trash" class="fa fa-trash-can"></i></li><li><input type="checkbox" id="true"/> <input type="test" id="input1" value="book1"/> <i id="vertical1" class="fa fa-ellipsis-vertical"></i><i id="1" class="trash" class="fa fa-trash-can"></i></li></ul>';

    const trashcan = document.getElementById('0');
    ToDoList.deleteTodo(trashcan);

    const ddg = document.querySelector('.removed');
    expect(ddg).toBeNull();
  });
});
