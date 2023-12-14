let temporaryAssignedTo = [];
let newTaskPrio;

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
    subtasks: [],
    subTasksDone:[],
    };
    saveNewAddedTask(newTask);
}


function saveNewAddedTask(newTask){
    tasks.push(newTask);
    console.log(newTask, tasks)
    temporaryAssignedTo = [];
    newTaskPrio = '';
    showAddedToBoardMessage();
    hideAddedToBoardMessage();
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
