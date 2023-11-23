const STORAGE_TOKEN = process.env.STORAGE_TOKEN;
const STORAGE_URL = process.env.STORAGE_URL;


async function setItem(key, value) {
    const payload = {key, value, token: STORAGE_TOKEN}
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)}).then(response => response.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(response => response.json());
}