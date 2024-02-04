selectedPriority = 'medium';
subtaskTempArray = [];
subtaskDoneTempArray = [];
contacts = [];
assignedToTempArray = [];

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM loaded');
  generateHeader();
  generateSidebar();
  addEventListener();
  loadUserContacts();

  loadTasksfromStorage();
});

async function loadUserContacts(){
await loadUserData();
loadContactList();
}

//HTML GENERATION
function generateHeader() {
  let header = document.getElementById('header-container');
  header.innerHTML = headerHTML();
}

function generateSidebar() {
  let sidebar = document.getElementById('sidebar-container');
  sidebar.innerHTML = sidebarHTML();
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
  subtaskInputEventListener();
  subtaskInputKeypressEventListener();
}

function btnEventListener() {
  document.querySelectorAll('.add-task-form-btn').forEach(function (button) {
    button.addEventListener('click', function () {
      selectedPriority = this.getAttribute('task-priority');
      highlightSelectedButton(this); //TODO: highlightSelectedButton()
    });
  });
}

function subtaskInputEventListener() {
  input = document.getElementById("add-task-subtask-input");
  icons = document.getElementById("add-task-create-subtask-icon-box");
  activeIcons = document.getElementById("add-task-active-subtask-icon-box");
  input.addEventListener('input', function () {
    if (input.value.length > 0) {
      icons.classList.add("d-none");
      activeIcons.classList.remove("d-none");
    } else {
      icons.classList.remove("d-none");
      activeIcons.classList.add("d-none");
    }
  })
}

function subtaskInputKeypressEventListener() {
  let input = document.getElementById("add-task-subtask-input");

  input.addEventListener('keypress', function (event) {
    if (event.key === 'Enter' && input.value.length > 0) {
      event.preventDefault();
      addSubtask();
    }
  });
}


function updateSubtaskListeners() {
  var subtaskElements = document.querySelectorAll('.add-task-subtask');

  subtaskElements.forEach(function (subtaskElement) {
    var icons = subtaskElement.querySelector('.add-task-subtask-icons');

    subtaskElement.addEventListener('mouseover', function () {
      icons.style.opacity = 1;
    });

    subtaskElement.addEventListener('mouseout', function () {
      icons.style.opacity = 0;
    });
  });
}



// SUBTASKS FUNCTIONS

function setFocusSubtaskInput() {
  input = document.getElementById("add-task-subtask-input");
  input.focus();
}


function clearSubtaskInput() {
  input = document.getElementById("add-task-subtask-input");
  icons = document.getElementById("add-task-create-subtask-icon-box");
  activeIcons = document.getElementById("add-task-active-subtask-icon-box");

  input.value = '';
  icons.classList.remove("d-none");
  activeIcons.classList.add("d-none");
  setFocusSubtaskInput();
}


function addSubtask() {
  var input = document.getElementById("add-task-subtask-input");
  var subtaskContainer = document.getElementById("add-task-subtasks-container");
  subtaskTempArray.push(input.value);
  clearSubtaskInput();
  subtaskContainer.innerHTML = '';
  subtaskTempArray.forEach((subtask, index) => {
    subtaskContainer.innerHTML += subtaskHTML(subtask, index);
  });
  setupEditableP(subtaskContainer);
  updateSubtaskListeners();
}

function removeSubtask(index) {
  var subtaskContainer = document.getElementById("add-task-subtasks-container");
  subtaskTempArray.splice(index, 1)
  subtaskContainer.innerHTML = '';
  subtaskTempArray.forEach((subtask, index) => {
    subtaskContainer.innerHTML += subtaskHTML(subtask, index);
  });
  setupEditableP(subtaskContainer);
}

function generateSubtaskElement(subtask, index) {
  let subtaskContainer = document.getElementById("add-task-subtasks-container");
  subtaskContainer.innerHTML = "";
  subtaskContainer.innerHTML += subtaskHTML(subtask, index)
}



// EDIT SUBTASKS !!!WIP!!!
function editSubtask(subtaskId) {
  var subtaskElement = document.getElementById(subtaskId);
  if (subtaskElement) {
    var editableP = subtaskElement.querySelector('.editable');
    if (editableP) {
      convertPToInput(subtaskElement);
    }
  }
}


function setupEditableP(container) {
  container.addEventListener('dblclick', function (event) {
    var subtaskElement = event.target.closest('.add-task-subtask');
    if (subtaskElement && subtaskElement.querySelector('.editable')) {
      convertPToInput(subtaskElement);
    }
  });
}

