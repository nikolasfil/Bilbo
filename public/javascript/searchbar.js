// Search bar functions
// add event listener to searchbarClick()

// window.document.getElementById("search-button").addEventListener("click", function(){searchbarClick();});

function searchbarClickPress(event) {
    if (event.key == "Enter") {

        if (event.target.value != "") {
            window.location = "/search?search=" + event.target.value;
            // event.target.value = "";
        }
    }
}

function searchbarClick() {
    let searchbar = window.document.getElementById("search-button");
    if (searchbar.value != "") {
        window.location = "/search?search=" + searchbar.value;
        // searchbar.value = "";
    }
}

// function searchbarAssignAttr() {

//     let searchbar = window.document.getElementsByClassName("searchinput")[0];
//     // change it to keyup
//     searchbar.setAttribute("onkeydown", "searchbarClickPress(event);");
// }
