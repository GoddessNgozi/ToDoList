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
      index: toDos.length + 1,
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

const removeToDo = () => {
  const trashes = document.querySelectorAll('.trash');
  trashes.forEach((trash) => {
    trash.addEventListener('mousedown', (e) => {
      e.target.parentElement.remove();
      toDos = toDos.filter((toDo) => toDo.index !== +e.target.id);
      localStorage.setItem('toDos', JSON.stringify(toDos));
    });
  });
};

const editTask = () => {
  const edits = document.querySelectorAll('.list-input');
  edits.forEach((edit, indexy) => {
    edit.addEventListener('focusin', (e) => {
      e.target.parentElement.style.background = '#faf8b1';
      e.target.parentElement.lastChild.style.display = 'block';
      e.target.nextSibling.style.display = 'none';
    });
    edit.addEventListener('focusout', (e) => {
      e.target.parentElement.style.background = '#ffffff';
      e.target.parentElement.lastChild.style.display = 'none';
      e.target.nextSibling.style.display = 'block';
    });
    edit.addEventListener('change', (e) => {
      e.target.parentElement.style.background = '#ffffff';
      edit.placeholder = edit.value;
      toDos.forEach((toDo, index) => {
        if (indexy === index) {
          // toDos[index].description = edit.value;
          toDo.description = edit.value;
          localStorage.setItem('toDos', JSON.stringify(toDos));
        }
      });
    });
  });
};

addToDo();
displayToDo(toDos);
removeToDo();
editTask();