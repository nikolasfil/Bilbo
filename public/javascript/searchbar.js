document.getElementById('searchBarInput').addEventListener('keydown',searchbarClickPress)



function searchbarClickPress(event) {
    if (event.key == "Enter") {
        window.location = "/search?search=" + event.target.value;
    }
}

function searchbarClick() {
    // fix the button next to the task bar 
    let searchbar = window.document.getElementById("search-button");
    window.location = "/search?search=" + searchbar.value;
}
