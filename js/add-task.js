selectedPriority = 'medium';
subtaskTempArray = [];
subtaskDoneTempArray = [];
contacts = [];
assignedToTempArray = [];


document.addEventListener('DOMContentLoaded', async function () {
  console.log('DOM loaded');
  await userIsAllowed();
  await generateHeader(userInitials);  
  await generateSidebar();
  addEventListener();
  loadUserContacts();
  loadTasksfromStorage();
});


async function loadUserContacts(){
  await loadUserData();
  sortContacts();
  loadContactList();
}


//LOAD Tasks from Storage
async function loadTasksfromStorage(){
  try{
    tasks = JSON.parse(await getItem('tasks'));
  }catch(e){
    console.warn('loading error:', e)
  }
}


//EVENT LISTENERS
function addEventListener() {
  btnEventListener();
}


function btnEventListener() {
  document.querySelectorAll('.add-task-form-btn').forEach(function (button) {
    button.addEventListener('click', function () {
      selectedPriority = this.getAttribute('task-priority');
      highlightSelectedButton(this); //TODO: highlightSelectedButton()
    });
  });
}


function addTask(event) {
  event.preventDefault();

  var taskData = {
    title: document.getElementById('add-task-title-input').value,
    description: document.getElementById('add-task-description-input').value,
    assignedTo: checkedArray,
    dueDate: document.getElementById('add-task-date-input').value,
    prio: selectedPriority,
    category: getCategoryValue(),
    subtasks: subtaskTempArray,
    subTasksDone: getSubTasksDone(),
    status: "in-progress",
  };
  console.log(taskData)
  tasks.push(taskData);
  saveTask();
}


function getCategoryValue() {
  var categoryDropdown = document.querySelector('.add-task-form-dropdown');
  if (categoryDropdown && categoryDropdown.selectedIndex >= 0) {
    return categoryDropdown.options[categoryDropdown.selectedIndex].value;
  } else {
    return null;
  }
}


function getSubTasksDone() {
  returnArray = [];
  subtaskTempArray.forEach(subtask => {
    subname = subtask;
    checked = false;
    temp = { subname, checked };
    returnArray.push(temp);
  });
  return returnArray;
};


function saveTask() {
  setItem('tasks', JSON.stringify(tasks));
  console.log("Task gespeichert");
}


// ADD TASK FUNCTIONS
function highlightSelectedButton(selectedButton) {
  var buttons = document.querySelectorAll('.add-task-form-btn');
  buttons.forEach(function (button) {
    button.classList.remove('selected');
  });
  selectedButton.classList.add('selected');
}


function showDropdownContacts() {
  let dropdown = document.getElementById('assigned-editors');
  let tooMuchEditors = document.getElementById(`tooMuchEditors`);
  if (dropdown.style.display == 'none') {
    dropdown.style.display = 'block';
    checkedArray = [];
    clearAssignedToAddOverlay();
    if(tooMuchEditors.style.display !== 'none'){
      tooMuchEditors.style.display = 'none';
    }
  } else {
    dropdown.style.display = 'none';
    addAssignedEditors();
  }
}


function addAssignedEditors() {
  let showAssignedEditors = document.getElementById('show-assigned-editors-container');
  let tooMuchEditors = document.getElementById('tooMuchEditors');

  for (let i = 0; i < contacts.length; i++) {
    const checkedEditor = contacts[i];
    let userColor = checkedEditor.userColor;
    let initials = checkedEditor.firstName.charAt(0) + checkedEditor.lastName.charAt(0);
    let checkbox = document.getElementById(`checkbox${i}`).checked;
    if (checkbox == true) {
      checkedArray.push(checkedEditor);
      if(checkedArray.length > 3){
        tooMuchEditors.style.display = 'flex';
        tooMuchEditors.innerHTML = `+${checkedArray.length - 3}`;
      }else {
        showAssignedEditors.innerHTML += `
        <div id="editor${i}" class="drop-initials" style="background-color: ${userColor}">${initials}</div>
        `;
      }
    }
  }
}


function doNotClose(event) {
  event.stopPropagation();
}


function checkIfAssigned(i) {
  let checkbox = document.getElementById(`checkbox${i}`).checked;

  if (checkbox == false) {
    setUnAssigned(i);
  }

  if (checkbox == true) {
    setAssigned(i);
  }
}


function clearAssignedToAddOverlay() {
  document.getElementById("show-assigned-editors-container").innerHTML = "";
}


