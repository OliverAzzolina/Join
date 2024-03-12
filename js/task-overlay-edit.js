/**
 * Opens the edit overlay for the task at the specified index.
 * @param {number} i - The index of the task to edit.
 */
function openEditOverlay(i) {
  loadTaskData(i);
  loadContactList();
}


/**
 * Loads task data into the edit overlay.
 * @param {number} i - The index of the task.
 */
function loadTaskData(i) {
  let title = tasks[i]["title"];
  let description = tasks[i]["description"];
  let dueDate = tasks[i]["dueDate"];
  document.getElementById("overlay").innerHTML = generateEditTaskOverlay(
    i,
    title,
    description,
    dueDate
  );
  showEditPrio(i);
  renderAssignedToEdit(i);
  renderEditSubtasks(i);
}


/**
 * Clears the assigned editors section in the edit overlay.
 * @param {number} index - The index of the task.
 */
function clearAssignedTo(index) {
  document.getElementById("show-assigned-editors-edit-container").innerHTML ="";
  tasks[index]["assignedTo"].splice(0, tasks[index]["assignedTo"].length);
}


/**
 * Renders the assigned editors section in the edit overlay.
 * @param {number} index - The index of the task.
 */
function renderAssignedToEdit(index){
  let assignedTo = document.getElementById(`show-assigned-editors-edit-container`);
  assignedTo.innerHTML = '';
    if(tasks[index]['assignedTo'].length > 3){
      checkIfToMuchEditorsEdit(assignedTo, index);
    }else {
      notToMuchEditorsEdit(assignedTo, index);
    }
  }


  /**
 * Checks if there are more than 3 assigned editors and renders them accordingly in the edit overlay.
 * @param {HTMLElement} assignedTo - The container element to render the assigned editors.
 * @param {number} index - The index of the task.
 */
  function checkIfToMuchEditorsEdit(assignedTo, index){
    for (let i = 0; i < 3; i++) {
      const checkedEditor = tasks[index]['assignedTo'][i];
      let initials = checkedEditor.initials;
      let userColor = checkedEditor.userColor;
      let tooMuchEditors = document.getElementById(`tooMuchEditorsEdit${index}`);
      tooMuchEditors.style.display = 'flex';
      tooMuchEditors.innerHTML = `+${tasks[index]['assignedTo'].length - 3}`;
    
      assignedTo.innerHTML += `
      <div id="mini-logo${i}" style="background-color: ${userColor}" class="mini-logo">${initials}</div>
      `;
    }
  }


  /**
 * Renders the assigned editors in the edit overlay when there are less than or equal to 3 assigned editors.
 * @param {HTMLElement} assignedTo - The container element to render the assigned editors.
 * @param {number} index - The index of the task.
 */
  function notToMuchEditorsEdit(assignedTo, index){
    for (let i = 0; i < tasks[index]['assignedTo'].length; i++) {
      const checkedEditor = tasks[index]['assignedTo'][i];
      let initials = checkedEditor.initials;
      let userColor = checkedEditor.userColor;
      assignedTo.innerHTML += `
      <div id="mini-logo${i}" style="background-color: ${userColor}" class="mini-logo">${initials}</div>
      `;
    }
  }


  /**
 * Saves the edited task details to the task array and updates the storage.
 * @param {number} i - The index of the task to be edited.
 */
function saveTask(i) {
  tasks[i]["title"] = document.getElementById("edit-task-title-input").value;
  tasks[i]["description"] = document.getElementById("edit-task-description-input").value;
  tasks[i]["dueDate"] = document.getElementById("edit-task-form-input").value;
  tasks[i]["prio"];
  tasks[i].assignedTo;
  tasks[i]["subtasks"];
  createSubtasksDoneArrayEditOverlay(i);
  tasks.push();
  setItem("tasks", JSON.stringify(tasks));
  loadTasksfromStorage();
  closeEditOverlay();
  init();
  openTaskDetails(i);
}


/**
 * Closes the edit task overlay.
 */
function closeEditOverlay() {
  document.getElementById("overlay").style.display = "none";
}


/**
 * Displays the priority of the task in the edit overlay.
 * @param {number} i - The index of the task.
 */
function showEditPrio(i) {
  let prio = tasks[i]["prio"];
  if (prio == "urgent") {
    document.getElementById(prio).style.backgroundColor = "#FF3D00";
    document.getElementById(`${prio}-text`).style.color = "#FFFFFF";
    document.getElementById(
      `${prio}-img-edit`
    ).src = `/assets/img/prio_${prio}_white_icon.png`;
  } else if (prio == "medium") {
    document.getElementById(prio).style.backgroundColor = "#FFA800";
    document.getElementById(`${prio}-text`).style.color = "#FFFFFF";
    document.getElementById(
      `${prio}-img-edit`
    ).src = `/assets/img/prio_${prio}_white_icon.png`;
  } else if (prio == "low") {
    document.getElementById(prio).style.backgroundColor = "#7AE229";
    document.getElementById(`${prio}-text`).style.color = "#FFFFFF";
    document.getElementById(
      `${prio}-img-edit`
    ).src = `/assets/img/prio_${prio}_white_icon.png`;
  }
}


/**
 * Sets the priority of the task and updates the UI accordingly.
 * @param {number} i - The index of the task.
 * @param {string} newPrio - The new priority value ('urgent', 'medium', or 'low').
 * @param {string} buttonColor - The background color for the priority button.
 */
