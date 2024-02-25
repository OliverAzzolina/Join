function toggleDropdown() {
    var dropdown = document.getElementById("dropdownMenu");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}


async function generateRandomId() {
    newUserId = Math.floor(100000 + Math.random() * 900000)
    if (!await checkIfUserIdAlreadyExists(newUserId)) {
        return newUserId;
    } else {
    }
}

async function checkIfUserIdAlreadyExists(newUserId) {
    let users = await getUserArray()
    let user = users.find(user => user.userId === newUserId);
    if (user) {
        return true;
    } else {
        return false;
    }
}


function clearDataBase() {
    localStorage.clear();
    location.reload();
}


async function generateRandomColor(){
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    return "#" + randomColor
  }

async function generateHeader(userInitials) {
    let header = document.getElementById("header-container");
    if (await userIsLoggedIn()) {
        header.innerHTML = headerHTML(userInitials);
    } else {
        header.innerHTML = headerLoggedOutHTML();
    }
}


async function generateSidebar() {
    let sidebar = document.getElementById("sidebar-container");
    if (await userIsLoggedIn()){
        sidebar.innerHTML = sidebarHTML();
    } else {
        sidebar.innerHTML = sidebarLoggedOutHTML();
    }
}

async function userIsLoggedIn() {
    if (await localStorage.getItem('userId') === null) {
        return false;
    } else {
        return true;
    }
}

async function userIsAllowed() {
    if (!await userIsLoggedIn()) {
        window.location.href = 'index.html';
    }
}

function logout() {
    localStorage.clear();
    window.location.href = 'index.html';
  }


async function goHome() {
    if (await userIsLoggedIn()) {
        window.location.href = 'summary.html';
    } else {
        window.location.href = 'index.html';
    }
}


function showMessageOverlay(message){
    let messageOverlay = document.getElementById("message");
    messageOverlay.style.display = "flex";
    messageOverlay.innerHTML = `${message} <img src="assets/img/sidebar_board_icon.svg" alt="">`;
    setTimeout(() => {
        messageOverlay.style.display = "none";
      }, "2000");
}

