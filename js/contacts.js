// let contacts = []; <--- Moved to arrays.js
let contactList = [];
let contactLetterGroup = [];

async function init() {
  await loadUserData();
  sortContacts();
  loadContacts();
  //loadContactsFromStorage();
  generateHeader(userInitials);
  generateSidebar();
}

//LOAD Contacts
function loadContacts() {
  contactList = [];
  groupNames();
  renderContactList();
}

//RENDER CONTACT LIST
function renderContactList() {
  let contactListComplete = document.getElementById("contact-list-container");
  contactListComplete.innerHTML = "";
  for (let i = 0; i < contactList.length; i++) {
    const letter = contactList[i]["letter"];
    contactListComplete.innerHTML += `
    <div class="category-letter"><span>${letter}</span></div>
    <div class="contacts-splitter"></div>
    <div id="contacts${i}" class="contacts-list"></div>
    `;
    renderContact(i);
  }
}

//RENDER CONTACT JS
function renderContact(i) {
  let newContactList = document.getElementById(`contacts${i}`);
  newContactList.innerHTML = "";
  for (let j = 0; j < contactList[i]["contacts"].length; j++) {
    const contact = contactList[i]["contacts"][j];
    const initials = contact.firstName[0] + contact.lastName[0];
    const firstName = contact.firstName;
    const lastName = contact.lastName;
    const email = contact.email;
    const userColor = contact.userColor;
    newContactList.innerHTML += generateContact(
      i,
      j,
      initials,
      firstName,
      lastName,
      email,
      userColor
    );
  }
}

//RENDER CONTACT HTML
function generateContact(i, j, initials, firstName, lastName, email, userColor) {
  return `
  <div id="contact${i},${j}" class="contact contact-hover" onclick="openContactInfo(${i},${j})">
      <div class="name-logo" style= "background-color: ${userColor}"><span>${initials}</span></div>
      <div class="contact-name">
      <span id="contact${i},${j}-name">${firstName} ${lastName}</span>
      <a href="#">${email}</a>
      </div>    
  </div>
  `;
}

//GROUPING CONTACTS TO THEIR CATEGORY LETTERS
function groupNames() {
  for (let i = 0; i < contacts.length; i++) {
    const letter = contacts[i].firstName[0].toUpperCase();
    const initials = contacts[i].initials;
    const firstName = contacts[i].firstName;
    const lastName = contacts[i].lastName;
    const email = contacts[i].email;
    const phone = contacts[i].phone;
    const userColor = contacts[i].userColor;
    const id = contacts[i].userId;
    let contact = {
      id: id,
      initials: initials,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      userColor: userColor,
    };

    contactLetterGroup = contactList.filter(function (list) {
      return list.letter == firstName[0].toUpperCase();
    });

    if (contactLetterGroup.length > 0) {
      contactLetterGroup[0].contacts.push(contact);
    } else {
      contactList.push({
        letter: letter,
        contacts: [
          {
            id: id,
            initials: initials,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            userColor: userColor,
          },
        ],
      });
    }
  }
  console.log(contactList);
}

//SORT CONTACTS
function sortContacts() {
  contacts.sort((a, b) => {
    if (a.firstName.toUpperCase() < b.firstName.toUpperCase()) {
      return -1;
    } else if (a.firstName.toUpperCase() > b.firstName.toUpperCase()) {
      return 1;
    } else {
      return 0;
    }
  });
}

//OPEN CONTACT INFO
function openContactInfo(i, j) {
  let contactDetail = document.getElementById("contact-detail");
  if (
    document.getElementById(`contact${i},${j}`).style.backgroundColor !==
    "rgb(42, 54, 71)"
  ) {
    renderContactList();
    loadContactData(i, j, contactDetail);
    changeContactBackgroundColor(i, j);
  } else {
    contactDetail.innerHTML = "";
    renderContactList();
  }
}

function loadContactData(i, j, contactDetail) {
  contactDetail.innerHTML = "";
  const contact = contactList[i]["contacts"][j];
  const initials = contact.firstName[0] + contact.lastName[0];
  const firstName = contacts[i].firstName;
  const lastName = contacts[i].lastName;
  const email = contacts[i].email;
  const phone = contacts[i].phone;
  const userColor = contacts[i].userColor;
  const id = contacts[i].userId;
  contactDetail.innerHTML = renderContactInfo(
    i,
    j,
    initials,
    firstName,
    lastName,
    email,
    phone,
    userColor
  );
}

