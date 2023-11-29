function exampleHTML(testVariable1, testVariable2) {
    htmlText = "";
    htmlText = /*html*/`
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
    htmlText = /*html*/`
    <div class="test">
        <img src="img/plus.svg" alt="Hinzufügen"/>
    </div>`;
    return htmlText;
}

function navbarHTML() {
    htmlText = "";
    htmlText = /*html*/`
    <div class="sidebar">
        <div>
            <img class="logo" src="./img/logo-white.svg" alt="">
        </div>
        <div class="menu-section">
            <ul>
                <li>
                    <img class="icon" src="./img/summary_sidebar.svg" alt="Summary Icon">
                    <a href="summary.html">Summary</a>
                </li>
                <li>
                    <img class="icon" src="./img/add_task_sidebar.svg" alt="Add Task Icon">
                    <a href="about.html">Ad Task</a>
                </li>
                <li>
                    <img class="icon" src="./img/Board_sidebar.svg" alt="Board Icon">
                    <a href="board.html">Board</a>
                </li>
                <li>
                    <img class="icon" src="./img/Contacts_sidebar.svg" alt="Contacts Icon">
                    <a href="join.html">Contacts</a>
                </li>
            </ul>
        </div>
        <li class="footer-section">
            <a class="footertext" href="join.html">Privacy Policy</a>
            <a class="footertext" href="desktop.html">legal Notice</a>
        </li>
    </div>`;
    return htmlText;
}