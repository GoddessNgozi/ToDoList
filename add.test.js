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

describe('Editing the task description', () => {
  test('Change task description', () => {
    document.body.innerHTML = '<ul class="list">'
    + '  <li class="doList"><input class="checker" type="checkbox" id="false"><input class="list-input" type="text" value="Testing"><i id="0" class="trash fa-solid fa-trash-can"></i></li>'
    + '  <li class="doList"><input class="checker" type="checkbox" id="false"><input class="list-input" type="text" value="changed" id="editor"><i id="1" class="trash fa-solid fa-trash-can"></i></li>'
    + '</ul>';
    const obj = [
      {
        description: 'Testing',
        completed: false,
        index: 0,
      },
      {
        description: 'Testing',
        completed: false,
        index: 1,
      },
    ];
    obj.forEach((item) => {
      const todo = new Todo(item.description, item.completed, item.index);
      ToDoList.addTodo(todo);
    });
    const edit = document.getElementById('editor');
    ToDoList.editDesc(1, edit);
    expect(ToDoList.getTodos()[1].description).toEqual('changed');
  });
});

describe('Updating status to completed', () => {
  test('Change status to completed', () => {
    document.body.innerHTML = '<ul class="list">'
    + '  <li class="doList"><input id="checkr" class="checker" type="checkbox" id="true" checked><input class="list-input" type="text" value="Testing"><i id="0" class="trash fa-solid fa-trash-can"></i></li>'
    + '  <li class="doList"><input class="checker" type="checkbox" id="false"><input class="list-input" type="text" value="changed" id="editor"><i id="1" class="trash fa-solid fa-trash-can"></i></li>'
    + '</ul>';
    const obj = [
      {
        description: 'Testing',
        completed: false,
        index: 0,
      },
      {
        description: 'Testing',
        completed: false,
        index: 1,
      },
    ];
    obj.forEach((item) => {
      const todo = new Todo(item.description, item.completed, item.index);
      ToDoList.addTodo(todo);
    });
    const check = document.getElementById('checkr');
    ToDoList.updateStatus(check, 0);
    expect(ToDoList.getTodos()[0].completed).toEqual(true);
  });
});
