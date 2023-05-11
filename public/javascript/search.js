// const stringSimilarity = require('string-similarity');


// window.onload = () => {
//     // let filters =  JSON.parse(filterString);
//     let filters = {};
//     createPages(2); pageSelector(); addFilterListeners(filters); addShowMore();
//     placeAllBooksByTitle(searchBarValue,filters);
//     reconfigureSearchBar(filters);
// }

function updateBooks(data,fil){
    show = [];
    for(let i = 0; i < data.length; i++){
        for (let j in fil){
            console.log(fil[j]);
        }
        break;
    }
    return show;
}

function placeBooks(data) {
    let container = document.getElementById("results");
    container.innerHTML = "";


    let data2 = updateBooks(data,filters);
    console.log(data2);

    // console.log(data)

    for (let i = 0; i < data.length; i++) {

        let div = document.createElement("div");
        div.className = "card-img-top";
        div.draggable = "false";

        let a = document.createElement("a");
        a.href = `/book_info/${data[i].isbn}`;
        a.className = "d-flex flex-column align-content-center";

        let img = document.createElement("img");
        img.className = "rounded-corners card-img-class";
        if (data[i].photo == null) {
            data[i].photo = "/img/card_book_default.jpg";
        }
        img.src = data[i].photo;
        img.alt = "photo";
        img.draggable = "false";

        let div2 = document.createElement("div");
        div2.className = "p-3";

        let h4 = document.createElement("h4");
        h4.innerHTML = `<strong>${data[i].title}</strong>`;

        let p = document.createElement("p");

        // p.textContent = data[i].description;
        p.textContent = "Description";

        let p2 = document.createElement("p");
        // p2.textContent = `Available Copies: ${data[i].copies}`;
        // get the number of available copies 
        p2.textContent = `Available Copies: 2`;

        div2.appendChild(h4);
        div2.appendChild(p);
        div2.appendChild(p2);

        a.appendChild(img);
        a.appendChild(div2);

        div.appendChild(a);

        container.appendChild(div);



        // container.innerHTML += `<div class="card-img-top" draggable="false">
        // <a href="/book_info/${data[i].isbn}" class="d-flex flex-column align-content-center">
        //     <img class="rounded-corners card-img-class" src=${data[i].photo} alt="photo" draggable="false">
        //     <div class = "p-3">
        //         <h4><strong>${data[i].title}</strong></h4>
        //         <p>${data[i].description}</p>
        //         <p>Available Copies: ${data[i].copies}</p>
        //     </div>
        // </a>
        // </div>`
    }
}

async function fetchAllBooksByTitle(title, filters) {

    // Fetch al books by title and filters (filters is not yet implemented)
    // I should add a middle layer getting first the title and isbn and then getting the rest of the data
    // include copies number ? 
    let link;
    if (title) {
        // if a title is given fetch books by close enough title 
        link = "/fetch_books/" + title;
    }
    else {
        // else fetch all books 
        link = '/fetch_books_all'
    }
    // console.log(link);
    // make a request to the server , get the data and return it

    return await fetch(link).then((res) => {
        return res.json();
    }).then((data) => {
        return data;
    }).catch(error => {
        console.log(error);
    });
}



async function placeAllBooksByTitle(title, filters) {
    // place all the books by title and filters (filters is not yet implemented)
    let data = await fetchAllBooksByTitle(title, filters);
    placeBooks(data);
    return data;
}


function checkSimilarities() {
    // check if the search bar value is similar to any of the titles
    // not implemented yet, got it off an internet 
    const objValues = Object.values(obj).map(value => value.toString());

    // Calculate string similarity scores
    const scores = stringSimilarity.findBestMatch(phrase, objValues);

    // Threshold for considering a match
    const threshold = 0.5;

    // Check if any score exceeds the threshold
    const hasMatch = scores.ratings.some(score => score.rating > threshold);

    if (hasMatch) {
        matches.push({
            file,
            object: obj,
            score: scores.bestMatch.rating
        });
    }
}



function reconfigureSearchBar(filters){
    // remove listeners from searchbar 
    // and add the listener to get filters as well 
    // Implemented , but doesn't work yet 
    let searchbar = document.getElementById('searchBarInput').addEventListener('keydown',(event)=>{
        if (event.key == "Enter") {
            // console.log(event.target.value+JSON.stringify(filters))
            window.location = `/search?search=${event.target.value}&filters=${JSON.stringify(filters)}`;
        }
    });

}

