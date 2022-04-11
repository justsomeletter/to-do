// selector
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//event listner
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//functions
function addTodo(event) {
  // prevent form from submiting
  event.preventDefault();

  // TO DO DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value; // the added element will be visible in the list now
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // Add todo to local storage
  saveToLocal(todoInput.value);

  // Check Mark button
  const completedButtton = document.createElement("button");
  completedButtton.innerHTML = `<i class="fa-solid fa-check"></i>`;
  completedButtton.classList.add("complete-btn");
  todoDiv.appendChild(completedButtton);

  // Trash Buttton
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //append list
  todoList.appendChild(todoDiv);

  //clear TODO input value
  todoInput.value = ""; // after adding an item the form field is empyt again
}

function deleteCheck(e) {
  const item = e.target; // storing the html of selected element in item variable

  //Delete TODO
  if (item.classList[0] === "trash-btn") {
    // checking to see if the selected element contains the trash-btn class
    const removeItem = item.parentElement; // selecting the parent element because item.remove will remove only the trash button

    // fall back animation , (when deleting the element)
    removeItem.classList.add("fall");
    removeItem.addEventListener("transitionend", function () {
      // wait for transition to end, then remove the element
      removeItem.remove();
    });
  }

  //Check Mark
  if (item.classList[0] === "complete-btn") {
    const completeItem = item.parentElement;
    completeItem.classList.toggle("completed"); // remove the class if present or add if not present
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveToLocal() {
  let todos;
}

function getTodos() {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo; // the added element will be visible in the list now
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Check Mark button
    const completedButtton = document.createElement("button");
    completedButtton.innerHTML = `<i class="fa-solid fa-check"></i>`;
    completedButtton.classList.add("complete-btn");
    todoDiv.appendChild(completedButtton);

    // Trash Buttton
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append list
    todoList.appendChild(todoDiv);
  });
}
