let tasks = [
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
    title: "Title",
    description: "Description",
    assignedto: ['AZ', 'RF', 'XY'],
    duedate: "10/05/2023",
    prio: "Medium",
    category: "Technical Task",
    subtasks: 2,
    status: "in-progress",
  }
];

let contacts = [];
let currentDraggedElement;

async function init(){
    loadContactsFromStorage();
}

//LOAD Storage
async function loadContactsFromStorage(){
  try{
      contacts = JSON.parse(await getItem('contacts'));
  }catch(e){
    console.warn('loading error:', e)
  }
  sortContacts();
}

//SORT Contacts
function sortContacts(){
  contacts.sort((a, b) => {
    if (a.name.toUpperCase() < b.name.toUpperCase()) {
     return -1;
    } else if (a.name.toUpperCase() > b.name.toUpperCase()) {
     return 1;
    } else {
     return 0;
    }
   });
}

//LOAD Contacts
function loadContacts(){
  let contactList = document.getElementById('assigned-editors');
  contactList.innerHTML = '';
  for (let i = 0; i < contacts.length; i++) {
      let initials = contacts[i]['name'].split(" ").map((n)=>n[0]).join("");
      let randomColor = '#' + contacts[i]['randomColor'];
      let name = contacts[i]['name'];
      contactList.innerHTML += `
      <li>
        <div class="drop-name-initials">
          <div class="drop-initials">${initials}</div>
          <span> ${name}</span>
        </div>
          <input type="checkbox">
      </li>`;
     
  }
  sortContacts();
}



function renderTodos() {
  for (let i = 0; i < tasks.length; i++) {
    let status = tasks[i]["status"];
    if (status == status) {
      document.getElementById(`${status}`).innerHTML += generateTodo(i);
      checkCategory(i);
      renderAssignedTo(i);
    }
  }
}


function checkCategory(i){
  let category = tasks[i]["category"];
  if(category == 'User Story'){
    document.getElementById(`category${i}`).style.backgroundColor = "rgb(0,56,255)";
  }
  if(category == 'Technical Task'){
    document.getElementById(`category${i}`).style.backgroundColor = "rgb(31,215,193)";
  }
}


function renderAssignedTo(i){
  let assignedTo = document.getElementById(`todo-assigned-to${i}`);
  assignedTo.innerHTML = '';

  for (let index = 0; index < tasks[i]['assignedto'].length; index++) {
    const editor = tasks[i]['assignedto'][index];
    assignedTo.innerHTML += `
    <div id="mini-logo${editor[i]}" class="mini-logo">${editor}</div>
    `;
  }
}


function refreshTodos(){
  document.getElementById("open").innerHTML = '';
  document.getElementById("in-progress").innerHTML = '';
  document.getElementById("await-feedback").innerHTML = '';
  document.getElementById("done").innerHTML = '';
}


function generateTodo(i){
    return `
    <div id="todo-card${i}" draggable="true" class="todo-card" ondragstart="startDragging(${i})" onclick="openTodoDetails(${i})">
      <span id="category${i}" class="category">${tasks[i]["category"]}</span>
      <div class="title-description">
        <span class="todo-title">${tasks[i]["title"]}</span>
        <span class="todo-description">${tasks[i]["description"]}</span>
      </div>
        <span>${tasks[i]["subtasks"]} Subtasks</span>
      <div class="assigned-prio">
        <div class="todo-assigned-to" id="todo-assigned-to${i}"></div>
        <img src="assets/img/icons/Prio media.png" alt="">
      </div>
    </div>
    `;
    //TO-DOs:
    //subtasks line
  
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
  let category = tasks[i]["category"];
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
  return `<div id="todo-card${i}" class="detail-todo-card" onclick="doNotClose(event)">
  <div class="detail-card-top">  
    <p id="overlay-category${i}" class="category">${tasks[i]["category"]}</p>
    <button class="close-button" onclick="closeDetailCard()"><img src="assets/img/icons/close.png" alt="close"></button>
  </div>
    <span class="detail-title">${tasks[i]["title"]}</span><br>
    <span class="f-s20-w400">${tasks[i]["description"]}</span><br>
    <span class="f-s20-w400">Due date:  ${tasks[i]["duedate"]}</span><br>
    <span class="f-s20-w400">Priority:  ${tasks[i]["prio"]}</span><br>
    <span class="f-s20-w400">Assigned to:<br>${tasks[i]["assignedto"]}</span><br>
    <span class="f-s20-w400">${tasks[i]["subtasks"]}</span>
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
  for (let i = 0; i < tasks.length; i++) {
    let title = tasks[i]['title'].toLowerCase();
    let description = tasks[i]['description'].toLowerCase();
    if (title.toLowerCase().includes(search)||description.toLowerCase().includes(search)) {
      renderFilteredTodos(i);
    }else{
      //?checkIfEmpty();
    }
  }
}

function renderFilteredTodos(i){
  let status = tasks[i]["status"];
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

function openAddTaskCard(){
  document.getElementById('add-task-overlay').style.display = 'flex';
}


function closeAddTaskCard(){
  document.getElementById('add-task-overlay').style.display = 'none';

}


function doNotClose(event){
  event.stopPropagation();
}


function showDropdownContacts(){
  let dropdown = document.getElementById('assigned-editors');
  if(dropdown.style.display == 'none'){
    dropdown.style.display = 'block';
  }else{
    dropdown.style.display = 'none';
  } 
}

