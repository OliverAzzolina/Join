document.addEventListener('DOMContentLoaded', function () {
    btnEventListener();
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
