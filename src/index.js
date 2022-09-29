import './style.css';

const list = document.querySelector('.list');
const desc = document.querySelector('.description');
const form = document.querySelector('.toDoForm');
let toDos = JSON.parse(localStorage.getItem('toDos')) || [];

const addToDo = () => {
  form.addEventListener('submit', () => {
    const toDo = {
      description: desc.value,
      completed: false,
      index: toDos.length,
    };
    toDos.push(toDo);
    localStorage.setItem('toDos', JSON.stringify(toDos));
  });
  return toDos;
};

const displayToDo = (toDos) => {
  let markup = '';
  toDos.forEach((toDo) => {
    markup += `<li class="doList"><input type="checkbox" class="checker"><input type="text" class="list-input" value="${toDo.description}"><i class="drag fa fa-ellipsis-vertical"></i><i id="${toDo.index}" class="trash fa-solid fa-trash-can"></i></li>`;
  });
  list.innerHTML = markup;
};

const editToDo = () => {
  const edits = document.querySelectorAll('.list-input');
  edits.forEach((edit, indexy) => {
    edit.addEventListener('focusin', () => {
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
      edit.placeholder = edit.value;
      toDos.forEach((toDo, index) => {
        if (indexy === index) {
          toDo.description = edit.value;
          localStorage.setItem('toDos', JSON.stringify(toDos));
        }
      });
    });
  });
};

const removeToDo = () => {
  const trashes = document.querySelectorAll('.trash');
  trashes.forEach((trash) => {
    trash.addEventListener('mousedown', () => {
      trash.parentElement.remove();
      toDos = toDos.filter((toDo) => toDo.index !== +trash.id);
      toDos.forEach((toDo, index) => {
        toDo.index = index;
      });
      localStorage.setItem('toDos', JSON.stringify(toDos));
      displayToDo(toDos);
      editToDo();
      removeToDo();
    });
  });
};

addToDo();
displayToDo(toDos);
removeToDo();
editToDo();