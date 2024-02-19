
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
    {"email":"laura.schulz@developerakademie.com","phone":"0154-3298716","userColor":"#8000ff","firstName":"Laura","lastName":"Schulz","initials":"LS","userId":654122,"password":null,"userContacts":null}
  ];


let rescueTaskArray = [
    {"title": "Revamp Homepage UI", "description": "Redesign the homepage with a modern UI focusing on usability and aesthetics.", "assignedTo": [{"firstName": "Isolde", "lastName": "Blümel"}, {"firstName": "Winfried", "lastName": "Römer"}], "dueDate": "2034-03-02", "prio": "low", "category": "UI/UX Improvement", "status": "await-feedback", "subtasks": ["Design mockups", "User experience review", "Implement responsive design"], "subTasksDone": []},
    {"title": "Optimize Loading Speed", "description": "Analyze and optimize the loading speed of the site, aiming for under 2 seconds.", "assignedTo": [{"firstName": "Winfried", "lastName": "Römer"}], "dueDate": "2034-02-25", "prio": "medium", "category": "Technical Task", "status": "await-feedback", "subtasks": ["Audit with PageSpeed Insights", "Optimize assets", "Review hosting options"], "subTasksDone": []},
    {"title": "Implement Dark Mode", "description": "Implement a dark mode option for the website to enhance user experience at night.", "assignedTo": [{"firstName": "Isolde", "lastName": "Blümel"}], "dueDate": "2034-02-24", "prio": "medium", "category": "Technical Task", "status": "in-progress", "subtasks": ["Define color scheme", "Code CSS variables", "Javascript toggle function"], "subTasksDone": []},
    {"title": "Refactor Contact Form", "description": "Refactor the contact form to improve user feedback and validation processes.", "assignedTo": [{"firstName": "Bruni", "lastName": "Wieloch"}], "dueDate": "2034-03-01", "prio": "urgent", "category": "Bug Fix", "status": "open", "subtasks": ["Update form fields", "Implement real-time validation", "Test form submission"], "subTasksDone": []},
    {"title": "Enhance Accessibility Features", "description": "Enhance accessibility features to meet WCAG 2.1 standards for all users.", "assignedTo": [{"firstName": "Kai-Uwe", "lastName": "Tschentscher"}], "dueDate": "2034-03-05", "prio": "urgent", "category": "User Story", "status": "done", "subtasks": ["Keyboard navigation", "Alt texts for images", "ARIA roles"], "subTasksDone": ["Keyboard navigation"]},
    {"title": "Develop New Landing Page", "description": "Develop a new landing page for the upcoming product launch, focusing on conversion.", "assignedTo": [{"firstName": "Rosita", "lastName": "Holt"}], "dueDate": "2034-02-28", "prio": "medium", "category": "UI/UX Improvement", "status": "in-progress", "subtasks": ["Create content strategy", "Build landing page layout", "Setup conversion tracking"], "subTasksDone": []},
    {"title": "Fix Carousel Display Issue", "description": "Address and fix the issue where the image carousel does not display correctly on mobile devices.", "assignedTo": [{"firstName": "Diethelm", "lastName": "Fiebig"}], "dueDate": "2034-03-10", "prio": "low", "category": "Bug Fix", "status": "await-feedback", "subtasks": ["Debug carousel code", "Ensure swipe functionality", "Cross-browser testing"], "subTasksDone": []},
    {"title": "Upgrade CSS Framework Version", "description": "Upgrade the current CSS framework to the latest version, ensuring compatibility and efficiency.", "assignedTo": [{"firstName": "Hatice", "lastName": "Heinz"}], "dueDate": "2034-02-20", "prio": "urgent", "category": "Technical Task", "status": "open", "subtasks": ["Review breaking changes", "Test all components", "Deploy to staging environment"], "subTasksDone": []},
    {"title": "Integrate Social Media Sharing", "description": "Integrate social media sharing options on blog posts to increase visibility and engagement.", "assignedTo": [{"firstName": "Isa", "lastName": "Schleich"}], "dueDate": "2034-03-15", "prio": "medium", "category": "Technical Task", "status": "in-progress", "subtasks": ["Choose social platforms", "Implement share buttons", "Track shared content analytics"], "subTasksDone": []}
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

