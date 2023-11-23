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
    let contactList = document.getElementById('contacts');
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
        <span>${name}</span>
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
        <div class="name-logo name-logo-detail">
            ${initials}
        </div>
        <div class="flex-row">    
            <div class="name">
                <span>${name}</span>
            </div>
            <div class="edit-contact">
                <button onmouseover="hover('a')" onmouseout="unhover('a')"><img id="edit-img" src="/assets/img/icons/edit.png" alt=""><span>Edit</span></button>
                <button onmouseover="hover('b')" onmouseout="unhover('b')"><img id="delete-img" src="/assets/img/icons/delete.png" alt=""><span>Delete</span></button>
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

function hover(img){
  if(img == 'a'){
    document.getElementById('edit-img').setAttribute('src', '/assets/img/icons/edit_hover.png');
  }else{
    document.getElementById('delete-img').setAttribute('src', '/assets/img/icons/delete_hover.png');
  }
}

function unhover(img){
    if(img == 'a'){
        document.getElementById('edit-img').setAttribute('src', '/assets/img/icons/edit.png');
      }else{
        document.getElementById('delete-img').setAttribute('src', '/assets/img/icons/delete.png');
      }
}

function openAddNewContact(){
   
    
        document.getElementById('overlay').style.display = "flex"; 
        document.getElementById('overlay').innerHTML = generateOverlay();
        
}

function closeAddContact(){
    document.getElementById('overlay').style.display = "none";
  }
  
  function generateOverlay(){
    return `
      `;
  }

  function doNotClose(event){
    event.stopPropagation();
  }