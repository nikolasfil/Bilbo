

function mainLoad() {

    window.gFilters = {};

    addShowMore();

    addFilterListeners(window.gFilters);

    placeAllBooksByTitle(window.searchBarValue, window.gFilters);

    page_initilazation();

}   



async function fetchAllBooksByTitle(limit=-1,offset=0) {

    let link;

    link = '/fetch_filters'
    return await fetch(link, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({ "filters": window.gFilters, "title": window.searchBarValue , "offset": offset, "limit":limit}),

    }).then((res) => {
        return res.json();
    }).then((data) => {
        return data;
    }).catch(error => {
        console.log(error);
    });
}

async function fetchNumOfResults() {

    let link;

    link = '/fetchNumOfResults'
    return await fetch(link, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({ "filters": window.gFilters, "title": window.searchBarValue }),

    }).then((res) => {
        return res.json();
    }).then((data) => {
        return data[0].count_result;
    }).catch(error => {
        console.log(error);
    });
}

async function placeAllBooksByTitle(limit=-1,offset=0) {
    // place all the books by title and filters (filters is not yet implemented)
    let data = await fetchAllBooksByTitle(limit,offset);
    placeBooks(data);
    // console.log('done')

}


function placeBooks(data) {
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


// function reconfigureSearchBar(filters) {
//     // remove listeners from searchbar 
//     // and add the listener to get filters as well 
//     // Implemented , but doesn't work yet 
//     let searchbar = document.getElementById('searchBarInput').addEventListener('keydown', (event) => {
//         if (event.key == "Enter") {
//             // console.log(event.target.value+JSON.stringify(filters))
//             window.location = `/search?search=${event.target.value}&filters=${JSON.stringify(filters)}`;
//         }
//     });

// }

// ------------------  Filters ------------------
let variable;


function addFilterListeners() {

    let checker = document.getElementsByClassName('form-check');

    for (let i = 0; i < checker.length; i++) {
        let input = checker[i].getElementsByClassName('form-check-input')[0];

        input.addEventListener('change', function () {
            filterOnChange(input, window.gFilters);
            placeAllBooksByTitle(window.searchBarValue, window.gFilters);
            page_initilazation();
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
        // console.log(filters,window.searchBarValue);
        placeAllBooksByTitle(window.searchBarValue, window.gFilters);
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

        if (document.getElementById(`${inputElement.classList[2]}-filter-more`)){
            let moreFilters = document.getElementById(`${inputElement.classList[2]}-filter-more`);
            let mainfilters = document.getElementById(`${inputElement.classList[2]}-filter`)

            // let moreFilters_form_check = moreFilters.getElementsByClassName('form-check')

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
