// Search bar functions

function searchbarClickPress(event) {
    if (event.key == "Enter") {

        if (event.target.value != "") {
            window.location = "/search?search=" + event.target.value;
            // event.target.value = "";
        }
    }
}


// function searchbarAssignAttr() {

//     let searchbar = window.document.getElementsByClassName("searchinput")[0];
//     // change it to keyup
//     searchbar.setAttribute("onkeydown", "searchbarClickPress(event);");
// }
