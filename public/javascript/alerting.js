

try {
    let modalAlert = document.getElementById("alert-popup");
} catch (error) {
    console.log(error);
} finally {
    modalAlert = document.getElementById("alert-popup");
}


document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.key == "Escape") {
        modalAlert.style.display = "none";
    }
};


window.onclick = function (event) {
    if (event.target == modalAlert) {
        modalAlert.style.display = "none";
    }
}

let btnAlert = document.getElementById("close-alert");
if (btnAlert) {
    btnAlert.addEventListener('click', function(){
        modalAlert.style.display = "none";
    })
}


