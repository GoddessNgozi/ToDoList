export const statusUpdate = () => {
  const toDos = JSON.parse(localStorage.getItem('toDos')) || [];
  const checkers = document.querySelectorAll('.checker');
  checkers.forEach((check, indexy) => {
    check.addEventListener('change', () => {
      if (check.checked === true) {
        check.nextSibling.classList.add('strike');
        // check.checked = true;
        toDos.forEach((toDo, index) => {
          if (indexy === index) {
            toDo.completed = true;
            localStorage.setItem('toDos', JSON.stringify(toDos));
          }
        });
      } else {
        check.nextSibling.classList.remove('strike');
        // check.checked = false;
        toDos.forEach((toDo, index) => {
          if (indexy === index) {
            toDo.completed = false;
            localStorage.setItem('toDos', JSON.stringify(toDos));
          }
        });
      }
    });
  });
};

export const checkStatus = () => {
  const toDos = JSON.parse(localStorage.getItem('toDos')) || [];
  toDos.forEach((toDo, index) => {
    if (toDo.completed === true) {
      const checkers = document.querySelectorAll('.checker');
  checkers.forEach((check, indexy) => {
      if (indexy === index) {
        check.nextSibling.classList.add("strike");
        check.checked = true;
      }
  });
    }
  });
}