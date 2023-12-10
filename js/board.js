    //TO-DOs:
    //subtasks add task and detail card
    // css animations

let currentDraggedElement;

async function init(){
    loadContactsFromStorage();
    loadTasksfromStorage();
    
}

//LOAD Tasks from Storage
async function loadTasksfromStorage(){
  try{
    tasks = JSON.parse(await getItem('tasks'));
  }catch(e){
    console.warn('loading error:', e)
  }
  renderTasks();
}

//LOAD Contacts from Storage
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
  for (let i = 0; i < contacts.length; i++) {
      let initials = contacts[i]['name'].split(" ").map((n)=>n[0]).join("");
      let randomColor = '#' + contacts[i]['randomColor'];
      let name = contacts[i]['name'];
      contactList.innerHTML += `
     <label for="checkbox${i}">
      <li id="assigned-contact${i}" onclick="checkIfAssigned(${i})">
      <input style="display: none" type="checkbox" id="checkbox${i}">
        <div class="drop-name-initials">
          <div class="drop-initials" style="background-color: ${randomColor}">${initials}</div>
          <span> ${name}</span>
        </div>
          <img id="checked${i}" src="/assets/img/icons/check_button.png" alt="">
      </li>
     </label>
  `;
  }
    sortContacts();
}

function renderTasks() {
  for (let i = 0; i < tasks.length; i++) {
    let status = tasks[i]["status"];
    if (status == status) {
      document.getElementById(`${status}`).innerHTML += generateTask(i);
      setPrioImg(i);
      updateDoneSubs(i);
      generateSubtasks(i);
      checkCategory(i);
      renderAssignedTo(i);
    }
  }
  checkIfBoardEmpty();
}

function checkIfBoardEmpty(){
  checkOpen('open');
  checkOpen('in-progress');
  checkOpen('await-feedback');
  checkOpen('done');
}


function checkIfAssigned(i){
  let checkbox = document.getElementById(`checkbox${i}`).checked;
 console.log(checkbox)
  if(checkbox == false){
    setUnAssigned(i); 
  }

  if(checkbox == true){
    setAssigned(i);
  }
}

function setAssigned(i){
  let assignedContact = document.getElementById(`assigned-contact${i}`);
  let checkImg = document.getElementById(`checked${i}`);
  assignedContact.style = "background-color: #2A3647; color: white"
  checkImg.src ="/assets/img/icons/check_button_checked.png";
}

function setUnAssigned(i){
  let assignedContact = document.getElementById(`assigned-contact${i}`);
  let checkImg = document.getElementById(`checked${i}`);
  assignedContact.style = "color: black";
  checkImg.src ="/assets/img/icons/check_button.png";
}

function showDropdownContacts(index){
  let dropdown = document.getElementById('assigned-editors');
  if(dropdown.style.display == 'none'){
    dropdown.style.display = 'block';
    clearAssignedTo(index);
  }else{
    dropdown.style.display = 'none';
    addAssignedEditors(index);
  } 
}

function addAssignedEditors(index){
  let showAssignedEditors = document.getElementById('show-assigned-editors-edit-container');
  for (let i = 0; i < contacts.length; i++) {
    const checkedEditor = contacts[i];
    let checkbox = document.getElementById(`checkbox${i}`).checked;
    if(checkbox == true){
      let name = checkedEditor['name'];
      let randomColor = '#' + checkedEditor['randomColor'];
      let initials = checkedEditor['name'].split(" ").map((n)=>n[0]).join("");
      showAssignedEditors.innerHTML += `
      <div id="editor${i}" class="drop-initials" style="background-color: ${randomColor}">${initials}</div>
      `;
      pushAssignedTo(index, initials, randomColor, name);
    }
  }
}

function renderAssignedTo(index){
  let assignedTo = document.getElementById(`todo-assigned-to${index}`);
  assignedTo.innerHTML = '';

  for (let i = 0; i < tasks[index]['assignedto'].length; i++) {
    const checkedEditor = tasks[index]['assignedto'][i]['initials'];
    let randomColor = tasks[index]['assignedto'][i]['randomColor'];
    assignedTo.innerHTML += `
    <div id="mini-logo${i}" style="background-color: ${randomColor}" class="mini-logo">${checkedEditor}</div>
    `;
  }
}

