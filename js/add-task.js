document.addEventListener('DOMContentLoaded', function () {
  addEventListener();
  loadContactsFromStorage();
});

selectedPriority = '';
subtaskTempArray = [];


function addEventListener() {
  btnEventListener();
  subtaskInputEventListener();
  subtaskInputKeypressEventListener();
}

function btnEventListener() {
  document.querySelectorAll('.add-task-form-btn').forEach(function (button) {
    button.addEventListener('click', function () {
      selectedPriority = this.getAttribute('task-priority');
      highlightSelectedButton(this); //TODO: highlightSelectedButton()
    });
  });
}

function subtaskInputEventListener() {
  input = document.getElementById("add-task-subtask-input");
  icons = document.getElementById("add-task-create-subtask-icon-box");
  activeIcons = document.getElementById("add-task-active-subtask-icon-box");
  input.addEventListener('input', function () {
    if (input.value.length > 0) {
      icons.classList.add("d-none");
      activeIcons.classList.remove("d-none");
    } else {
      icons.classList.remove("d-none");
      activeIcons.classList.add("d-none");
    }
  })
}

function subtaskInputKeypressEventListener() {
  var input = document.getElementById("add-task-subtask-input");

  input.addEventListener('keypress', function (event) {
    if (event.key === 'Enter' && input.value.length > 0) {
      event.preventDefault();
      addSubtask();
    }
  });
}

function updateSubtaskListeners() {
  var subtaskElements = document.querySelectorAll('.add-task-subtask');

  subtaskElements.forEach(function(subtaskElement) {
      var icons = subtaskElement.querySelector('.add-task-subtask-icons');

      subtaskElement.addEventListener('mouseover', function() {
          icons.style.opacity = 1;
      });

      subtaskElement.addEventListener('mouseout', function() {
          icons.style.opacity = 0;
      });
  });
}


function setFocusSubtaskInput() {
  input = document.getElementById("add-task-subtask-input");
  input.focus();
}


function clearSubtaskInput() {
  input = document.getElementById("add-task-subtask-input");
  icons = document.getElementById("add-task-create-subtask-icon-box");
  activeIcons = document.getElementById("add-task-active-subtask-icon-box");

  input.value = '';
  icons.classList.remove("d-none");
  activeIcons.classList.add("d-none");
  setFocusSubtaskInput();
}


function addSubtask() {
  var input = document.getElementById("add-task-subtask-input");
  var subtaskContainer = document.getElementById("add-task-subtasks-container");
  subtaskTempArray.push(input.value);
  clearSubtaskInput();
  subtaskContainer.innerHTML = '';
  subtaskTempArray.forEach((subtask, index) => {
    subtaskContainer.innerHTML += subtaskHTML(subtask, index);
  });
  setupEditableP(subtaskContainer);
  updateSubtaskListeners();
}

function removeSubtask(index) {
  var subtaskContainer = document.getElementById("add-task-subtasks-container");
  subtaskTempArray.splice(index, 1)
  subtaskContainer.innerHTML = '';
  subtaskTempArray.forEach((subtask, index) => {
    subtaskContainer.innerHTML += subtaskHTML(subtask, index);
  });
  setupEditableP(subtaskContainer);
}

function generateSubtaskElement(subtask, index) {
  let subtaskContainer = document.getElementById("add-task-subtasks-container");
  subtaskContainer.innerHTML = "";
  subtaskContainer.innerHTML += subtaskHTML(subtask, index)
}



function setupEditableP(container) {
  container.addEventListener('dblclick', function (event) {
    var subtaskElement = event.target.closest('.add-task-subtask');
    if (subtaskElement) {
      var editableP = subtaskElement.querySelector('.editable');
      if (editableP) {
        convertPToInput(editableP);
      }
    }
  });
}




function convertPToInput(pElement) {
  var originalText = pElement.innerText.replace('• ', '');
  var inputField = document.createElement("input");
  inputField.type = "text";
  inputField.value = originalText;
  inputField.className = "editable-input";

  inputField.addEventListener("blur", function () {
    convertInputToP(inputField);
  });

  inputField.addEventListener("keypress", function (event) {
    if (event.key === 'Enter') {
      inputField.blur();
    }
  });

  pElement.parentNode.replaceChild(inputField, pElement);
  inputField.focus();
}


