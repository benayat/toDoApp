class Item {
  constructor(id, taskName, isCompleted) {
    this.id = id;
    this.taskName = taskName;
    this.isCompleted = isCompleted;
  }
  toObject() {
    return {
      id: this.id,
      taskName: this.taskName,
      completed: this.isCompleted,
    };
  }
}

class toDo {
  constructor() {
    this.toDoList = new Map();
  }
  static id = 0;
  getItemById(id) {
    return this.toDoList.get(id);
  }
  AddItem(taskName, isCompleted) {
    const result = this.toDoList.set(
      toDo.id,
      new Item(toDo.id, taskName, isCompleted)
    );
    if (result) toDo.id++;
    return result;
  }
  updateItem(id, taskName, isCompleted) {
    if (!this.toDoList.has(id)) return false;
    this.toDoList.set(id, new Item(id, taskName, isCompleted));
  }
  deleteItem(id) {
    const result = this.toDoList.delete(id);
    if (result && id === this.id) toDo.id--;
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
    return [...this.toDoList.values()].sort((item1, item2) => {
      item1.isCompleted - item2.isCompleted;
    });
  }
  listForTable() {
    return this.list().map((item) => item.toObject());
  }
  importData(array) {}
  setTable() {
    const data = this.listForTable();
    let table = new Tabulator('#toDoList', {
      data: data, //assign data to table

      cellEdited: function (cell) {
        let rowData = cell.getData();
        console.log(cell.getData());
        this.updateItem(rowData.id, rowData.taskName, rowData.completed);
      }.bind(this),
      reactiveData: true,
      layout: 'fitColumns', //fit columns to width of table (optional)
      columns: [
        //Define Table Columns
        { title: 'ID', field: 'id' },
        { title: 'Task', field: 'taskName', hozAlign: 'left', editor: 'input' },
        {
          title: 'complete',
          field: 'completed',
          editor: 'select',
          editorParams: { values: ['true', 'false'] },
          formatter: 'tickCross',
          // width: '10vw',
        },
      ],
      // rowClick: function (e, row) {
      //   //trigger an alert message when the row is clicked
      //   alert('Row ' + row.getData().id + ' Clicked!!!!');
      // },
    });
    //*do it first!
    function removeTask(event) {
      if (event.key === 'Enter') {
        const text = event.target.value;
        this.deleteItem(parseInt(text));
        table.deleteRow(text);
        event.target.value = '';
      }
    }
    function addRow(event) {
      this.AddItem('', '');
      table.addData(this.getItemById(toDo.id - 1), false);
    }
    const deleteInput = document.querySelector('.delete-item')
      .firstElementChild;
    const removeTaskBind = removeTask.bind(this);
    deleteInput.addEventListener('keydown', removeTaskBind);
    const addButton = document.querySelector('.add-item');
    const addRowBind = addRow.bind(this);
    addButton.addEventListener('click', addRowBind);
  }
}

const toDoTest = new toDo();
toDoTest.AddItem('cleaning', false);
toDoTest.AddItem('arranging', false);
toDoTest.AddItem('working', false);
toDoTest.AddItem('playing', false);
console.log(toDoTest.list());
console.log(toDoTest.listForTable());
toDoTest.setTable();
