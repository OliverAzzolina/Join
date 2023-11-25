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
        <div class="name-logo"><span>${initials}</span></div>
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
        <span>${initials}</span>
        </div>
        <div class="flex-row">    
            <div class="name">
                <span>${name}</span>
            </div>
            <div class="edit-contact">
                <button onclick="EditContact(${i})" onmouseover="hover('a')" onmouseout="unhover('a')"><img id="edit-img" src="/assets/img/icons/edit.png" alt=""><span>Edit</span></button>
                <button onclick="deleteContact(${i})" onmouseover="hover('b')" onmouseout="unhover('b')"><img id="delete-img" src="/assets/img/icons/delete.png" alt=""><span>Delete</span></button>
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

//ADD
function openAddNewContact(){
        document.getElementById('overlay').style.display = "flex"; 
        document.getElementById('overlay').innerHTML = generateOverlay();   
}

function closeAddContact(){
    document.getElementById('overlay').style.display = "none";
  }
  
  
  function generateOverlay(){
    return `
    <div class="add-contact-card" onclick="doNotClose(event)">

    <div class="add-contact-card-left">
        <img src="/assets/img/icons/Capa 2.png" alt="">
        <div class="titles">
          <span class="title">Add contact</span>
          <span class="subtitle">Tasks are better with a Team!</span>
          <div class="blue-line-horizontal"></div>
        </div>
    </div>

    <div class="add-contact-card-right">
      <img src="assets/img/icons/Frame 79.png" alt="">
      <form onsubmit="addNewContact(); return false">
        <div class="actions-container">
          <div class="add-contact-inputs" >
            <input id="name" type="text" placeholder="Name" class="input-icon-name" required>
            <input id="email" type="email" placeholder="Email" class="input-icon-mail" required>
            <input id="phone" type="text" placeholder="Phone" class="input-icon-phone" required>
          </div>
          <div class="add-contact-buttons">
            <button type="button" onclick="closeAddContact()" class="cancel-button"><span>Cancel</span><img src="assets/img/icons/iconoir_cancel.png" alt=""></button>
            <button type="submit" class="create-button"><span>Create contact</span><img src="assets/img/icons/check.png" alt=""></button>
          </div>
        </div>
        </form>
    </div>`;
  }

  function doNotClose(event){
    event.stopPropagation();
  }

  function addNewContact(){
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');

    let contact = {
        'name' : name.value,
        'email': email.value,
        'phone': phone.value,
    };

    contacts.push(contact);
    
    name.value = '';
    email.value = '';
    phone.value = '';
    document.getElementById('overlay').style.display = "none";
    loadContacts();
  }

  function deleteContact(i){
    let contact = contacts[i];
    contacts.splice(i, 1);
    document.getElementById('contact-detail').innerHTML = '';
    document.getElementById('overlay').style.display = "none";
    loadContacts();
  }

  //EDIT
  function EditContact(i){
        document.getElementById('overlay').style.display = "flex"; 
        let initials = contacts[i]['name'].split(" ").map((n)=>n[0]).join("");
        let name = contacts[i]['name'];
        let email = contacts[i]['email'];
        let phone = contacts[i]['phone'];
        document.getElementById('overlay').innerHTML = generateEditOverlay(i, initials, name, email, phone);
  }

  function generateEditOverlay(i, initials, name, email, phone){
    return `
    <div class="add-contact-card" onclick="doNotClose(event)">

    <div class="add-contact-card-left">
    <img src="/assets/img/icons/Capa 2.png" alt="">
        <div class="titles">
          <span class="title">Edit contact</span>
          <span class="subtitle">Tasks are better with a Team!</span>
          <div class="blue-line-horizontal"></div>
        </div>
    </div>

    <div class="add-contact-card-right">
    <div class="name-logo name-logo-detail">
    <span>${initials}</span>
    </div>
      <form onsubmit="saveContact(${i}); return false">
        <div class="actions-container">
          <div class="add-contact-inputs" >
            <input id="editName" type="text" placeholder="Name" class="input-icon-name" value="${name}" required>
            <input id="editEmail" type="email" placeholder="Email" class="input-icon-mail" value="${email}" required>
            <input id="editPhone" type="text" placeholder="Phone" class="input-icon-phone" value="${phone}" required>
          </div>
          <div class="add-contact-buttons">
            <button type="button" onclick="deleteContact(${i})" class="cancel-button"><span>Delete</span><img src="assets/img/icons/iconoir_cancel.png" alt=""></button>
            <button type="submit" class="create-button"><span>Save</span><img src="assets/img/icons/check.png" alt=""></button>
          </div>
        </div>
        </form>
    </div>`;
  }

  function saveContact(i){
    contacts[i]['name'] = document.getElementById('editName').value;
    contacts[i]['email'] = document.getElementById('editEmail').value;
    contacts[i]['phone'] = document.getElementById('editPhone').value;
    contacts.push();
    document.getElementById('overlay').style.display = "none";
    loadContacts(); 
    openContactInfo(i);
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