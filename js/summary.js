document.addEventListener("DOMContentLoaded", function () {
  init();
});

async function init() {
  await userIsAllowed();
  await generateSidebar();
  await generateSummary();
  await loadUserData();
  generateHeader(userInitials);
}


async function getUserData() {
  let userId = Number(localStorage.getItem("userId"));

  if (!userId) {
    window.location.href = "index.html";
    return null;
  }
  let users = await getUserArray()
  const userWithSameId = users.find(user => user.userId === userId);
  return userWithSameId;
}


async function generateSummary() {
    let main = document.getElementById("main-container");
    main.innerHTML = summaryHTML(await toDoCounter(), await doneCounter(), await urgentCounter(), await urgentDeadline(), await tibCounter(), await tipCounter(), await awaitingFeedbackCounter(), await greetingDaytime(), await userGreetingName());
}




async function toDoCounter() {
  let tasks = await getTaskArray();
  let userId = parseInt(localStorage.getItem("userId"), 10);
  
  let tasksInOpenStatus = tasks.filter((task) => {
    return (
        task.assignedto && task.assignedto.some((user) => user.userId && parseInt(user.userId, 10) === userId) &&
        (task.status === "open" || task.status === "in-progress")
        //TODO: Change back to assignedTo as soon as typo gets out of task array
    );
  });

  tasksInOpenStatus.forEach(task => {
    console.log(task);
  });

  let count = tasksInOpenStatus.length;
  return count;
}






async function doneCounter() {
    let tasks = await getTaskArray();
    let userId = parseInt(localStorage.getItem("userId"), 10);

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
    let tasks = await getTaskArray();
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
    let tasks = await getTaskArray();
    let urgentTasks = tasks.filter(task => task.prio === "urgent");

    let nearestUrgentTask = urgentTasks.reduce((prev, current) => {
        return (new Date(prev.dueDate) < new Date(current.dueDate)) ? prev : current;
    }, urgentTasks[0]);

    let dueDateFormatted = formatDate(nearestUrgentTask.dueDate);

    return dueDateFormatted;
}

function formatDate(dateString) {
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let date = new Date(dateString);
    return date.toLocaleDateString('en-EN', options);
}



async function tibCounter() {
    let tasks = await getTaskArray();
    let count = tasks.length;
    return count;
}


async function tipCounter() {
    let tasks = await getTaskArray();
    let allTasksInProgressStatus = tasks.filter(task => task.status === "in-progress");
    let count = allTasksInProgressStatus.length;
    return count;
}



async function awaitingFeedbackCounter() {
    let tasks = await getTaskArray();
    let allTasksInProgressStatus = tasks.filter(task => task.status === "await-feedback");
    let count = allTasksInProgressStatus.length;
    return count;
}


function greetingDaytime() {
    let today = new Date();
    let hour = today.getHours();
  
    let greetingText;
    if (hour >= 5 && hour < 12) {
      greetingText = "Guten Morgen";
    } else if (hour >= 12 && hour < 17) {
      greetingText = "Guten Tag";
    } else {
      greetingText = "Guten Abend";
    }
    return greetingText;
}

async function userGreetingName() {
  let user = await getUserData();
  if (!user) {
    console.log("User not found.");
    return "User not found";
  }
  if (user.firstName && !user.lastName) {
      return user.firstName;
  } else if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
  }
}





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
