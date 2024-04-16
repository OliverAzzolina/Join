// INDEX HTML TEMPLATES

function loginHTML() {
  return /*html*/ `
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
          <input id="email-input" type="email" placeholder="Email" autocomplete="username">
        </div>
      </div>
      <div id="password-form-container" class="form-group">
        <div id="password-input-container" class="input-with-icon">
            <img id="password-icon" src="assets/img/lock_icon.png" alt="Password Icon" class="input-icon">
            <input id="password-input" type="password" placeholder="Password" autocomplete="current-password">
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
<a href="privacy.html">Privacy Policy</a>
<a href="legal-notice.html">Legal Notice</a>
</div>`;
}

function registerHTML() {
  return /*html*/ `
    <img src="assets/img/logo_desktop.png" alt="Logo" id="logo" onclick="goHome()">

    <div id="signup-container">
      <img src="assets/img/arrow.png" alt="arrow" id="arrow" onclick="switchToLogin()">
      <h2>Sign Up</h2>
      <div class="form-underline"></div>
      <form id="registration-Form">
        <div class="form-group">
            <input type="text" id="name" placeholder="Name" autocomplete="off" required>
        </div>
        <div class="form-group">
            <input type="email" id="email" placeholder="Email" autocomplete="email" required>
        </div>
        <div class="form-group">
            <input type="password" id="password" placeholder="Password" autocomplete="new-password" required>
        </div>
        <div class="form-group">
            <input type="password" id="confirmPassword" placeholder="Confirm Password" autocomplete="new-password" required>
        </div>
        <div id="register-checkbox-group" class="checkbox-group">
          <label id="checkbox-label">
          <input id="privacy-checkbox" type="checkbox" name="privacy">
          <span>I accept the <span class="privacy-policy">Privacy Policy</span></span>
          </label>
        </div>
        <div class="button-group">
          <button id="register-button" type="submit" disabled>Sign Up</button>
        </div>
      </form>    
    </div>
    <div class="footer">
      <a href="privacy.html">Privacy Policy</a>
      <a href="legal-notice.html">Legal Notice</a>
    </div>`;
}

