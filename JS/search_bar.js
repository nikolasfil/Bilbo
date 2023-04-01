
function clickPress(event) {
    if (event.key == "Enter") {
        if (event.target.value != "") {
            // .toLocaleDateString()
            window.location = "search.html";
            // window.location.href = "/search/" + event.target.value;
            event.target.value="";
        }
    }
}


function assignAttr(){

    let searchbar = window.document.getElementsByClassName("searchinput")[0];
    // searchbar.addEventListener("onkeydown", function(event) {clickPress(event);});
    searchbar.setAttribute("onkeydown", "clickPress(event);");
}



