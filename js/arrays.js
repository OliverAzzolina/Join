let preRegisteredContacts = [
    { firstName: 'Hans', lastName: 'Müller', initials: 'HM', email: 'hans.mueller@developerakademie.com', phone: '0171-4964828', userId: 451208 },
    { firstName: 'Anna', lastName: 'Schmidt', initials: 'AS', email: 'anna.schmidt@developerakademie.com', phone: '0162-2357891', userId: 857437 },
    { firstName: 'Max', lastName: 'Meier', initials: 'MM', email: 'max.meier@developerakademie.com', phone: '0155-9846518', userId: 869755 },
    { firstName: 'Sophie', lastName: 'Fischer', initials: 'SF', email: 'sophie.fischer@developerakademie.com', phone: '0173-6789254', userId: 929223 },
    { firstName: 'Felix', lastName: 'Wagner', initials: 'FW', email: 'felix.wagner@developerakademie.com', phone: '0157-6952486', userId: 126510 },
    { firstName: 'Lena', lastName: 'Hoffmann', initials: 'LH', email: 'lena.hoffmann@developerakademie.com', phone: '0163-1693758', userId: 855822 },
    { firstName: 'Jan', lastName: 'Becker', initials: 'JB', email: 'jan.becker@developerakademie.com', phone: '0170-3691587', userId: 927251 },
    { firstName: 'Laura', lastName: 'Schulz', initials: 'LS', email: 'laura.schulz@developerakademie.com', phone: '0154-3298716', userId: 464207 }
];


let rescueUserArray = [
    {"email":"rosita.holt@web.de","phone":"0176-1972472","userColor":"#a9edbe","firstName":"Rosita","lastName":"Holt","initials":"RH","userId":506142,"password":null,"userContacts":null},
    {"email":"winfried.römer@freenet.de","phone":"0162-2140714","userColor":"#99b12f","firstName":"Winfried","lastName":"Römer","initials":"WR","userId":569513,"password":null,"userContacts":null},
    {"email":"bruni.wieloch@web.de","phone":"0174-4185511","userColor":"#ad6ddc","firstName":"Bruni","lastName":"Wieloch","initials":"BW","userId":646474,"password":null,"userContacts":null},
    {"email":"diethelm.fiebig@web.de","phone":"0170-2667528","userColor":"#75a5ee","firstName":"Diethelm","lastName":"Fiebig","initials":"DF","userId":413777,"password":null,"userContacts":null},
    {"email":"hatice.heinz@gmx.de","phone":"0179-9217332","userColor":"#a5f76d","firstName":"Hatice","lastName":"Heinz","initials":"HH","userId":283313,"password":null,"userContacts":null},
    {"email":"isolde.blümel@freenet.de","phone":"0164-5903404","userColor":"#af7301","firstName":"Isolde","lastName":"Blümel","initials":"IB","userId":138763,"password":null,"userContacts":null},
    {"email":"gino.eberhardt@web.de","phone":"0171-2864394","userColor":"#f982cd","firstName":"Gino","lastName":"Eberhardt","initials":"GE","userId":115434,"password":null,"userContacts":null},
    {"email":"kai-uwe.tschentscher@web.de","phone":"0152-5067602","userColor":"#02947a","firstName":"Kai-Uwe","lastName":"Tschentscher","initials":"KT","userId":478730,"password":null,"userContacts":null},
    {"email":"isa.schleich@web.de","phone":"0172-9321228","userColor":"#0eaadc","firstName":"Isa","lastName":"Schleich","initials":"IS","userId":438046,"password":null,"userContacts":null},
    {"email":"miodrag.scheuermann@gmx.de","phone":"0174-3514463","userColor":"#668fdd","firstName":"Miodrag","lastName":"Scheuermann","initials":"MS","userId":440085,"password":null,"userContacts":null},
    {"email":"miroslav.putz@t-online.de","phone":"0167-7470179","userColor":"#74a7c9","firstName":"Miroslav","lastName":"Putz","initials":"MP","userId":218149,"password":null,"userContacts":null},
    {"email":"concetta.trapp@freenet.de","phone":"0174-5834149","userColor":"#34480d","firstName":"Concetta","lastName":"Trapp","initials":"CT","userId":404199,"password":null,"userContacts":null},
    {"email":"dunja.stumpf@web.de","phone":"0174-4208774","userColor":"#a404d5","firstName":"Dunja","lastName":"Stumpf","initials":"DS","userId":479156,"password":null,"userContacts":null},
    {"email":"massimo.schönland@t-online.de","phone":"0169-5627881","userColor":"#89dc1f","firstName":"Massimo","lastName":"Schönland","initials":"MS","userId":106347,"password":null,"userContacts":null},
    {"email":"dominic.römer@freenet.de","phone":"0171-9458330","userColor":"#4495a8","firstName":"Dominic","lastName":"Römer","initials":"DR","userId":206994,"password":null,"userContacts":null},
    {"email":"laura.schulz@developerakademie.com","phone":"0154-3298716","userColor":"#8000ff","firstName":"Laura","lastName":"Schulz","initials":"LS","userId":654122,"password":null,"userContacts":null},
    
  ];

  
