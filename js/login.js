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



//const urlParams = new URLSearchParams(window.location.search);
//const msg = urlParams.get('msg');
//if (msg) {
//    msgBox.innerHTML = msg;
//} else {
//    msgBox.style.display = 'none';
//}
//
//
//
//function setupButtonListeners() {
//    let guestLoginButton = document.getElementById('guestLoginButton');
//    if (guestLoginButton) {
//        guestLoginButton.addEventListener('click', function() {
//            window.location.href = 'summary.html';
//        });
//    }
//
//    let signUpButton = document.getElementById('signUpButton');
//    if (signUpButton) {
//        signUpButton.addEventListener('click', function() {
//            window.location.href = 'register.html';
//        });
//    }
//}
//
//document.addEventListener('DOMContentLoaded', setupButtonListeners);
//
//
//function login() { 
//    let email = document.getElementById('email').value;
//    let password = document.getElementById('password').value;
//    let user = users.find(u => u.email === email && u.password === password);
//
//    if (user) {
//        console.log('user gefunden');
//        window.location.href = 'summary.html?msg=Du hast dich erfolgreich eingeloggt';
//    } else {
//        console.log('Login fehlgeschlagen');
//        alert('Login fehlgeschlagen: Ungültige E-Mail-Adresse oder Passwort.');
//
//    }
//}