function convertInputToP(inputElement) {
  var updatedText = '• ' + inputElement.value;
  var newP = document.createElement("p");
  newP.innerText = updatedText;
  newP.classList.add("editable");
  inputElement.parentNode.replaceChild(newP, inputElement);
}


















function highlightSelectedButton(selectedButton) {
  // TODO: highlight the btn
}

function addTask() {
  event.preventDefault(); // Prevent the page from reloading

  var taskData = {
    title: document.getElementById('add-task-title-input').value,
    description: document.getElementById('add-task-description-input').value,
    priority: selectedPriority,
    dueDate: document.getElementById('add-task-date-input').value,
    category: document.querySelectorAll('.add-task-form-dropdown')[0].value,
    assignedTo: document.querySelectorAll('.add-task-form-dropdown')[1].value,
    subtasks: JSON.stringify(subtaskTempArray)
  };

  console.log(taskData);
}


//LOAD Storage
async function loadContactsFromStorage() {
  try {
    contacts = JSON.parse(await getItem('contacts'));
  } catch (e) {
    console.warn('loading error:', e)
  }
  sortContacts();
  loadContacts();
}

//SORT Contacts
function sortContacts() {
  contacts.sort((a, b) => {
    if (a.name.toUpperCase() < b.name.toUpperCase()) {
      return -1;
    } else if (a.name.toUpperCase() > b.name.toUpperCase()) {
      return 1;
    } else {
      return 0;
    }
  });
}

function showDropdownContacts() {
  let dropdown = document.getElementById('assigned-editors');
  if (dropdown.style.display == 'none') {
    dropdown.style.display = 'block';
  } else {
    dropdown.style.display = 'none';
  }
}


function showDropdownContacts() {
  let dropdown = document.getElementById('assigned-editors');
  if (dropdown.style.display == 'none') {
    dropdown.style.display = 'block';
    clearAssignedTo();
  } else {
    dropdown.style.display = 'none';
    addAssignedEditors();
  }
}


function addAssignedEditors() {
  let showAssignedEditors = document.getElementById('show-assigned-editors-container');
  for (let i = 0; i < contacts.length; i++) {
    const checkedEditor = contacts[i];
    let randomColor = '#' + checkedEditor['randomColor'];
    let initials = checkedEditor['name'].split(" ").map((n) => n[0]).join("");
    let checkbox = document.getElementById(`checkbox${i}`).checked;
    if (checkbox == true) {
      showAssignedEditors.innerHTML += `
      <div id="editor${i}" class="drop-initials" style="background-color: ${randomColor}">${initials}</div>
      `;
    }
  }
}


function clearAssignedTo() {
  document.getElementById('show-assigned-editors-container').innerHTML = '';
}


function setUnAssigned(i) {
  let assignedContact = document.getElementById(`assigned-contact${i}`);
  let checkImg = document.getElementById(`checked${i}`);
  assignedContact.style = "color: black";
  checkImg.src = "/assets/img/icons/check_button.png";
}


function doNotClose(event) {
  event.stopPropagation();
}


function checkIfAssigned(i) {
  let checkbox = document.getElementById(`checkbox${i}`).checked;

  if (checkbox == false) {
    setUnAssigned(i);
  }

  if (checkbox == true) {
    setAssigned(i);
  }
}


//LOAD Contacts
function loadContacts() {
  let contactList = document.getElementById('assigned-editors');
  for (let i = 0; i < contacts.length; i++) {
    let initials = contacts[i]['name'].split(" ").map((n) => n[0]).join("");
    let randomColor = '#' + contacts[i]['randomColor'];
    let name = contacts[i]['name'];
    contactList.innerHTML += `
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
  sortContacts();
}

function setAssigned(i) {
  let assignedContact = document.getElementById(`assigned-contact${i}`);
  let checkImg = document.getElementById(`checked${i}`);
  assignedContact.style = "background-color: #2A3647; color: white; border-radius: 10px"
  checkImg.src = "/assets/img/icons/check_button_checked.png";
}