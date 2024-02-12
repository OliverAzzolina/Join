document.addEventListener('DOMContentLoaded', function () {
    init();
  });

function init() {
    generateLogin();
    loadLoginListeners();
    checkRemoteStorage();
}

function generateLogin() {
    let mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = loginHTML();
}

function loadLoginListeners() {
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();
        loginUser();
    });
}

async function loginUser() {
    let email = document.getElementById('email-input').value.trim();
    let password = document.getElementById('password-input').value.trim();
    let user = await findUser(email, password);
    if (user) {
        console.log('User found:', user.email);
        localStorage.setItem("userId", user.userId);
        window.location.href = 'summary.html';
    } else {
        console.error('User not found.');
    }
}


async function findUser(email, password) {
    let usersJson = await getItem('users');
    let users = JSON.parse(usersJson);
    return users.find(user => user.email === email && user.password === password);
    
}


// CHECK REMOTE STORAGE

async function checkRemoteStorage() {
    await checkRemoteStorageUsers();
    await checkRemoteStorageTasks();
}

async function checkRemoteStorageUsers() {
    try {
        let usersJson = await getItem('users');
        if (usersJson && usersJson !== "undefined") {
            let users = JSON.parse(usersJson);
            if (!users || users.length < 1) {
                throw new Error("Users array is empty.");
            }
        } else {
            throw new Error("Users array did not exist. Creating new array. Please reload the page.");
        }
    } catch (error) {
        console.log(error.message);
        let users = JSON.stringify(rescueUserArray);
        await setItem('users', users);
    }
}

async function checkRemoteStorageTasks() {
    try {
        let tasksJson = await getItem('tasks');
        if (tasksJson && tasksJson !== "undefined") {
            let tasks = JSON.parse(tasksJson);
            if (!tasks || tasks.length < 1) {
                throw new Error("Tasks array is empty.");
            }
        } else {
            throw new Error("Tasks array did not exist. Creating new array. Please reload the page.");
        }
    } catch (error) {
        console.log(error.message);
        let tasks = JSON.stringify(rescueTaskArray);
        await setItem('tasks', tasks);
    }
}


// TEMPLATE SWITCH
async function switchToRegister() {
    removeInitFadeIn();
    toggleFadeIn('login-container');
    toggleFadeOut('login-container');
    await new Promise(r => setTimeout(r, 500));
    generateRegister();
    toggleFadeIn('signup-container');
    loadRegisterListeners();
}

async function switchToLogin() {
    toggleFadeIn('signup-container');
    toggleFadeOut('signup-container');
    await new Promise(r => setTimeout(r, 500));
    generateLogin();
    removeLogoTransition();
    toggleFadeIn('login-container');
    loadLoginListeners();
}


function removeLogoTransition() {
    logo = document.getElementById('logo');
    logo.classList.remove('logo-animation');
}


function removeInitFadeIn() {
    container = document.getElementById('login-container');
    container.classList.remove('fade-out');
}

function toggleFadeOut(target) {
    registerContainer = document.getElementById(target);
    if (container.classList.contains('fade-out')) {
        container.classList.remove('fade-out');
    } else {
        container.classList.add('fade-out');
    }
}

function toggleFadeIn(target) {
    container = document.getElementById(target);
    if (container.classList.contains('fade-in')) {
        container.classList.remove('fade-in');
    } else {
        container.classList.add('fade-in');
    }
}


function generateRegister() {
    let mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = registerHTML();
}


function loadRegisterListeners() {
    document.getElementById('registration-Form').addEventListener('submit', function(event) {
        event.preventDefault();

        if (validateForm()) {
            registerUser();
        }
    });
}



// REGISTER FORM VALIDATION

function validateForm() {
    return validateName() && validateEmail() && validatePassword() && validatePrivacyCheckbox();
}



function validateName() {
    let name = document.getElementById('name').value.trim();
    if (!/^[A-Za-z]{3,}\s[A-Za-z]{3,}$/.test(name)) {
        inputAlert('name', 'Two words (Firstname Lastname), minimum 3 letters each.');
        return false;
    }
    removeInputAlert('name');
    return true;
}


