let currentDraggedElement;


/**
 * Initializes the board page by running a series of asynchronous tasks in sequence.
 * Waits for each task to complete before moving to the next. The tasks include checking user permissions,
 * loading user data, generating the header and sidebar UI components, sorting contacts, and loading tasks from storage.
 */
async function init(){
    await userIsAllowed();
    await loadUserData();
    await generateHeader(userInitials);
    await generateSidebar();
    sortContacts();
    loadTasksfromStorage();
}

/**
 * Asynchronously loads tasks from storage and parses them into the `tasks` variable.
 * It tries to retrieve and parse the 'tasks' item from storage. If successful, it logs the loaded tasks.
 * In case of an error, it catches and logs the error as a warning. Finally, it calls `renderTasks` to update the UI.
 */
async function loadTasksfromStorage(){
  try{
    tasks = JSON.parse(await getItem('tasks'));
  }catch(e){
    console.warn('loading error:', e)
  }
  renderTasks();
}


/**
 * Asynchronously checks if the editors assigned to tasks still exist in the contacts list.
 * Iterates through each task and its assigned editors, verifying if each editor exists in the contacts.
 * If an editor does not exist in the contacts, they are removed from the task's assignedTo list.
 */
async function checkIfEditorsExist(){
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    for (let j = 0; j < task.assignedTo.length; j++) {
      const editor = task.assignedTo[j].userId;
      let contact = await findEditorInContacts(editor);
      if(!contact){
        tasks[i].assignedTo.splice(j, 1);
      }
    }
  }
}


/**
 * Asynchronously searches for an editor in the contacts list by user ID.
 * It returns the contact object if a matching user ID is found, otherwise returns undefined.
 *
 * @param {string} editor - The user ID of the editor to search for in the contacts list.
 * @returns {Promise<Object|undefined>} A promise that resolves to the contact object if found, or undefined if not found.
 */
async function findEditorInContacts(editor){ 
    return contacts.find(contact => contact.userId === parseInt(editor));
}


/**
 * Asynchronously renders tasks on the UI after verifying the existence of their assigned editors.
 * It first checks if the assigned editors for each task exist, refreshes the tasks list, and then iterates
 * through the tasks array to render each task based on its status. It also sets priority images, updates
 * completed subtasks, generates subtasks, checks task categories, and renders the assigned editors for each task.
 * Finally, it checks if the task board is empty and updates the UI accordingly.
 */
async function renderTasks() {
  await checkIfEditorsExist();
  refreshTasks();
  for (let i = 0; i < tasks.length; i++) {
    let status = tasks[i]["status"];
    if (status == status) {
      document.getElementById(`${status}`).innerHTML += generateTask(i);
      setPrioImg(i);
      updateDoneSubs(i);
      generateSubtasks(i);
      checkCategory(i);
      renderAssignedTo(i);
    }
  }
  checkIfBoardEmpty();
}


/**
 * Checks if each board section is empty and updates the display accordingly.
 * Calls `checkOpen` for each task status ('open', 'in-progress', 'await-feedback', 'done')
 * to verify if there are any tasks in these categories and updates the UI to reflect the current state.
 */
function checkIfBoardEmpty() {
  ['open', 'in-progress', 'await-feedback', 'done'].forEach(checkOpen);
}


/**
 * Renders the assigned editors for a specific task.
 * @param {number} index - The index of the task.
 */
function renderAssignedTo(index){
  let assignedTo = document.getElementById(`todo-assigned-to${index}`);
  assignedTo.innerHTML = '';
    if(tasks[index]['assignedTo'].length > 3){
      checkIfToMuchEditors(assignedTo, index);
    }else {
      notToMuchEditors(assignedTo, index);
    }
  }


/**
 * Checks if there are too many assigned editors for a task and renders a limited number of them.
 * @param {HTMLElement} assignedTo - The HTML element to render the assigned editors.
 * @param {number} index - The index of the task.
 */
function checkIfToMuchEditors(assignedTo, index){
  for (let i = 0; i < 3; i++) {
    const checkedEditor = tasks[index]['assignedTo'][i];
    let initials = checkedEditor.initials;
    let userColor = checkedEditor.userColor;
    let tooMuchEditors = document.getElementById(`tooMuchEditors${index}`);
    tooMuchEditors.style.display = 'flex';
    tooMuchEditors.innerHTML = `+${tasks[index]['assignedTo'].length - 3}`;
    assignedTo.innerHTML += `
    <div id="mini-logo${i}" style="background-color: ${userColor}" class="mini-logo">${initials}</div>
    `;
  }
}


/**
 * Renders assigned editors when the number of editors is not excessive for a task.
 * @param {HTMLElement} assignedTo - The HTML element to render the assigned editors.
 * @param {number} index - The index of the task.
 */
