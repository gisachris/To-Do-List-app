import _ from 'lodash';
import './style.css';
import refreshImage from './refresh.png';
import arrow from './arrow-key.svg';
import dots from './dots.svg';
import trash from './trash.svg';

// selecting the container
const container = document.querySelector('.container');

// selecting the header section
const headerSection = document.querySelector('.header');

// making the refresh button image
const refresh = document.createElement('img');
refresh.classList.add('refreshButton');
refresh.src = refreshImage;

headerSection.append(refresh);

// selecting the input container
const inputSection = document.querySelector('.inputSection');

// selecting the input field
const inputField = document.getElementById('inputField');

const arrowHolder = document.createElement('img');
arrowHolder.classList.add('arrow');
arrowHolder.src = arrow;

inputSection.append(inputField, arrowHolder);

// selecting the button
const button = document.querySelector('.clearAll');

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

const refreshButton = document.querySelector('.refreshButton');
refreshButton.addEventListener('click', () => {
  if (refreshButton.classList.contains('rotate')) {
    refreshButton.classList.toggle('rotate');
    refreshButton.classList.add('rotateBack');
  } else if (refreshButton.classList.contains('rotateBack')) {
    refreshButton.classList.toggle('rotateBack');
    refreshButton.classList.add('rotate');
  } else {
    refreshButton.classList.add('rotate');
  }
});
