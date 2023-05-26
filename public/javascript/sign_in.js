

// Get the modalSignIn
let modalSignIn = document.getElementById("sign-in-popup");

// Get the modalSignIn
let modalSignUp = document.getElementById("sign-up-popup");

let modalAlert;
if (document.getElementById("alert-popup")) {
  modalAlert = document.getElementById("alert-popup");
}
// modalAlert.style.display = "block";

// Get the button that opens the modalSignIn
let btnSignIn = document.getElementById("sign-in-btn");

// Get the button that opens the modalSignIn
let btnSignUp = document.getElementById("sign-up-btn");



const form_sign_in = document.getElementById("form_sign_in");
const form_sign_up = document.getElementById("form_sign_up");


// When the user clicks the button, open the modalSignIn 
btnSignIn.onclick = function () {
  modalSignIn.style.display = "block";
}

btnSignUp.onclick = function () {
  modalSignIn.style.display = "none";
  modalSignUp.style.display = "block";
}


// assign pressing the key esc to close the modalSignIn
document.onkeydown = function (evt) {
  evt = evt || window.event;
  if (evt.key == "Escape") {
    modalSignIn.style.display = "none";
    modalSignUp.style.display = "none";
    if (modalAlert) {
      modalAlert.style.display = "none";
    }
  }
};

// When the user clicks anywhere outside of the modalSignIn, close it
window.onclick = function (event) {
  if (event.target == modalSignIn) {
    modalSignIn.style.display = "none";
  }
  if (event.target == modalSignUp) {
    modalSignUp.style.display = "none";
  }
  if (modalAlert) {

    if (event.target == modalAlert) {
      modalAlert.style.display = "none";
    }
  }
}


// const models = [modalSignIn,modalSignUp,modalAlert]


let maximum = 2;
if (modalAlert) {
  maximum = 3;
}

for (let i=0; i < maximum; i++) {
  document.getElementsByClassName("close")[i].onclick = function () {
    modalSignIn.style.display = "none";
    modalSignUp.style.display = "none";
    if (modalAlert) {
      modalAlert.style.display = "none";
    }
  }
}