function summaryHTML(
  toDoCounter,
  doneCounter,
  urgentCounter,
  urgentDeadline,
  tibCounter,
  tipCounter,
  awaitingFeedbackCounter,
  greetingDaytime,
  userGreetingName
) {
  return /*html*/ `
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
        <img src="assets/img/prio_urgent_icon_big.png" alt="Icon" class="icon">
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
  return /*html*/ `
    <div>
    <p id="header-headline">Kanban Project Management Tool</p></div>
    <img src="assets/img/logo_mobile.png" alt="Mobile Logo" id="mobile-logo">
        <div id="header-icons">
            
               
                <a href="help.html"><img id="help-icon" src="assets/img/header_help_icon.png" alt="help"></a>
           
                <button id="login-icon" onclick="toggleDropdown()">${userInitials}</button>
                
            
            <div id="dropdownMenu">
            <a href="legal-notice.html">Legal Notice</a>
            <a href="privacy.html">Privacy</a>
            <a onclick="logout()">Log Out</a>
        </div>
        </div>`;
}

function headerLoggedOutHTML() {
  return /*html*/ `
    <div><p id="header-headline">Kanban Project Management Tool</p></div>`;
}

function sidebarHTML() {
  return /*html*/ `
        <div>
            <a href="./summary.html">
                <img id="sidebar-logo" src="assets/img/logo_white.svg" alt="Logo">
            </a>
        </div>
        <div id="menu-section">
            <ul>
                <li>
                    <a href="./summary.html">
                        <img src="assets/img/sidebar_summary_icon.svg" alt="Summary Icon">
                        Summary
                    </a>
                </li>
                <li>
                    <a href="./add-task.html">
                        <img src="assets/img/sidebar_addtask_icon.svg" alt="Add Task Icon">
                        Add Task
                    </a>
                </li>
                <li>
                    <a href="./board.html">
                        <img src="assets/img/sidebar_board_icon.svg" alt="Board Icon">
                        Board
                    </a>
                </li>
                <li>
                    <a href="./contacts.html">
                        <img src="assets/img/sidebar_contacts_icon.svg" alt="Contacts Icon">
                        Contacts
                    </a>
                </li>
            </ul>
        </div>
        <li id="sidebar-footer">
            <a href="./privacy.html">Privacy Policy</a>
            <a href="./legal-notice.html">Legal Notice</a>
        </li>`;
}

function sidebarLoggedOutHTML() {
  return /*html*/ `
        <div>
            <img id="sidebar-logo" src="assets/img/logo_white.svg" alt="Logo" onclick="goHome()">
        </div>
        <li id="sidebar-footer">
            <a href="./privacy.html">Privacy Policy</a>
            <a href="./legal-notice.html">Legal Notice</a>
        </li>`;
}

// ADD TASK HTML TEMPLATES
function subtaskHTML(subtask, i) {
  return `
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

//BOARD TEMPLATES
function generateTask(i) {
  return `
    <div >
    <div id="todo-card${i}" draggable="true" ondrag="startDragging(${i})" ondragend="stopDragging(${i})" class="todo-card" onclick="openTaskDetails(${i})">

      <span id="category${i}" class="category">${tasks[i]["category"]}</span>
      <div class="title-description">
        <span class="todo-title">${tasks[i]["title"]}</span>
        <span class="todo-description">${tasks[i]["description"].substring(
          0,
          20
        )}...</span>
      </div>
      <div class="sub-progress-container" onmouseover="showSubInfo(${i})" onmouseout="hideSubInfo(${i})">
        <div class="subtasks-progress-bar-container">
          <div class="subtasks-progress-bar" id="subtasks-progress${i}"></div>
        </div>
        <span><span id="subsDoneOfAll${i}"></span> / ${
    tasks[i]["subtasks"].length
  } Subtasks</span>
      </div>
      <div class="subtask-info" id="subtasks-info${i}"></div>
      <div class="assigned-prio">
        <div class="d-flex">
          <div class="todo-assigned-to" id="todo-assigned-to${i}"></div>
          <div style="display: none;" id="tooMuchEditors${i}" class="mini-logo-dummy"></div>
        </div>
        <img id="prioImg${i}" src="" alt="">
      </div>
    </div>
    </div>
    `;
}

function generateDetailOverlay(i) {
  return /*html*/ `
  <div id="todo-card-detail${i}" class="detail-todo-card slider slide-in" onclick="doNotClose(event)">
    <div class="detail-card-top">  
      <p id="overlay-category${i}" class="category">${tasks[i]["category"]}</p>
      <button id="slide-out-toggle${i}" class="close-button"><img src="assets/img/close_icon.png" alt="close"></button>
    </div>
      <span class="detail-title">${tasks[i]["title"]}</span><br>
      <span class="f-s20-w400">${tasks[i]["description"]}</span><br>
      <span class="f-s20-w400">Due date:  ${tasks[i]["dueDate"]}</span><br>
      <span class=" prio-img f-s20-w400">Priority:  ${
        tasks[i]["prio"].charAt(0).toUpperCase() + tasks[i]["prio"].slice(1)
      }<img class="prio-detail-img" id="prioDetailImg${i}"></span><br>
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

function generateEditTaskOverlay(i, title, description, dueDate) {
  return `
    <div id="edit-task-overlay">
    <div class= "detail-todo-card-edit" onclick="doNotClose(event)">
      
    <div id="edit-task-overlay-header">
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
                <input id="edit-task-form-input" class="edit-task-form-input" required type="date" value=${dueDate}>
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
              <div id="background-overlay" onclick="hideDropdownContacts(${i})"></div>
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

function generateEditSubtasks(i, index, subtask) {
  return `
  <div class="edit-subtask">
  
      <div onclick="editSubtaskEditOverlay(${i}, ${index})" class="subtask-list-item" id="editable-subtask${i}" onMouseOver="showIcons(${i})" onMouseOut="hideIcons(${i})">
          <span>• ${subtask}</span>            
          <div id="edit-task-active-subtask-icon-box${i}" class="edit-task-active-subtask-icon-box" style="opacity:0;" >                
          <img src="assets/img/subtask_edit_icon.png" alt="" onclick="editSubtaskEditOverlay(${i}, ${index})" />
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

function renderChangeTaskButtons(i) {
  return ` <button class="change-task-status-button" onclick="changeTask(${i}, 'open')">To Do</button>
  <button class="change-task-status-button" onclick="changeTask(${i}, 'in-progress')">In Progress</button>
  <button class="change-task-status-button" onclick="changeTask(${i}, 'await-feedback')">Await Feedback</button>
  <button class="change-task-status-button" onclick="changeTask(${i}, 'done')">Done</button>`;
}

function renderAssignedToInitials(i, userColor, initials) {
  return `
  <div id="mini-logo${i}" style="background-color: ${userColor}" class="mini-logo">${initials}</div>
  `;
}

// CONTACTS HTML TEMPLATES
/**
 * Generates HTML markup for a contact.
 * @param {number} i - The index of the category.
 * @param {number} j - The index of the contact within the category.
 * @param {string} initials - The initials of the contact.
 * @param {string} firstName - The first name of the contact.
 * @param {string} lastName - The last name of the contact.
 * @param {string} email - The email address of the contact.
 * @param {string} userColor - The color associated with the contact.
 * @returns {string} The HTML markup for the contact.
 */
function generateContact(
  i,
  j,
  initials,
  firstName,
  lastName,
  email,
  userColor
) {
  return `
  <div id="contact${i},${j}" class="contact contact-hover" onclick="openContactInfo(${i},${j})">
      <div class="name-logo" style= "background-color: ${userColor}"><span>${initials}</span></div>
      <div class="contact-name">
      <span id="contact${i},${j}-name">${firstName} ${lastName}</span>
      <a href="#">${email}</a>
      </div>    
  </div>
  `;
}

/**
 * Generates HTML markup for displaying contact information.
 * @param {number} i - The index of the category.
 * @param {number} j - The index of the contact within the category.
 * @param {string} initials - The initials of the contact.
 * @param {string} firstName - The first name of the contact.
 * @param {string} lastName - The last name of the contact.
 * @param {string} email - The email address of the contact.
 * @param {string} phone - The phone number of the contact.
 * @param {string} userColor - The color associated with the contact.
 * @returns {string} The HTML markup for displaying contact information.
 */
function renderContactInfo(
  i,
  j,
  initials,
  firstName,
  lastName,
  email,
  phone,
  userColor
) {
  return `
    <div class="name-section">
        <div class="name-logo name-logo-detail" style= "background-color: ${userColor}">
        <span>${initials}</span>
        </div>
        <div class="flex-row">    
            <div class="name">
                <span>${firstName} ${lastName}</span>
            </div>
            <div class="edit-contact">
                <button onclick="EditContact(${i},${j})" onmouseover="hover('a')" onmouseout="unhover('a')"><img id="edit-img" src="assets/img/edit_icon.png" alt=""><span>Edit</span></button>
                <button onclick="deleteContact(${i},${j})" onmouseover="hover('b')" onmouseout="unhover('b')"><img id="delete-img" src="assets/img/delete_icon.png" alt=""><span>Delete</span></button>
            </div>
        </div>
    </div>        
    <div class="contact-information">
        <p id="ci-head">Contact Information</p>
        <div class="email">
          <p>Email</p>
          <a href="mailto:${email}">${email}</a>
        </div>
        <div class="phone">
          <p>Phone</p>
          <a href="tel:${phone}">${phone}</a>
        </div>
    </div>
    <img src="assets/img/mobile-menu-icon.png" id="roundButton" onclick="EditContact(${i},${j})" alt="Edit" style="cursor: pointer;">`;
}

/**
 * Generates HTML markup for the overlay to add a new contact.
 * @returns {string} The HTML markup for the add new contact overlay.
 */
function generateAddNewOverlay() {
  return `
  <div class="add-contact-card" onclick="doNotClose(event)">

  <div class="add-contact-card-left">
      <img class="mobile-none" src="/assets/img/logo_desktop.png" alt="">
      <div class="titles">
        <span class="title">Add contact</span>
        <span class="subtitle">Tasks are better with a Team!</span>
        <div class="blue-line-horizontal"></div>
      </div>
  </div>
  <div class="add-contact-card-right">
    <div class="close-button" onclick="closeAddContact()">
      <button><img src="assets/img/close_icon.png" alt=""></button>
    </div>
    <div class="add-contact-container">
    <img class="profile-icon" src="assets/img/profile_icon.png" alt="">
    <form onsubmit="addNewContact(); return false">
      <div class="actions-container">
        <div class="add-contact-inputs" >
          <input id="contactname" type="text" placeholder="Name" class="input-icon-name" required>
          <input id="email" type="email" placeholder="Email" class="input-icon-mail" required>
          <input id="phone" type="text" placeholder="Phone" class="input-icon-phone" required>
        </div>
        <div class="add-contact-buttons">
          <button type="button" onclick="closeAddContact()" class="cancel-button"><span>Cancel</span><img src="assets/img/cancel_icon.png" alt=""></button>
          <button type="submit" class="create-button"><span>Create contact</span><img src="assets/img/check_icon_white.png" alt=""></button>
        </div>
      </div>
      </form>
      </div>
  </div>`;
}

/**
 * Generates HTML markup for the overlay to edit a contact.
 * @param {number} i - The index of the category.
 * @param {number} j - The index of the contact within the category.
 * @param {string} initials - The initials of the contact.
 * @param {string} fullName - The full name of the contact.
 * @param {string} email - The email address of the contact.
 * @param {string} phone - The phone number of the contact.
 * @param {string} userColor - The color associated with the contact.
 * @returns {string} The HTML markup for the edit contact overlay.
 */
function generateEditOverlay(
  i,
  j,
  initials,
  fullName,
  email,
  phone,
  userColor
) {
  return `
  <div class="add-contact-card" onclick="doNotClose(event)">
    <div class="add-contact-card-left">
      <img class="mobile-logo-small" src="assets/img/logo_small.png" alt="">
        <div class="titles">
          <span class="title">Edit contact</span>
          <span class="subtitle">Tasks are better with a Team!</span>
          <div class="blue-line-horizontal"></div>
        </div>
    </div>
    
    <div class="add-contact-card-right">
      <div class="close-button" onclick="closeAddContact()">
        <button><img src="assets/img/close_icon.png" alt=""></button>
      </div>

      <div class="add-contact-container">
        <div id="name-logo-bg${i}" class="name-logo name-logo-detail" style= "background-color: ${userColor}">
          <span>${initials}</span>
        </div>
        <form onsubmit="saveContact(${i},${j}); return false">
          <div class="actions-container">
            <div class="add-contact-inputs" >
              <input id="editName" type="text" placeholder="Name" class="edit-input input-icon-name" value="${fullName}" required>
              <input id="editEmail" type="email" placeholder="Email" class="edit-input input-icon-mail" value="${email}" required>
              <input id="editPhone" type="text" placeholder="Phone" class="edit-input input-icon-phone" value="${phone}" required>
            </div>
            <div class="add-contact-buttons">
              <button type="button" onclick="deleteContact(${i},${j})" class="cancel-button"><span>Delete</span><img src="assets/img/cancel_icon.png" alt=""></button>
              <button type="submit" class="create-button"><span>Save</span><img src="assets/img/check_icon_white.png" alt=""></button>
            </div>
          </div>
        </form
      </div>
  </div>`;
}
