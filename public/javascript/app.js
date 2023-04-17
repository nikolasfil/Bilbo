





//   ----------------------

//  Create book cards


function addBook(page, title, src, summary, copies) {
    // change it to handle more pages
    let container = document.getElementById(page);

    let div = document.createElement("div");
    // div.className = "card-img-top";
    div.classList.add("card-img-top");

    let img = document.createElement("img");
    img.setAttribute("src", src);
    img.setAttribute("alt", title);
    img.classList.add("card-img-class");
    div.appendChild(img);

    let div2 = document.createElement("div");
    div2.classList.add("card-body");

    let h5 = document.createElement("h5");
    // h5.classList.add("card-title");
    h5.textContent = title;
    div2.appendChild(h5);
    let p = document.createElement("p");
    p.classList.add("card-text");
    p.textContent = summary;
    div2.appendChild(p);
    let p2 = document.createElement("p");
    p2.classList.add("card-box-info");
    p2.textContent = "Available Copies: " + copies;
    div2.appendChild(p2);
    div.appendChild(div2);
    div.addEventListener('click', function () { window.location = '../HTML/book_info.html' });

    container.appendChild(div);
}

function addLibrary(page, title, src, summary) {
    // change it to handle more pages
    let container = document.getElementById(page);

    let div = document.createElement("div");
    // div.className = "card-img-top";
    div.classList.add("card-img-top");


    let img = document.createElement("img");
    img.setAttribute("src", src);
    img.setAttribute("alt", title);
    img.classList.add("card-img-class");
    div.appendChild(img);

    let div2 = document.createElement("div");
    div2.classList.add("card-body");

    let h5 = document.createElement("h5");
    // h5.classList.add("card-title");
    h5.textContent = title;
    div2.appendChild(h5);
    let p = document.createElement("p");
    p.classList.add("card-text");
    p.textContent = summary;
    div2.appendChild(p);
    div.appendChild(div2);
    container.appendChild(div);

    div.addEventListener('click', function () { window.location = '../HTML/library_info.html' });
}


function recommendedBooks() {
    addBook('scrolling-recommended-books', 'Book1', '../img/card_book_1.png', 'This is a book about polaroids', 5);
    addBook('scrolling-recommended-books', 'Book2', '../img/card_book_2.png', 'This is a book ', 5);
    addBook('scrolling-recommended-books', 'Book3', '../img/card_book_3.png', 'This is a book ', 5);
    addBook('scrolling-recommended-books', 'Book4', '../img/card_book_4.png', 'This is a book ', 5);
    addBook('scrolling-recommended-books', 'Book5', '../img/card_book_5.png', 'This is a book ', 5);
    addBook('scrolling-recommended-books', 'Book5', '../img/card_book_5.png', 'This is a book ', 5);
    addBook('scrolling-recommended-books', 'Book5', '../img/card_book_5.png', 'This is a book ', 5);
    addBook('scrolling-recommended-books', 'Book5', '../img/card_book_5.png', 'This is a book ', 5);
    addBook('scrolling-recommended-books', 'Book5', '../img/card_book_5.png', 'This is a book ', 5);

}

function resultBooks() {
    addBook('page1', 'The Polaroid Book', '../img/card_book_1.png', 'This is a book about polaroids', 5);
    addBook('page1', 'Book2', '../img/card_book_2.png', 'This is a book ', 5);
    addBook('page1', 'Book3', '../img/card_book_3.png', 'This is a book ', 5);
    addBook('page1', 'Book3', '../img/card_book_3.png', 'This is a book ', 5);
    addBook('page1', 'Book3', '../img/card_book_3.png', 'This is a book ', 5);
    addBook('page1', 'Book3', '../img/card_book_3.png', 'This is a book ', 5);

    // addBook('page1', 'Book4', '../img/card_book_4.png', 'This is a book ', 5);
    // addBook('page1', 'Book5', '../img/card_book_5.png', 'This is a book ', 5);
    // addBook('page1', 'Book5', '../img/card_book_5.png', 'This is a book ', 5);


    addBook('page2', 'Book4', '../img/card_book_4.png', 'This is a book ', 5);
    addBook('page2', 'Book5', '../img/card_book_5.png', 'This is a book ', 5);
    addBook('page2', 'Book5', '../img/card_book_5.png', 'This is a book ', 5);
    addBook('page2', 'Book5', '../img/card_book_5.png', 'This is a book ', 5);

}


function recommendedLibraries() {

    addLibrary('scrolling-recommended-libraries', 'Library2', '../img/card_library_2.png', 'Info about a library');
    addLibrary('scrolling-recommended-libraries', 'Library1', '../img/card_library_1.png', 'Info about a library');
    addLibrary('scrolling-recommended-libraries', 'Library3', '../img/card_library_3.png', 'Info about a library');
    addLibrary('scrolling-recommended-libraries', 'Library4', '../img/card_library_4.png', 'Info about a library');
    addLibrary('scrolling-recommended-libraries', 'Library5', '../img/card_library_5.png', 'Info about a library');
    addLibrary('scrolling-recommended-libraries', 'Library5', '../img/card_library_5.png', 'Info about a library');
    addLibrary('scrolling-recommended-libraries', 'Library5', '../img/card_library_5.png', 'Info about a library');
    addLibrary('scrolling-recommended-libraries', 'Library5', '../img/card_library_5.png', 'Info about a library');
    addLibrary('scrolling-recommended-libraries', 'Library5', '../img/card_library_5.png', 'Info about a library');

}


