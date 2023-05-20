document.getElementById('searchBarInput').addEventListener('keydown',searchbarClickPress)
document.getElementById('search-button').addEventListener('click',searchbarClick)


function searchbarClickPress(event) {
    if (event.key == "Enter") {
        window.location = "/search?search=" + event.target.value;
    }
}

function searchbarClick() {
    let searchbar = window.document.getElementById("searchBarInput");    
    window.location = "/search?search=" + searchbar.value;
}
