let taskHolder = JSON.parse(localStorage.getItem('taskList')) || [];

window.addEventListener('load', () => {
  const checkbox = document.querySelectorAll('.checkbox[data-index]');

  // checkbox functionality
  checkbox.forEach((check) => {
    const { index } = check.dataset;
    const spanCheck = check.nextElementSibling;
    check.addEventListener('click', (event) => {
      if (event.target.checked) {
        // add the styles
        spanCheck.classList.add('checked');
        spanCheck.classList.remove('descriptionText');

        // change the completed property
        taskHolder[index].completed = true;
        localStorage.setItem('taskList', JSON.stringify(taskHolder));
      } else {
        // add the styles
        const spanCheck = check.nextElementSibling;
        spanCheck.classList.remove('checked');
        spanCheck.classList.add('descriptionText');

        // change the completed property
        taskHolder[index].completed = false;
        localStorage.setItem('taskList', JSON.stringify(taskHolder));
      }
    });
  });

  // when the page is reloaded
  taskHolder.forEach((instance, index) => {
    instance.index = index;
    instance.completed = false;
    localStorage.setItem('taskList', JSON.stringify(taskHolder));
  });
});

const bottomButton = document.querySelector('.clearAll');

const deleteTrue = () => {
  if (taskHolder.length === 0) {
    taskHolder = [];
  } else {
    taskHolder = taskHolder.filter((instance) => !instance.completed);

    // update the array after deleting
    const updateIndices = () => {
      taskHolder.forEach((item, index) => {
        item.index = index;
        const checkbox = document.querySelector(`.checkbox[data-index="${index}"]`);
        checkbox.setAttribute('data-index', index);
      });
      localStorage.setItem('taskList', JSON.stringify(taskHolder));
    };

    updateIndices();

    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }
};

bottomButton.addEventListener('click', deleteTrue);
