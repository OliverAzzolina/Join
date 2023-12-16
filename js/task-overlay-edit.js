//EDIT TASK START
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
    renderAssignedToEdit(i);
    renderEditSubtasks(i);
}


function clearAssignedTo(index){
    document.getElementById('show-assigned-editors-edit-container').innerHTML = '';
    tasks[index]['assignedto'].splice(0, tasks[index]['assignedto'].length);
}


function renderAssignedToEdit(index){
    let showAssignedEditors = document.getElementById('show-assigned-editors-edit-container');
  
    for (let i = 0; i < tasks[index]['assignedto'].length; i++) {
        const checkedEditor = tasks[index]['assignedto'][i]['initials'];
        let randomColor = tasks[index]['assignedto'][i]['randomColor'];
        showAssignedEditors.innerHTML += generateAssignedTo(i, randomColor, checkedEditor);
    }
}


function saveTask(i){
    refreshTasks();
    tasks[i]['title'] = document.getElementById('edit-task-title-input').value;
    tasks[i]['description'] = document.getElementById('edit-task-description-input').value;
    tasks[i]['duedate'] = document.getElementById('edit-task-form-input').value;
    tasks[i]['prio'];
    tasks[i]['assignedTo'];
    tasks[i]['subtasks'];
    createSubtasksDoneArrayEditOverlay(i);
    tasks.push();
    setItem('tasks', JSON.stringify(tasks));
    loadTasksfromStorage();
    closeEditOverlay();
}


function closeEditOverlay(){
    document.getElementById('overlay').style.display = "none";
}
//EDIT TASK END


//PRIO START
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
//PRIO END


//SUBTASKS START
function renderEditSubtasks(index){
        let subtasksContainer = document.getElementById('edit-task-subtasks-container');
        subtasksContainer.innerHTML = '';
        for (let i = 0; i < tasks[index]['subtasks'].length; i++) {
          const subtask = tasks[index]['subtasks'][i];
          subtasksContainer.innerHTML += `
          <div class="edit-subtask">
            <li onclick="editSubtask(${i})" id="editable-subtask${i}">${subtask}</li>
      
            <div id="editSubtaskContainer${i}"  style="display: none" class="edit-task-subtask-input-container">
              <input id="editSubtaskInput${i}" value="${subtask}" class="add-task-form-input">    
              <div class="edit-task-active-subtask-icon-box">                
                <img src="img/subtask delete icon.png" alt="Delete" onclick="deleteSubtaskEditOverlay(${i}, ${index})" />
                <img src="img/subtask divider icon.png" alt="Divider" />
                <img src="img/subtask check icon.png" alt="Check" onclick="changeSubtaskEditOverlay(${i}, ${index})" />
              </div>
            </div>
            </div>
          `
        }
}


function addSubtaskEditOverlay(i){
    let subtask = document.getElementById('add-task-subtask-input').value;
    tasks[i]['subtasks'].push(subtask);
    setItem('tasks', JSON.stringify(tasks));
    renderEditSubtasks(i);
    clearSubtaskInput(i);
}


function editSubtask(i){
    document.getElementById(`editable-subtask${i}`).style.display = "none";
    document.getElementById(`editSubtaskContainer${i}`).style.display ="flex";
}

  
function deleteSubtaskEditOverlay(i, index){
    tasks[index]['subtasks'].splice(i, 1);
    tasks[index]['subTasksDone'].splice(i, 1);
    setItem('tasks', JSON.stringify(tasks));
    renderEditSubtasks(index);
    clearSubtaskInput();
    refreshTasks();
}

  
function changeSubtaskEditOverlay(i, index){
    tasks[index]['subtasks'][i] = document.getElementById(`editSubtaskInput${i}`).value;
    tasks[index]['subTasksDone'][i]['subname'] = document.getElementById(`editSubtaskInput${i}`).value;
    setItem('tasks', JSON.stringify(tasks));
    renderEditSubtasks(index);
    clearSubtaskInput();
}


function createSubtasksDoneArrayEditOverlay(index){
    tasks[index]['subTasksDone'].splice(0, tasks[index]['subTasksDone'].length)
    for (let i = 0; i < tasks[index]['subtasks'].length; i++) {
      const subtask = tasks[index]['subtasks'][i];
      let subtaskDoneJson = {
        subname: subtask, 
        checked: false
      }
      tasks[index]['subTasksDone'].push(subtaskDoneJson);
    }
}
//SUBTASKS START