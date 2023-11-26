function exampleHTML(testVariable1, testVariable2) {
    htmlText = "";
    htmlText = `
    <div class="test" onclick="functionName('${testVariable1}', ${testVariable2})">
        <div class="meal">
            <h2>${testVariable1}</h2>
            <p>Füllung: ${testVariable2}</p> 
            <p>Glasur: ${testVariable1}</p>
            <p>Topping: ${testVariable2}</p>
            <p>Soße: ${testVariable1}</p>
            <p>${testVariable2} €</p>
        </div>
        <div>
            <img src="img/plus.svg" alt="Hinzufügen"/>
        </div>
    </div>`;
    return htmlText;
}

function exampleHTML() {
    htmlText = "";
    htmlText = `
    <div class="test">
        <img src="img/plus.svg" alt="Hinzufügen"/>
    </div>`;
    return htmlText;
}