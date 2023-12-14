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


