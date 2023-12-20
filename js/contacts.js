// let contacts = []; <--- Moved to arrays.js
let contactList = [];
let contactLetterGroup = [];
async function init(){
    loadContactsFromStorage();
    generateHeader();
    generateSidebar();
}

function generateHeader(){
  let header = document.getElementById('header-container');
  header.innerHTML = headerHTML();
}

function generateSidebar(){
  let sidebar = document.getElementById('sidebar-container');
  sidebar.innerHTML = sidebarHTML();
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
  contactList = [];
  groupNames();
  renderContactList();
}


//RENDER CONTACT LIST
function renderContactList(){
  let contactListComplete = document.getElementById('contact-list-container');
  contactListComplete.innerHTML = '';
  for (let i = 0; i < contactList.length; i++) {
    const letter = contactList[i]['letter'];
    contactListComplete.innerHTML += `
    <div class="category-letter"><span>${letter}</span></div>
    <div class="contacts-splitter"></div>
    <div id="contacts${i}" class="contacts-list"></div>
    `;
    renderContact(i);
  }
}


//RENDER CONTACT JS
function renderContact(i){
  let newContactList = document.getElementById(`contacts${i}`);
  newContactList.innerHTML = '';
  for (let j = 0; j < contactList[i]['contacts'].length; j++) {
    const initials = contactList[i]['contacts'][j]['name'].split(" ").map((n)=>n[0]).join("");
    const name = contactList[i]['contacts'][j]['name'];
    const email = contactList[i]['contacts'][j]['email'];
    const randomColor = contactList[i]['contacts'][j]['randomColor'];
    newContactList.innerHTML += generateContact(i, j, initials, name, email, randomColor)
  }
}


//RENDER CONTACT HTML
function generateContact(i, j, initials, name, email, randomColor){
  return `
  <div id="contact${i},${j}" class="contact contact-hover" onclick="openContactInfo(${i},${j})">
      <div class="name-logo" style= "background-color: ${randomColor}"><span>${initials}</span></div>
      <div class="contact-name">
      <span id="contact${i},${j}-name">${name}</span>
      <a href="mailto:${email}">${email}</a>
      </div>    
  </div>
  `;
}


//GROUPING CONTACTS TO THEIR CATEGORY LETTERS
function groupNames(){
  for (let i = 0; i < contacts.length; i++) {
    const letter = contacts[i].name[0].toUpperCase();
    const initials = contacts[i]['name'].split(" ").map((n)=>n[0]).join("");
    const name = contacts[i]['name'];
    const email = contacts[i]['email'];
    const phone = contacts[i]['phone'];
    const randomColor = '#' + contacts[i]['randomColor'];
    const id = i;
    let contact = {id: id, initials: initials, name: name, email: email, phone: phone, randomColor: randomColor};
  
    contactLetterGroup = contactList.filter(function(list) {
      return list.letter == name[0].toUpperCase();
  });
  
    if(contactLetterGroup.length > 0){
      contactLetterGroup[0].contacts.push(contact);
    }else{
      contactList.push( {
        letter: letter,
        contacts: [
          {id: id, initials: initials, name: name, email: email, phone: phone, randomColor: randomColor},
        ]
      });
    }
    
  }
  console.log(contactList)
}


//SORT CONTACTS
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


//OPEN CONTACT INFO
function openContactInfo(i, j){
  let contactDetail = document.getElementById('contact-detail');
  if(document.getElementById(`contact${i},${j}`).style.backgroundColor !== "rgb(42, 54, 71)"){
    renderContactList();
    loadContactData(i, j, contactDetail)
    changeContactBackgroundColor(i, j)
  }else{
    contactDetail.innerHTML = '';
    renderContactList();
  }
}

function loadContactData(i, j, contactDetail){
  contactDetail.innerHTML = '';
  const initials = contactList[i]['contacts'][j]['name'].split(" ").map((n)=>n[0]).join("");
  const name = contactList[i]['contacts'][j]['name'];
  const email = contactList[i]['contacts'][j]['email'];
  const phone = contactList[i]['contacts'][j]['phone'];
  const randomColor = contactList[i]['contacts'][j]['randomColor'];
  contactDetail.innerHTML = renderContactInfo(i, j, initials, name, email, phone, randomColor);
}


//CHANGES BG COLOR OF OPEN CONTACT
function changeContactBackgroundColor(i, j){
  let contact = document.getElementById(`contact${i},${j}`);
  contact.style.backgroundColor = "#2A3647";
  contact.classList.remove('contact-hover');
  document.getElementById(`contact${i},${j}-name`).style.color ="#FFFFFF";
}


