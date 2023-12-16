let temporaryAssignedTo = [];
let newTaskPrio;
let temporarySubtasks = [];
let temporarySubtasksDone = [];

//LOAD CONTACTS START
function loadContactsForAddOverlay(){
    let contactList = document.getElementById('add-assigned-editors');
    for (let i = 0; i < contacts.length; i++) {
        let initials = contacts[i]['name'].split(" ").map((n)=>n[0]).join("");
        let randomColor = '#' + contacts[i]['randomColor'];
        let name = contacts[i]['name'];
        contactList.innerHTML += renderContacts(i, randomColor, name, initials);
    }
      sortContacts();
}
//LOAD CONTACTS END


//ADD NEW TASK START
function openAddTaskCard(){
    document.getElementById('add-task-overlay').style.display = 'flex';
    loadContactsForAddOverlay();
}


function addNewTask(){
    let newTask = {
    title: document.getElementById('add-task-title-input').value,
    description: document.getElementById('add-task-description-input').value,
    assignedto: temporaryAssignedTo,
    duedate: document.getElementById('add-task-date-input').value,
    prio: newTaskPrio,
    category: document.getElementById('add-new-task-category').value,
    status: 'open',
    subtasks: temporarySubtasks,
    subTasksDone: temporarySubtasksDone,
    };
    createSubtasksDoneArray();
    saveNewAddedTask(newTask);
}


function saveNewAddedTask(newTask){
    tasks.push(newTask);
    console.log(newTask, tasks)
    temporaryAssignedTo = [];
    newTaskPrio = '';
    showAddedToBoardMessage();
    hideAddedToBoardMessage();
    setItem('tasks', JSON.stringify(tasks))
}


function showAddedToBoardMessage(){
    document.getElementById('added-task-message').style.display = "flex";    
}


function hideAddedToBoardMessage(){
    setTimeout(() => {
        document.getElementById('added-task-message').style.display = "none";
        closeAddTaskCard();
        refreshTasks();
        renderTasks();
    }, "2000");
}


function closeAddTaskCard(){
    document.getElementById('add-assigned-editors').innerHTML = '';
    document.getElementById('add-task-overlay').style.display = 'none';
}
//ADD NEW TASK END


//ASSIGN CONTACTS START
function showDropdownContactsAddOverlay(){
    let dropdown = document.getElementById('add-assigned-editors');
    if(dropdown.style.display == 'none'){
      dropdown.style.display = 'block';
      clearAssignedToAddOverlay();
    }else{
      dropdown.style.display = 'none';
      addAssignedEditorsAddOverlay();
    } 
}


function addAssignedEditorsAddOverlay(){
    for (let i = 0; i < contacts.length; i++) {
      const checkedEditor = contacts[i];
      checkIfContactCheckboxChecked(checkedEditor, i);
    }
}


function checkIfContactCheckboxChecked(checkedEditor, i){
    let checkbox = document.getElementById(`checkbox${i}`).checked;
    let showAssignedEditors = document.getElementById('show-assigned-editors-container');
    if(checkbox == true){
      let name = checkedEditor['name'];
      let randomColor = '#' + checkedEditor['randomColor'];
      let initials = checkedEditor['name'].split(" ").map((n)=>n[0]).join("");
      showAssignedEditors.innerHTML += `<div id="editor${i}" class="drop-initials" style="background-color: ${randomColor}">${initials}</div>`;
      pushAssignedToAddOverlay(initials, randomColor, name);
    }
}


function pushAssignedToAddOverlay(initials, randomColor, name){
    let assignedToTask = {
      name: name,
      initials: initials,
      randomColor: randomColor,
    };
    temporaryAssignedTo.push(assignedToTask);
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


function clearAssignedToAddOverlay(){
    document.getElementById('show-assigned-editors-container').innerHTML = '';
}
//ASSIGN CONTACTS END


//SET PRIORITY START
function setNewTaskPrio(newPrio, buttonColor){
    newTaskPrio = newPrio;
    resetPrioColors();
    document.getElementById(newPrio).style.backgroundColor = buttonColor;
    document.getElementById(`${newPrio}-text-add`).style.color = "#FFFFFF";
    document.getElementById(`${newPrio}-img-add`).src = `/assets/img/icons/${newPrio}_white.png`;
  }
  

  function resetPrioColors() {
    ['urgent', 'medium', 'low'].forEach(priority => {
      document.getElementById(priority).style.backgroundColor = "";
      document.getElementById(`${priority}-text-add`).style.color = "";
      document.getElementById(`${priority}-img-add`).src = `/assets/img/icons/${priority}.png`;
    });
  }
////SET PRIORITY END


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
  temporarySubtasks.push(subtask);
  console.log(temporarySubtasks);
  renderSubtasks();
  clearSubtaskInput();
}


function renderSubtasks(){
  let subtasksContainer = document.getElementById('add-task-subtasks-container');
  subtasksContainer.innerHTML = '';
  for (let i = 0; i < temporarySubtasks.length; i++) {
    const subtask = temporarySubtasks[i];
    subtasksContainer.innerHTML += `
    
      <li onclick="editSubtask(${i})" id="editable-subtask${i}" >${subtask}</li>

      <div id="editSubtaskContainer${i}"  style="display: none" class="edit-task-subtask-input-container">
        <input id="editSubtaskInput${i}" value="${subtask}" class="add-task-form-input">    
        <div class="edit-task-active-subtask-icon-box">                
          <img src="img/subtask delete icon.png" alt="Delete" onclick="deleteSubtask(${i})" />
          <img src="img/subtask divider icon.png" alt="Divider" />
          <img src="img/subtask check icon.png" alt="Check" onclick="changeSubtask(${i})" />
        </div>
      </div>
    `
  }
}


function editSubtask(i){
  document.getElementById(`editable-subtask${i}`).style.display = "none";
  document.getElementById(`editSubtaskContainer${i}`).style.display ="flex";
}


function deleteSubtask(i){
  temporarySubtasks.splice(i, 1)
  renderSubtasks();
  clearSubtaskInput();
}


function changeSubtask(i){
  temporarySubtasks[i] = document.getElementById(`editSubtaskInput${i}`).value;
  renderSubtasks();
  clearSubtaskInput();
}


function createSubtasksDoneArray(){
  for (let i = 0; i < temporarySubtasks.length; i++) {
    const subtask = temporarySubtasks[i];
    let subtaskDoneJson = {
      subname: subtask, 
      checked: false
    }
    temporarySubtasksDone.push(subtaskDoneJson);
    console.log(subtaskDoneJson)
  }
}
//ADD SUBTASK END
