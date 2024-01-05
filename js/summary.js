function changeImage(element) {
    console.log("changeImage aufgerufen");
    element.querySelector('.icon').src = "assets/img/prio_urgent_icon.png";
}

function resetImage(element) {
    console.log("resetImage aufgerufen");
    element.querySelector('.icon').src = "assets/img/to_do_icon.png";
}



function changeImageDoneRight(element) {
    console.log("changeImageDoneRight aufgerufen");
    element.querySelector('.icon').src = "assets/img/done_black_icon.png"; 
}

function resetImageDoneRight(element) {
    console.log("resetImageDoneRight aufgerufen");
    element.querySelector('.icon').src = "assets/img/done_black_icon.png";
}

function getGreeting() {
    let today = new Date();
    let hour = today.getHours();

    let greetingText = document.getElementById('greetingText');

    if (hour >= 5 && hour < 12) {
        greetingText.textContent = 'Guten Morgen';
    } else if (hour >= 12 && hour < 17) {
        greetingText.textContent = 'Guten Tag';
    } else {
        greetingText.textContent = 'Guten Abend';
    }
}


getGreeting();