//OPEN ADD NEW CONTACT OVERLAY
function openAddNewContact(){
  document.getElementById('overlay').style.display = "flex"; 
  document.getElementById('overlay').innerHTML = generateOverlay();   
}


// CLOSE ADD NEW CONTACT OVERLAY
function closeAddContact(){
    document.getElementById('overlay').style.display = "none";
}


//ADD NEW CONTACT
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
  loadContactsFromStorage();
  sortContacts();
}


//GENERATES RANDOM COLOR FOR INITIALS
function generateRandomColor(){
  return randomColor = Math.floor(Math.random()*16777215).toString(16);
}


//DELETE CONTACT
function deleteContact(i, j){
  id = contactList[i]['contacts'][j]['id'];
  contacts.splice(id, 1);
  document.getElementById('contact-detail').innerHTML = '';
  document.getElementById('overlay').style.display = "none";
  setItem('contacts', JSON.stringify(contacts));
  loadContactsFromStorage();
}


//EDIT CONTACT
function EditContact(i, j){
  document.getElementById('overlay').style.display = "flex"; 
  const initials = contactList[i]['contacts'][j]['name'].split(" ").map((n)=>n[0]).join("");
  const name = contactList[i]['contacts'][j]['name'];
  const email = contactList[i]['contacts'][j]['email'];
  const phone = contactList[i]['contacts'][j]['phone'];
  const randomColor = contactList[i]['contacts'][j]['randomColor'];
  document.getElementById('overlay').innerHTML = generateEditOverlay(i, j, initials, name, email, phone, randomColor);  
}


//SAVE CONTACT
async function saveContact(i, j){
  id = contactList[i]['contacts'][j]['id'];
  contacts[id]['name'] = document.getElementById('editName').value;
  contacts[id]['email'] = document.getElementById('editEmail').value;
  contacts[id]['phone'] = document.getElementById('editPhone').value;
  contacts.push();
  await setItem('contacts', JSON.stringify(contacts));
  init();
  document.getElementById('overlay').style.display = "none";
  
  openContactInfo(i, j);
}



//CONTACT INFO HTML
function renderContactInfo(i, j, initials, name, email, phone, randomColor){
    return `
    <div class="name-section">
        <div class="name-logo name-logo-detail" style= "background-color: ${randomColor}">
        <span>${initials}</span>
        </div>
        <div class="flex-row">    
            <div class="name">
                <span>${name}</span>
            </div>
            <div class="edit-contact">
                <button onclick="EditContact(${i},${j})" onmouseover="hover('a')" onmouseout="unhover('a')"><img id="edit-img" src="/assets/img/icons/edit.png" alt=""><span>Edit</span></button>
                <button onclick="deleteContact(${i},${j})" onmouseover="hover('b')" onmouseout="unhover('b')"><img id="delete-img" src="/assets/img/icons/delete.png" alt=""><span>Delete</span></button>
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

//ADD NEW CONTACT OVERLAY
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
    <div class="close-button" onclick="closeAddContact()">
      <button><img src="assets/img/icons/close.png" alt=""></button>
    </div>
    <div class="add-contact-container">
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
      </div>
  </div>`;
}

//EDIT CONTACT OVERLAY
function generateEditOverlay(i, j, initials, name, email, phone, randomColor){
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
      <div class="close-button" onclick="closeAddContact()">
        <button><img src="assets/img/icons/close.png" alt=""></button>
      </div>

      <div class="add-contact-container">
        <div id="name-logo-bg${i}" class="name-logo name-logo-detail" style= "background-color: ${randomColor}">
          <span>${initials}</span>
        </div>
        <form onsubmit="saveContact(${i},${j}); return false">
          <div class="actions-container">
            <div class="add-contact-inputs" >
              <input id="editName" type="text" placeholder="Name" class="edit-input input-icon-name" value="${name}" required>
              <input id="editEmail" type="email" placeholder="Email" class="edit-input input-icon-mail" value="${email}" required>
              <input id="editPhone" type="text" placeholder="Phone" class="edit-input input-icon-phone" value="${phone}" required>
            </div>
            <div class="add-contact-buttons">
              <button type="button" onclick="deleteContact(${i},${j})" class="cancel-button"><span>Delete</span><img src="assets/img/icons/iconoir_cancel.png" alt=""></button>
              <button type="submit" class="create-button"><span>Save</span><img src="assets/img/icons/check.png" alt=""></button>
            </div>
          </div>
        </form
      </div>
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