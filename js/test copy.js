

// HTML TEMPLATE
function ExampleHTML(german, english, italian, french, spanish, dutch) {
    return /*html*/`
    <p class="german-word">${german}</p>
    <ul class="translations">
        <li>Englisch: ${english}</li>
        <li>Italienisch: ${italian}</li>
        <li>Französisch: ${french}</li>
        <li>Spanisch: ${spanish}</li>
        <li>Niederländisch: ${dutch}</li>
    </ul>
    `;
}

