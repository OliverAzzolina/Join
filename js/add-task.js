selectedPriority = '';
subtaskTempArray = [];

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM loaded');
  generateHeader();
  generateSidebar();
  addEventListener();
  loadContactsFromStorage();
  loadTasksfromStorage();
});


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
  var input = document.getElementById("add-task-subtask-input");

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
    <img src="img/subtask delete icon.png" class="delete-icon" onclick="attemptRemoveSubtask('${subtaskElement.id}', true)">
    <img src="img/subtask divider icon.png">
    <img src="img/subtask check icon.png" class="check-icon" onclick="finishEditing('${subtaskElement.id}')">
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
    <img src="img/subtask edit icon.png" class="edit-icon" onclick="editSubtask('${subtaskElement.id}')">
    <img src="img/subtask divider icon.png">
    <img src="img/subtask delete icon.png" class="delete-icon" onclick="removeSubtask('${subtaskElement.id}')">
  `;
}



function addTask(event) {
  event.preventDefault();

  var taskData = {
    title: document.getElementById('add-task-title-input').value,
    description: document.getElementById('add-task-description-input').value,
    assignedto: [],
    duedate: document.getElementById('add-task-date-input').value,
    prio: selectedPriority,
    category: getCategoryValue(),
    subtasks: subtaskTempArray,
    subTasksDone: getSubTasksDone(),
    status: "in-progress",
  };
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


//LOAD Storage
async function loadContactsFromStorage() {
  try {
    contacts = JSON.parse(await getItem('contacts'));
  } catch (e) {
    console.warn('loading error:', e)
  }
  sortContacts();
  loadContacts();
}

//SORT Contacts
function sortContacts() {
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

function showDropdownContacts() {
  let dropdown = document.getElementById('assigned-editors');
  if (dropdown.style.display == 'none') {
    dropdown.style.display = 'block';
  } else {
    dropdown.style.display = 'none';
  }
}


function showDropdownContacts() {
  let dropdown = document.getElementById('assigned-editors');
  if (dropdown.style.display == 'none') {
    dropdown.style.display = 'block';
    clearAssignedTo();
  } else {
    dropdown.style.display = 'none';
    addAssignedEditors();
  }
}


function addAssignedEditors() {
  let showAssignedEditors = document.getElementById('show-assigned-editors-container');
  for (let i = 0; i < contacts.length; i++) {
    const checkedEditor = contacts[i];
    let randomColor = '#' + checkedEditor['randomColor'];
    let initials = checkedEditor['name'].split(" ").map((n) => n[0]).join("");
    let checkbox = document.getElementById(`checkbox${i}`).checked;
    if (checkbox == true) {
      showAssignedEditors.innerHTML += `
      <div id="editor${i}" class="drop-initials" style="background-color: ${randomColor}">${initials}</div>
      `;
    }
  }
}


function clearAssignedTo() {
  document.getElementById('show-assigned-editors-container').innerHTML = '';
}


function setUnAssigned(i) {
  let assignedContact = document.getElementById(`assigned-contact${i}`);
  let checkImg = document.getElementById(`checked${i}`);
  assignedContact.style = "color: black";
  checkImg.src = "/assets/img/icons/check_button.png";
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


//LOAD Contacts
function loadContacts() {
  let contactList = document.getElementById('assigned-editors');
  for (let i = 0; i < contacts.length; i++) {
    let initials = contacts[i]['name'].split(" ").map((n) => n[0]).join("");
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

function setAssigned(i) {
  let assignedContact = document.getElementById(`assigned-contact${i}`);
  let checkImg = document.getElementById(`checked${i}`);
  assignedContact.style = "background-color: #2A3647; color: white; border-radius: 10px"
  checkImg.src = "/assets/img/icons/check_button_checked.png";
}