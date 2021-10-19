var toDoInput = document.getElementById("input");
var toDoButton = document.getElementById("toDoButton");
var toDoList = document.getElementById("toDoList");
//get the select with id
var filterOption = document.getElementById("doneLists");

//listeners
//if content  is loaded execute function
document.addEventListener("DOMContentLoaded", getToDos);
toDoButton.addEventListener("click", add);
toDoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterToDo);

//functions

// function validateForm(){

// }

function add(event) {
  //create element div
  var toDoDiv = document.createElement("div");

  //give div classlist
  toDoDiv.classList.add("todo");

  //create element li
  var newToDo = document.createElement("li");

  //if not empty and so on, give it the value inputted. otherwise ask for input

  if (
    toDoInput.value == null ||
    toDoInput.value == "" ||
    toDoInput.value.length < 3 ||
    toDoInput.value.length > 29
  ) {
    //ekaksi span kenttään html:ssä laitetaan teksti: täytä kunnolla
    document.getElementById("feedbacktoDoInput").innerHTML = "Please fill in!";
    // document.getElementById("feedbacktoDoInput").style.background = "red";

    //highlight field
    document.getElementById("input").style.background = "red";

    return false;
  } else {
    newToDo.innerText = toDoInput.value;
  }

  //delete the warning text and the backgroundcolor
  document.getElementById("feedbacktoDoInput").innerHTML = "";
  document.getElementById("input").style.background = "white";

  //give it a classlist
  newToDo.classList.add("todo-item");

  //append new todo-item to the todo div, meaning the list item goes inside the div
  toDoDiv.appendChild(newToDo);

  //add the new todo to local storage
  save(toDoInput.value);

  //button for checking done
  var checkButton = document.createElement("button");
  checkButton.innerHTML = '<i class="fas fa-check-circle"></i>';
  checkButton.classList.add("checkButton");
  toDoDiv.appendChild(checkButton);

  //button for deleting list item
  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("deleteButton");
  toDoDiv.appendChild(deleteButton);

  //attach the div li and teh buttons to the ul!
  toDoList.appendChild(toDoDiv);

  //empty input field after
  toDoInput.value = "";
}

//e.target = what is clicked, is given different functionalities
function deleteCheck(e) {
  var item = e.target;
  //delete the item
  if (item.classList[0] === "deleteButton") {
    // item.remove(); deletes the pointed target, delete the parent:
    var todo = item.parentElement;
    //call function to delete also from local storage
    deleteToDos(todo);
    todo.remove();
  }
  //check as done.
  if (item.classList[0] === "checkButton") {
    // tää viivaa yli ainoastaan itse done napin
    //var todo = item;
    var todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

//function to show all completed pr uncompleted.loop over,  e.target the values from them (all, compl, or not).
function filterToDo(e) {
  var toDos = toDoList.childNodes;
  // console.log(todos);
  toDos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";

        break;
      case "done":
        //if the task has a class of such and such show it else hide
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "unfinished":
        //if the task does not have a class of such and such show it else hide
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//save to local storage
function save(todo) {
  //Check if there is already todos
  var toDos;
  if (localStorage.getItem("toDos") === null) {
    //if empty create array
    toDos = [];
  } else {
    //if theres smthng there parse it back into an array
    toDos = JSON.parse(localStorage.getItem("toDos"));
  }
  //the newly created todo is pushed in to the array
  toDos.push(todo);
  //save the new string
  localStorage.setItem("toDos", JSON.stringify(toDos));
}

//function to SHOW the items from local storage
function getToDos() {
  var toDos;
  if (localStorage.getItem("toDos") === null) {
    toDos = [];
  } else {
    toDos = JSON.parse(localStorage.getItem("toDos"));
  }

  //loop over
  toDos.forEach(function (todo) {
    //create div
    var toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo");

    //create element li
    var newToDo = document.createElement("li");

    newToDo.innerText = todo;

    //give it a classlist
    newToDo.classList.add("todo-item");

    //append new todo-item to the todo div, meaning the list item goes inside the div
    toDoDiv.appendChild(newToDo);

    //button for checking done
    var checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    checkButton.classList.add("checkButton");
    toDoDiv.appendChild(checkButton);

    //button for deleting list item
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("deleteButton");
    toDoDiv.appendChild(deleteButton);

    //attach the div li and teh buttons to the ul!
    toDoList.appendChild(toDoDiv);
  });
}

//when refreshed also the deleted todo items return, so delete them
function deleteToDos(todo) {
  var toDos;
  if (localStorage.getItem("toDos") === null) {
    toDos = [];
  } else {
    toDos = JSON.parse(localStorage.getItem("toDos"));
  }
  //remove the position of the clicked item parent from the array
  // inside div(todo, which is clicked)children are the input and teh buttons, so take the first one, index zero, innerText.
  // console.log(todo.children[0].innerText)
  //to get the index of the deleted item with the input text
  var Index = todo.children[0].innerText;
  //splice removes the input which has the rightindex. The number one in the end specifies you want to remove only  one element
  toDos.splice(toDos.indexOf(Index), 1);
  //finally update the local storage wihtout the deleted item
  localStorage.setItem("toDos", JSON.stringify(toDos));
}

//the completed items are not checked after refreshing

//when hit complete
//create local storage also for completed items
//separate those from uncompleted
//retrieve all of the accordingly.
