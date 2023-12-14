// HEADER AND SIDEBAR HTML TEMPLATES

function headerHTML() {
    return /*html*/`
    <div><p id="header-headline">Kanban Project Management Tool</p></div>
        <div id="header-icons">
            <span>
                <img id="help-icon"src="./img/header_help_icon.png" alt="help">
            </span>
            <span>
                <img id="login-icon"src="./img/header_login_icon.png" alt="" onclick="toggleDropdown()">
            </span>
            <div id="dropdownMenu">
            <a href="legal-notice.html">Legal Notice</a>
            <a href="private.html">Private</a>
            <a href="sign-up.html">Log Out</a>
        </div>
        </div>`;
}

function sidebarHTML() {
    return/*html*/`
        <div>
            <img id="sidebar-logo" src="./img/logo-white.svg" alt="">
        </div>
        <div id="menu-section">
            <ul>
                <li>
                    <img src="./img/summary_sidebar.svg" alt="Summary Icon">
                    <a href="./summary.html">Summary</a>
                </li>
                <li>
                    <img src="./img/add_task_sidebar.svg" alt="Add Task Icon">
                    <a href="./add-task.html">Add Task</a>
                </li>
                <li>
                    <img src="./img/Board_sidebar.svg" alt="Board Icon">
                    <a href="./board.html">Board</a>
                </li>
                <li>
                    <img src="./img/Contacts_sidebar.svg" alt="Contacts Icon">
                    <a href="./contacts.html">Contacts</a>
                </li>
            </ul>
        </div>
        <li id="sidebar-footer">
            <a href="./privacy.html">Privacy Policy</a>
            <a href="./legal-notice.html">Legal Notice</a>
        </li>`;
}



// ADD TASK HTML TEMPLATES

function subtaskHTML(subtask, index) {
    return /*html*/`
        <div class="add-task-subtask" id="add-task-subtask${index}">
            <p class="editable">• ${subtask}</p>
            <div class="add-task-subtask-icons">
                <img src="img/subtask edit icon.png" class="edit-icon" onclick="editSubtask(${index})">
                <img src="img/subtask divider icon.png">
                <img src="img/subtask delete icon.png" class="delete-icon" onclick="removeSubtask(${index})">
            </div>
        </div>
    `;
}



// BOARD HTML TEMPLATES



// CONTACTS HTML TEMPLATES


<<<<<<< HEAD
function navbarHTML() {
    htmlText = "";
    htmlText = /*html*/`
    <div class="sidebar">
        <div>
            <img class="logo" src="./img/logo-white.svg" alt="">
        </div>
        <div class="menu-section">
            <ul>
                <li>
                    <img class="icon" src="./img/summary_sidebar.svg" alt="Summary Icon">
                    <a href="summary.html">Summary</a>
                </li>
                <li>
                    <img class="icon" src="./img/add_task_sidebar.svg" alt="Add Task Icon">
                    <a href="about.html">Ad Task</a>
                </li>
                <li>
                    <img class="icon" src="./img/Board_sidebar.svg" alt="Board Icon">
                    <a href="board.html">Board</a>
                </li>
                <li>
                    <img class="icon" src="./img/Contacts_sidebar.svg" alt="Contacts Icon">
                    <a href="join.html">Contacts</a>
                </li>
            </ul>
        </div>
        <li class="footer-section">
            <a class="footertext" href="join.html">Privacy Policy</a>
            <a class="footertext" href="desktop.html">legal Notice</a>
        </li>
    </div>`;
    return htmlText;
}

//BOARD TEMPLATES
function generateTask(i){
    return `
    <div id="todo-card${i}" draggable="true" class="todo-card" ondragstart="startDragging(${i})" onclick="openTaskDetails(${i})">
      <span id="category${i}" class="category">${tasks[i]["category"]}</span>
      <div class="title-description">
        <span class="todo-title">${tasks[i]["title"]}</span>
        <span class="todo-description">${tasks[i]["description"]}</span>
      </div>
      <div class="sub-progress-container">
        <div class="subtasks-progress-bar-container">
          <div class="subtasks-progress-bar" id="subtasks-progress${i}"></div>
        </div>
        <span><span id="subsDoneOfAll${i}"></span> / ${tasks[i]["subtasks"].length} Subtasks</span>
      </div>
      <div class="assigned-prio">
        <div class="todo-assigned-to" id="todo-assigned-to${i}"></div>
        <img id="prioImg${i}" src="" alt="">
      </div>
    </div>
    `;
}

