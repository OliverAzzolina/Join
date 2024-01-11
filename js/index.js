function init() {
    generateLogin()
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