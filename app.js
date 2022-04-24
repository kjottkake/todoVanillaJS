// selects dom elements 
let taskInput = document.getElementById("new-task"); // get new task 
// let addButton = document.getElementById("addButton");//gets initial button item
let incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
let completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks
let addButton = document.getElementById("myButton");
//New Task List item
let createNewTodoItem = function (taskString) {
  let listItem = document.createElement("li"); // create List Item
  let checkBox = document.createElement("input");// creates checkbox for input
  let label = document.createElement("label"); // creates label
  let editInput = document.createElement("input"); // creates input field
  let editButton = document.createElement("button"); // creates edit button
  let deleteButton = document.createElement("button"); // creates delete button

  //Each element needs modified 
  checkBox.type = "checkBox";
  editInput.type = "text";

  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";

  label.innerText = taskString;

  // Each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}


/*
  Implementation of task II.1
  Allows for users to add items
*/
let addTask = function () {
  console.log("Adding Todo Item...");
  //Create a new list item with the text from the #new-task:
  let listItem = createNewTodoItem(taskInput.value);
  //Append listItem to incompleteTaskHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
}

/*
  Implementation of task I.2
  Updates/edits todo item
*/
let editTask = function () {
  console.log("Editing Todo!");

  let listItem = this.parentNode;
  let editInput = listItem.querySelector("input[type=text]");
  let label = listItem.querySelector("label");
  let containsClass = listItem.classList.contains("editMode");

  // let keypress = document.addEventListener('keydown', function(event){
  //   if(event.key === "Escape"){
  //     console.log("pressed escape key!")
  //     //do something
  //   }
  // });



  // if class of the parent is .editMode
  if (containsClass) {
    //Switch from .editMode
    //label text become the input's value
    label.innerText = editInput.value;
  } else {
    //Switch to .editMode
    //input value becomes the labels text
    editInput.value = label.innerText;
  }
  //Toggle .editMode on the parent 
  listItem.classList.toggle("editMode");
}

/* Implementation of task I.1 
Deletes TODO item
*/
let deleteTask = function () {
  console.log("Delete Task...");
  /* Implementation of task I.1.a prompts the user to confirm deletion of item*/
  if (window.confirm("Do  you really want to delete this task?")) {
    //Remove the parent list item from the ul
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
  }
}

//Mark a task as complete
let taskCompleted = function () {
  console.log("Task Complete...");
  //When the Checkbox is checked 
  //Append the task list item to the #completed-tasks ul
  let listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}


//Mark a task as incomplete
let taskIncomplete = function () {
  console.log("Task Incomplete...");
  //When the checkbox is unchecked appendTo #incomplete-tasks
  let listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}


//Set the click handler to the addTask function
addButton.addEventListener("click", addTask);


let bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("Bind List item events");
  // select listitems chidlren
  let checkBox = taskListItem.querySelector('input[type="checkbox"]');
  let editButton = taskListItem.querySelector("button.edit");
  let deleteButton = taskListItem.querySelector("button.delete");
  //bind editTask to edit button
  editButton.onclick = editTask;
  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
  //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;

}

//cycle over incompleteTaskHolder ul list items
for (let i = 0; i < incompleteTasksHolder.children.length; i++) {
  //bind events to list item's children (taskCompleted)	
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over completedTaskHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list item's children (taskCompleted)	
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}









