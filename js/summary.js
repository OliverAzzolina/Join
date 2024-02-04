function init() {
    generateHeader();
    generateSidebar();
}

async function getUserData() {
    let userId = localStorage.getItem("userId");
    let usersJson = await getItem('users');
    let users = JSON.parse(usersJson);
    return users.find(user => user.userId === userId);
}

async function getTaskData() {
    let tasksJson = await getItem('tasks');
    console.log(JSON.parse(tasksJson));
    return JSON.parse(tasksJson);
}

async function generateSummary() {
    let tasks = await getTaskData()
    let user = await getUserData()
    let toDoCounter = getElementById('to-do-counter');
    let doneCounter = getElementById('done-counter');
    let urgentCounter = getElementById('urgent-counter');
    let urgentDeadline = getElementById('urgent-deadline');
    let tibCounter = getElementById('tib-counter');
    let tipCounter = getElementById('tip-counter');
    let userGreetingName = getElementById('user-greeting-name');

    
}












function generateHeader() {
    var header = document.getElementById('header-container');
    header.innerHTML = headerHTML();
  }
  
  function generateSidebar() {
    var sidebar = document.getElementById('sidebar-container');
    sidebar.innerHTML = sidebarHTML();
  }

function changeImage(element) {
    element.querySelector('.icon').src = "assets/img/todo_white_icon.png";
}

function resetImage(element) {
    element.querySelector('.icon').src = "assets/img/todo_black_icon.png";
}

function changeImageDoneRight(element) {
    element.querySelector('.icon').src = "assets/img/done_white_icon.png"; 
}

function resetImageDoneRight(element) {
    element.querySelector('.icon').src = "assets/img/done_black_icon.png";
}

function getGreeting() {
    let today = new Date();
    let hour = today.getHours();

    let greetingText = document.getElementById('greetingText');

    if (hour >= 5 && hour < 12) {
        greetingText.textContent = 'Guten Morgen';
    } else if (hour >= 12 && hour < 17) {
        greetingText.textContent = 'Guten Tag';
    } else {
        greetingText.textContent = 'Guten Abend';
    }
}


getGreeting();

