const toDo = [];

function checkInput(toDoList, id = undefined) {
  if (!toDoList) throw 'input array falsy!';
  if (
    typeof id !== 'undefined' &&
    toDoList.findIndex((x) => x.id === id) === -1
  )
    throw 'item not found!';
  return true;
}

function addItem(toDoList, id, taskName, isCompleted) {
  if (!checkInput(toDoList)) return false;
  if (toDoList.find((x) => x.id === id)) return false;
  toDoList.push({ id: id, taskName: taskName, isCompleted: isCompleted });
  return true;
}
function deleteItem(toDoList, id) {
  const index = toDoList.findIndex((x) => x.id === id);
  if (index === -1) return false;
  const result = toDoList.splice(index, 1);
  return result === [] ? false : true;
}
function markAsDone(toDoList, id) {
  checkInput(toDoList, id);
  const index = toDoList.findIndex((x) => x.id === id);
  toDoList[index].isCompleted = true;
}
//surprisingly it works!
//true-false === 1 !!!
function list(toDoList) {
  return [...toDoList].sort(
    (item1, item2) => item1.isCompleted - item2.isCompleted
  );
}

function testAddItem(toDoList) {
  addItem(toDoList, 1, 'mosmos', false);
  addItem(toDoList, 1, 'wrong!', false);
  addItem(toDoList, 3, 'mosmos', true);
  addItem(toDoList, 2, 'mosmos', false);
  console.log(toDoList);
  return 'passed add item';
}
function testDeleteItem(toDoList) {
  deleteItem(toDoList, 1);
  deleteItem(toDoList, 3);
  deleteItem(toDoList, 2);
  return toDoList;
}
function testMarkAsDone(toDoList) {
  markAsDone(toDoList, 1);
  markAsDone(toDoList, 2);
  markAsDone(toDoList, 3);
  // markAsDone(toDoList, 5);
  // markAsDone(null, 2);
  return toDoList.map((x) => x.isCompleted);
}

// try {
//   testAddItem(toDo);
//   testDeleteItem(toDo);
//   testAddItem(toDo);
//   testMarkAsDone(toDo);
//   console.log('passed!');
// } catch (error) {
//   console.error(error);
// }
export {
  toDo,
  testMarkAsDone,
  testDeleteItem,
  testAddItem,
  addItem,
  deleteItem,
  markAsDone,
  list,
};
