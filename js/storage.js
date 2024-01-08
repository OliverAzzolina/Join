const STORAGE_TOKEN = 'V29BBR8Q1MPW81TMTAAB2UZEWWQE2ZVVT3GWGNDL'; //process.env.STORAGE_TOKEN
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';//process.env.STORAGE_URL


async function setItem(key, value) {
    const payload = {key, value, token: STORAGE_TOKEN}
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)}).then(response => response.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) { 
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}


