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

async function guestLogin() {
    let usersJson = await getItem('users');
    try {
        let users = JSON.parse(usersJson);
        let user = users.find(user => user.userId === 123456);
        if (user) {
            localStorage.setItem('userId', user.userId);
            window.location.href = 'summary.html';
        } else {
            await setGuestUser();
            init();
        }
    } catch (error) {
        console.error('Error parsing users JSON', error);
    }
}


async function setGuestUser() {
    let usersJson = await getItem('users');
    let users = JSON.parse(usersJson);
    let guestUser = {
        email: 'GuestUser@test.com',
        phone: '0171-1234567',
        userColor: '#ff0000',
        userId: 123456,
        firstName: 'Guest',
        lastName: 'User',
        initials: 'GU',
        password: "guest",
        userContacts: rescueUserArray
        }
        users.push(guestUser);
        await setItem('users', JSON.stringify(users));
        console.log('Guest user added. Please try again.');
};


async function showUsersOnRemoteStorage() {
    try {
        let usersJson = await getItem('users');
        if (usersJson) {;
            console.log(usersJson);
            console.log(JSON.parse(usersJson));
        } else {
            console.log("Keine Nutzerdaten gefunden.");
        }
    } catch (error) {
        console.error("Fehler beim Abrufen oder Parsen der Nutzerdaten:", error);
    }
}