function setPrio(i, newPrio, buttonColor) {
  resetColors();
  tasks[i]["prio"] = newPrio;
  document.getElementById(newPrio).style.backgroundColor = buttonColor;
  document.getElementById(`${newPrio}-text`).style.color = "#FFFFFF";
  document.getElementById(
    `${newPrio}-img-edit`
  ).src = `/assets/img/prio_${newPrio}_white_icon.png`;
}

/**
 * Resets the color and icon of priority buttons to their default state.
 */
function resetColors() {
  ["urgent", "medium", "low"].forEach((priority) => {
    document.getElementById(priority).style.backgroundColor = "";
    document.getElementById(`${priority}-text`).style.color = "";
    document.getElementById(
      `${priority}-img-edit`
    ).src = `/assets/img/prio_${priority}_icon.png`;
  });
}


/**
 * Renders the subtasks in the edit task overlay.
 * @param {number} index - The index of the task in the tasks array.
 */
function renderEditSubtasks(index) {
  let subtasksContainer = document.getElementById(
    "edit-task-subtasks-container"
  );
  subtasksContainer.innerHTML = "";
  for (let i = 0; i < tasks[index]["subtasks"].length; i++) {
    const subtask = tasks[index]["subtasks"][i];
    subtasksContainer.innerHTML += generateEditSubtasks(i, index, subtask);
  }
}


/**
 * Adds a new subtask to the task in the edit task overlay.
 * @param {number} i - The index of the task in the tasks array.
 */
function addSubtaskEditOverlay(i) {
  let subtask = document.getElementById("add-task-subtask-input").value;
  if(subtask  !== ''){
    tasks[i]["subtasks"].push(subtask);
    setItem("tasks", JSON.stringify(tasks));
    renderEditSubtasks(i);
    clearSubtaskInput(i);
  }
}


/**
 * Displays the input field for editing a subtask in the edit task overlay.
 * @param {number} i - The index of the subtask to edit.
 */
function editSubtaskEditOverlay(i, index) {
  if (!tasks[index]['subtasks'].length == 0) {
    document.getElementById(`editable-subtask${i}`).style.display = "none";
    document.getElementById(`editSubtaskContainer${i}`).style.display = "flex";
  }
}


/**
 * Deletes a subtask from the task being edited in the edit task overlay.
 * @param {number} i - The index of the subtask to delete.
 * @param {number} index - The index of the task being edited.
 */
function deleteSubtaskEditOverlay(i, index) {
  tasks[index]["subtasks"].splice(i, 1);
  tasks[index]["subTasksDone"].splice(i, 1);
  setItem("tasks", JSON.stringify(tasks));
  renderEditSubtasks(index);
  clearSubtaskInput();
  refreshTasks();
}


function changeSubtaskEditOverlay(i, index) {
  let subtask = document.getElementById(`editSubtaskInput${i}`).value;
  if(subtask !== ''){
  tasks[index]["subtasks"][i] = document.getElementById(`editSubtaskInput${i}`).value;
  tasks[index]["subTasksDone"][i] = document.getElementById(`editSubtaskInput${i}`).value;
  setItem("tasks", JSON.stringify(tasks));
  renderEditSubtasks(index);
  clearSubtaskInput();
  }
}


/**
 * Changes the content of a subtask in the task being edited in the edit task overlay.
 * @param {number} i - The index of the subtask to change.
 * @param {number} index - The index of the task being edited.
 */
function createSubtasksDoneArrayEditOverlay(index) {
  tasks[index]["subTasksDone"].splice(0, tasks[index]["subTasksDone"].length);
  for (let i = 0; i < tasks[index]["subtasks"].length; i++) {
    const subtask = tasks[index]["subtasks"][i];
    let subtaskDoneJson = {
      subname: subtask,
      checked: false,
    };
    tasks[index]["subTasksDone"].push(subtaskDoneJson);
  }
}


/**
 * Displays the icons for editing and deleting a subtask when hovering over the subtask item.
 * @param {number} i - The index of the subtask item.
 */
function showIcons(i) {
  document.getElementById(
    `edit-task-active-subtask-icon-box${i}`
  ).style.opacity = 1;
}


/**
 * Hides the icons for editing and deleting a subtask when not hovering over the subtask item.
 * @param {number} i - The index of the subtask item.
 */
function hideIcons(i) {
  document.getElementById(
    `edit-task-active-subtask-icon-box${i}`
  ).style.opacity = 0;
}


/**
 * Opens the change task status popup with options to change the task status.
 * If the popup is already open, it closes it.
 * @param {number} i - The index of the task.
 */
function openChangeTaskPopup(i) {
  changeTaskButtons = document.getElementById("change-task-buttons");
  if (changeTaskButtons.innerHTML == "") {
    changeTaskButtons.innerHTML = ` <button class="change-task-status-button" onclick="changeTask(${i}, 'open')">To Do</button>
        <button class="change-task-status-button" onclick="changeTask(${i}, 'in-progress')">In Progress</button>
        <button class="change-task-status-button" onclick="changeTask(${i}, 'await-feedback')">Await Feedback</button>
        <button class="change-task-status-button" onclick="changeTask(${i}, 'done')">Done</button>`;
  } else {
    changeTaskButtons.innerHTML = "";
  }
}


/**
 * Changes the status of the task at the specified index to the new status provided.
 * Closes the change task status popup after changing the status.
 * @param {number} i - The index of the task.
 * @param {string} newStatus - The new status to set for the task.
 */
function changeTask(i, newStatus) {
  changeTaskButtons.innerHTML = "";
  tasks[i]["status"] = newStatus;
  setItem("tasks", JSON.stringify(tasks));
  refreshTasks();
  renderTasks();
}