let currentDraggedElement;

async function init(){
    loadContactsFromStorage();
    loadTasksfromStorage();
    generateHeader();
    generateSidebar();
}

//HTML GENERATION
function generateHeader() {
  var header = document.getElementById('header-container');
  header.innerHTML = headerHTML();
}

function generateSidebar() {
  var sidebar = document.getElementById('sidebar-container');
  sidebar.innerHTML = sidebarHTML();
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
      contactList.innerHTML += renderContacts(i, randomColor, name, initials);
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
  if(checkbox == false){
    setUnAssigned(i); 
  }

  if(checkbox == true){
    setAssigned(i);
  }
}

function setAssigned(i){
  document.getElementById(`assigned-contact${i}`).style = "background-color: #2A3647; color: white";
  document.getElementById(`checked${i}`).src ="/assets/img/icons/check_button_checked.png";
}


function setUnAssigned(i){
  document.getElementById(`assigned-contact${i}`).style = "color: black";;
  document.getElementById(`checked${i}`).src ="/assets/img/icons/check_button.png";;
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
 setItem('tasks', JSON.stringify(tasks));
  refreshTasks();
  renderTasks();
}

//Detail-Todo
function openTaskDetails(i){
  document.getElementById('overlay').style.display = "flex"; 
  document.getElementById('overlay').innerHTML = generateOverlay(i);
  setPrioDetailImg(i);
  checkOverlayCategory(i);
  renderDetailSubtasks(i);
  checkIfSubsDone(i);
  renderAssignedToDetail(i);
  slideOutOverlay(i);
}

//Slide IN OUT
function slideOutOverlay(i){
  var $slider = document.getElementById(`todo-card-detail${i}`);
  var $toggle = document.getElementById(`slide-out-toggle${i}`);
  
  $toggle.addEventListener('click', function() {
      var isOpen = $slider.classList.contains('slide-in');
  
      $slider.setAttribute('class', isOpen ? 'slide-out' +' '+ 'detail-todo-card' +' '+ 'slider'  : 'slide-in');
     setTimeout(()=>{closeDetailCard()},170); 
  });
}

function closeDetailCard(){
  document.getElementById('overlay').style.display = "none";
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

function renderDetailSubtasks(i){
  let detailSub = document.getElementById(`checklistSubDetail`);
  detailSub.innerHTML = '';

    for (let j = 0; j < tasks[i]["subtasks"].length; j++) {
      let subtask = tasks[i]["subtasks"][j];
      detailSub.innerHTML += generateDetailSubtasks(i, j, subtask);
    } // j = subtask index & i = task index
}

function checkIfSubChecked(j, i){
  let subtask = tasks[i]['subtasks'][j];
  let subTasksDone = tasks[i]['subTasksDone'][j];
  if(subTasksDone.checked == false){
    setChecked(j, i, subTasksDone)
  }else{
    setUnChecked(j, i, subTasksDone)
  }
  
  generateSubtasks(i, j);
  updateDoneSubs(i);
  setItem('tasks', JSON.stringify(tasks));
  refreshTasks();
  renderTasks();
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
  for (let j = 0; j < tasks[i]['subTasksDone'].length; j++) {
    const checkedSub = tasks[i]['subTasksDone'][j].checked;
    if(checkedSub == true){
      document.getElementById(`detailSub${j}`).src = '/assets/img/icons/check_button_checked_bl.png'
    }
  }
}

function openEditOverlay(i){
  loadTaskData(i);
  loadContacts();
}

function loadTaskData(i){
  let title = tasks[i]['title'];
  let description = tasks[i]['description'];
  let duedate = tasks[i]['duedate'];
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
    showAssignedEditors.innerHTML += generateAssignedTo(i, randomColor, checkedEditor);
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
      showAssignedEditors.innerHTML += generateAssignedTo(i, randomColor, checkedEditor);
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

function setPrio(i, newPrio, buttonColor){
  resetColors();
  tasks[i]['prio'] = newPrio;
  document.getElementById(newPrio).style.backgroundColor = buttonColor;
  document.getElementById(`${newPrio}-text`).style.color = "#FFFFFF";
}

function resetColors() {
  ['urgent', 'medium', 'low'].forEach(priority => {
    document.getElementById(priority).style.backgroundColor = "";
    document.getElementById(`${priority}-text`).style.color = "";
  });
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


function deleteTask(i){
  tasks.splice(i, 1);
  closeDetailCard();
  setItem('tasks', JSON.stringify(tasks));
  refreshTasks();
  renderTasks();
}


//SEARCH
function filterTasks() {
  let search = document.getElementById("search").value.toLowerCase();
  refreshTasks();
  if (search == "") {
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


function doNotClose(event){
  event.stopPropagation();
}