let todos = [
  {
    title: "Titel",
    description: "Hier kommt die Beschriebung hin",
    assignedto: ['AM', 'EM', 'MB'],
    duedate: "10/05/2023",
    prio: "Medium",
    category: "User Story",
    subtasks: 2,
    status: "open",
  },
  {
    title: "Überschrift",
    description: "blabla",
    assignedto: ['AM', 'EM', 'MB'],
    duedate: "10/05/2023",
    prio: "Medium",
    category: "Technical Task",
    subtasks: 2,
    status: "in-progress",
  }
];

let currentDraggedElement;

function renderTodos() {
  
  for (let i = 0; i < todos.length; i++) {
    let status = todos[i]["status"];
    if (status == status) {
      document.getElementById(`${status}`).innerHTML += generateTodo(i);
      checkCategory(i);
    }
  }
}

function checkCategory(i){
  let category = todos[i]["category"];
  if(category == 'User Story'){
    document.getElementById(`category${i}`).style.backgroundColor = "rgb(0,56,255)";
  }
  if(category == 'Technical Task'){
    document.getElementById(`category${i}`).style.backgroundColor = "rgb(31,215,193)";
  }
}

function refreshTodos(){
  document.getElementById("open").innerHTML = '';
  document.getElementById("in-progress").innerHTML = '';
  document.getElementById("await-feedback").innerHTML = '';
  document.getElementById("done").innerHTML = '';
}

function generateTodo(i){
    return `<div id="todo-card${i}" draggable="true" class="todo-card" ondragstart="startDragging(${i})" onclick="openTodoDetails(${i})">
    <p id="category${i}" class="category">${todos[i]["category"]}</p>
    <p>${todos[i]["title"]}</p>
    <p>${todos[i]["description"]}</p>
    <p>${todos[i]["subtasks"]} Subtasks</p>
    <p>${todos[i]["assignedto"]}</p>
    </div>
    `;
}

//drag&drop
function startDragging(i){
 currentDraggedElement = i;
}

function allowDrop(ev){
  ev.preventDefault();
}

function moveTo(status){
  todos[currentDraggedElement]['status'] = status;
  refreshTodos();
  renderTodos();
}

//Detail-Todo
function openTodoDetails(i){
  document.getElementById('overlay').style.display = "flex"; 
  document.getElementById('overlay').innerHTML = generateOverlay(i);
  checkOverlayCategory(i);
}

function checkOverlayCategory(i){
  let category = todos[i]["category"];
  if(category == 'User Story'){
    document.getElementById(`overlay-category${i}`).style.backgroundColor = "rgb(0,56,255)";
  }
  if(category == 'Technical Task'){
    document.getElementById(`overlay-category${i}`).style.backgroundColor = "rgb(31,215,193)";
  }
}

function closeDetailCard(){
  document.getElementById('overlay').style.display = "none";
}

function generateOverlay(i){
  return `<div id="todo-card${i}"  class="detail-todo-card" >
    <p id="overlay-category${i}" class="category">${todos[i]["category"]}</p>
    <h1>${todos[i]["title"]}</h1>
    <p>${todos[i]["description"]}</p>
    <p>Due date:  ${todos[i]["duedate"]}</p>
    <p>Priority:  ${todos[i]["prio"]}</p>
    <p>${todos[i]["assignedto"]}</p>
    <p>${todos[i]["subtasks"]}</p>
    </div>
    `;
}

//SEARCH
function filterTodos() {
  let search = document.getElementById("search").value.toLowerCase();
  refreshTodos();
  if (search == "") {
    //document.getElementById('notfound').style.display = "none";
    renderTodos();
  }else{
    FilteredTodos(search);
  }
}
   
function FilteredTodos(search){ 
  refreshTodos();
  for (let i = 0; i < todos.length; i++) {
    let title = todos[i]['title'].toLowerCase();
    let description = todos[i]['description'].toLowerCase();
    if (title.toLowerCase().includes(search)||description.toLowerCase().includes(search)) {
      renderFilteredTodos(i);
    }else{
      //?checkIfEmpty();
    }
  }
}

function renderFilteredTodos(i){
  let status = todos[i]["status"];
  if (status == status) {
    document.getElementById(`${status}`).innerHTML += generateTodo(i);
    checkCategory(i);
  }
}

//function checkIfEmpty(){
//  if(document.getElementById('').innerHTML == ''){
//    document.getElementById('notfound').style.display = "flex";
//  } else{
//    document.getElementById('notfound').style.display = "none";
//  }
//} 
    