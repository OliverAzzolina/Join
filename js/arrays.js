let preRegisteredContacts = [
    {
        firstName: 'Hans',
        lastName: 'Müller',
        initials: 'HM',
        email: 'hans.mueller@developerakademie.com',
        phone: '0171-1234567',
        password: null,
        userColor: '#ff0000',
        userId: 451208,
        userContacts: null
    },
    {
        firstName: 'Anna',
        lastName: 'Schmidt',
        initials: 'AS',
        email: 'anna.schmidt@developerakademie.com',
        phone: '0162-9876543',
        password: null,
        userColor: '#00ff00',
        userId: 857437,
        userContacts: null
    },
    {
        firstName: 'Max',
        lastName: 'Meier',
        initials: 'MM',
        email: 'max.meier@developerakademie.com',
        phone: '0155-8765432',
        password: null,
        userColor: '#0000ff',
        userId: 869755,
        userContacts: null
    },
    {
        firstName: 'Sophie',
        lastName: 'Fischer',
        initials: 'SF',
        email: 'sophie.fischer@developerakademie.com',
        phone: '0173-2345678',
        password: null,
        userColor: '#ff00ff',
        userId: 929223,
        userContacts: null
    },
    {
        firstName: 'Felix',
        lastName: 'Wagner',
        initials: 'FW',
        email: 'felix.wagner@developerakademie.com',
        phone: '0157-3456789',
        password: null,
        userColor: '#ffff00',
        userId: 126510,
        userContacts: null
    },
    {
        firstName: 'Lena',
        lastName: 'Hoffmann',
        initials: 'LH',
        email: 'lena.hoffmann@developerakademie.com',
        phone: '0163-4567890',
        password: null,
        userColor: '#00ffff',
        userId: 855822,
        userContacts: null
    },
    {
        firstName: 'Jan',
        lastName: 'Becker',
        initials: 'JB',
        email: 'jan.becker@developerakademie.com',
        phone: '0170-5678901',
        password: null,
        userColor: '#ff8000',
        userId: 927251,
        userContacts: null
    },
    {
        firstName: 'Laura',
        lastName: 'Schulz',
        initials: 'LS',
        email: 'laura.schulz@developerakademie.com',
        phone: '0154-6789012',
        password: null,
        userColor: '#8000ff',
        userId: 464207,
        userContacts: null
    }
];

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

let contacts = [];
let tasks = [];