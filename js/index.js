function init() {
    generateLogin()
}

async function changeToRegister() {
    toggleFadeIn('login-container');
    toggleFadeOut('login-container');
    await new Promise(r => setTimeout(r, 500));
    generateRegister();
    toggleFadeIn('signup-container');
}

function toggleFadeOut(target) {
    registerContainer = document.getElementById(target);
    if (registerContainer.classList.contains('fade-out')) {
        registerContainer.classList.remove('fade-out');
    } else {
        registerContainer.classList.add('fade-out');
    }
}

function toggleFadeIn(target) {
    registerContainer = document.getElementById(target);
    if (registerContainer.classList.contains('fade-in')) {
        registerContainer.classList.remove('fade-in');
    } else {
        registerContainer.classList.add('fade-in');
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