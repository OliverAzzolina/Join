// let contacts = []; <--- Moved to arrays.js

async function init(){
    loadContactsFromStorage();
}

//LOAD Storage
async function loadContactsFromStorage(){
  try{
      contacts = JSON.parse(await getItem('contacts'));
  }catch(e){
    console.warn('loading error:', e)
  }
  sortContacts();
  loadContacts();
}

//LOAD Contacts
function loadContacts(){
    let contactList = document.getElementById('contacts');
    contactList.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        let initials = contacts[i]['name'].split(" ").map((n)=>n[0]).join("");
        let name = contacts[i]['name'];
        let email = contacts[i]['email'];
        let randomColor = '#' + contacts[i]['randomColor'];
        contactList.innerHTML += renderContactList(i, initials, name, email, randomColor); 
    }
    sortContacts();
}

//SORT Contacts
function sortContacts(){
  contacts.sort((a, b) => {
    if (a.name.toUpperCase() < b.name.toUpperCase()) {
     return -1;
    } else if (a.name.toUpperCase() > b.name.toUpperCase()) {
     return 1;
    } else {
     return 0;
    }
   });
}

//OPEN Contact Info
function openContactInfo(i){
    let contactDetail = document.getElementById('contact-detail');
    contactDetail.innerHTML = '';
    let initials = contacts[i]['name'].split(" ").map((n)=>n[0]).join("");
        let name = contacts[i]['name'];
        let email = contacts[i]['email'];
        let phone = contacts[i]['phone'];
        let randomColor = '#' + contacts[i]['randomColor'];
        contactDetail.innerHTML = renderContactInfo(i, initials, name, email, phone, randomColor);
}

//OPEN Add new Contact Overlay
function openAddNewContact(){
  document.getElementById('overlay').style.display = "flex"; 
  document.getElementById('overlay').innerHTML = generateOverlay();   
}

// CLOSE Add new Contact Overlay
function closeAddContact(){
    document.getElementById('overlay').style.display = "none";
}

//ADD New Contact
async function addNewContact(){
  generateRandomColor();
  contacts.push({
    name: contactname.value,
    email: email.value,
    phone: phone.value,
    randomColor: randomColor,
  });
  
  await setItem('contacts', JSON.stringify(contacts));
  document.getElementById('overlay').style.display = "none";
  sortContacts();
  loadContacts();
}

function generateRandomColor(){
  return randomColor = Math.floor(Math.random()*16777215).toString(16);
  
}

//DELETE Contact
function deleteContact(i){
  contacts.splice(i, 1);
  document.getElementById('contact-detail').innerHTML = '';
  document.getElementById('overlay').style.display = "none";
  setItem('contacts', JSON.stringify(contacts));
  loadContacts();
}

//EDIT Contact
function EditContact(i){
      document.getElementById('overlay').style.display = "flex"; 
      let initials = contacts[i]['name'].split(" ").map((n)=>n[0]).join("");
      let name = contacts[i]['name'];
      let email = contacts[i]['email'];
      let phone = contacts[i]['phone'];
      let randomColor = '#' + contacts[i]['randomColor'];
      document.getElementById('overlay').innerHTML = generateEditOverlay(i, initials, name, email, phone, randomColor);
      
}

//SAVE Contact
function saveContact(i){
  contacts[i]['name'] = document.getElementById('editName').value;
  contacts[i]['email'] = document.getElementById('editEmail').value;
  contacts[i]['phone'] = document.getElementById('editPhone').value;
  contacts.push();
  setItem('contacts', JSON.stringify(contacts));
  document.getElementById('overlay').style.display = "none";
  loadContacts(); 
  openContactInfo(i);
}

//CONTACT list HTML
function renderContactList(i, initials, name, email, randomColor){
  return `
  <div id="contact${i}" class="contact" onclick="openContactInfo(${i})">
      <div id="name-logo-bg${i}" class="name-logo" style= "background-color: ${randomColor}"><span>${initials}</span></div>
      <div class="contact-name">
      <span>${name}</span>
      <a href="mailto:${email}">${email}</a>
      </div>    
  </div>
  `;
}

// Contact Info HTML
function renderContactInfo(i, initials, name, email, phone, randomColor){
    return `
    <div class="name-section">
        <div id="name-logo-bg${i}" class="name-logo name-logo-detail" style= "background-color: ${randomColor}">
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
        <p id="ci-head">Contact Information</p>
        <div class="email">
          <p>Email</p>
          <a href="mailto:${email}">${email}</a>
        </div>
        <div class="phone">
          <p>Phone</p>
          <a href="tel:${phone}">${phone}</a>
        </div>
    </div>`
}

//ADD Overlay
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
          <input id="contactname" type="text" placeholder="Name" class="input-icon-name" required>
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

//EDIT Overlay
function generateEditOverlay(i, initials, name, email, phone, randomColor){
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
  <div id="name-logo-bg${i}" class="name-logo name-logo-detail" style= "background-color: ${randomColor}">
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
      </form
  </div>`;
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

function doNotClose(event){
  event.stopPropagation();
}