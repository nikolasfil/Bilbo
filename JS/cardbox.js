




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
    div.addEventListener('click', function () {window.location='../HTML/book_info.html'});
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
    
    div.addEventListener('click', function () {window.location='../HTML/library_info.html'});
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