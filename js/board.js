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
    console.log('tasks loaded from storage', tasks)
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
      //let initials = contacts[i]['name'].split(" ").map((n)=>n[0]).join("");
      let initials = getInitials(contacts[i]['firstName'], contacts[i]['lastName'])
      let randomColor = '#' + contacts[i]['randomColor'];
      let name = contacts[i]['name'];
      contactList.innerHTML += renderContacts(i, randomColor, name, initials);
  }
    sortContacts();
}

function getInitials(firstName, lastName) {
  return firstName.slice[0] + lastName.slice[1];
}


function renderTasks() {
  refreshTasks();
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
  document.getElementById(`checked${i}`).src ="assets/img/check_checked.png";
}


function setUnAssigned(i){
  document.getElementById(`assigned-contact${i}`).style = "color: black";;
  document.getElementById(`checked${i}`).src ="assets/img/check_unchecked.png";
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
  prioImg.src =`/assets/img/prio_${prio}_icon.png`;
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
 console.log(currentDraggedElement)
 showDragHereContainer();
}


function showDragHereContainer(){
  let dragContainer = document.getElementsByClassName('drag-here-container');
  for (let i = 0; i < dragContainer.length; i++) {
      const element = dragContainer[i];
      element.style.display = 'flex';
    }
}


function hideDragHereContainer(){
  let dragContainer = document.getElementsByClassName('drag-here-container');
  for (let i = 0; i < dragContainer.length; i++) {
      const element = dragContainer[i];
      element.style.display = 'none'
    }
}


function allowDrop(ev){
  ev.preventDefault();
}


function moveTo(status){
  hideDragHereContainer();
  console.log(status);
  tasks[currentDraggedElement]['status'] = status;
  setItem('tasks', JSON.stringify(tasks));
  refreshTasks();
  renderTasks();
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
    button.setAttribute('src', 'assets/img/edit_hover_icon.png');
  }else
  if(id == 'delete-img'){
    button.setAttribute('src', 'assets/img/delete_hover_icon.png');
  }else{
    document.getElementById(id).setAttribute('src', 'assets/img/plus_hover_icon.png');
  }
}


function unhover(id){
  let button = document.getElementById(id);
  if(id == 'edit-img'){
    button.setAttribute('src', 'assets/img/edit_icon.png');
  }else
  if(id == 'delete-img'){
    button.setAttribute('src', 'assets/img/delete_icon.png');
  }else{
    document.getElementById(id).setAttribute('src', 'assets/img/plus_icon.png');
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