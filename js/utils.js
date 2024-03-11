/**
 * Toggles the display of the header-dropdown menu.
 */
function toggleDropdown() {
    var dropdown = document.getElementById("dropdownMenu");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}


/**
 * Generates a random 6-digit user ID.
 * @returns {Promise<number>} A promise that resolves to the generated 6-digit user ID.
 */
async function generateRandomId() {
    newUserId = Math.floor(100000 + Math.random() * 900000)
    if (!await checkIfUserIdAlreadyExists(newUserId)) {
        return newUserId;
    } else {
    }
}


/**
 * Checks if a user ID already exists in the user array.
 * @param {number} newUserId - The user ID to check.
 * @returns {Promise<boolean>} A promise that resolves to true if the user ID already exists, otherwise false.
 */
async function checkIfUserIdAlreadyExists(newUserId) {
    let users = await getUserArray()
    let user = users.find(user => user.userId === newUserId);
    if (user) {
        return true;
    } else {
        return false;
    }
}


/**
 * Adds a click event listener to redirect to the summary page when the mobile logo is clicked.
 * @param {Event} e - The click event object.
 */
document.addEventListener('click', function(e) {
    if (e.target && e.target.id == 'mobile-logo') {
        // Weiterleitung zur 'summary.html'-Seite
        window.location.href = 'summary.html';
    }
});

/**
 * Clears the data stored in the local storage and reloads the page.
 */
function clearDataBase() {
    localStorage.clear();
    location.reload();
}



/**
 * Generates a random hexadecimal color code.
 * @returns {string} A random hexadecimal color code.
 */
async function generateRandomColor() {
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    while (randomColor.length < 6) {
        randomColor = "0" + randomColor;
    }
    return "#" + randomColor;
}


/**
 * Generates the header.
 * If the user is logged in, it displays the header with user initials.
 * If the user is not logged in, it displays the header for logged out state.
 * 
 * @param {string} userInitials - The initials of the logged-in user.
 */
async function generateHeader(userInitials) {
    let header = document.getElementById("header-container");
    if (await userIsLoggedIn()) {
        header.innerHTML = headerHTML(userInitials);
    } else {
        header.innerHTML = headerLoggedOutHTML();
    }
}


/**
 * Generates the sidebar.
 * If the user is logged in, it displays the sidebar with logged-in user options.
 * If the user is not logged in, it displays the sidebar for logged-out state.
 */
async function generateSidebar() {
    let sidebar = document.getElementById("sidebar-container");
    if (await userIsLoggedIn()){
        sidebar.innerHTML = sidebarHTML();
    } else {
        sidebar.innerHTML = sidebarLoggedOutHTML();
    }
}


/**
 * Checks if the user is logged in by verifying if the userId is stored in the localStorage.
 * Placeholder function for user authentication once we know how a Backend will handle user authentication.
 * @returns {boolean} True if the user is logged in, otherwise false.
 */
async function userIsLoggedIn() {
    if (await localStorage.getItem('userId') === null) {
        return false;
    } else {
        return true;
    }
}


/**
 * Checks if the user is allowed to access the current page by verifying if they are logged in.
 * If not logged in, redirects the user to the index page.
 */
async function userIsAllowed() {
    if (!await userIsLoggedIn()) {
        window.location.href = 'index.html';
    }
}


/**
 * Logs out the user by clearing local storage and redirecting them to the index page.
 */
function logout() {
    localStorage.clear();
    window.location.href = 'index.html';
  }


/**
 * Redirects the user to the summary page if logged in, otherwise to the index page.
 */
async function goHome() {
    if (await userIsLoggedIn()) {
        window.location.href = 'summary.html';
    } else {
        window.location.href = 'index.html';
    }
}


/**
 * Displays a message overlay with the given message for a short period of time.
 * @param {string} message - The message to be displayed in the overlay.
 */
function showMessageOverlay(message){
    let messageOverlay = document.getElementById("message");
    messageOverlay.style.display = "flex";
    messageOverlay.innerHTML = `<span>${message}</span><img src="assets/img/sidebar_board_icon.svg" alt="">`;
    setTimeout(() => {
        messageOverlay.style.display = "none";
      }, "2000");
}