function notToMuchEditors(assignedTo, index){
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
 * Checks if a specific board section is empty and adjusts its visibility accordingly.
 * @param {string} id - The ID of the board section to check.
 */

function checkOpen(id) {
  const board = document.getElementById(id);
  const isEmpty = board.innerHTML === '';
  const displayStyle = isEmpty ? 'flex' : 'none';

  document.getElementById(`${id}-empty`).style.display = displayStyle;
  board.style.display = isEmpty ? 'none' : 'flex';
}


/**
 * Checks the category of a task and adjusts the background color accordingly.
 * @param {number} i - The index of the task.
 */
function checkCategory(i){
  let category = tasks[i]["category"];
  if(category == 'User Story'){
    document.getElementById(`category${i}`).style.backgroundColor = "rgb(0,56,255)";
  }
  if(category == 'Technical Task'){
    document.getElementById(`category${i}`).style.backgroundColor = "rgb(31,215,193)";
  }
}


/**
 * Refreshes the task boards by clearing their contents.
 */
function refreshTasks(){
  document.getElementById("open").innerHTML = '';
  document.getElementById("in-progress").innerHTML = '';
  document.getElementById("await-feedback").innerHTML = '';
  document.getElementById("done").innerHTML = '';
}


/**
 * Sets the priority image for a task based on its priority level.
 * @param {number} i - The index of the task.
 */
function setPrioImg(i){
  let prioImg = document.getElementById(`prioImg${i}`);
  let prio = tasks[i]['prio'];
  prioImg.src =`/assets/img/prio_${prio}_icon.png`;
}


/**
 * Generates subtasks progress for a given task.
 * @param {number} i - The index of the task.
 */
function generateSubtasks(i){
  let subProgressBar = document.getElementById(`subtasks-progress${i}`);
  subProgressBar.innerHTML = '';
  let subTasksDone = tasks[i]['subTasksDone'];
  let checkedTrue = 0
  for (let j = 0; j < subTasksDone.length; j++) {
    if(subTasksDone[j].checked == true){
      checkedTrue++;
    }
  }
  let openSubTasks = tasks[i]['subtasks'].length;
  let percent = checkedTrue / openSubTasks * 100;
  subProgressBar.style.width = percent + '%';
  updateDoneSubs(i, checkedTrue)
}


/**
 * Updates the information about completed subtasks for a given task.
 * @param {number} i - The index of the task.
 * @param {number} checkedTrue - The number of subtasks that are checked (completed).
 */
function updateDoneSubs(i, checkedTrue){
  if(checkedTrue == undefined){
    document.getElementById(`subsDoneOfAll${i}`).innerHTML = '0';
  }else{
    document.getElementById(`subsDoneOfAll${i}`).innerHTML =`${checkedTrue}`;
  }
  let subTasksDone = tasks[i]['subTasksDone'];
  let subInfo = document.getElementById(`subtasks-info${i}`);
  subInfo.innerHTML = ``;
  subInfo.innerHTML = `${checkedTrue} von ${subTasksDone.length} Subtasks erledigt.`;

}


/**
 * Displays information about subtasks for a given task.
 * @param {number} i - The index of the task.
 */
function showSubInfo(i){
  let subInfo = document.getElementById(`subtasks-info${i}`);
  subInfo.style.display = 'block';
}


/**
 * Hides information about subtasks for a given task.
 * @param {number} i - The index of the task.
 */
function hideSubInfo(i){
  let subInfo = document.getElementById(`subtasks-info${i}`);
  subInfo.style.display = 'none';
}


/**
 * Initiates the dragging process for a todo card element.
 * @param {number} i - The index of the todo card being dragged.
 */
function startDragging(i){
 currentDraggedElement = i;
 document.getElementById(`todo-card${i}`).classList.add('todo-card-dragging');
 showDragHereContainer();
}


/**
 * Ends the dragging process for a todo card element.
 * @param {number} i - The index of the todo card being dragged.
 */
function stopDragging(i){
  document.getElementById(`todo-card${i}`).classList.remove('todo-card-dragging');
}


/**
 * Displays the "Drag Here" container.
 */
function showDragHereContainer(){
  let dragContainer = document.getElementsByClassName('drag-here-container');
  for (let i = 0; i < dragContainer.length; i++) {
      const element = dragContainer[i];
      element.style.display = 'flex';
    }
}


/**
 * Hides the "Drag Here" container.
 */
function hideDragHereContainer(){
  let dragContainer = document.getElementsByClassName('drag-here-container');
  for (let i = 0; i < dragContainer.length; i++) {
      const element = dragContainer[i];
      element.style.display = 'none'
    }
}


/**
 * Allows dropping elements into a drop zone.
 * @param {Event} ev - The dragover event.
 */
function allowDrop(ev){
  ev.preventDefault();
}


/**
 * Moves the current dragged element to a new status.
 * @param {string} status - The status to move the element to.
 */
function moveTo(status){
  hideDragHereContainer();
  tasks[currentDraggedElement]['status'] = status;
  setItem('tasks', JSON.stringify(tasks));
  refreshTasks();
  renderTasks();
}


/**
 * Pushes assigned editor details to a task.
 * @param {number} index - The index of the task.
 * @param {string} initials - The initials of the assigned editor.
 * @param {string} userColor - The color associated with the assigned editor.
 * @param {string} firstName - The first name of the assigned editor.
 * @param {string} lastName - The last name of the assigned editor.
 * @param {string} userId - The ID of the assigned editor.
 */
function pushAssignedTo(index, initials, userColor, firstName, lastName, userId){
  let assignedToTask = {
    firstName: firstName,
    lastName: lastName,
    initials: initials,
    userColor: userColor,
    userId: userId
  };
  tasks[index]['assignedTo'].push(assignedToTask);
  renderAssignedToCards(index);
}


/**
 * Renders assigned editor cards for a task.
 * @param {number} index - The index of the task.
 */
function renderAssignedToCards(index){
  let showAssignedEditors = document.getElementById('show-assigned-editors-container');
  for (let i = 0; i < tasks[index]['assignedTo'].length; i++) {
    const checkedEditor = tasks[index]['assignedTo'][i];
    let initials = checkedEditor.initials;
    let userColor = checkedEditor.userColor;
    showAssignedEditors.innerHTML += generateAssignedTo(i, userColor, initials);
  }
}


/**
 * Displays the priority of a task.
 * @param {number} i - The index of the task.
 */
function showPrio(i){
 let newPrio = tasks[i]['prio'];
 if(newPrio == 'urgent'){
    document.getElementById(newPrio).style.backgroundColor = "#FF3D00"
    }else if(newPrio == 'medium'){
    document.getElementById(newPrio).style.backgroundColor = "#FFA800"
    }else if(newPrio == 'low'){
    document.getElementById(newPrio).style.backgroundColor = "#7AE229"
  }
}


/**
 * Filters tasks based on the search input.
 */
function filterTasks() {
  let search = document.getElementById("search").value.toLowerCase();
  let searchSection = document.getElementById(`search-section`);
  let boardSection = document.getElementById('board-section');
  searchSection.innerHTML = '';
  refreshTasks();
  if (search == "") {
    boardSection.style.display = 'flex';
    searchSection.innerHTML = '';
    renderTasks();
  }else{
    FilteredTasks(search);
    checkIfNoTasksFound(searchSection);
  }
}


/**
 * Filters tasks based on the search input and renders filtered tasks.
 * @param {string} search - The search query.
 */
function FilteredTasks(search){ 
  refreshTasks();
  for (let i = 0; i < tasks.length; i++) {
    let title = tasks[i]['title'].toLowerCase();
    let description = tasks[i]['description'].toLowerCase();
    let boardSection = document.getElementById('board-section');
    let searchSection = document.getElementById(`search-section`);
    if (title.toLowerCase().includes(search)||description.toLowerCase().includes(search)) {
      boardSection.style.display = 'none';
      renderFilteredTasks(i);
    }
    
  }
}


function checkIfNoTasksFound(searchSection){
  if(searchSection.innerHTML == ''){
    searchSection.innerHTML = `<span>No tasks found</span>`;
  }
}


/**
 * Renders filtered tasks in the search section.
 * @param {number} i - The index of the task to render.
 */
function renderFilteredTasks(i){
  document.getElementById(`search-section`).innerHTML += generateTask(i);
  setPrioImg(i);
  updateDoneSubs(i);
  generateSubtasks(i);
  checkCategory(i);
  renderAssignedTo(i);
}


/**
 * Handles hover effect for buttons by changing their image source.
 * @param {string} id - The ID of the button.
 */
function hover(id) {
  const button = document.getElementById(id);
  const imageMap = {
    'edit-img': 'edit_hover_icon.png',
    'change-img': 'change_hover.png',
    'delete-img': 'delete_hover_icon.png'
  };

  button.setAttribute('src', `assets/img/${imageMap[id] || 'plus_hover_icon.png'}`);
}


/**
 * Handles unhover effect for buttons by restoring their original image source.
 * @param {string} id - The ID of the button.
 */
function unhover(id) {
  const button = document.getElementById(id);
  const imageMap = {
    'edit-img': 'edit_icon.png',
    'change-img': 'change_unhovered.png',
    'delete-img': 'delete_icon.png'
  };

  button.setAttribute('src', `assets/img/${imageMap[id] || 'plus_icon.png'}`);
}


/**
 * Prevents the event from bubbling up the DOM tree, stopping further propagation.
 * @param {Event} event - The event object.
 */
function doNotClose(event){
  event.stopPropagation();
}

/**
 * Listens for keydown events and prevents form submission when Enter key is pressed.
 * @param {Event} e - The keydown event object.
 */ 
window.addEventListener('keydown',function(e) {
  if (e.keyIdentifier=='U+000A' || e.keyIdentifier=='Enter' || e.keyCode==13) {
      if (e.target.nodeName=='INPUT' && e.target.type=='text') {
          e.preventDefault();

          return false;
      }
  }
}, true);


function checkForEnter(e){
  if(e.keyCode == 13 || e.which == 13){
    addSubtask();
  }
}