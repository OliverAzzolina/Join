document.addEventListener('DOMContentLoaded', function () {
    btnEventListener();
    loadContactsFromStorage();
});

var selectedPriority = '';

function btnEventListener() {
    document.querySelectorAll('.add-task-form-btn').forEach(function (button) {
        button.addEventListener('click', function () {
            selectedPriority = this.getAttribute('task-priority');
            highlightSelectedButton(this); //TODO: highlightSelectedButton()
        });
    });
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
        subtasks: document.querySelector('.add-task-form-input[type="text"]').value
    };

    console.log(taskData);
}


// CONTACT LIST LOGIC
async function loadContactsFromStorage() {
    try {
        contacts = JSON.parse(await getItem('contacts'));
    } catch (e) {
        console.warn('loading error:', e)
    }
    sortContacts();
    loadContacts();
}


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


function loadContacts() {
    let contactList = document.getElementById('add-task-contact-list-dropdown');
    for (let i = 0; i < contacts.length; i++) {
        let name = contacts[i]['name'];
        contactList.appendChild(addContactToDropdown(i, name));
    }
}


function addContactToDropdown(i, name) {
    let option = document.createElement('option');
    option.value = `contact_${i}`;
    option.textContent = name;
    return option;
}