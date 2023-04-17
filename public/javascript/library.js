recommendedLibraries();


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