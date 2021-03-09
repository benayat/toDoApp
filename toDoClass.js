class Item {
  constructor(id, taskName, isCompleted) {
    this.id = id;
    this.taskName = taskName;
    this.isCompleted = isCompleted;
  }
}

class toDo {
  constructor() {
    this.toDoList = new Map();
  }

  getItemById(id) {
    return this.toDoList.get(id);
  }
  AddItem(id, taskName, isCompleted) {
    return this.toDoList.set(id, new Item(id, taskName, isCompleted));
  }
  deleteItem(id) {
    return this.toDoList.delete(id);
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
    return [...this.toDoList.values()].sort((item1, item2) => {
      item1.isCompleted - item2.isCompleted;
    });
  }
}

// const toDoTest = new toDo();
// toDoTest.AddItem(1, 'cleaning', false);
// toDoTest.AddItem(2, 'arranging', false);
// toDoTest.AddItem(3, 'working', false);
// toDoTest.AddItem(4, 'playing', false);
// console.log(toDoTest.list());
