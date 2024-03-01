//EDIT TASK START
function openEditOverlay(i) {
  loadTaskData(i);
  loadContactList();
}

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

function clearAssignedTo(index) {
  document.getElementById("show-assigned-editors-edit-container").innerHTML ="";
  tasks[index]["assignedTo"].splice(0, tasks[index]["assignedTo"].length);
}


function renderAssignedToEdit(index){
  let assignedTo = document.getElementById(`show-assigned-editors-edit-container`);
  assignedTo.innerHTML = '';
    if(tasks[index]['assignedTo'].length > 3){
      checkIfToMuchEditorsEdit(assignedTo, index);
    }else {
      notToMuchEditorsEdit(assignedTo, index);
    }
  }


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


function closeEditOverlay() {
  document.getElementById("overlay").style.display = "none";
}
//EDIT TASK END


//PRIO START
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

function setPrio(i, newPrio, buttonColor) {
  resetColors();
  tasks[i]["prio"] = newPrio;
  document.getElementById(newPrio).style.backgroundColor = buttonColor;
  document.getElementById(`${newPrio}-text`).style.color = "#FFFFFF";
  document.getElementById(
    `${newPrio}-img-edit`
  ).src = `/assets/img/prio_${newPrio}_white_icon.png`;
}

function resetColors() {
  ["urgent", "medium", "low"].forEach((priority) => {
    document.getElementById(priority).style.backgroundColor = "";
    document.getElementById(`${priority}-text`).style.color = "";
    document.getElementById(
      `${priority}-img-edit`
    ).src = `/assets/img/prio_${priority}_icon.png`;
  });
}
//PRIO END

//SUBTASKS START
function renderEditSubtasks(index) {
  let subtasksContainer = document.getElementById(
    "edit-task-subtasks-container"
  );
  subtasksContainer.innerHTML = "";
  for (let i = 0; i < tasks[index]["subtasks"].length; i++) {
    const subtask = tasks[index]["subtasks"][i];
    subtasksContainer.innerHTML += `
        <div class="edit-subtask">
        
            <div onclick="editSubtaskEditOverlay(${i})" class="subtask-list-item" id="editable-subtask${i}" onMouseOver="showIcons(${i})" onMouseOut="hideIcons(${i})">
                <span>• ${subtask}</span>            
                <div id="edit-task-active-subtask-icon-box${i}" class="edit-task-active-subtask-icon-box" style="opacity:0;" >                
                <img src="assets/img/subtask_edit_icon.png" alt="" onclick="editSubtaskEditOverlay(${i})" />
                <div class="sub-divider"></div>
                <img src="assets/img/subtask_delete_icon.png" alt="Delete" onclick="deleteSubtaskEditOverlay(${i}, ${index})" />
            </div>
       

        </div>
            <div id="editSubtaskContainer${i}"  style="display: none" class="edit-task-subtask-input-container">
              <input id="editSubtaskInput${i}" value="${subtask}" class="edit-subtask-input">    
                <div class="edit-task-active-subtask-icon-box">                
                    <img src="assets/img/subtask_delete_icon.png" alt="Delete" onclick="deleteSubtaskEditOverlay(${i}, ${index})" />
                    <div class="sub-divider"></div>
                    <img src="assets/img/subtask_check_icon.png" alt="Check" onclick="changeSubtaskEditOverlay(${i}, ${index})" />
                </div>
            </div>
        </div>
          `;
  }
}

function addSubtaskEditOverlay(i) {
  let subtask = document.getElementById("add-task-subtask-input").value;
  if(subtask  !== ''){
    tasks[i]["subtasks"].push(subtask);
    setItem("tasks", JSON.stringify(tasks));
    renderEditSubtasks(i);
    clearSubtaskInput(i);
  }
}

function editSubtaskEditOverlay(i) {
  if (!tasks[i]['subtasks'].length == 0) {
    document.getElementById(`editable-subtask${i}`).style.display = "none";
    document.getElementById(`editSubtaskContainer${i}`).style.display = "flex";
  }
}

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
  tasks[index]["subTasksDone"][i]["subname"] = document.getElementById(`editSubtaskInput${i}`).value;
  setItem("tasks", JSON.stringify(tasks));
  renderEditSubtasks(index);
  clearSubtaskInput();
  }
}

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
//SUBTASKS END

//CHANGE TASK START
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

function changeTask(i, newStatus) {
  changeTaskButtons.innerHTML = "";
  tasks[i]["status"] = newStatus;
  setItem("tasks", JSON.stringify(tasks));
  refreshTasks();
  renderTasks();
}

//CHANGE TASK END
