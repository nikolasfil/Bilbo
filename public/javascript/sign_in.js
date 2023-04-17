// function openForm() {
//   document.getElementById("sign-in-popup").style.display = "block";
// }

// function closeForm() {
//   document.getElementById("sign-in-popup").style.display = "none";
// }



// Get the modalSignIn
let modalSignIn = document.getElementById("sign-in-popup");

// Get the modalSignIn
let modalSignUp = document.getElementById("sign-up-popup");


// Get the button that opens the modalSignIn
let btnSignIn = document.getElementById("sign-in-btn");

// Get the button that opens the modalSignIn
let btnSignUp = document.getElementById("sign-up-btn");


// Get the <span> element that closes the modalSignIn
let spanSignIn = document.getElementsByClassName("close")[0];
let spanSignUp = document.getElementsByClassName("close")[1];

let forgot = document.getElementsByClassName("forgot")[0];

// When the user clicks the button, open the modalSignIn 
btnSignIn.onclick = function () {
  modalSignIn.style.display = "block";
}

btnSignUp.onclick = function () {
  modalSignUp.style.display = "block";
}


// When the user clicks on <span> (x), close the modalSignIn
spanSignIn.onclick = function () {
  modalSignIn.style.display = "none";
}

spanSignUp.onclick = function () {
  modalSignUp.style.display = "none";
}

forgot.onclick = function () {
  alert('Not implemented yet');
}

// When the user clicks anywhere outside of the modalSignIn, close it
window.onclick = function (event) {
  if (event.target == modalSignIn) {
    modalSignIn.style.display = "none";
  }
  if (event.target == modalSignUp) {
    modalSignUp.style.display = "none";
  }

}



