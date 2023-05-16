// const stringSimilarity = require('string-similarity');

function mainLoad() {

    console.log(window.searchBarValue)
    window.gFilters = {};

    createPages(2); pageSelector();

    addShowMore();

    addFilterListeners(window.gFilters);

    window.gData = placeAllBooksByTitle(window.searchBarValue, window.gFilters);

    // console.log(window.gData);
}


async function fetchAllBooksByTitle2(title) {

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


async function fetchAllBooksByTitle(title, filters) {

    let link; 

    link = '/fetch_filters'

    console.log(JSON.stringify({ "filters": filters, "title": title }));
    return await fetch(link, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({ "filters": filters, "title": title }),

    }).then((res) => {
        return res.json();
    }).then((data) => {
        return data;
    }).catch(error => {
        console.log(error);
    });
}

async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}


async function placeAllBooksByTitle(title, filters) {
    // place all the books by title and filters (filters is not yet implemented)
    let data = await fetchAllBooksByTitle(title, filters);
    placeBooks(data, filters);
    return data;
}


function placeBooks(data, filters) {
    let container = document.getElementById("results");
    container.innerHTML = "";


    for (let i = 0; i < data.length; i++) {

        let div = document.createElement("div");
        div.className = "card-img-top card-space";
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
        div2.className = "p-2";

        let h6 = document.createElement("h6");
        h6.className = "text-truncate--2"
        h6.innerHTML = `<strong>${data[i].title}</strong>`;

        let p = document.createElement("p");
        p.className = "text-truncate--3"


        div2.appendChild(h6);


        if (data[i].summary) {
            p.innerHTML = `<small>${data[i].summary}</small>`;
            div2.appendChild(p);
        }


        if (data[i].copy_num) {

            let p2 = document.createElement("p");
            // p2.textContent = `Available Copies: ${data[i].copies}`;
            // get the number of available copies 
            p2.innerHTML = `<small>Available Copies: ${data[i].copy_num}</small>`;
            div2.appendChild(p2);
        }


        a.appendChild(img);
        a.appendChild(div2);

        div.appendChild(a);

        container.appendChild(div);


    }
}


function reconfigureSearchBar(filters) {
    // remove listeners from searchbar 
    // and add the listener to get filters as well 
    // Implemented , but doesn't work yet 
    let searchbar = document.getElementById('searchBarInput').addEventListener('keydown', (event) => {
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

        input.addEventListener('change', function () {
            filterOnChange(input, filters);
            // updateBooks(window.gData, window.gFilters);
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

        // updateBooks(window.gData, window.gFilters);

    });
}


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

        // let toRemove = [];

        // for (let i = 0; i < moreFilters_form_check.length; i++) {
        //     let input = moreFilters_form_check[i].getElementsByClassName('form-check-input')[0];
        //     if (input.id == inputElement.id) {
        //         moreFilters_form_check[i].classList.add('from-more');
        //         mainfilters.appendChild(moreFilters_form_check[i]);
        //         // toRemove.push(moreFilters_form_check[i]);
        //         moreFilters_form_check[i].style.display = 'none';
        //         break;
        //     }
        // }

        // for (let i = 0; i < toRemove.length; i++) {
        //     toRemove[i].style.display = 'none';
        // }

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
