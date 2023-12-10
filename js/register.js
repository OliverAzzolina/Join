let users = [
    {'name': 'caramello', 'email': 'junus@test.de', 'password': 'test1234'}
];

function addUser() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    
    users.push({'name': name, 'email': email, 'password': password});

    showRegistrationSuccessMessage();  
}

function showRegistrationSuccessMessage() {
    alert("Sie haben sich erfolgreich registriert!");
    window.location.href = 'login.html';  // Weiterleitung zur signup.html
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
