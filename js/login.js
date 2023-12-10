const urlParams = new URLSearchParams(window.location.search);
const msg = urlParams.get('msg');
if (msg) {
    msgBox.innerHTML = msg;
} else {
    msgBox.style.display = 'none';
}



function setupButtonListeners() {
    let guestLoginButton = document.getElementById('guestLoginButton');
    if (guestLoginButton) {
        guestLoginButton.addEventListener('click', function() {
            window.location.href = 'summary.html';
        });
    }

    let signUpButton = document.getElementById('signUpButton');
    if (signUpButton) {
        signUpButton.addEventListener('click', function() {
            window.location.href = 'register.html';
        });
    }
}

document.addEventListener('DOMContentLoaded', setupButtonListeners);


function login() { 
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let user = users.find(u => u.email === email && u.password === password);

    if (user) {
        console.log('user gefunden');
        window.location.href = 'summary.html?msg=Du hast dich erfolgreich eingeloggt';
    } else {
        console.log('Login fehlgeschlagen');
        alert('Login fehlgeschlagen: Ungültige E-Mail-Adresse oder Passwort.');

    }
}