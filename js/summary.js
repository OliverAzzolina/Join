function init() {
    generateHeader();
    generateSidebar();
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