function validateEmail() {
    let email = document.getElementById('email').value.trim();
    if (!/\S+@\S+\.\S+/.test(email)) {
        inputAlert('email', 'Please enter a valid email address.');
        return false;
    }
    removeInputAlert('email');
    return true;
}


function validatePassword() {
    let password = document.getElementById('password').value.trim();
    let confirmPassword = document.getElementById('confirmPassword').value.trim();
    if (password.length < 6) {
        inputAlert('password', 'Password must be at least 6 characters long.');
        return false;
    }
    if (password !== confirmPassword) {
        inputAlert('confirmPassword', 'Passwords do not match.');
        return false;
    }
    removeInputAlert('password');
    removeInputAlert('confirmPassword');
    return true;
}


function validatePrivacyCheckbox() {
    let privacyCheckbox = document.getElementById('privacy-checkbox');
    if (!privacyCheckbox.checked) {
        checkboxAlert('You must accept the Privacy Policy.');
        return false;
    }
    removeInputAlert('privacy-checkbox');
    return true;
}


// VALIDATION ALERTS
function inputAlert(inputId, message) {
    let inputElement = document.getElementById(inputId);
    let errorElement = document.createElement('p');
    errorElement.classList.add('error-message');
    errorElement.textContent = message;
    let existingError = inputElement.nextElementSibling;
    if (existingError && existingError.classList.contains('error-message')) {
        inputElement.parentNode.removeChild(existingError);
    }
    inputElement.insertAdjacentElement('afterend', errorElement);
}

function checkboxAlert(message) {
    let checkboxGroup = document.getElementById('register-checkbox-group');
    let errorElement = document.createElement('p');
    errorElement.classList.add('error-message');
    errorElement.textContent = message;

    let existingError = checkboxGroup.querySelector('.error-message');
    if (existingError) {
        checkboxGroup.removeChild(existingError);
    }

    checkboxGroup.appendChild(errorElement);
}

function removeInputAlert(inputId) {
    let inputElement = document.getElementById(inputId);
    let errorElement = inputElement.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        inputElement.parentNode.removeChild(errorElement);
    }
}

function removeInputAlert(inputId) {
    let inputElement = document.getElementById(inputId);
    let parentElement = inputElement.closest('.form-group') || inputElement.closest('.checkbox-group');
    let errorElement = parentElement.querySelector('.error-message');
    if (errorElement) {
        parentElement.removeChild(errorElement);
    }
}

function removeAllAlerts() {
    let errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.parentNode.removeChild(element);
    });
}


// REGISTER LOGIC
function registerUser() {
    let [firstName, lastName = ''] = document.getElementById('name').value.trim().split(" ");
    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value.trim();
    let confirmPassword = document.getElementById('confirmPassword').value.trim();

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    let userData = {
        email: email,
        firstName: firstName,
        initials: `${firstName[0]}${lastName[0]}`,
        lastName: lastName,
        password: password,
        phone: null,
        userColor: generateRandomColor(),
        userContacts: rescueUserArray,
        userId: generateRandomId(),

    };
    addUserToDatabase(userData);
    
}


async function addUserToDatabase(userData) {
        const usersJson = await getItem('users');
        let users = JSON.parse(usersJson);

        addUserToUserContacts(userData);
        users.push(userData);
        await setItem('users', JSON.stringify(users));
        console.log('User successfully registered.');
}

function addUserToUserContacts(userData){
    let userContactCard = {
    firstName: userData.firstName,
    lastName: userData.lastName+'(Me)',
    initials: userData.initials,
    email: userData.email,
    phone: userData.phone,
    userColor: userData.userColor,
    userId: userData.userId,
    }
    userData.userContacts.push(userContactCard);
}
















// DELETE LATER ON!!!
function fillForm() {
    document.getElementById('name').value = 'Max Mustermann';
    document.getElementById('email').value = 'max.mustermann@example.com';
    document.getElementById('password').value = 'password123';
    document.getElementById('confirmPassword').value = 'password123';
    document.getElementById('privacy-checkbox').checked = true;
}