// ------------------  Map ------------------


function mapInit() {
    map = new OpenLayers.Map("basicMap");
    let mapnik = new OpenLayers.Layer.OSM();
    let fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
    let toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
    // 38.2903577,21.7911003
    let position = new OpenLayers.LonLat(13.41, 52.52).transform(fromProjection, toProjection);
    // bounding box 
    // let position       = new OpenLayers.LonLat(38.2903577,21.7911003).transform( fromProjection, toProjection);
    let zoom = 5;

    map.addLayer(mapnik);
    map.setCenter(position, zoom);
}


// ------------------  Filters ------------------




// addFilter('genre-filter','Test','test')

function addFilter(categoryId, filterCategory, filterList, extra = null) {

    let container = document.getElementById(categoryId);
    let header = document.createElement('h3');
    header.textContent = filterCategory;
    container.appendChild(header);
    // header.innerHTML=filterCategory;

    if (extra != null) {
        container.appendChild(extra);
    }

    for (let i = 0; i < filterList.length; i++) {

        let div = document.createElement('div');
        div.classList.add('form-check');
        container.appendChild(div);

        let input = document.createElement('input');
        input.classList.add('form-check-input');
        input.classList.add('filter-checkbox');

        input.setAttribute('type', 'checkbox');
        input.setAttribute('value', '');
        input.setAttribute('id', filterList[i]);
        input.addEventListener('change', function () {
            if (this.checked) {
                addedFilter(filterList[i])
            }

            else {
                let container = document.getElementById('filter-selection');
                let divs = container.getElementsByClassName('selected-filters');
                for (let j = 0; j < divs.length; j++) {
                    if (divs[j].textContent == filterList[i]) {
                        container.removeChild(divs[j]);
                    }
                }

            }
        });

        div.appendChild(input);
        let label = document.createElement('label');
        label.classList.add('form-check-label');
        label.setAttribute('for', filterList[i]);
        label.textContent = filterList[i];
        div.appendChild(label);
    }



}

function addedFilter(filterName) {
    let container = document.getElementById('filter-selection')
    let div = document.createElement('div');
    div.classList.add('selected-filters');
    container.appendChild(div);
    let span = document.createElement('span');

    span.textContent = filterName;
    div.appendChild(span);
    // link bootstrap icons CDN in the html file
    let image = document.createElement('svg');
    image.classList.add('bi');
    image.classList.add('bi-x-lg');
    image.setAttribute('width', '32');
    image.setAttribute('height', '32');
    image.setAttribute('viewBox', '0 0 128 128');
    image.setAttribute('fill', 'currentColor');
    image.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    let path = document.createElement('path');
    // path.setAttribute('fill-rule', 'evenodd');
    path.setAttribute('d', 'M3.646 3.646a.5.5 0 0 1 .708 0L8 7.293l3.646-3.647a.5.5 0 0 1 .708.708L8.707 8l3.647 3.646a.5.5 0 0 1-.708.708L8 8.707l-3.646 3.647a.5.5 0 0 1-.708-.708L7.293 8 3.646 4.354a.5.5 0 0 1 0-.708z');
    image.appendChild(path);
    div.appendChild(image);

    div.addEventListener('click', function () {
        container.removeChild(div);
        let checkbox = document.getElementById(filterName);
        checkbox.checked = false;
    });
}

function addingFilters() {
    // alert('test');
    addFilter('genre-filter', 'Genre', ['Fantasy', 'Science', 'Horror', 'Comedy', 'Sci-fi']);
    // addFilter('author-filter', 'Author', ['J.K. Rowling', 'Stephen King', 'J.R.R. Tolkien', 'George R.R. Martin', 'J.R.R. Tolkien']);
    addFilter('availability-filter', 'Availability', ['Available', 'Available in more than a week', 'Available this week', 'All']);
    addFilter('edition-filter', 'Edition', ['1st Edition', '2nd Edition', '3rd Edition', 'Greater than 3rd Edition']);
    // addFilter('language-filter', 'Language', ['English', 'German', 'French', 'Spanish', 'Italian']);
    addFilter('publisher-filter', 'Publisher', ['Tziola', 'Gotsis', 'Hachette Livre', 'Random House', 'Simon & Schuster']);
    // addFilter('library-filter', 'Library', ['Library 1', 'Library 2', 'Library 3', 'Library 4', 'Library 5'], function () {
    //     let input = document.createElement('input');
    //     input.setAttribute('type', 'text');
    //     input.setAttribute('id', 'library-filter-input');
    //     input.setAttribute('placeholder', 'Search library or Region');
    //     return input;
    // });
    addFilter('library-filter', 'Library', ['Library 1', 'Library 2', 'Library 3', 'Library 4', 'Library 5']);
}





