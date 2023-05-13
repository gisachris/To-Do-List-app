let taskHolder = JSON.parse(localStorage.getItem('taskList')) || [];

const bookSave = () => {
  localStorage.setItem('taskList', JSON.stringify(taskHolder));
};

// checkbox function
const updateCheckbox = () => {
  const checkboxes = document.querySelectorAll('.checkbox');

  checkboxes.forEach((box) => {
    box.addEventListener('change', (event) => {
      const checker = event.target;
      const spanCheck = box.nextElementSibling;

      // acessing the taskholder for changes
      const boxId = parseInt(box.dataset.index, 10);
      taskHolder = JSON.parse(localStorage.getItem('taskList')) || [];

      // edge cases
      if (checker.checked) {
        // add the styles
        spanCheck.classList.add('checked');
        spanCheck.classList.remove('descriptionText');
        taskHolder[boxId].completed = true;
        bookSave();
      } else {
        spanCheck.classList.remove('checked');
        spanCheck.classList.add('descriptionText');
        taskHolder[boxId].completed = false;
        bookSave();
      }
    });
  });
};

// delete button
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

    location.reload();
  }
};

bottomButton.addEventListener('click', deleteTrue);

export default updateCheckbox;