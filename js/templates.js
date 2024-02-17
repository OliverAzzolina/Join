// INDEX HTML TEMPLATES

function loginHTML() {
  return /*html*/`
  <div id="register-container" class="init-fade-in">
    <p>Not a Join User?</p>
    <button id="sign-up-btn" type="button" onclick="switchToRegister()">Sign Up</button>
  </div>

  <img src="assets/img/logo_desktop.png" alt="Logo" id="logo" class="logo-animation">
  
  <div id="login-container" class="init-fade-in">

    <h2>Log in</h2>
    <div class="form-underline"></div>

    <form id="login-form">
      <div id="email-form-container" class="form-group">
        <div id="email-input-container" class="input-with-icon">
          <img id="email-icon" class="input-icon" src="assets/img/mail_icon.png" alt="Email Icon">
          <input id="email-input" type="email" placeholder="Email">
        </div>
      </div>
      <div id="password-form-container" class="form-group">
        <div id="password-input-container" class="input-with-icon">
            <img id="password-icon" src="assets/img/lock_icon.png" alt="Password Icon" class="input-icon">
            <input id="password-input" type="password" placeholder="Password">
        </div>
      </div>
      <div id="remember-checkbox-container">
        <input type="checkbox">
        <p>Remember me</p>
      </div>
      <div class="button-group">
        <button id="submit-btn" type="submit">Log in</button>
        <button id="guest-login-btn" type="button" class="guest-login" onclick="guestLogin()">Guest Log in</button>
      </div>
    </form>
  </div>
<div class="footer fade-in">
<p>Privacy Policy</p>
<p>Legal Notice</p>
</div>`;
}

function registerHTML() {
  return /*html*/`
    <img src="assets/img/logo_desktop.png" alt="Logo" id="logo">

    <div id="signup-container">
      <img src="assets/img/arrow.png" alt="arrow" id="arrow" onclick="switchToLogin()">
      <h2>Sign Up</h2>
      <div class="form-underline"></div>
      <form id="registration-Form">
        <div class="form-group">
            <input type="text" id="name" placeholder="Name" required>
        </div>
        <div class="form-group">
            <input type="email" id="email" placeholder="Email" required>
        </div>
        <div class="form-group">
            <input type="password" id="password" placeholder="Password" required>
        </div>
        <div class="form-group">
            <input type="password" id="confirmPassword" placeholder="Confirm Password" required>
        </div>
        <div id="register-checkbox-group" class="checkbox-group">
          <label id="checkbox-label">
          <input id="privacy-checkbox" type="checkbox" name="privacy">
          <span>I accept the <span class="privacy-policy">Privacy Policy</span></span>
          </label>
        </div>
        <div class="button-group">
          <button type="submit">Sign Up</button>
        </div>
      </form>    
    </div>
    <div class="footer">
        <p>Privacy Policy</p>
        <p>Legal Notice</p>
    </div>`;
}

function summaryHTML(toDoCounter, doneCounter, urgentCounter, urgentDeadline, tibCounter, tipCounter, awaitingFeedbackCounter, greetingDaytime, userGreetingName) {
  return /*html*/`
            <div class="content-container">
                <div class="summary-content">
                    <p class="left-text">Join 360</p>
                    <p class="middle-text">|</p>
                    <p class="right-text">Key Metrics at a Glance</p>
                </div> 
                <div class="todo1">
                    <a href="board.html" class="todo-left" onmouseover="changeImage(this)" onmouseout="resetImage(this)">
                        <img src="assets/img/todo_black_icon.png" alt="Icon" class="icon">
                        <div class="text-container">
                            <span id="to-do-counter" class="number">${toDoCounter}</span>
                            <span class="label">To-do</span>
                        </div>
                    </a>
                    <a href="board.html" class="done-right" onmouseover="changeImageDoneRight(this)" onmouseout="resetImageDoneRight(this)">
                        <img src="assets/img/done_black_icon.png" alt="Icon" class="icon">
                        <div class="text-container">
                            <span id="done-counter" class="number">${doneCounter}</span>
                            <span class="label">Done</span>
                        </div>
                    </a>
                </div>
                <div class="todo2">
                    <a href="board.html" class="todo2-left">
                        <img src="assets/img/prio_urgent_icon_big.png" alt="Icon" class="icon" onmouseover="changeImage(this)" onmouseout="resetImage(this)">
                        <div class="text-container">
                            <span id="urgent-counter" class="number">${urgentCounter}</span>
                            <span class="label">Urgent</span>
                        </div>
                        <div>
                            <p class="middle-text2">|</p>
                        </div>   
                    </a>
                    <div class="todo-right">
                        <span class="date"><b id="urgent-deadline">${urgentDeadline}</b></span>
                        <span class="label">Upcomming Deadline</span>
                    </div>
                </div>
                <div class="todo1">
                    <a href="board.html" class="to-do">
                        <span id="tib-counter" class="number">${tibCounter}</span>
                        <span class="label">Task in<br> Board</span>
                    </a>
                    <a href="board.html" class="to-do2">
                        <span id="tip-counter" class="number">${tipCounter}</span>
                        <span class="label">Tasks in<br> Prozess</span>
                    </a>    
                    <a href="board.html" class="to-do3">
                        <span id="awaiting-feedback-counter" class="number">${awaitingFeedbackCounter}</span>
                        <span class="label">Awaiting Feedback</span>
                    </a>
                </div>
            </div>
            <div class="greeting-script">
                <p id="greetingText"></p>${greetingDaytime}<br>
                <p id="user-greeting-name" class="name">${userGreetingName}</p>
            </div>
        </div>`;
}


