let contacts = [
    "Simon",
    "Mike",
    "Jake",
    "Lara",
    "Susi",
    "Blake",
    "James"
];

var contactsGrouped = contacts.reduce(function(contactList, name) {
        var contactLetterGroup = contactList.filter(function(list) {
            return list.letter == name[0].toUpperCase();
        });
        if (contactLetterGroup.length > 0) {
            contactLetterGroup[0].name.push(name);
        } else {
            contactList.push({
                letter: name[0].toUpperCase(),
                name: [name]
            });
        }
        return contactList;
    }, [])
    .sort(function(a, b) {
        return b.letter - a.letter;
    })

console.log(contactsGrouped);