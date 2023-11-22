let contacts = [
    {
        name: 'Anton Mayer',
        email: 'antonm@gmail.com',
        phone: '+49 1111 111 11 1'
    },
    {
        name: 'Anja Schulz',
        email: 'schulz@hotmail.com',
        phone: '+49 3333 333 33 3'
    },
    {
        name: 'Benedigt Ziegler',
        email: 'benedigt@gmail.com',
        phone: '+49 4444 444 44 4'
    },
    {
        name: 'David Eisenberg',
        email: 'davidberg@gmail.com',
        phone: '+49 2222 222 22 2'
    },
    {
        name: 'Eva Fischer',
        email: 'eva@gmail.com',
        phone: '+49 5555 555 55 5'
    },
    {
        name: 'Emmanuel Mauer',
        email: 'emmanuelma@gmail.com',
        phone: '+49 6666 666 66 6'
    },
    {
        name: 'Marcel Bauer',
        email: 'bauer@gmail.com',
        phone: '+49 7777 777 77 7'
    },
    {
        name: 'Tatjana Wolf',
        email: 'wolf@gmail.com',
        phone: '+49 8888 888 88 8'
    },
];

function init(){
    loadContacts();
}

function loadContacts(){
    let contactList = document.getElementById('contact-list');
    contactList.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        let initials = contacts[i]['name'].split(" ").map((n)=>n[0]).join("");
        let name = contacts[i]['name'];
        let email = contacts[i]['email'];
        contactList.innerHTML += renderContactList(i, initials, name, email); 
    }
}

function renderContactList(i, initials, name, email){
    return `
    <div id="contact${i}" class="contact" onclick="openContactInfo(${i})">
        <div class="name-logo">${initials}</div>
        <div class="contact-name">
        ${name}
        <a href="${email}">${email}</a>
        </div>    
    </div>
    `;
}

function openContactInfo(i){
    let contactDetail = document.getElementById('contact-detail');
    contactDetail.innerHTML = '';
    let initials = contacts[i]['name'].split(" ").map((n)=>n[0]).join("");
        let name = contacts[i]['name'];
        let email = contacts[i]['email'];
        let phone = contacts[i]['phone'];
        contactDetail.innerHTML = renderContactInfo(i, initials, name, email, phone);
}

function renderContactInfo(i, initials, name, email, phone){
    return `
    <div class="name-section">
            <div class="name-logo name-logo-detail">${initials}</div>
            <div class="name">
            ${name}
            </div>
              <div class="ancors-name">
                <a href="#">Edit</a><a href="#">Delete</a>
              </div>
            </div>
          </div>
          <div class="contact-information">
            <p>Contact Information</p>
            <div class="email">
              <p>Email:</p>
              <a href="${email}">${email}</a>
            </div>
            <div class="phone">
              <p>Phone</p>
              <a href="${phone}">${phone}</a>
            </div>
          </div>`
}