
// fetch from url /all and return a json object 
// containing all the data from the database

function search() {
    // get the search input
    let search = document.getElementById("search").value;

    // fetch all data from database
    fetch("/all")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);

            // get the html element which will contain the data
            // let searchResults = document.getElementById("searchResults");

            // // clear the searchResults
            // searchResults.innerHTML = "";

            // // loop through all the data
            // for (let i = 0; i < data.length; i++) {
            //     // check if the input matches any of the data
            //     if (data[i].name.toLowerCase().includes(search.toLowerCase())) {
            //         // if the input matches any of the data, add it to the searchResults
            //         searchResults.innerHTML += `<a href="/${data[i].name}">${data[i].name}</a><br>`;
            //     }
            // }
        });
}