function convertPToInput(subtaskElement) {
  var editableP = subtaskElement.querySelector('.editable');
  var inputField = createInputField(editableP.innerText);
  setupInputFieldEvents(inputField, subtaskElement);
  editableP.parentNode.replaceChild(inputField, editableP);
  inputField.focus();
  updateIconsToEditing(subtaskElement);
}

function createInputField(text) {
  var inputField = document.createElement("input");
  inputField.type = "text";
  inputField.value = text.replace('• ', '');
  inputField.className = "editable-input";
  return inputField;
}

function setupInputFieldEvents(inputField, subtaskElement) {
  inputField.addEventListener("blur", function () {
    convertInputToP(inputField, subtaskElement);
  });
  inputField.addEventListener("keypress", function (event) {
    if (event.key === 'Enter') {
      inputField.blur();
    }
  });
}

function convertInputToP(inputElement, subtaskElement) {
  var newP = createPElement(inputElement.value);
  inputElement.parentNode.replaceChild(newP, inputElement);
  updateIconsToNormal(subtaskElement);
}

function createPElement(text) {
  var newP = document.createElement("p");
  newP.innerText = '• ' + text;
  newP.classList.add("editable");
  return newP;
}

function updateIconsToEditing(subtaskElement) {
  var iconsContainer = subtaskElement.querySelector('.add-task-subtask-icons');
  iconsContainer.innerHTML = `
    <img src="assets/img/subtask_delete_icon.png" class="delete-icon" onclick="attemptRemoveSubtask('${subtaskElement.id}', true)">
    <img src="assets/img/subtask_divider.png">
    <img src="assets/img/subtask_check_ icon.png" class="check-icon" onclick="finishEditing('${subtaskElement.id}')">
  `;
}

function attemptRemoveSubtask(subtaskId, isEditing) {
  if (isEditing) {
    // Beende den Edit-Mode, bevor der Subtask gelöscht wird
    var subtaskElement = document.getElementById(subtaskId);
    if (subtaskElement.querySelector('.editable-input')) {
      var inputElement = subtaskElement.querySelector('.editable-input');
      convertInputToP(inputElement, subtaskElement);
    }
  }
  removeSubtask(subtaskId); // Aufruf der ursprünglichen Löschfunktion
}

function updateIconsToNormal(subtaskElement) {
  var iconsContainer = subtaskElement.querySelector('.add-task-subtask-icons');
  iconsContainer.innerHTML = `
    <img src="assets/img/subtask_edit_icon.png" class="edit-icon" onclick="editSubtask('${subtaskElement.id}')">
    <img src="assets/img/subtask_divider.png">
    <img src="assets/img/subtask_delete_icon.png" class="delete-icon" onclick="removeSubtask('${subtaskElement.id}')">
  `;
}

function addTask(event) {
  event.preventDefault();

  var taskData = {
    title: document.getElementById('add-task-title-input').value,
    description: document.getElementById('add-task-description-input').value,
    assignedto: assignedToTempArray,
    duedate: document.getElementById('add-task-date-input').value,
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
  if (dropdown.style.display == 'none') {
    dropdown.style.display = 'block';
    clearAssignedToAddOverlay();
  } else {
    dropdown.style.display = 'none';
    addAssignedEditors();
  }
}


function addAssignedEditors() {
  let showAssignedEditors = document.getElementById('show-assigned-editors-container');
  for (let i = 0; i < contacts.length; i++) {
    const checkedEditor = contacts[i];
    let userId = checkedEditor.userId;
    let userColor = checkedEditor.userColor;
    let firstName = checkedEditor.firstName;
    let lastName = checkedEditor.lastName;
    let initials = checkedEditor.firstName.charAt(0) + checkedEditor.lastName.charAt(0);
    let checkbox = document.getElementById(`checkbox${i}`).checked;
    if (checkbox == true) {
      showAssignedEditors.innerHTML += `
      <div id="editor${i}" class="drop-initials" style="background-color: ${userColor}">${initials}</div>
      `;
      pushAssignedToAdd(userId, initials, userColor, firstName, lastName)
    }
  }
}


function pushAssignedToAdd(userId, initials, userColor, firstName, lastName) {
  let assignedToTask = {
    userId: userId,
    firstName: firstName,
    lastName: lastName,
    initials: initials,
    userColor: userColor,
  };
  assignedToTempArray.push(assignedToTask);
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
  subtaskTempArray.push(subtask);
  console.log(subtaskTempArray);
  renderSubtasks();
  clearSubtaskInput();
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
  subtaskTempArray[i] = document.getElementById(`editSubtaskInput${i}`).value;
  renderSubtasks();
  clearSubtaskInput();
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