
function searchbarClickPress(event) {
    if (event.key == "Enter") {
        window.location = "/search?search=" + event.target.value;
    }
}

function searchbarClick() {
    let searchbar = window.document.getElementById("search-button");
    window.location = "/search?search=" + searchbar.value;
}
