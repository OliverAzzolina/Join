let todos = [
  {
    title: "Kochwelt Page & Recipe Recommender",
    description: "Build start page with recipe recommendation...",
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

let contacts = [
  {
      name: 'Anton Mayer',
      email: 'antonm@gmail.com',
      phone: '+49 1111 111 11 1'
  },
  {
      name: 'Anja Schulz',
      email: 'schulz@hotmail.com',
      phone: '+49 3333 333 33 3'
  },
  {
      name: 'Benedigt Ziegler',
      email: 'benedigt@gmail.com',
      phone: '+49 4444 444 44 4'
  },
  {
      name: 'David Eisenberg',
      email: 'davidberg@gmail.com',
      phone: '+49 2222 222 22 2'
  },
  {
      name: 'Eva Fischer',
      email: 'eva@gmail.com',
      phone: '+49 5555 555 55 5'
  },
  {
      name: 'Emmanuel Mauer',
      email: 'emmanuelma@gmail.com',
      phone: '+49 6666 666 66 6'
  },
  {
      name: 'Marcel Bauer',
      email: 'bauer@gmail.com',
      phone: '+49 7777 777 77 7'
  },
  {
      name: 'Tatjana Wolf',
      email: 'wolf@gmail.com',
      phone: '+49 8888 888 88 8'
  },
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
    <span id="category${i}" class="category">${todos[i]["category"]}</span>
    <div class="title-description">
    <span class="todo-title">${todos[i]["title"]}</span>
    <span class="todo-description">${todos[i]["description"]}</span>
    </div>
    <span>${todos[i]["subtasks"]} Subtasks</span>
    <div class="assigned-prio">
    <select>
      <option>${todos[i]["assignedto"]}</option>
    </select>
    <img src="assets/img/icons/Prio media.png" alt="">
    </div>
    </div>
    `;
    //TO-DOs:
    //subtasks line
    //dropDown
    //prio img

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

function hover(id){
  document.getElementById(id).setAttribute('src', '/assets/img/icons/plus_button_hover.png');
}

function unhover(id){
  document.getElementById(id).setAttribute('src', '/assets/img/icons/plus_button.png');
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
    