document.addEventListener("DOMContentLoaded", function () {
  init();
});

async function init() {
  generateHeader();
  generateSidebar();
  generateSummary();
}

function generateHeader() {
  let header = document.getElementById("header-container");
  header.innerHTML = headerHTML();
}

function generateSidebar() {
  let sidebar = document.getElementById("sidebar-container");
  sidebar.innerHTML = sidebarHTML();
}


async function getUserData() {
  let userId = localStorage.getItem("userId");
  userId = Number(userId);
  let usersJson = await getItem("users");
  let users = JSON.parse(usersJson);
  return users.find(user => user.userId === userId);
}


  

async function getTaskData() {
  let tasksJson = await getItem("tasks");
  console.log(JSON.parse(tasksJson));
  console.log(tasksJson);
  return JSON.parse(tasksJson);
}

async function generateSummary() {
    let main = document.getElementById("main-container");
    main.innerHTML = summaryHTML(await toDoCounter(), await doneCounter(), await urgentCounter(), await urgentDeadline(), await tibCounter(), await tipCounter(), await awaitingFeedbackCounter(), await greetingDaytime(), await userGreetingName());
}


async function toDoCounter() {
    let tasks = await getTaskData();
    let userId = localStorage.getItem("userId");
    
    let tasksInOpenStatus = tasks.filter((task) => {
        return (
            task.assignedTo && task.assignedTo.some((user) => user && user.userId === userId) &&
            task.status === "open" && task.status === "in-progress"
        );
    });
    
    let count = tasksInOpenStatus.length;
    return count;
}




async function doneCounter() {
    let tasks = await getTaskData();
    let userId = localStorage.getItem("userId");

    let tasksInProgressStatus = tasks.filter((task) => {
        return (
            task.assignedTo && task.assignedTo.some((user) => user && user.userId === userId) &&
            task.status === "done"
        );
    });
    
    let count = tasksInProgressStatus.length;
    return count;
}


async function urgentCounter() {
    let tasks = await getTaskData();
    let userId = localStorage.getItem("userId");

    let tasksInUrgentStatus = tasks.filter((task) => {
        return (
            task.assignedTo && task.assignedTo.some((user) => user && user.userId === userId) &&
            task.prio === "urgent"
        );
    });
    
    let count = tasksInUrgentStatus.length;
    return count;
}


async function urgentDeadline() {
    let tasks = await getTaskData();
    let urgentTasks = tasks.filter(task => task.prio === "urgent");

    let nearestUrgentTask = urgentTasks.reduce((prev, current) => {
        return (new Date(prev.duedate) < new Date(current.duedate)) ? prev : current;
    }, urgentTasks[0]);

    let duedateFormatted = formatDate(nearestUrgentTask.duedate);

    return duedateFormatted;
}

function formatDate(dateString) {
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let date = new Date(dateString);
    return date.toLocaleDateString('en-EN', options);
}



async function tibCounter() {
    let tasks = await getTaskData();
    let count = tasks.length;
    return count;
}


async function tipCounter() {
    let tasks = await getTaskData();
    let allTasksInProgressStatus = tasks.filter(task => task.status === "in-progress");
    let count = allTasksInProgressStatus.length;
    return count;
}



async function awaitingFeedbackCounter() {
    let tasks = await getTaskData();
    let allTasksInProgressStatus = tasks.filter(task => task.status === "await-feedback");
    let count = allTasksInProgressStatus.length;
    return count;
    return awaitingFeedbackCounter;
}


function greetingDaytime() {
    let today = new Date();
    let hour = today.getHours();
  
    let greetingText;
    if (hour >= 5 && hour < 12) {
      greetingText = "Good morning";
    } else if (hour >= 12 && hour < 17) {
      greetingText = "Good afternoon";
    } else {
      greetingText = "Good evening";
    }
    return greetingText;
}



async function userGreetingName() {
    user = await getUserData();
    let userGreetingName = user.firstName + user.lastName;    
    return userGreetingName;
}









//async function XXX() {
//  let tasks = await getTaskData();
//  let user = await getUserData();
//
//  generateToDoCounter(tasks, user);
//
//  //let toDoCounter = getElementById('to-do-counter');
//  //let doneCounter = getElementById('done-counter');
//  //let urgentCounter = getElementById('urgent-counter');
//  //let urgentDeadline = getElementById('urgent-deadline');
//  //let tibCounter = getElementById('tib-counter');
//  //let tipCounter = getElementById('tip-counter');
//  //let userGreetingName = getElementById('user-greeting-name');
//}
//
//async function generateToDoCounter(tasks, user) {
//  let userId = localStorage.getItem("userId");
//  let toDoCounter = document.getElementById("to-do-counter");
//  let tasksWithUserId = tasks.filter((task) => {
//    return task.assignedTo && task.assignedTo.some((user) => user && user.userId === userId);
//  });
//    toDoCounter.innerHTML = tasksWithUserId.length;
//}
//
//
//
//
//
function changeImage(element) {
  element.querySelector(".icon").src = "assets/img/todo_white_icon.png";
}

function resetImage(element) {
  element.querySelector(".icon").src = "assets/img/todo_black_icon.png";
}

function changeImageDoneRight(element) {
  element.querySelector(".icon").src = "assets/img/done_white_icon.png";
}

function resetImageDoneRight(element) {
  element.querySelector(".icon").src = "assets/img/done_black_icon.png";
}
//
//function getGreeting() {
//  let today = new Date();
//  let hour = today.getHours();
//
//  let greetingText = document.getElementById("greetingText");
//
//  if (hour >= 5 && hour < 12) {
//    greetingText.textContent = "Guten Morgen";
//  } else if (hour >= 12 && hour < 17) {
//    greetingText.textContent = "Guten Tag";
//  } else {
//    greetingText.textContent = "Guten Abend";
//  }
//}

//getGreeting();