// HEADER AND SIDEBAR HTML TEMPLATES

function headerHTML(userInitials) {
  return /*html*/`
    <div><p id="header-headline">Kanban Project Management Tool</p></div>
        <div id="header-icons">
            
                <img id="help-icon"src="assets/img/header_help_icon.png" alt="help">
           
                <button id="login-icon" onclick="toggleDropdown()">${userInitials}</button>
                
            
            <div id="dropdownMenu">
            <a href="legal-notice.html">Legal Notice</a>
            <a href="private.html">Private</a>
            <a onclick="logout()">Log Out</a>
        </div>
        </div>`;
}

function sidebarHTML() {
  return/*html*/`
        <div>
            <img id="sidebar-logo" src="assets/img/logo_white.svg" alt="">
        </div>
        <div id="menu-section">
            <ul>
                <li>
                    <img src="assets/img/sidebar_summary_icon.svg" alt="Summary Icon">
                    <a href="./summary.html">Summary</a>
                </li>
                <li>
                    <img src="assets/img/sidebar_addtask_icon.svg" alt="Add Task Icon">
                    <a href="./add-task.html">Add Task</a>
                </li>
                <li>
                    <img src="assets/img/sidebar_board_icon.svg" alt="Board Icon">
                    <a href="./board.html">Board</a>
                </li>
                <li>
                    <img src="assets/img/sidebar_contacts_icon.svg" alt="Contacts Icon">
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
                <img src="assets/img/subtask_edit_icon.png" class="edit-icon" onclick="editSubtask(${index})">
                <img src="assets/img/subtask_divider.png">
                <img src="assets/img/subtask_delete_icon.png" class="delete-icon" onclick="removeSubtask(${index})">
            </div>
        </div>
    `;
}



// BOARD HTML TEMPLATES


// CONTACTS HTML TEMPLATES


//BOARD TEMPLATES
function generateTask(i){
    return `
    <div id="todo-card${i}" draggable="true" class="todo-card" ondragstart="startDragging(${i})"  onclick="openTaskDetails(${i})">

      <span id="category${i}" class="category">${tasks[i]["category"]}</span>
      <div class="title-description">
        <span class="todo-title">${tasks[i]["title"]}</span>
        <span class="todo-description">${tasks[i]["description"].substring(0, 20)}...</span>
      </div>
      <div class="sub-progress-container">
        <div class="subtasks-progress-bar-container">
          <div class="subtasks-progress-bar" id="subtasks-progress${i}"></div>
        </div>
        <span><span id="subsDoneOfAll${i}"></span> / ${tasks[i]["subtasks"].length} Subtasks</span>
      </div>
      <div class="assigned-prio">
        <div class="d-flex">
          <div class="todo-assigned-to" id="todo-assigned-to${i}"></div>
          <div style="display: none;" id="tooMuchEditors${i}" class="mini-logo-dummy"></div>
        </div>
        <img id="prioImg${i}" src="" alt="">
      </div>
    </div>
    `;
}

function generateDetailOverlay(i) {
  return/*html*/`
  <div id="todo-card-detail${i}" class="detail-todo-card slider slide-in" onclick="doNotClose(event)">
    <div class="detail-card-top">  
      <p id="overlay-category${i}" class="category">${tasks[i]["category"]}</p>
      <button id="slide-out-toggle${i}" class="close-button"><img src="assets/img/close_icon.png" alt="close"></button>
    </div>
      <span class="detail-title">${tasks[i]["title"]}</span><br>
      <span class="f-s20-w400">${tasks[i]["description"]}</span><br>
      <span class="f-s20-w400">Due date:  ${tasks[i]["duedate"]}</span><br>
      <span class=" prio-img f-s20-w400">Priority:  ${tasks[i]["prio"].charAt(0).toUpperCase() + tasks[i]["prio"].slice(1)}<img class="prio-detail-img" id="prioDetailImg${i}"></span><br>
      <span class="f-s20-w400">Assigned to:</span>
      <div class="d-flex"><div id="detailAssignedTo"></div><div style="display: none;" id="toMuchEditors${i}" class="mini-logo-dummy"></div></div>
      <span class="f-s20-w400">Subtasks<ul id="checklistSubDetail"></ul></span>
      <div class="overlay-buttons">
        <button onclick="openChangeTaskPopup(${i})" onmouseover="hover('change-img')" onmouseout="unhover('change-img')"><img id="change-img" src="assets/img/change_unhovered.png">Change</button>
        <div class="overlay-buttons-splitter"></div>
        <button onclick="deleteTask(${i})" onmouseover="hover('delete-img')" onmouseout="unhover('delete-img')"><img id="delete-img" src="assets/img/delete_icon.png">Delete</button>
        <div class="overlay-buttons-splitter"></div>
        <button onclick="openEditOverlay(${i})" onmouseover="hover('edit-img')" onmouseout="unhover('edit-img')"><img id="edit-img" src="assets/img/edit_icon.png">Edit</button>
      </div>
      <div id="change-task-buttons" class="change-task-buttons"></div>
  </div>
      `;
}

