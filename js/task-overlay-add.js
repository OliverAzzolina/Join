let temporaryAssignedTo = [];
let newTaskPrio = "medium";
let temporarySubtasks = [];
let temporarySubtasksDone = [];

//LOAD CONTACTS START
function loadContactsForAddOverlay() {
  let contactList = document.getElementById("add-assigned-editors");
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    let initials = contact.firstName.charAt(0) + contact.lastName.charAt(0);
    let userColor = contact.userColor;
    let firstName = contact.firstName;
    let lastName = contact.lastName;
    contactList.innerHTML += renderContacts(
      i,
      userColor,
      firstName,
      lastName,
      initials
    );
  }
  sortContacts();
}
//LOAD CONTACTS END

//ADD NEW TASK START
function openAddTaskCard() {
  document.getElementById("add-task-overlay").style.display = "flex";
  loadContactsForAddOverlay();
}

function addNewTask() {
  let newTask = {
    title: document.getElementById("add-task-title-input").value,
    description: document.getElementById("add-task-description-input").value,
    assignedTo: checkedArray,
    dueDate: document.getElementById("add-task-date-input").value,
    prio: newTaskPrio,
    category: document.getElementById("add-new-task-category").value,
    status: "open",
    subtasks: temporarySubtasks,
    subTasksDone: temporarySubtasksDone,
  };
  createSubtasksDoneArray();
  saveNewAddedTask(newTask);
}

function saveNewAddedTask(newTask) {
  tasks.push(newTask);
  console.log(newTask, tasks);
  temporaryAssignedTo = [];
  newTaskPrio = "";
  showAddedToBoardMessage();
  hideAddedToBoardMessage();
  setItem("tasks", JSON.stringify(tasks));
}

function showAddedToBoardMessage() {
  document.getElementById("added-task-message").style.display = "flex";
}

function hideAddedToBoardMessage() {
  setTimeout(() => {
    document.getElementById("added-task-message").style.display = "none";
    closeAddTaskCard();
    refreshTasks();
    renderTasks();
  }, "2000");
}

function closeAddTaskCard() {
  temporarySubtasks = [];
  document.getElementById("add-task-subtasks-container").innerHTML = "";
  document.getElementById("add-assigned-editors").innerHTML = "";
  document.getElementById("add-task-overlay").style.display = "none";
}
//ADD NEW TASK END

//ASSIGN CONTACTS START
function showDropdownContactsAddOverlay() {
  let dropdown = document.getElementById("add-assigned-editors");
  if (dropdown.style.display == "none") {
    let tooMuchEditors = document.getElementById('tooMuchEditors');
    if(tooMuchEditors.style.display !== 'none'){
      tooMuchEditors.style.display = 'none';
    }
    dropdown.style.display = "block";
    checkedArray = [];
    clearAssignedToAddOverlay();
  } else {
    dropdown.style.display = "none";
    addAssignedEditorsAddOverlay();
  }
}

function addAssignedEditorsAddOverlay() {
  for (let i = 0; i < contacts.length; i++) {
    const checkedEditor = contacts[i];
    checkIfContactCheckboxChecked(checkedEditor, i);
  }
}

function checkIfContactCheckboxChecked(checkedEditor, i) {
  let checkbox = document.getElementById(`checkbox${i}`).checked;
  let showAssignedEditors = document.getElementById( "show-assigned-editors-container");
  let tooMuchEditors = document.getElementById('tooMuchEditors');
  let userColor = checkedEditor.userColor;
  let initials = checkedEditor.firstName.charAt(0) + checkedEditor.lastName.charAt(0);

  if (checkbox == true) {
    checkedArray.push(checkedEditor);
    if(checkedArray.length > 3){
      tooMuchEditors.style.display = 'flex';
      tooMuchEditors.innerHTML = `+${checkedArray.length - 3}`;
    }else {
      showAssignedEditors.innerHTML += `<div id="editor${i}" class="drop-initials" style="background-color: ${userColor}">${initials}</div>`;
    }
}
}

//function pushAssignedToAddOverlay(initials, userColor, firstName, lastName, userId) {
//  let assignedToTask = {
//    firstName: firstName,
//    lastName: lastName,
//    initials: initials,
//    userColor: userColor,
//    userId: userId,
//  };
//  temporaryAssignedTo.push(assignedToTask);
//}

