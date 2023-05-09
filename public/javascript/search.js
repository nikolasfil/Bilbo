
// fetch from url /all and return a json object 
// containing all the data from the database


function searchGet() {
    // get the search input
    let search = document.getElementById("searchBarInput").value;

    // fetch all data from database
    fetch("/all")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);

            // get the html element which will contain the data
            let searchResults = document.getElementById("results");

            // clear the searchResults
            searchResults.innerHTML = "";

            // loop through all the data
            for (let i = 0; i < data.length; i++) {
                // check if the input matches any of the data
                // if (data[i].name.toLowerCase().includes(search.toLowerCase())) {
                    // if the input matches any of the data, add it to the searchResults
                    searchResults.innerHTML += `<a href="/${data[i].name}">${data[i].name}</a><br>`;
                // }
            }
        });
}



function fetchAllBooks(){

    fetch("/all")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);

            // // get the html element which will contain the data
            // let searchResults = document.getElementById("results");

            // // clear the searchResults
            // searchResults.innerHTML = "";

            // // loop through all the data
            // for (let i = 0; i < data.length; i++) {
            //     // check if the input matches any of the data
            //     // if (data[i].name.toLowerCase().includes(search.toLowerCase())) {
            //         // if the input matches any of the data, add it to the searchResults
            //         // searchResults.innerHTML += `{{> card photo=${data[i].photo} title=${data[i].title} description='description' copies='2' location=( encode (concat 'book_info/' ${data[i].isbn} ))}}`
                    
            //         searchResults.innerHTML+=`<a href="/book_info/${data[i].isbn}">${data[i].isbn}</a><br><br>`;
            //     // }
            // }
        });

}




