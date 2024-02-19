//const STORAGE_TOKEN = 'V29BBR8Q1MPW81TMTAAB2UZEWWQE2ZVVT3GWGNDL';
const STORAGE_TOKEN = 'SFDJDI1YCNEPYT93H5853ZD291TRO124MLNBVECL';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    }).then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    });
}


async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        return res.data.value;
    });
}

async function getUserArray() {
    const responseJson = await getItem('users');
    return JSON.parse(responseJson);
}

async function getTaskArray() {
    let responseJson = await getItem("tasks");
    return JSON.parse(responseJson);
  }

async function logoutRemoteArray(key) {
    const responseJson = await getItem(key);
    const response = JSON.parse(responseJson);
    console.log(response)
}


async function resetUserArray() {
    let users = rescueUserArray;
    await setItem('users', JSON.stringify(users));
    console.log('User array reset.');
    logoutRemoteArray('users');
}

async function resetTaskArray() {
    let tasks = rescueTaskArray;
    await setItem('tasks', JSON.stringify(tasks));
    console.log('Task array reset.');
    logoutRemoteArray('tasks');
}