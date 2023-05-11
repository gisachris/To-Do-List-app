import arrow from '../arrow-key.svg';
import dots from '../dots.svg';
import trash from '../trash.svg';

// selecting the container
const container = document.querySelector('.container');

// selecting the input container
const inputSection = document.querySelector('.inputSection');

// selecting the input field
const inputField = document.getElementById('inputField');

const arrowHolder = document.createElement('img');
arrowHolder.classList.add('arrow');
arrowHolder.src = arrow;

inputSection.append(inputField, arrowHolder);

// implementing list functionality
const taskHolder = [];

class Task {
  constructor(description) {
    this.index = taskHolder.length;
    this.description = description;
    this.completed = false;
  }
}

const taskCreator = () => {
  const newTask = new Task(inputField.value);
  taskHolder.push(newTask);
  inputField.value = '';
};

// selecting the button
const button = document.querySelector('.clearAll');

// create the dom elements to support the array
const taskSection = document.createElement('section');
taskSection.classList.add('taskSection');
container.append(taskSection);
container.insertBefore(taskSection, button);
const tasklist = document.createElement('ul');
tasklist.classList.add('tasklist');
taskSection.append(tasklist);

const addToDom = () => {
  // Clear the list
  tasklist.innerHTML = '';

  taskHolder.forEach((instance) => {
    const { index, description, completed } = instance;

    const taskListItem = document.createElement('li');
    taskListItem.classList.add('listInstance');
    taskListItem.innerHTML = `
      <input type="checkbox" name="${index}" id="${index}" class='checkbox'>
      <span class='descriptionText'>${description}</span>
      <img src=${dots} class='threedots-${index}'>
      <img src=${trash} class='trash'>
      `;
    tasklist.append(taskListItem);
  });
  console.log(taskHolder);
};

inputField.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !(inputField.value === '')) {
    taskCreator();
    addToDom();
  }
});

arrowHolder.addEventListener('click', () => {
  if (!(inputField.value === '')) {
    taskCreator();
    addToDom();
  }
});

// render list-section dynamically when page loads
window.addEventListener('load', addToDom());

export {container,taskHolder,taskSection,tasklist,addToDom,arrowHolder,button};