//LOAD Contacts
function loadContactList() {
  let contactList = document.getElementById('assigned-editors');
  for (let i = 0; i < contacts.length; i++) {
      //let initials = contacts[i]['name'].split(" ").map((n)=>n[0]).join("");
      let contact = contacts[i];
      let initials = contact.firstName.charAt(0) + contact.lastName.charAt(0);
      let userColor = contact.userColor;
      let firstName = contact.firstName;
      let lastName = contact.lastName;
      let id = contact.userId;
      contactList.innerHTML += renderContacts(i, userColor, firstName, lastName, initials);
  }
    sortContacts();
}


function setAssigned(i){
  document.getElementById(`assigned-contact${i}`).style = "background-color: #2A3647; color: white";
  document.getElementById(`checked${i}`).src ="assets/img/check_checked.png";
}


function setUnAssigned(i){
  document.getElementById(`assigned-contact${i}`).style = "color: black";;
  document.getElementById(`checked${i}`).src ="assets/img/check_unchecked.png";
}


//ADD SUBTASK START
function activateCheckCancelButtons(){
  document.getElementById('add-task-active-subtask-icon-box').classList.remove('d-none');
  document.getElementById('add-task-create-subtask-icon-box').classList.add('d-none');
}


function clearSubtaskInput(){
  document.getElementById('add-task-subtask-input').value = '';
  document.getElementById('add-task-active-subtask-icon-box').classList.add('d-none');
  document.getElementById('add-task-create-subtask-icon-box').classList.remove('d-none');
}


function addSubtask(){
  let subtask = document.getElementById('add-task-subtask-input').value;
  if(subtask !== ''){
    subtaskTempArray.push(subtask);
    console.log(subtaskTempArray);
    renderSubtasks();
    clearSubtaskInput();
  }
}


function renderSubtasks(){
  let subtasksContainer = document.getElementById('add-task-subtasks-container');
  subtasksContainer.innerHTML = '';
  for (let i = 0; i < subtaskTempArray.length; i++) {
    const subtask = subtaskTempArray[i];
    subtasksContainer.innerHTML += `
    <div class="edit-subtask">
        
    <div onclick="editSubtask(${i})" class="subtask-list-item" id="editable-subtask${i}" onMouseOver="showIcons(${i})" onMouseOut="hideIcons(${i})">
        <span>• ${subtask}</span>            
        <div id="edit-task-active-subtask-icon-box${i}" class="edit-task-active-subtask-icon-box" style="opacity:0;" >                
        <img src="assets/img/subtask_edit_icon.png" alt="Check" onclick="editSubtask(${i})" />
        <div class="sub-divider"></div>
        <img src="assets/img/subtask_delete_icon.png" alt="Delete" onclick="deleteSubtask(${i})" />
    </div>


</div>
    <div id="editSubtaskContainer${i}"  style="display: none" class="edit-task-subtask-input-container">
      <input id="editSubtaskInput${i}" value="${subtask}" class="edit-subtask-input">    
        <div class="edit-task-active-subtask-icon-box">                
            <img src="assets/img/subtask_delete_icon.png" alt="Delete" onclick="deleteSubtask(${i})" />
            <div class="sub-divider"></div>
            <img src="assets/img/subtask_check_icon.png" alt="Check" onclick="changeSubtask(${i})" />
        </div>
    </div>
</div>
  `
  }
}


function editSubtask(i){
  if(!subtaskTempArray.length == 0){
    document.getElementById(`editable-subtask${i}`).style.display = "none";
    document.getElementById(`editSubtaskContainer${i}`).style.display ="flex";
  }
}


function deleteSubtask(i){
  subtaskTempArray.splice(i, 1)
  renderSubtasks();
  clearSubtaskInput();
}


function changeSubtask(i){
  let subtask = document.getElementById(`editSubtaskInput${i}`).value;
  if(subtask !== ''){
  subtaskTempArray[i] = document.getElementById(`editSubtaskInput${i}`).value;
  renderSubtasks();
  clearSubtaskInput();
  }
}


function createSubtasksDoneArray(){
  for (let i = 0; i < subtaskTempArray.length; i++) {
    const subtask = subtaskTempArray[i];
    let subtaskDoneJson = {
      subname: subtask, 
      checked: false
    }
    subtaskDoneTempArray.push(subtaskDoneJson);
    console.log(subtaskDoneJson)
  }
}


function showIcons(i){
  document.getElementById(`edit-task-active-subtask-icon-box${i}`).style.opacity = 1;
 }
 

 function hideIcons(i){
     document.getElementById(`edit-task-active-subtask-icon-box${i}`).style.opacity = 0;
 }
//ADD SUBTASK END