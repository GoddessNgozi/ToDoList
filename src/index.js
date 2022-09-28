import './style.css';

const list = document.querySelector('.list');
const tasks = [
  {
    description: 'Learn coding',
    completed: false,
    index: 1,
  },
  {
    description: 'Do yoga',
    completed: false,
    index: 2,
  },
  {
    description: 'Have dinner with family',
    completed: false,
    index: 3,
  },
];

function addList(tasks) {
  let markup = ''
  tasks.forEach((task) => {
    markup += `<li><input type="checkbox" class="checker"><input type="text" class="list-input" value="${task.description}" disabled><i class="fa fa-ellipsis-vertical"></i></li>`;
});
list.innerHTML = markup;
}

addList(tasks);