function changeImage(element) {
    console.log("changeImage aufgerufen");
    element.querySelector('.icon').src = './img/urgent1.png';
}

function resetImage(element) {
    console.log("resetImage aufgerufen");
    element.querySelector('.icon').src = './img/to-do-icon.png';
}



function changeImageDoneRight(element) {
    console.log("changeImageDoneRight aufgerufen");
    element.querySelector('.icon').src = './img/done-1.png'; 
}

function resetImageDoneRight(element) {
    console.log("resetImageDoneRight aufgerufen");
    element.querySelector('.icon').src = './img/done.png';
}

