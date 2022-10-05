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

  test('removing', ()=>{
    document.body.innerHTML = '<ul class="list"><li><input type="checkbox" id="true"/> <input type="test" id="0" value="book1"/> <i id="0" class="fa fa-ellipsis-vertical"></i><i class="fa fa-trash-can" id="0"></i></li><li><input type="checkbox" id="true"/> <input type="test" id="1" value="book2"/> <i id="1" class="fa fa-ellipsis-vertical"></i><i class="fa fa-trash-can" class="trash" id="1"></i></li></ul>';
    const trashcan= document.querySelector('.trash');
    ToDoList.deleteTodo(trashcan);
    const numberli = document.querySelectorAll('.list li');
    expect(numberli).toHaveLength(1);
  });

});
