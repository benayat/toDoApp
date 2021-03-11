const { once } = require('node:events');

class Item {
  constructor(taskName, isCompleted) {
    this.taskName = taskName;
    this.isCompleted = isCompleted;
  }
}

class toDo {
  constructor() {
    this.toDoList = [];
  }
  getItemById(id) {
    return this.toDoList[id];
  }
  AddItem(taskName, isCompleted) {
    const item = new Item(taskName, isCompleted);
    const result = this.toDoList.push(item) === this.toDoList + 1;
    if (result) {
      addItemToHTML(item);
    }
    return result;
  }
  deleteItem(id) {
    const result = this.toDoList.splice(id, 1) != [];
    if (result) {
      removeItemHTML(id);
    }
    return result;
  }

  markAsDone(id) {
    this.getItemById(id).markAsDone = true;
  }
  unmarkAsDone(id) {
    this.getItemById(id).markAsDone = false;
  }
  //surprisingly it works!
  //true-false === 1 !!!
  list() {
    return this.toDoList.sort((item1, item2) => {
      item1.isCompleted - item2.isCompleted;
    });
  }
  addItemToHTML(item) {
    const table = document.querySelector('.toDo');

    const rowHTML = `<tr><td>${table.childNodes.length}</td><td>${item.taskName}</td><td>${item.isCompleted}</td></tr>`;
    table.insertAdjacentHTML('beforeend', rowHTML);
  }
  removeItemHTML(id) {
    const table = document.querySelector('.toDo');
    const rowToRemove = table.childNodes[id];
    rowToRemove.parentElement.removeChild(rowToRemove);
    table.childNodes.forEach((element, key, parent) => {
      element.firstChild.nodeValue = key;
    });
  }

  setEventListeners() {
    const rightClickBind = rightClickHandler.bind(this);
    const addButtonBind = addButtonHandler.bind(this);
    document
      .querySelector('.toDo')
      .addEventListener('contextmenu', rightClickBind);
    const addButton = document.querySelector('.add-item');
    addButton.addEventListener('click', addButtonBind);
  }
}
function rightClickHandler(event) {
  event.preventDefault;
  if (event.target.tagName === 'tr') {
    this.deleteItem(event.target.value);
  }
}
function getText(event) {
  if (event.key === 'enter') {
    const taskName = document.getElementById('taskName').value;
  }
}
function addButtonHandler(event) {
  const getTextBind = getText.bind(this);
  event.target.nextElementSibling.addEventListener(
    'keyDown',
    getTextBind,
    (once = true)
  );
}

// const toDoTest = new toDo();
// toDoTest.AddItem('cleaning', false);
// toDoTest.AddItem('arranging', false);
// toDoTest.AddItem('working', false);
// toDoTest.AddItem('playing', false);
// console.log(toDoTest.list());