//CHANGES BG COLOR OF OPEN CONTACT
function changeContactBackgroundColor(i, j) {
  let contact = document.getElementById(`contact${i},${j}`);
  contact.style.backgroundColor = "#2A3647";
  contact.classList.remove("contact-hover");
  document.getElementById(`contact${i},${j}-name`).style.color = "#FFFFFF";
}

//OPEN ADD NEW CONTACT OVERLAY
function openAddNewContact() {
  // Überprüfe die Fensterbreite
  const windowWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  // Überprüfe, ob die Fensterbreite kleiner oder gleich 1050px ist
  if (windowWidth <= 1050) {
    // Verstecke den Button, indem du seine Anzeige auf "none" setzt
    document.querySelector(".add-contact-button").style.display = "none";
  }

  // Öffne das Overlay
  document.getElementById("overlay").style.display = "flex";
  document.getElementById("overlay").innerHTML = generateAddNewOverlay();
}

// CLOSE ADD NEW CONTACT OVERLAY
function closeAddContact() {
  // Stelle sicher, dass das Overlay geschlossen wird
  document.getElementById("overlay").style.display = "none";

  // Überprüfe die Fensterbreite
  const windowWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  // Überprüfe, ob die Fensterbreite kleiner oder gleich 1050px ist
  if (windowWidth <= 1050) {
    // Zeige den Button wieder an, indem du seine Anzeige auf "block" setzt
    document.querySelector(".add-contact-button").style.display = "block";
  }
}

//ADD NEW CONTACT
async function addNewContact() {
  generateRandomColor();
  contacts.push({
    name: contactname.value,
    email: email.value,
    phone: phone.value,
    randomColor: randomColor,
  });

  await setItem("contacts", JSON.stringify(contacts));
  document.getElementById("overlay").style.display = "none";
  loadContactsFromStorage();
  sortContacts();
}

//DELETE CONTACT
function deleteContact(i, j) {
  id = contactList[i]["contacts"][j]["id"];
  contacts.splice(id, 1);
  document.getElementById("contact-detail").innerHTML = "";
  document.getElementById("overlay").style.display = "none";
  setItem("contacts", JSON.stringify(contacts));
  loadContactsFromStorage();
}

//EDIT CONTACT
function EditContact(i, j) {
  document.getElementById("overlay").style.display = "flex";
  const contact = contactList[i]["contacts"][j];
  const initials = contact.firstName[0] + contact.lastName[0];
  const firstName = contacts[i].firstName;
  const lastName = contacts[i].lastName;
  const email = contacts[i].mail;
  const phone = contacts[i].phone;
  const userColor = contacts[i].userColor;
  const id = contacts[i].userId;
  document.getElementById("overlay").innerHTML = generateEditOverlay(
    i,
    j,
    initials,
    firstName,
    lastName,
    email,
    phone,
    userColor
  );
}

//SAVE CONTACT
async function saveContact(i, j) {
  id = contactList[i]["contacts"][j]["id"];
  contacts[id]["name"] = document.getElementById("editName").value;
  contacts[id]["email"] = document.getElementById("editEmail").value;
  contacts[id]["phone"] = document.getElementById("editPhone").value;
  contacts.push();
  await setItem("contacts", JSON.stringify(contacts));
  init();
  document.getElementById("overlay").style.display = "none";

  openContactInfo(i, j);
}

//CONTACT INFO HTML
function renderContactInfo(
  i,
  j,
  initials,
  firstName,
  lastName,
  email,
  phone,
  userColor
) {
  return `
    <div class="name-section">
        <div class="name-logo name-logo-detail" style= "background-color: ${userColor}">
        <span>${initials}</span>
        </div>
        <div class="flex-row">    
            <div class="name">
                <span>${firstName} ${lastName}</span>
            </div>
            <div class="edit-contact">
                <button onclick="EditContact(${i},${j})" onmouseover="hover('a')" onmouseout="unhover('a')"><img id="edit-img" src="assets/img/edit_icon.png" alt=""><span>Edit</span></button>
                <button onclick="deleteContact(${i},${j})" onmouseover="hover('b')" onmouseout="unhover('b')"><img id="delete-img" src="assets/img/delete_icon.png" alt=""><span>Delete</span></button>
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
    </div>`;
}

