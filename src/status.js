export const checkStatus = () => {
  const toDos = JSON.parse(localStorage.getItem('toDos')) || [];
  toDos.forEach((toDo, index) => {
    if (toDo.completed === true) {
      const checkers = document.querySelectorAll('.checker');
      checkers.forEach((check, indexy) => {
        if (indexy === index) {
          check.nextSibling.classList.add('strike');
          check.checked = true;
        }
      });
    }
  });
};

export const resetForm = () => {
};