let rescueTaskArray = [
  {"title": "Develop API for Data Management", "description": "Create a robust API for handling data operations, ensuring scalability and security.", "assignedTo": [{"firstName": "Rosita", "lastName": "Holt", "userId": 506142}, {"firstName": "Winfried", "lastName": "Römer", "userId": 569513}, {"firstName": "Miodrag", "lastName": "Scheuermann", "userId": 440085}], "dueDate": "2034-04-10", "prio": "urgent", "category": "Technical Task", "status": "in-progress", "subtasks": ["Implement CRUD operations", "Secure API endpoints"], "subTasksDone": [{"subname":"Implement CRUD operations","checked":true},{"subname":"Secure API endpoints","checked":false}]},
  {"title": "User Authentication System", "description": "Implement a secure and scalable user authentication system.", "assignedTo": [{"firstName": "Laura", "lastName": "Schulz", "userId": 654122}, {"firstName": "Dominic", "lastName": "Römer", "userId": 206994}, {"firstName": "Isolde", "lastName": "Blümel", "userId": 138763}], "dueDate": "2034-04-15", "prio": "medium", "category": "Technical Task", "status": "open", "subtasks": ["Design authentication flow", "Integrate OAuth", "User data encryption"], "subTasksDone": [{"subname":"Design authentication flow","checked":false},{"subname":"Integrate OAuth","checked":false},{"subname":"User data encryption","checked":false}]},
  {"title": "Interactive Learning Platform", "description": "Create an engaging and interactive platform for learning programming concepts.", "assignedTo": [{"firstName": "Guest", "lastName": "User", "userId": 123456}, {"firstName": "Hatice", "lastName": "Heinz", "userId": 283313}, {"firstName": "Kai-Uwe", "lastName": "Tschentscher", "userId": 478730}], "dueDate": "2034-04-20", "prio": "low", "category": "User Story", "status": "in-progress", "subtasks": ["Implement interactive exercises", "Gamify learning experience"], "subTasksDone": [{"subname":"Implement interactive exercises","checked":true},{"subname":"Gamify learning experience","checked":false}]},
  {"title": "Optimize Database Performance", "description": "Enhance the database architecture for optimal performance and scalability.", "assignedTo": [{"firstName": "Guest", "lastName": "User", "userId": 123456},{"firstName": "Diethelm", "lastName": "Fiebig", "userId": 413777}, {"firstName": "Bruni", "lastName": "Wieloch", "userId": 646474}, {"firstName": "Isa", "lastName": "Schleich", "userId": 438046}], "dueDate": "2034-04-25", "prio": "urgent", "category": "Technical Task", "status": "await-feedback", "subtasks": ["Implement indexing", "Refactor queries for efficiency"], "subTasksDone": [{"subname":"Implement indexing","checked":true},{"subname":"Refactor queries for efficiency","checked":true}]},
  {"title": "Frontend Framework Migration", "description": "Migrate the current frontend framework to a more modern and efficient framework.", "assignedTo": [{"firstName": "Rosita", "lastName": "Holt", "userId": 506142}, {"firstName": "Gino", "lastName": "Eberhardt", "userId": 115434}, {"firstName": "Miroslav", "lastName": "Putz", "userId": 218149}], "dueDate": "2034-05-01", "prio": "medium", "category": "Technical Task", "status": "open", "subtasks": ["Select a new framework", "Plan migration strategy", "Refactor existing codebase"], "subTasksDone": [{"subname":"Select a new framework","checked":false},{"subname":"Plan migration strategy","checked":false},{"subname":"Refactor existing codebase","checked":false}]},
  {"title": "Improve Accessibility Standards", "description": "Audit and improve the application to meet modern web accessibility standards.", "assignedTo": [{"firstName": "Guest", "lastName": "User", "userId": 123456},{"firstName": "Kai-Uwe", "lastName": "Tschentscher", "userId": 478730}, {"firstName": "Concetta", "lastName": "Trapp", "userId": 404199}, {"firstName": "Dunja", "lastName": "Stumpf", "userId": 479156}], "dueDate": "2034-05-05", "prio": "low", "category": "User Story", "status": "done", "subtasks": ["Implement fixes for audit findings", "Verify compliance with standards"], "subTasksDone": [{"subname":"Implement fixes for audit findings","checked":true},{"subname":"Verify compliance with standards","checked":true}]},
  {"title": "Implement Automated Testing", "description": "Set up an automated testing framework to improve code quality and efficiency.", "assignedTo": [{"firstName": "Isolde", "lastName": "Blümel", "userId": 138763}, {"firstName": "Miodrag", "lastName": "Scheuermann", "userId": 440085}, {"firstName": "Laura", "lastName": "Schulz", "userId": 654122}], "dueDate": "2034-05-10", "prio": "medium", "category": "Technical Task", "status": "in-progress", "subtasks": ["Select testing tools", "Integrate with CI pipeline", "Write initial test cases"], "subTasksDone": [{"subname":"Select testing tools","checked":true},{"subname":"Integrate with CI pipeline","checked":true},{"subname":"Write initial test cases","checked":false}]},
  {"title": "Refactor Backend Codebase", "description": "Refactor the backend codebase to improve maintainability and performance.", "assignedTo": [{"firstName": "Winfried", "lastName": "Römer", "userId": 569513}, {"firstName": "Gino", "lastName": "Eberhardt", "userId": 115434}, {"firstName": "Hatice", "lastName": "Heinz", "userId": 283313}], "dueDate": "2034-05-15", "prio": "urgent", "category": "Technical Task", "status": "await-feedback", "subtasks": ["Implement new design patterns", "Optimize database interactions"], "subTasksDone": [{"subname":"Implement new design patterns","checked":true},{"subname":"Optimize database interactions","checked":true}]},
  {"title": "Enhance User Profile Features", "description": "Develop new features for user profiles to enhance user experience.", "assignedTo": [{"firstName": "Dominic", "lastName": "Römer", "userId": 206994}, {"firstName": "Bruni", "lastName": "Wieloch", "userId": 646474}, {"firstName": "Diethelm", "lastName": "Fiebig", "userId": 413777}], "dueDate": "2034-05-20", "prio": "low", "category": "User Story", "status": "open", "subtasks": ["Design new profile layout", "Add social media integration", "Implement user settings customization"], "subTasksDone": [{"subname":"Design new profile layout","checked":false},{"subname":"Add social media integration","checked":false},{"subname":"Implement user settings customization","checked":false}]}
]
  

let contacts = [];
let tasks = [];
let userInitials = '';
let checkedArray = [];


async function loadUserData() {
    let userId = localStorage.getItem('userId');
    user = await findUserData(userId);
    if(user){
        userInitials = user.initials;
        contacts = user.userContacts;
    }
}

async function findUserData(userId){
    let users = JSON.parse(await getItem("users"));
    return users.find(user => user.userId === parseInt(userId));
}

async function saveUserData(users){
    let userId = user.userId;
    await findUserData(userId);
        if (user){
                const pos = users.findIndex(user => user.userId === userId);
                users[pos].userContacts = user.userContacts;
                users.push();
                await setItem('users', JSON.stringify(users));
    }
}

