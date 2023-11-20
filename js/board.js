let todos = [
  {
    title: "Titel",
    description: "Hier kommt die Beschriebung hin",
    assignedto: [],
    duedate: "",
    prio: "Medium",
    category: "User Story",
    subtasks: [],
    status: "Open",
  },
];

let currentDraggedElement;

function renderTodos() {
  refreshTodos();
  for (let i = 0; i < todos.length; i++) {
    if (todos[i]["status"] == "Open") {
      document.getElementById("todo-container").innerHTML += generateTodo(i);
    }
    if (todos[i]["status"] == "In progress") {
      document.getElementById("in-progress-container").innerHTML += generateTodo(i);
    }
    if (todos[i]["status"] == "Await") {
      document.getElementById("await-feedback-container").innerHTML += generateTodo(i);
    }
    if (todos[i]["status"] == "Done") {
      document.getElementById("done-container").innerHTML += generateTodo(i);
    }
  }
}

function refreshTodos(){
  document.getElementById("todo-container").innerHTML = '';
  document.getElementById("in-progress-container").innerHTML = '';
  document.getElementById("await-feedback-container").innerHTML = '';
  document.getElementById("done-container").innerHTML = '';
}

function generateTodo(i){
    return `<div id="todo-card${i}" draggable="true" class="todo-card" ondragstart="startDragging(${i})" onclick="openTodoDetails(${i})">
    <p>${todos[i]["category"]}</p>
    <p>${todos[i]["title"]}</p>
    <p>${todos[i]["description"]}</p>
    <p>${todos[i]["subtasks"]}</p>
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
  renderTodos();
}

function openTodoDetails(i){
  document.getElementById('overlay').style.display = "flex";
  document.getElementById('overlay').innerHTML = generateOverlay(i);
}

function closeDetailCard(){
  document.getElementById('overlay').style.display = "none";
}

function generateOverlay(i){
  return `<div id="todo-card${i}"  class="detail-todo-card" >
    <p>${todos[i]["category"]}</p>
    <p>${todos[i]["title"]}</p>
    <p>${todos[i]["description"]}</p>
    <p>${todos[i]["subtasks"]}</p>
    </div>
    `;
}