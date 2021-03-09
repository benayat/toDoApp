const toDo = [];
function AddItem(toDoList, id, taskName, isCompleted) {
  toDoList.push({ id: id, taskName: taskName, isCompleted: isCompleted });
}
function deleteItem(toDoList, item) {
  const index = toDoList.indexOf(item);
  if (index === -1) return false;
  const result = toDoList.splice(index, 1);
  return result === [] ? false : true;
}
function markAsDone(toDoList, item) {
  const index = toDoList.indexOf(item);
  toDoList[index].isCompleted = true;
}
//surprisingly it works!
//true-false === 1 !!!
function list(toDoList) {
  const sortedDone = toDoList.sort((item1, item2) => {
    item1.isCompleted - item2.isCompleted;
  });
}
