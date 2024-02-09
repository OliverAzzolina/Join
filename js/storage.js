const STORAGE_TOKEN = 'V29BBR8Q1MPW81TMTAAB2UZEWWQE2ZVVT3GWGNDL';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


async function setItem(key, value) {
    addToKeyList(key);
    const payload = {key, value, token: STORAGE_TOKEN}
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)}).then(response => response.json());
}

async function addToKeyList(key) {
    let keys = await getItem('keys');
    if (!keys.includes(key)) {
        keys.push(key);
        setItem('keys', keys);
    }
}


async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) { 
            return res.data.value;
        } else {
            throw new Error(`Could not find data with key "${key}".`);
        }
    });
}


async function getAllKeys() {
    try {
        const keys = await getItem('keys');
        console.log("All keys: ", keys);
        console.log(JSON.parse(keys));
    } catch (error) {
        console.error("Error retrieving all keys:", error);
        throw new Error("Could not retrieve the list of all keys.");
    }
}

























// WORKAROUND FUNCTIONS FOR REMOTE STORAGE HANDLING
async function deleteRemoteArray(key) {
    try {
        await setItem(key, []);
        console.log(`The "${key}"-array has been successfully deleted.`);
    } catch (error) {
        console.error(`Error deleting the "${key}"-array:`, error);
    }
}



async function logRemoteStoreKey(key) {
    try {
        let remoteStorageArrayJSON = await getItem(key); 
        if (remoteStorageArrayJSON) {;
            console.log("JSON: ")
            console.log(remoteStorageArrayJSON);
            console.log("Object: ")
            console.log(JSON.parse(remoteStorageArrayJSON));
        } else {
            console.log(`There is no "${key}"-array`);
        }
    } catch (error) {
        console.error(`Error while getting "${key}"-array: `, error);
    }
}