function clearAssignedTo(index){
  document.getElementById('show-assigned-editors-edit-container').innerHTML = '';
  tasks[index]['assignedto'].splice(0, tasks[index]['assignedto'].length);
}

function checkOpen(id){
let board = document.getElementById(`${id}`);
    if(board.innerHTML == ''){
      document.getElementById(`${id}-empty`).style.display = "flex";
     }else{
      document.getElementById(`${id}-empty`).style.display = "none";
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

function refreshTasks(){
  document.getElementById("open").innerHTML = '';
  document.getElementById("in-progress").innerHTML = '';
  document.getElementById("await-feedback").innerHTML = '';
  document.getElementById("done").innerHTML = '';
}

function generateTask(i){
    return `
    <div id="todo-card${i}" draggable="true" class="todo-card" ondragstart="startDragging(${i})" onclick="openTaskDetails(${i})">
      <span id="category${i}" class="category">${tasks[i]["category"]}</span>
      <div class="title-description">
        <span class="todo-title">${tasks[i]["title"]}</span>
        <span class="todo-description">${tasks[i]["description"]}</span>
      </div>
      <div class="sub-progress-container">
        <div class="subtasks-progress-bar-container">
          <div class="subtasks-progress-bar" id="subtasks-progress${i}"></div>
        </div>
        <span><span id="subsDoneOfAll${i}"></span> / ${tasks[i]["subtasks"].length} Subtasks</span>
      </div>
      <div class="assigned-prio">
        <div class="todo-assigned-to" id="todo-assigned-to${i}"></div>
        <img id="prioImg${i}" src="" alt="">
      </div>
    </div>
    `;
}

function setPrioImg(i){
  let prioImg = document.getElementById(`prioImg${i}`);
  let prio = tasks[i]['prio'];
  prioImg.src =`/assets/img/icons/${prio}.png`;
}

function generateSubtasks(i){
  let subProgressBar = document.getElementById(`subtasks-progress${i}`);
  subProgressBar.innerHTML = '';
  let subTasksDone = tasks[i]['subTasksDone'];
  let checkedTrue = 0
  for (let j = 0; j < subTasksDone.length; j++) {
    if(subTasksDone[j].checked == true){
      checkedTrue++;
    }
  }
  let openSubTasks = tasks[i]['subtasks'].length;
  let percent = checkedTrue / openSubTasks * 100;
  subProgressBar.style.width = percent + '%';
  updateDoneSubs(i, checkedTrue)
}

function updateDoneSubs(i, checkedTrue){
  if(checkedTrue == undefined){
    document.getElementById(`subsDoneOfAll${i}`).innerHTML = '0';
  }else{
    document.getElementById(`subsDoneOfAll${i}`).innerHTML =`${checkedTrue}`;
  }
}

//drag&drop
function startDragging(i){
 currentDraggedElement = i;
}

function allowDrop(ev){
  ev.preventDefault();
}

function moveTo(status){
 tasks[currentDraggedElement]['status'] = status;
  refreshTasks();
  renderTasks();
  checkIfBoardEmpty();
}

//Detail-Todo
function openTaskDetails(i){
  document.getElementById('overlay').style.display = "flex"; 
  document.getElementById('overlay').innerHTML = generateOverlay(i);
  setPrioDetailImg(i);
  checkOverlayCategory(i);
  generateDetailSubtasks(i);
  checkIfSubsDone(i);
  renderAssignedToDetail(i);
}

function setPrioDetailImg(i){
  let prioDetailImg = document.getElementById(`prioDetailImg${i}`);
  let prio = tasks[i]['prio'];
  prioDetailImg.src = `/assets/img/icons/${prio}.png`;
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

function generateDetailSubtasks(i){
  let detailSub = document.getElementById(`checklistSubDetail`);
  detailSub.innerHTML = '';

    for (let j = 0; j < tasks[i]["subtasks"].length; j++) {
      let subtask = tasks[i]["subtasks"][j];
      detailSub.innerHTML += `
      <li id="subtaskIndex${j}" class="detailSub" onclick="checkIfSubChecked(${j}, ${i})">
      <div>
       <img id="detailSub${j}" src="/assets/img/icons/check_button.png">
        <span>${subtask}</span>
        </div>
      </li>
  `;
    } // j = subtask index & i = task index
}

function checkIfSubChecked(j, i){
  //let subCheckbox = document.getElementById(`subCheckbox${j}`).checked;
  //console.log(subCheckbox)
  let subtask = tasks[i]['subtasks'][j];
  let subTasksDone = tasks[i]['subTasksDone'][j];
  if(subTasksDone.checked == false){
    setChecked(j, i, subTasksDone)
  }else{
    setUnChecked(j, i, subTasksDone)
  }
  setItem('tasks', JSON.stringify(tasks));
  generateSubtasks(i, j);
  updateDoneSubs(i);

}

function setChecked(j, i, subTasksDone){
  subTasksDone.checked = true;
  document.getElementById(`detailSub${j}`).src = '/assets/img/icons/check_button_checked_bl.png';
}

function setUnChecked(j, i, subTasksDone){
    subTasksDone.checked = false;
      document.getElementById(`detailSub${j}`).src = '/assets/img/icons/check_button.png';
  }

function checkIfSubsDone(i){
  let subtasksDone = tasks[i]['subTasksDone'];
  for (let j = 0; j < tasks[i]['subTasksDone'].length; j++) {
    const checkedSub = tasks[i]['subTasksDone'][j].checked;
    if(checkedSub == true){
      document.getElementById(`detailSub${j}`).src = '/assets/img/icons/check_button_checked_bl.png'
    }
  }
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
    <span class=" prio-img f-s20-w400">Priority:  ${tasks[i]["prio"].charAt(0).toUpperCase() + tasks[i]["prio"].slice(1)}<img class="prio-detail-img" id="prioDetailImg${i}" src=""></span><br>
    <span class="f-s20-w400">Assigned to:<br><div id="detailAssignedTo"></div></span><br>
    <span class="f-s20-w400">Subtasks<ul id="checklistSubDetail"></ul></span>
    <div class="overlay-buttons">
      <button onmouseover="hover('delete-img')" onmouseout="unhover('delete-img')"><img id="delete-img" src="/assets/img/icons/delete.png">Delete</button>
      <div class="overlay-buttons-splitter"></div>
      <button onclick="openEditOverlay(${i})" onmouseover="hover('edit-img')" onmouseout="unhover('edit-img')"><img id="edit-img" src="/assets/img/icons/edit.png">Edit</button>
    </div>
    </div>
    `;
}

function openEditOverlay(i){
  loadTaskData(i);
  loadContacts();
}

function loadTaskData(i){
  let title = tasks[i]['title'];
  let description = tasks[i]['description'];
  let duedate = tasks[i]['duedate'];
  //let subtasks = tasks[i]['subtasks']; function renderEditSubtasks()
  document.getElementById('overlay').innerHTML = generateEditOverlay(i, title, description, duedate);
  showPrio(i);
  renderAssignedToEdit(i)
}

function pushAssignedTo(index, initials, randomColor, name){
  let assignedToTask = {
    name: name,
    initials: initials,
    randomColor: randomColor,
  };
  tasks[index]['assignedto'].push(assignedToTask);
  renderAssignedToCards(index);
}

function renderAssignedToCards(index){
  let showAssignedEditors = document.getElementById('show-assigned-editors-container');
  for (let i = 0; i < tasks[index]['assignedto'].length; i++) {
    const checkedEditor = tasks[index]['assignedto'][i]['initials'];
    let randomColor = tasks[index]['assignedto'][i]['randomColor'];
    showAssignedEditors.innerHTML += `
      <div id="editor${i}" class="drop-initials" style="background-color: ${randomColor}">${checkedEditor}</div>
      `;
  }
}

function renderAssignedToDetail(index){
  let showAssignedEditors = document.getElementById('detailAssignedTo');

  for (let i = 0; i < tasks[index]['assignedto'].length; i++) {
    const checkedEditor = tasks[index]['assignedto'][i]['initials'];
    let randomColor = tasks[index]['assignedto'][i]['randomColor'];
    let name = tasks[index]['assignedto'][i]['name'];
      showAssignedEditors.innerHTML += `
      <div class="detail-name-initials"><div id="editor${i}" class="drop-initials" style="background-color: ${randomColor}">${checkedEditor}</div><span>${name}</span></div>
      `;
    }
  }

function renderAssignedToEdit(index){
  let showAssignedEditors = document.getElementById('show-assigned-editors-edit-container');

  for (let i = 0; i < tasks[index]['assignedto'].length; i++) {
    const checkedEditor = tasks[index]['assignedto'][i]['initials'];
    let randomColor = tasks[index]['assignedto'][i]['randomColor'];
      showAssignedEditors.innerHTML += `
      <div id="editor${i}" class="drop-initials" style="background-color: ${randomColor}">${checkedEditor}</div>
      `;
    }
  }

function closeEditOverlay(){
  document.getElementById('overlay').style.display = "none";
}

function showPrio(i){
 let newPrio = tasks[i]['prio'];
 if(newPrio == 'urgent'){
  document.getElementById(newPrio).style.backgroundColor = "#FF3D00"
}else if(newPrio == 'medium'){
  document.getElementById(newPrio).style.backgroundColor = "#FFA800"
}else if(newPrio == 'low'){
  document.getElementById(newPrio).style.backgroundColor = "#7AE229"
}

}

function setPrio(i, newPrio){
  //refresh backgroundcolors to white
  document.getElementById('urgent').style.backgroundColor = "";
  document.getElementById('medium').style.backgroundColor = "";
  document.getElementById('low').style.backgroundColor = "";
  document.getElementById('urgent-text').style.color = "";
  document.getElementById('medium-text').style.color = "";
  document.getElementById('low-text').style.color = "";

  tasks[i]['prio'] = newPrio;
  if(newPrio == 'urgent'){
    document.getElementById(newPrio).style.backgroundColor = "#FF3D00";
    document.getElementById('urgent-text').style.color = "#FFFFFF";
  }else if(newPrio == 'medium'){
    document.getElementById(newPrio).style.backgroundColor = "#FFA800";
    document.getElementById('medium-text').style.color = "#FFFFFF";
  }else if(newPrio == 'low'){
    document.getElementById(newPrio).style.backgroundColor = "#7AE229";
    document.getElementById('low-text').style.color = "#FFFFFF";
  }
}

async function saveTask(i){
  refreshTasks();
  tasks[i]['title'] = document.getElementById('edit-task-title-input').value;
  tasks[i]['description'] = document.getElementById('edit-task-description-input').value;
  tasks[i]['duedate'] = document.getElementById('edit-task-form-input').value;
  tasks[i]['prio'];
  tasks[i]['assignedTo'];
  tasks.push();
  await setItem('tasks', JSON.stringify(tasks));
  loadTasksfromStorage();
  closeEditOverlay();
}

async function addNewTask(){

}

function generateEditOverlay(i, title, description, duedate){
  return`
  <div id="edit-task-overlay"  onclick="closeDetailCard()">
  <div class= "detail-todo-card" onclick="doNotClose(event)">
    
  <div id="edit-task-overlay-header">
  <button onclick="closeEditOverlay()" class="close-button">
  <img src="/assets/img/icons/close.png" alt=""></button>
  </div>
    <form id="edit-task-form" onsubmit="saveTask(${i}); return false"> 
      <div id="edit-input-container-tasks">
          
          <div id="add-task-title-container">
              <div>
                <span id="add-task-title-headline" class="add-task-form-title">Title</span>
              </div>
              <input id="edit-task-title-input" class="add-task-form-input" required type="text" value='${title}' placeholder="Enter a title">
          </div> 

          <div id="add-task-description-container">
            <span id="add-task-description-headline" class="add-task-form-title">Description</span>
            <textarea id="edit-task-description-input" class="add-task-form-input" required  rows="5" cols="40">${description}</textarea>
          </div>

          <div id="add-task-date-container">
            <div>
              <span id="add-task-date-headline" class="add-task-form-title">Due date</span>
            </div>
              <input id="edit-task-form-input" class="edit-task-form-input" required type="date" value=${duedate}>
          </div>

          <div id="add-task-prio-container" onclick="doNotClose(event)">
          <span id="add-task-prio-headline" class="add-task-form-title">Prio</span>
          <div id="add-task-form-btn-container" onclick="doNotClose(event)">
            <button type="button" id="urgent" onclick="setPrio(${i}, 'urgent'); doNotClose(event)" class="add-task-form-btn">
              <span id="urgent-text" class="add-task-form-btn-text">Urgent</span>
              <img src="assets/img/icons/Prio alta.png" alt="">
            </button>
            <button  type="button" id="medium" onclick="setPrio(${i}, 'medium'); doNotClose(event)" class="add-task-form-btn">
              <span id="medium-text" class="add-task-form-btn-text">Medium</span>
              <img  src="assets/img/icons/Prio media.png" alt="">
            </button>
            <button  type="button" id="low" onclick="setPrio(${i}, 'low'); doNotClose(event)" class="add-task-form-btn">
              <span id="low-text" class="add-task-form-btn-text">Low</span>
              <img src="assets/img/icons/Prio baja.png" alt="">
            </button>
          </div>
        </div>

          <div id="add-task-assigned-to-container">
            <span class="add-task-form-title">Assigned to</span>
            <div id="contacts-dropdown" onclick="showDropdownContacts(${i})">
              <span>Select contacts to assign</span>
              <img src="assets/img/icons/arrow_drop_down.png" alt="">
            </div>
            <ul style="display: none;" id="assigned-editors" class="assigned-editors"></ul>
            <div id="show-assigned-editors-edit-container" onclick="clearAssignedTo(${i})"></div>
          </div>
          
          <div id="add-task-sub-container">
            <span class="add-task-form-title">Subtasks</span>
            <input class="add-task-form-input" type="text" placeholder="Add new subtask">
          </div>
       
      </div>
      <div id="edit-task-overlay-footer">
      <div class="edit-task-buttons">
        <button type="submit" class="ok-button"><span>Ok</span><img src="assets/img/icons/check.png" alt=""></button>
      </div>
    </div>
    </form>
  </div>
</div>
  `;
}

//SEARCH
function filterTasks() {
  let search = document.getElementById("search").value.toLowerCase();
  refreshTasks();
  if (search == "") {
    //document.getElementById('notfound').style.display = "none";
    renderTasks();
  }else{
    FilteredTasks(search);
  }
}

function hover(id){
 let button = document.getElementById(id);
  if(id == 'edit-img'){
    button.setAttribute('src', '/assets/img/icons/edit_hover.png');
  }else
  if(id == 'delete-img'){
    button.setAttribute('src', '/assets/img/icons/delete_hover.png');
  }else{
    document.getElementById(id).setAttribute('src', '/assets/img/icons/plus_button_hover.png');
  }
  
}

function unhover(id){
  let button = document.getElementById(id);
  if(id == 'edit-img'){
    button.setAttribute('src', '/assets/img/icons/edit.png');
  }else
  if(id == 'delete-img'){
    button.setAttribute('src', '/assets/img/icons/delete.png');
  }else{
    document.getElementById(id).setAttribute('src', '/assets/img/icons/plus_button.png');
  }
  
}

function FilteredTasks(search){ 
  refreshTasks();
  for (let i = 0; i < tasks.length; i++) {
    let title = tasks[i]['title'].toLowerCase();
    let description = tasks[i]['description'].toLowerCase();
    if (title.toLowerCase().includes(search)||description.toLowerCase().includes(search)) {
      renderFilteredTasks(i);
    }else{
      //?checkIfEmpty();
    }
  }
}

function renderFilteredTasks(i){
  let status = tasks[i]["status"];
  if (status == status) {
    document.getElementById(`${status}`).innerHTML += generateTask(i);
    checkCategory(i);
  }
}

function openAddTaskCard(){
  document.getElementById('add-task-overlay').style.display = 'flex';
  loadContacts();
}

function closeAddTaskCard(){
  document.getElementById('assigned-editors').innerHTML = '';
  document.getElementById('add-task-overlay').style.display = 'none';
}

function doNotClose(event){
  event.stopPropagation();
}