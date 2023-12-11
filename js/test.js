document.addEventListener("DOMContentLoaded", function () {
    loadArray();
});

function loadArray() {
    mainContainer = document.getElementById("mainContainer");
    mainContainer.innerHTML = "";
    exampleArray.forEach(word => {
        german = word.deutsch;
        english = word.englisch;
        italian = word.italienisch;
        french = word.französisch;
        spanish = word.spanisch;
        dutch = word.niederländisch;

        mainContainer.innerHTML += ExampleHTML(german, english, italian, french, spanish, dutch)
    });
}

// HTML TEMPLATE in /test copy.js

// ARRAY
let exampleArray = [
    {
        "deutsch": "Strand",
        "englisch": "Beach",
        "italienisch": "Spiaggia",
        "französisch": "Plage",
        "spanisch": "Playa",
        "niederländisch": "Strand"
    },
    {
        "deutsch": "Sonnenbrille",
        "englisch": "Sunglasses",
        "italienisch": "Occhiali da sole",
        "französisch": "Lunettes de soleil",
        "spanisch": "Gafas de sol",
        "niederländisch": "Zonnebril"
    },
    {
        "deutsch": "Koffer",
        "englisch": "Suitcase",
        "italienisch": "Valigia",
        "französisch": "Valise",
        "spanisch": "Maleta",
        "niederländisch": "Koffer"
    },
    {
        "deutsch": "Reisepass",
        "englisch": "Passport",
        "italienisch": "Passaporto",
        "französisch": "Passeport",
        "spanisch": "Pasaporte",
        "niederländisch": "Paspoort"
    },
    {
        "deutsch": "Flugzeug",
        "englisch": "Airplane",
        "italienisch": "Aereo",
        "französisch": "Avion",
        "spanisch": "Avión",
        "niederländisch": "Vliegtuig"
    },
    {
        "deutsch": "Hotel",
        "englisch": "Hotel",
        "italienisch": "Hotel",
        "französisch": "Hôtel",
        "spanisch": "Hotel",
        "niederländisch": "Hotel"
    },
    {
        "deutsch": "Bikini",
        "englisch": "Bikini",
        "italienisch": "Bikini",
        "französisch": "Bikini",
        "spanisch": "Bikini",
        "niederländisch": "Bikini"
    },
    {
        "deutsch": "Sonnenschutz",
        "englisch": "Sunscreen",
        "italienisch": "Crema solare",
        "französisch": "Écran solaire",
        "spanisch": "Protector solar",
        "niederländisch": "Zonnebrand"
    },
    {
        "deutsch": "Souvenir",
        "englisch": "Souvenir",
        "italienisch": "Souvenir",
        "französisch": "Souvenir",
        "spanisch": "Recuerdo",
        "niederländisch": "Souvenir"
    },
    {
        "deutsch": "Kreuzfahrt",
        "englisch": "Cruise",
        "italienisch": "Crociera",
        "französisch": "Croisière",
        "spanisch": "Crucero",
        "niederländisch": "Cruise"
    },
    {
        "deutsch": "Rucksack",
        "englisch": "Backpack",
        "italienisch": "Zaino",
        "französisch": "Sac à dos",
        "spanisch": "Mochila",
        "niederländisch": "Rugzak"
    },
    {
        "deutsch": "Ferien",
        "englisch": "Vacation",
        "italienisch": "Vacanza",
        "französisch": "Vacances",
        "spanisch": "Vacaciones",
        "niederländisch": "Vakantie"
    },
    {
        "deutsch": "Reiseleiter",
        "englisch": "Tour guide",
        "italienisch": "Guida turistica",
        "französisch": "Guide touristique",
        "spanisch": "Guía turístico",
        "niederländisch": "Reisleider"
    },
    {
        "deutsch": "Reiseziel",
        "englisch": "Destination",
        "italienisch": "Destinazione",
        "französisch": "Destination",
        "spanisch": "Destino",
        "niederländisch": "Bestemming"
    },
    {
        "deutsch": "Fotografie",
        "englisch": "Photography",
        "italienisch": "Fotografia",
        "französisch": "Photographie",
        "spanisch": "Fotografía",
        "niederländisch": "Fotografie"
    },
    {
        "deutsch": "Sehenswürdigkeit",
        "englisch": "Sightseeing",
        "italienisch": "Visita turistica",
        "französisch": "Tourisme",
        "spanisch": "Turismo",
        "niederländisch": "Bezienswaardigheid"
    },
    {
        "deutsch": "Gepäck",
        "englisch": "Luggage",
        "italienisch": "Bagaglio",
        "französisch": "Bagage",
        "spanisch": "Equipaje",
        "niederländisch": "Bagage"
    }]