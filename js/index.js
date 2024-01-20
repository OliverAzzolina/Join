function init() {
    generateLogin()
}

async function changeToRegister() {
    removeInitFadeIn();
    toggleFadeIn('login-container');
    toggleFadeOut('login-container');
    await new Promise(r => setTimeout(r, 500));
    generateRegister();
    toggleFadeIn('signup-container');
}

async function switchToLogin() {
    toggleFadeIn('signup-container');
    toggleFadeOut('signup-container');
    await new Promise(r => setTimeout(r, 500));
    generateLogin();
    removeLogoTransition();
    toggleFadeIn('login-container');
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

//HTML GENERATION
function generateLogin() {
    let mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = loginHTML();
  }

function generateRegister() {
    let mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = registerHTML();
}