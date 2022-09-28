import _ from 'lodash';
import './style.css';

const list = document.querySelector('.list');
const taskForm = document.querySelector('.taskForm');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function addList() {
        taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const desc = document.querySelector('.description');
            const description = desc.value;
            const completed = 'false';
            const index = tasks.length;
            const task = {
                description,
                completed,
                index,
            };
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            console.log(tasks);
            taskForm.reset();
            tasks.forEach((task) => {
                list.innerHTML += `<li><input type="checkbox" class="checker"><input type="text" class="list-input" value="${task.description}" disabled><i class="fa fa-ellipsis-vertical"></i></li>`;
            });
    });
}
addList();

document.addEventListener('DOMContentLoaded', () => {
    tasks.forEach((task) => {
        list.innerHTML += `<li><input type="checkbox" class="checker"><input type="text" class="list-input" value="${task.description}" disabled><i class="fa fa-ellipsis-vertical"></i></li>`;
    });
});
