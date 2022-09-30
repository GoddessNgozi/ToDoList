import './style.css';
import { statusUpdate, checkStatus } from './status.js';

const list = document.querySelector('.list');
const desc = document.querySelector('.description');
const form = document.querySelector('.toDoForm');

let toDos = JSON.parse(localStorage.getItem('toDos')) || [];

const displayToDo = () => {
  let markup = '';
  toDos.forEach((toDo) => {
    markup += `<li class="doList"><input type="checkbox" id="${toDo.completed}" class="checker"><input type="text" class="list-input" value="${toDo.description}"><i class="drag fa fa-ellipsis-vertical"></i><i id="${toDo.index}" class="trash fa-solid fa-trash-can"></i></li>`;
  });
  list.innerHTML = markup;
  statusUpdate();
  checkStatus();
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

const addToDo = () => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const toDo = {
      description: desc.value,
      completed: false,
      index: toDos.length,
    };
    toDos.push(toDo);
    localStorage.setItem('toDos', JSON.stringify(toDos));
    displayToDo(toDos);
    editToDo();
    removeToDo();
    form.reset();
  });
  return toDos;
};

const clear = () => {
  const clear = document.querySelector('.clear-completed');
  clear.addEventListener('click', () => {
    toDos = toDos.filter((toDo) => toDo.completed !== true);
    localStorage.setItem('toDos', JSON.stringify(toDos));
    displayToDo(toDos);
  });
};

document.addEventListener('DOMContentLoaded', checkStatus);

addToDo();
displayToDo(toDos);
editToDo();
removeToDo();
statusUpdate();
clear();
