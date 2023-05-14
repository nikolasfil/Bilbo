// const stringSimilarity = require('string-similarity');

function includes(value,list){
    if (list == null){
        return true;
    }
    for(let i = 0; i < list.length; i++){
        if(value == list[i]){
            return true;
        }
    }
    return false;
}

function updateBooks(data,fil){

    show = [];

    for (let book in data){
        if (includes(data[book].genre,fil.genre) && includes(data[book].author,fil.author) && includes(data[book].publisher,fil.publisher)){
            show.push(data[book]);
        }
    }
    return show;
}



async function fetchAllBooksByTitle(title) {

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
    placeBooks(data,filters);
    return data;
}


function placeBooks(data,filters) {
    let container = document.getElementById("results");
    container.innerHTML = "";


    data = updateBooks(data,filters);


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

// ------------------  Filters ------------------
let variable;


function addFilterListeners(filters) {

    let checker = document.getElementsByClassName('form-check');

    for (let i = 0; i < checker.length; i++) {
        // get the input element of checker 
        let input = checker[i].getElementsByClassName('form-check-input')[0];
        
        input.addEventListener('change',function() {
            filterOnChange(input,filters);
            updateBooks(window.gData,window.gFilters);
        });
 
    }
}


function addedFilter(filters, filterName, filterType) {
    let container = document.getElementById('filter-selection')
    let div = document.createElement('div');
    div.classList.add('selected-filters');
    container.appendChild(div);
    let span = document.createElement('span');

    span.textContent = `${filterType}:${filterName}`;
    if (filters[filterType] === undefined) {
        filters[filterType] = [];
    }
    filters[filterType].push(filterName);

    div.appendChild(span);
    // <button type="button" class="btn-close" aria-label="Close"></button>
    let button = document.createElement('button');
    button.classList.add('btn-close');
    div.appendChild(button);
    // link bootstrap icons CDN in the html file



    div.addEventListener('click', function () {
        container.removeChild(div);
        let checkbox = document.getElementById(filterName);
        checkbox.checked = false;
        filters[filterType].splice(filters[filterType].indexOf(filterName), 1);

        updateBooks(window.gData,window.gFilters);
        
    });
}

// LIKE *TiTle* in books for database 

function addShowMore() {

    // get all the buttons that show more, and add listeners to their div , to show it or to hide it
    // and change the button to show 
    let divs = document.getElementsByClassName('div-show-more');
    for (let i = 0; i < divs.length; i++) {
        let button = divs[i].getElementsByClassName('btn-show-more')[0];
        let list = divs[i].getElementsByClassName('scrollable-show-more')[0];
        button.addEventListener('click', function () {
            if (this.textContent == 'Show More') {

                this.textContent = 'Show Less';
                list.classList = 'd-flex flex-column justify-content-start scrollable-show-more'
            }
            else {
                this.textContent = 'Show More';
                list.classList = 'scrollable-show-more collapsed'
            }
        }
        )
    }
}


function filterOnChange(inputElement, filters) {
    if (inputElement.checked) {
        addedFilter(filters, inputElement.id, inputElement.classList[2]);

        // change it to make the display none for these filters rather than removing them


        let moreFilters = document.getElementById(`${inputElement.classList[2]}-filter-more`);
        let mainfilters = document.getElementById(`${inputElement.classList[2]}-filter`)

        let moreFilters_form_check = moreFilters.getElementsByClassName('form-check')

        let toRemove = [];

        for (let i =0 ; i< moreFilters_form_check.length ; i++) {
            let input = moreFilters_form_check[i].getElementsByClassName('form-check-input')[0];
            if (input.id == inputElement.id) {
                moreFilters_form_check[i].classList.add('from-more');
                mainfilters.appendChild(moreFilters_form_check[i]);
                toRemove.push(moreFilters_form_check[i]); 
                break;
            }
        }

        for (let i = 0; i < toRemove.length; i++) {
            toRemove[i].style.display = 'none';
        }

        // end of adding filters from show more 



        if (moreFilters.length == 0) {
            let button = document.getElementById(`btn-${inputElement.classList[2]}-show-more`);
            button.style.display = 'none';
        }


    }
    else {
        // remove the filter from the filters object
        filters[inputElement.classList[2]].splice(filters[inputElement.classList[2]].indexOf(inputElement.id), 1);

        // remove the filter from the selected filters checker
        let container = document.getElementById('filter-selection');
        let divs = container.getElementsByClassName('selected-filters');
        
        // check if the filter is in the selected filters and remove it

        

        for (let j = 0; j < divs.length; j++) {
            if (divs[j].textContent == inputElement.classList[2] + ':' + inputElement.id) {
                container.removeChild(divs[j]);
            }
        }
    }
}

