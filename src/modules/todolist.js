export default class ToDoList {
  static getTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    return todos;
  }

  static addTodo(todo) {
    const todos = ToDoList.getTodos();
    todos.push(todo);
    console.log(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

    static displayTodo = (todo) => {
      const list = document.querySelector('.list');
      const li = document.createElement('li');
      const box = document.createElement('input');
      box.classList.add('checker');
      box.setAttribute('type', 'checkbox');
      box.setAttribute('id', todo.completed);
      const descInput = document.createElement('input');
      descInput.classList.add('list-input');
      descInput.setAttribute('type', 'text');
      descInput.setAttribute('value', todo.description);
      descInput.setAttribute('id', todo.index);
      const icon = document.createElement('i');
      icon.classList.add('drag', 'fa', 'fa-ellipsis-vertical');
      const trashcan = document.createElement('i');
      trashcan.setAttribute('id', todo.index);
      trashcan.classList.add('trash', 'fa-solid', 'fa-trash-can');
      li.classList.add('doList');
      li.append(box, descInput, icon, trashcan);
      list.appendChild(li);

      trashcan.addEventListener('mousedown', () => {
        trashcan.parentElement.remove();
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos = todos.filter((todo) => todo.index !== +trashcan.id);
        todos.forEach((todo, index) => {
          todo.index = index;
        });
        localStorage.setItem('todos', JSON.stringify(todos));
        ToDoList.emptyList();
      });

      const edits = document.querySelectorAll('.list-input');
      edits.forEach((edit, indexy) => {
        edit.addEventListener('click', () => {
          edit.parentElement.style.background = '#faf8b1';
          edit.parentElement.lastChild.style.display = 'block';
          edit.nextSibling.style.display = 'none';
        });
        edit.addEventListener('focusout', () => {
          edit.parentElement.style.background = '#ffffff';
          edit.parentElement.lastChild.style.display = 'none';
          edit.nextSibling.style.display = 'block';
        });
        edit.addEventListener('change', () => {
          edit.parentElement.style.background = '#ffffff';
          const todos = JSON.parse(localStorage.getItem('todos')) || [];
          todos.forEach((todo, index) => {
            if (indexy === index) {
              todo.description = edit.value;
              localStorage.setItem('todos', JSON.stringify(todos));
            }
          });
        });
      });

      const checkers = document.querySelectorAll('.checker');
      checkers.forEach((check, indexy) => {
        check.addEventListener('change', () => {
          if (check.checked === true) {
            check.nextSibling.classList.add('strike');
            check.id = 'true';
            const todos = JSON.parse(localStorage.getItem('todos')) || [];
            todos.forEach((todo, index) => {
              if (indexy === index) {
                todo.completed = true;
                localStorage.setItem('todos', JSON.stringify(todos));
              }
            });
          } else {
            check.nextSibling.classList.remove('strike');
            check.id = 'false';
            const todos = JSON.parse(localStorage.getItem('todos')) || [];
            todos.forEach((todo, index) => {
              if (indexy === index) {
                todo.completed = false;
                localStorage.setItem('todos', JSON.stringify(todos));
              }
            });
          }
        });
      });
    };

    static displayTodos = () => {
      const todos = JSON.parse(localStorage.getItem('todos')) || [];
      todos.forEach((todo) => ToDoList.displayTodo(todo));
    }

    static emptyList = () => {
      const list = document.querySelector('.list');
      list.innerHTML = '';
      ToDoList.displayTodos();
    }

    static checkStatus = () => {
      const todos = ToDoList.getTodos();
      todos.forEach((todo, index) => {
        if (todo.completed === true) {
          const checkers = document.querySelectorAll('.checker');
          checkers.forEach((check, indexy) => {
            if (indexy === index) {
              check.nextSibling.classList.add('strike');
              check.checked = true;
            }
          });
        }
      });
    }
}