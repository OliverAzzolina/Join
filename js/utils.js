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
    const usersJson = await getItem('users');
    let users = JSON.parse(usersJson);
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


function generateRandomColor(){
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    return "#" + randomColor
  }

function generateHeader(userInitials) {
    let header = document.getElementById("header-container");
    header.innerHTML = headerHTML(userInitials);
}

function generateSidebar() {
    let sidebar = document.getElementById("sidebar-container");
    sidebar.innerHTML = sidebarHTML();
}
  function logout() {
    localStorage.clear();
    window.location.href = 'index.html';
  }
