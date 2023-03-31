{/*     <div class="d-flex flex-row justify-content-start " id="book">
      <div class="d-flex flex-row justify-content-start " id="book">

        <div class="" id="book-img">
          <img src="../img/rectangle_15.png" alt="book cover" class="book-img" >
        </div>
  
        <div class="d-flex flex-column justify-content-center" id="book-title-summary">
          <h2 id="title">Book Title</h2>
          <p id="summary"></p>
        </div>
  
        <div class="d-flex flex-column justify-content-around">
          
            <div id="author">
              <h3 id="author-h">Author</h3>
              <p id="author-p"></p>
            </div>
            <div id="publisher">
              <h3 id="publisher-h"></h3>
              <p  id="publisher-p"></p>
            </div>
            <div id="edition">
              <h3 id="edition-h"></h3>
              <p  id="edition-p"></p>
            </div>
            <div id="genre">
              <h3 id="genre-h"></h3>
              <p  id="genre-p"></p>
            </div>
            <div id="release">
              <h3 id="release-h"></h3>
              <p  id="release-p"></p>
            </div>
            <div id="language">
              <h3 id="language-h"></h3>
              <p  id="language-p"></p>
            </div>
            <div id="isbn">
              <h3 id="isbn-h"></h3>
              <p  id="isbn-p"></p>
            </div>
  
          
        </div>
  
      </div>
  
    </div>

*/}


function addBookInfo(){
    let container = document.getElementsByTagName("main")[0];
    let book = document.createElement("div");
    book.setAttribute("class", "d-flex flex-row justify-content-start");
    book.setAttribute("id", "book");
    container.appendChild(book);
    let bookImg = document.createElement("div");
    bookImg.setAttribute("class", "d-flex flex-row justify-content-start");
    bookImg.setAttribute("id", "book-img");
    book.appendChild(bookImg);
    let img = document.createElement("img");
    img.setAttribute("src", "../img/rectangle_15.png");
    img.setAttribute("alt", "book cover");
    img.setAttribute("class", "book-img");
    bookImg.appendChild(img);

    let bookTitleSummary = document.createElement("div");
    bookTitleSummary.setAttribute("class", "d-flex flex-column justify-content-center");
    bookTitleSummary.setAttribute("id", "book-title-summary");
    book.appendChild(bookTitleSummary);

    let title = document.createElement("h2");
    title.setAttribute("id", "title");
    title.innerHTML = "Book Title";
    bookTitleSummary.appendChild(title);

    let summary = document.createElement("p");
    summary.setAttribute("id", "summary");
    bookTitleSummary.appendChild(summary);

    let bookInfo = document.createElement("div");
    bookInfo.setAttribute("class", "d-flex flex-column justify-content-around");
    book.appendChild(bookInfo);

    let author = document.createElement("div");
    author.setAttribute("id", "author");
    bookInfo.appendChild(author);

    let authorH = document.createElement("h3");
    authorH.setAttribute("id", "author-h");
    authorH.innerHTML = "Author";
    authorH.textContent = author;
    author.appendChild(authorH);

    let authorP = document.createElement("p");
    authorP.setAttribute("id", "author-p");
    
    author.appendChild(authorP);

    let publisher = document.createElement("div");
    publisher.setAttribute("id", "publisher");
    bookInfo.appendChild(publisher);

    let publisherH = document.createElement("h3");
    publisherH.setAttribute("id", "publisher-h");
    publisher.appendChild(publisherH);

    let publisherP = document.createElement("p");
    publisherP.setAttribute("id", "publisher-p");
    publisher.appendChild(publisherP);

    let edition = document.createElement("div");
    edition.setAttribute("id", "edition");
    bookInfo.appendChild(edition);

    let editionH = document.createElement("h3");
    editionH.setAttribute("id", "edition-h");
    edition.appendChild(editionH);

    let editionP = document.createElement("p");
    editionP.setAttribute("id", "edition-p");
    edition.appendChild(editionP);

    let genre = document.createElement("div");
    genre.setAttribute("id", "genre");
    bookInfo.appendChild(genre);

    let genreH = document.createElement("h3");
    genreH.setAttribute("id", "genre-h");
    genre.appendChild(genreH);

    let genreP = document.createElement("p");
    genreP.setAttribute("id", "genre-p");
    genre.appendChild(genreP);

    let release = document.createElement("div");
    release.setAttribute("id", "release");
    bookInfo.appendChild(release);

    let releaseH = document.createElement("h3");
    releaseH.setAttribute("id", "release-h");
    release.appendChild(releaseH);

    let releaseP = document.createElement("p");
    releaseP.setAttribute("id", "release-p");
    release.appendChild(releaseP);

    let language = document.createElement("div");
    language.setAttribute("id", "language");
    bookInfo.appendChild(language);

    let languageH = document.createElement("h3");
    languageH.setAttribute("id", "language-h");
    language.appendChild(languageH);

    let languageP = document.createElement("p");
    languageP.setAttribute("id", "language-p");
    language.appendChild(languageP);

    let isbn = document.createElement("div");
    isbn.setAttribute("id", "isbn");
    bookInfo.appendChild(isbn);

    let isbnH = document.createElement("h3");
    isbnH.setAttribute("id", "isbn-h");
    isbn.appendChild(isbnH);

    let isbnP = document.createElement("p");
    isbnP.setAttribute("id", "isbn-p");
    isbn.appendChild(isbnP);
    
}