//function renderAssignedTo(index) {
//  let assignedTo = document.getElementById(`todo-assigned-to${index}`);
//  assignedTo.innerHTML = "";
//
//  for (let i = 0; i < tasks[index]["assignedTo"].length; i++) {
//    const checkedEditor = contacts[i];
//    let initials = checkedEditor.initials;
//    let userColor = checkedEditor.userColor;
//    assignedTo.innerHTML += `
//      <div id="mini-logo${i}" style="background-color: ${userColor}" class="mini-logo">${initials}</div>
//      `;
//  }
//}

function clearAssignedToAddOverlay() {
  document.getElementById("show-assigned-editors-container").innerHTML = "";
}
//ASSIGN CONTACTS END

//SET PRIORITY START
function setNewTaskPrio(newPrio, buttonColor) {
  newTaskPrio = newPrio;
  resetPrioColors();
  document.getElementById(newPrio).style.backgroundColor = buttonColor;
  document.getElementById(`${newPrio}-text-add`).style.color = "#FFFFFF";
  document.getElementById(
    `${newPrio}-img-add`
  ).src = `/assets/img/prio_${newPrio}_white_icon.png`;
}

function resetPrioColors() {
  ["urgent", "medium", "low"].forEach((priority) => {
    document.getElementById(priority).style.backgroundColor = "";
    document.getElementById(`${priority}-text-add`).style.color = "";
    document.getElementById(
      `${priority}-img-add`
    ).src = `/assets/img/prio_${priority}_icon.png`;
  });
}
////SET PRIORITY END

//ADD SUBTASK START
function activateCheckCancelButtons() {
  document
    .getElementById("add-task-active-subtask-icon-box")
    .classList.remove("d-none");
  document
    .getElementById("add-task-create-subtask-icon-box")
    .classList.add("d-none");
}

function clearSubtaskInput() {
  document.getElementById("add-task-subtask-input").value = "";
  document
    .getElementById("add-task-active-subtask-icon-box")
    .classList.add("d-none");
  document
    .getElementById("add-task-create-subtask-icon-box")
    .classList.remove("d-none");
}

function addSubtask() {
  let subtask = document.getElementById("add-task-subtask-input").value;
  if(subtask !== ''){
    temporarySubtasks.push(subtask);
    console.log(temporarySubtasks);
    renderSubtasks();
    clearSubtaskInput();
  }
}

function renderSubtasks() {
  let subtasksContainer = document.getElementById(
    "add-task-subtasks-container"
  );
  subtasksContainer.innerHTML = "";
  for (let i = 0; i < temporarySubtasks.length; i++) {
    const subtask = temporarySubtasks[i];
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
  `;
  }
}

function editSubtask(i) {
  if (!temporarySubtasks.length == 0) {
    document.getElementById(`editable-subtask${i}`).style.display = "none";
    document.getElementById(`editSubtaskContainer${i}`).style.display = "flex";
  }
}

function deleteSubtask(i) {
  temporarySubtasks.splice(i, 1);
  renderSubtasks();
  clearSubtaskInput();
}

function changeSubtask(i) {
  let subtask = document.getElementById(`editSubtaskInput${i}`).value;
  if(subtask !== ''){
    temporarySubtasks[i] = document.getElementById(`editSubtaskInput${i}`).value;
    renderSubtasks();
    clearSubtaskInput();
  }
}

function createSubtasksDoneArray() {
  for (let i = 0; i < temporarySubtasks.length; i++) {
    const subtask = temporarySubtasks[i];
    let subtaskDoneJson = {
      subname: subtask,
      checked: false,
    };
    temporarySubtasksDone.push(subtaskDoneJson);
    console.log(subtaskDoneJson);
  }
}

function showIcons(i) {
  document.getElementById(
    `edit-task-active-subtask-icon-box${i}`
  ).style.opacity = 1;
}

function hideIcons(i) {
  document.getElementById(
    `edit-task-active-subtask-icon-box${i}`
  ).style.opacity = 0;
}
//ADD SUBTASK END
