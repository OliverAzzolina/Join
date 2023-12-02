let users = [
    {'name': 'caramello', 'email': 'junus@test.de', 'password': 'test1234'}
];

function addUser() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    
    users.push({'name': name, 'email': email, 'password': password});

    window.location.href = 'login.html?msg=Du hast dich erfolgreich registriert';
}

function setupLoginButtonListener() {
    let loginButton = document.getElementById('loginButton');
    if (loginButton) {
        loginButton.addEventListener('click', function() {
            window.location.href = 'login.html';
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupLoginButtonListener();
});