function generateEditTaskOverlay(i, title, description, duedate) {
  return `
    <div id="edit-task-overlay"  onclick="closeDetailCard()">
    <div class= "detail-todo-card" onclick="doNotClose(event)">
      
    <div id="edit-task-overlay-header">
    <button onclick="closeEditOverlay()" class="close-button">
    <img src="assets/img/close_icon.png" alt=""></button>
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
                <img id="urgent-img-edit" src="assets/img/prio_urgent_icon.png" alt="" />
                </button>
              <button  type="button" id="medium" onclick="setPrio(${i}, 'medium', '#FFA800'); doNotClose(event)" class="add-task-form-btn">
                <span id="medium-text" class="add-task-form-btn-text">Medium</span>
                <img id="medium-img-edit" src="assets/img/prio_medium_icon.png" alt="" />
                </button>
              <button  type="button" id="low" onclick="setPrio(${i}, 'low', '#7AE229'); doNotClose(event)" class="add-task-form-btn">
                <span id="low-text" class="add-task-form-btn-text">Low</span>
                <img id="low-img-edit" src="assets/img/prio_low_icon.png" alt="" />
                </button>
            </div>
          </div>
  
            <div id="add-task-assigned-to-container">
              <span class="add-task-form-title">Assigned to</span>
              <div id="contacts-dropdown" onclick="showDropdownContacts(${i})">
                <span>Select contacts to assign</span>
                <img src="assets/img/arrow_drop_down.png" alt="">
              </div>
              <ul style="display: none;" id="assigned-editors" class="assigned-editors"></ul>

              <div style="display: flex; flex-direction: row;">              
              <div id="show-assigned-editors-edit-container"></div>
              <div style="display: none;" id="tooMuchEditorsEdit${i}" class="mini-logo-dummy"></div>
            </div>

            </div>
            
            <div id="add-task-sub-container">
            <span class="add-task-form-title">Subtasks</span>
            <div class="add-task-subtask-input-container">
              <input id="add-task-subtask-input" class="add-task-form-input" type="text" placeholder="Add new subtask" onclick="activateCheckCancelButtons()"/>
              <div id="add-task-active-subtask-icon-box" class="d-none">
                <img src="assets/img/cancel_icon.png" alt="Cancel" onclick="clearSubtaskInput()" />
                <img src="assets/img/subtask_divider.png" alt="Divider" />
                <img src="assets/img/subtask_check_icon.png" alt="Check" onclick="addSubtaskEditOverlay(${i})" />
              </div>
              <div id="add-task-create-subtask-icon-box">
                <img id="add-task-create-subtask-icon" src="assets/img/subtask_add_icon.png" alt="" />
              </div>
            </div>
            <div id="edit-task-subtasks-container"></div>
          </div>
         
        </div>
        <div id="edit-task-overlay-footer">
        <div class="edit-task-buttons">
          <button type="submit" class="ok-button"><span>Ok</span><img src="assets/img/check_icon_white.png" alt=""></button>
        </div>
      </div>
      </form>
    </div>
  </div>
    `;
}

function generateAssignedTo(i, userColor, initials) {
  return `
        <div id="editor${i}" class="drop-initials" style="background-color: ${userColor}">${initials}</div>
    `;
}

function generateDetailSubtasks(i, j, subtask) {
  return `
        <li id="subtaskIndex${j}" class="detailSub" onclick="checkIfSubChecked(${j}, ${i})">
            <div>
                <img id="detailSub${j}" src="assets/img/check_unchecked.png">
                <span>${subtask}</span>
            </div>
        </li>
    `;
}

function renderContacts(i, userColor, firstName, lastName, initials) {
  return `
    <label for="checkbox${i}">
     <li id="assigned-contact${i}" onclick="checkIfAssigned(${i})">
     <input style="display: none" type="checkbox" id="checkbox${i}">
       <div class="drop-name-initials">
         <div class="drop-initials" style="background-color: ${userColor}">${initials}</div>
         <span> ${firstName} ${lastName}</span>
       </div>
         <img id="checked${i}" src="assets/img/check_unchecked.png" alt="">
     </li>
    </label>
 `;
}
