let preRegisteredContacts = [
    {
        firstName: 'Hans',
        lastName: 'Müller',
        userColor: '#ff0000',
        mail: 'hans.mueller@developerakademie.com',
        phone: '0171-1234567',
        userId: generateRandomID()
    },
    {
        firstName: 'Anna',
        lastName: 'Schmidt',
        userColor: '#00ff00',
        mail: 'anna.schmidt@developerakademie.com',
        phone: '0162-9876543',
        userId: generateRandomID()
    },
    {
        firstName: 'Max',
        lastName: 'Meier',
        userColor: '#0000ff',
        mail: 'max.meier@developerakademie.com',
        phone: '0155-8765432',
        userId: generateRandomID()
    },
    {
        firstName: 'Sophie',
        lastName: 'Fischer',
        userColor: '#ff00ff',
        mail: 'sophie.fischer@developerakademie.com',
        phone: '0173-2345678',
        userId: generateRandomID()
    },
    {
        firstName: 'Felix',
        lastName: 'Wagner',
        userColor: '#ffff00',
        mail: 'felix.wagner@developerakademie.com',
        phone: '0157-3456789',
        userId: generateRandomID()
    },
    {
        firstName: 'Lena',
        lastName: 'Hoffmann',
        userColor: '#00ffff',
        mail: 'lena.hoffmann@developerakademie.com',
        phone: '0163-4567890',
        userId: generateRandomID()
    },
    {
        firstName: 'Jan',
        lastName: 'Becker',
        userColor: '#ff8000',
        mail: 'jan.becker@developerakademie.com',
        phone: '0170-5678901',
        userId: generateRandomID()
    },
    {
        firstName: 'Laura',
        lastName: 'Schulz',
        userColor: '#8000ff',
        mail: 'laura.schulz@developerakademie.com',
        phone: '0154-6789012',
        userId: generateRandomID()
    }
];


function generateRandomID() {
    return Math.floor(100000 + Math.random() * 900000);
}

let contacts[];
let tasks = [];