function generateOverlay(i){
    return `<div id="todo-card-detail${i}" class="detail-todo-card slider slide-in" onclick="doNotClose(event)">
    <div class="detail-card-top">  
      <p id="overlay-category${i}" class="category">${tasks[i]["category"]}</p>
      <button id="slide-out-toggle${i}" class="close-button"><img src="assets/img/icons/close.png" alt="close"></button>
    </div>
      <span class="detail-title">${tasks[i]["title"]}</span><br>
      <span class="f-s20-w400">${tasks[i]["description"]}</span><br>
      <span class="f-s20-w400">Due date:  ${tasks[i]["duedate"]}</span><br>
      <span class=" prio-img f-s20-w400">Priority:  ${tasks[i]["prio"].charAt(0).toUpperCase() + tasks[i]["prio"].slice(1)}<img class="prio-detail-img" id="prioDetailImg${i}" src=""></span><br>
      <span class="f-s20-w400">Assigned to:<br><div id="detailAssignedTo"></div></span><br>
      <span class="f-s20-w400">Subtasks<ul id="checklistSubDetail"></ul></span>
      <div class="overlay-buttons">
        <button onclick="deleteTask(${i})" onmouseover="hover('delete-img')" onmouseout="unhover('delete-img')"><img id="delete-img" src="/assets/img/icons/delete.png">Delete</button>
        <div class="overlay-buttons-splitter"></div>
        <button onclick="openEditOverlay(${i})" onmouseover="hover('edit-img')" onmouseout="unhover('edit-img')"><img id="edit-img" src="/assets/img/icons/edit.png">Edit</button>
      </div>
      </div>
      `;
}

function generateEditOverlay(i, title, description, duedate){
    return`
    <div id="edit-task-overlay"  onclick="closeDetailCard()">
    <div class= "detail-todo-card" onclick="doNotClose(event)">
      
    <div id="edit-task-overlay-header">
    <button onclick="closeEditOverlay()" class="close-button">
    <img src="/assets/img/icons/close.png" alt=""></button>
    </div>
      <form id="edit-task-form" onsubmit="saveTask(${i}); return false"> 
        <div id="edit-input-container-tasks">
            
            <div id="add-task-title-container">
                <div>
                  <span id="add-task-title-headline" class="add-task-form-title">Title</span>
                </div>
                <input id="edit-task-title-input" class="add-task-form-input" required type="text" value='${title}' placeholder="Enter a title">
            </div> 
  
            <div id="add-task-description-container">
              <span id="add-task-description-headline" class="add-task-form-title">Description</span>
              <textarea id="edit-task-description-input" class="add-task-form-input" required  rows="5" cols="40">${description}</textarea>
            </div>
  
            <div id="add-task-date-container">
              <div>
                <span id="add-task-date-headline" class="add-task-form-title">Due date</span>
              </div>
                <input id="edit-task-form-input" class="edit-task-form-input" required type="date" value=${duedate}>
            </div>
  
            <div id="add-task-prio-container" onclick="doNotClose(event)">
            <span id="add-task-prio-headline" class="add-task-form-title">Prio</span>
            <div id="add-task-form-btn-container" onclick="doNotClose(event)">
              <button type="button" id="urgent" onclick="setPrio(${i}, 'urgent', '#FF3D00'); doNotClose(event)" class="add-task-form-btn">
                <span id="urgent-text" class="add-task-form-btn-text">Urgent</span>
                <img src="assets/img/icons/Prio alta.png" alt="">
              </button>
              <button  type="button" id="medium" onclick="setPrio(${i}, 'medium', '#FFA800'); doNotClose(event)" class="add-task-form-btn">
                <span id="medium-text" class="add-task-form-btn-text">Medium</span>
                <img  src="assets/img/icons/Prio media.png" alt="">
              </button>
              <button  type="button" id="low" onclick="setPrio(${i}, 'low', '#7AE229'); doNotClose(event)" class="add-task-form-btn">
                <span id="low-text" class="add-task-form-btn-text">Low</span>
                <img src="assets/img/icons/Prio baja.png" alt="">
              </button>
            </div>
          </div>
  
            <div id="add-task-assigned-to-container">
              <span class="add-task-form-title">Assigned to</span>
              <div id="contacts-dropdown" onclick="showDropdownContacts(${i})">
                <span>Select contacts to assign</span>
                <img src="assets/img/icons/arrow_drop_down.png" alt="">
              </div>
              <ul style="display: none;" id="assigned-editors" class="assigned-editors"></ul>
              <div id="show-assigned-editors-edit-container" onclick="clearAssignedTo(${i})"></div>
            </div>
            
            <div id="add-task-sub-container">
              <span class="add-task-form-title">Subtasks</span>
              <input class="add-task-form-input" type="text" placeholder="Add new subtask">
            </div>
         
        </div>
        <div id="edit-task-overlay-footer">
        <div class="edit-task-buttons">
          <button type="submit" class="ok-button"><span>Ok</span><img src="assets/img/icons/check.png" alt=""></button>
        </div>
      </div>
      </form>
    </div>
  </div>
    `;
}

function generateAssignedTo(i, randomColor, checkedEditor){
    return `
        <div id="editor${i}" class="drop-initials" style="background-color: ${randomColor}">${checkedEditor}</div>
    `;
}

function generateDetailSubtasks(i, j, subtask){
    return `
        <li id="subtaskIndex${j}" class="detailSub" onclick="checkIfSubChecked(${j}, ${i})">
            <div>
                <img id="detailSub${j}" src="/assets/img/icons/check_button.png">
                <span>${subtask}</span>
            </div>
        </li>
    `;
}

function renderContacts(i, randomColor, name, initials){
    return`
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
=======
>>>>>>> 2a019daf0c434e52dae9075b2e2a7c76adefc2b4
