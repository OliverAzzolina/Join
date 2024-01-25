let users = [];
let user;
let contacts = [];
let preRegisteredContacts = [
  {
    firstName: "Hans",
    lastName: "Müller",
    userColor: "#ff0000",
    mail: "hans.mueller@developerakademie.com",
    phone: "0171-1234567",
    userId: 451208,
  },
  {
    firstName: "Anna",
    lastName: "Schmidt",
    userColor: "#00ff00",
    mail: "anna.schmidt@developerakademie.com",
    phone: "0162-9876543",
    userId: 857437,
  },
  {
    firstName: "Max",
    lastName: "Meier",
    userColor: "#0000ff",
    mail: "max.meier@developerakademie.com",
    phone: "0155-8765432",
    userId: 869755,
  },
  {
    firstName: "Sophie",
    lastName: "Fischer",
    userColor: "#ff00ff",
    mail: "sophie.fischer@developerakademie.com",
    phone: "0173-2345678",
    userId: 929223,
  },
  {
    firstName: "Felix",
    lastName: "Wagner",
    userColor: "#ffff00",
    mail: "felix.wagner@developerakademie.com",
    phone: "0157-3456789",
    userId: 126510,
  },
  {
    firstName: "Lena",
    lastName: "Hoffmann",
    userColor: "#00ffff",
    mail: "lena.hoffmann@developerakademie.com",
    phone: "0163-4567890",
    userId: 855822,
  },
  {
    firstName: "Jan",
    lastName: "Becker",
    userColor: "#ff8000",
    mail: "jan.becker@developerakademie.com",
    phone: "0170-5678901",
    userId: 927251,
  },
  {
    firstName: "Laura",
    lastName: "Schulz",
    userColor: "#8000ff",
    mail: "laura.schulz@developerakademie.com",
    phone: "0154-6789012",
    userId: 464207,
  },
];
let tasks = [];

//LOAD CONTACTS FROM USERDATA
async function loadUserData() {
  users = JSON.parse(await getItem("users"));
  user = {
    firstName: users[2].firstName,
    lastName: users[2].lastName,
    userColor: users[2].userColor,
    email: users[2].email,
    phone: users[2].phone,
    userId: users[2].userId,
    password: users[2].password,
    userContacts: users[2].userContacts,
    initials: users[2].initials,
  };
  contacts = user.userContacts;
  sortContacts();
}