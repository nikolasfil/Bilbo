// Search bar functions
// add event listener to searchbarClick()

// window.document.getElementById("search-button").addEventListener("click", function(){searchbarClick();});
// window.addEventListener("load", function(){
//     this.document.querySelector(".searchinput")[0].addEventListener("keydown", function(event){searchbarClickPress(event);});
// }

// );

function searchbarClickPress(event) {
    if (event.key == "Enter") {
        window.location = "/search?search=" + event.target.value;
    }
}

function searchbarClick() {
    let searchbar = window.document.getElementById("search-button");
    window.location = "/search?search=" + searchbar.value;

}

// function searchbarAssignAttr() {

//     let searchbar = window.document.getElementsByClassName("searchinput")[0];
//     // change it to keyup
//     searchbar.setAttribute("onkeydown", "searchbarClickPress(event);");
// }