//ADD NEW CONTACT OVERLAY
function generateAddNewOverlay() {
  return `
  <div class="add-contact-card" onclick="doNotClose(event)">

  <div class="add-contact-card-left">
      <img class="mobile-none" src="/assets/img/logo_desktop.png" alt="">
      <div class="titles">
        <span class="title">Add contact</span>
        <span class="subtitle">Tasks are better with a Team!</span>
        <div class="blue-line-horizontal"></div>
      </div>
  </div>
  <div class="add-contact-card-right">
    <div class="close-button" onclick="closeAddContact()">
      <button><img src="assets/img/close_icon.png" alt=""></button>
    </div>
    <div class="add-contact-container">
    <img class="profile-icon" src="assets/img/profile_icon.png" alt="">
    <form onsubmit="addNewContact(); return false">
      <div class="actions-container">
        <div class="add-contact-inputs" >
          <input id="contactname" type="text" placeholder="Name" class="input-icon-name" required>
          <input id="email" type="email" placeholder="Email" class="input-icon-mail" required>
          <input id="phone" type="text" placeholder="Phone" class="input-icon-phone" required>
        </div>
        <div class="add-contact-buttons">
          <button type="button" onclick="closeAddContact()" class="cancel-button"><span>Cancel</span><img src="assets/img/cancel_icon.png" alt=""></button>
          <button type="submit" class="create-button"><span>Create contact</span><img src="assets/img/check_icon_white.png" alt=""></button>
        </div>
      </div>
      </form>
      </div>
  </div>`;
}

//EDIT CONTACT OVERLAY
function generateEditOverlay(
  i,
  j,
  initials,
  firstName,
  lastName,
  email,
  phone,
  userColor
) {
  return `
  <div class="add-contact-card" onclick="doNotClose(event)">
    <div class="add-contact-card-left">
      <img src="assets/img/logo_small.png" alt="">
        <div class="titles">
          <span class="title">Edit contact</span>
          <span class="subtitle">Tasks are better with a Team!</span>
          <div class="blue-line-horizontal"></div>
        </div>
    </div>
    
    <div class="add-contact-card-right">
      <div class="close-button" onclick="closeAddContact()">
        <button><img src="assets/img/close_icon.png" alt=""></button>
      </div>

      <div class="add-contact-container">
        <div id="name-logo-bg${i}" class="name-logo name-logo-detail" style= "background-color: ${userColor}">
          <span>${initials}</span>
        </div>
        <form onsubmit="saveContact(${i},${j}); return false">
          <div class="actions-container">
            <div class="add-contact-inputs" >
              <input id="editName" type="text" placeholder="Name" class="edit-input input-icon-name" value="${firstName} ${lastName}" required>
              <input id="editEmail" type="email" placeholder="Email" class="edit-input input-icon-mail" value="${email}" required>
              <input id="editPhone" type="text" placeholder="Phone" class="edit-input input-icon-phone" value="${phone}" required>
            </div>
            <div class="add-contact-buttons">
              <button type="button" onclick="deleteContact(${i},${j})" class="cancel-button"><span>Delete</span><img src="assets/img/cancel_icon.png" alt=""></button>
              <button type="submit" class="create-button"><span>Save</span><img src="assets/img/check_icon_white.png" alt=""></button>
            </div>
          </div>
        </form
      </div>
  </div>`;
}

function hover(img) {
  if (img == "a") {
    document
      .getElementById("edit-img")
      .setAttribute("src", "assets/img/edit_hover_icon.png");
  } else {
    document
      .getElementById("delete-img")
      .setAttribute("src", "assets/img/delete_hover_icon.png");
  }
}

function unhover(img) {
  if (img == "a") {
    document
      .getElementById("edit-img")
      .setAttribute("src", "assets/img/edit_icon.png");
  } else {
    document
      .getElementById("delete-img")
      .setAttribute("src", "assets/img/delete_icon.png");
  }
}

function doNotClose(event) {
  event.stopPropagation();
}
