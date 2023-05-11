// Page selector 

function createPages(number) {
    let container = document.getElementById('results');

    for (let i = 0; i < number; i++) {
        let div = document.createElement('div');
        div.classList.add('results');
        div.setAttribute('id', 'page' + (i + 1));
        if (i != 0) {
            div.classList.add('hidden');
        }
        container.appendChild(div);
        // div.style.display = 'none';
    }

}


function assignBooksToPages(books,booksPerPage) {
    if (!booksPerPage){
        booksPerPage = 12;
    }
    
}



function nextPage() {
    let pages = document.getElementsByClassName('page-link');
    let selected = document.getElementsByClassName('selected');


    for (let i = 1; i < pages.length - 1; i++) {
        if (selected[0].id == pages[i].id && i < pages.length - 2) {
            selected[0].classList.remove('selected');
            pages[i + 1].classList.add('selected');
            let page = pages[i + 1].textContent;
            showPage(page);
        }
    }
}


function previousPage() {
    let pages = document.getElementsByClassName('page-link');
    let selected = document.getElementsByClassName('selected');


    for (let i = 1; i < pages.length - 1; i++) {
        if (selected[0].id == pages[i].id && i > 1) {
            selected[0].classList.remove('selected');
            pages[i - 1].classList.add('selected');
            let page = pages[i - 1].textContent;
            showPage(page);
        }
    }
}

function pageSelector(number = 2) {
    let container = document.getElementById('page-selector');
    container.classList.add('page-selector');
    let nav = document.createElement('nav');
    nav.setAttribute('aria-label', "Page navigation");

    container.appendChild(nav);

    let ul = document.createElement('ul');
    ul.classList.add('pagination');

    nav.appendChild(ul)

    let previousLi = document.createElement('li');
    previousLi.classList.add('page-item');

    ul.appendChild(previousLi);

    let previousA = document.createElement('a');
    previousA.classList.add('page-link')
    previousA.setAttribute('href', '#')
    previousA.setAttribute('id', 'page-previous')
    previousA.textContent = 'Previous';
    previousA.addEventListener('click', function () { previousPage(); });

    previousLi.appendChild(previousA);

    for (let i = 0; i < number; i++) {
        let li = document.createElement('li');
        li.classList.add('page-item');

        ul.appendChild(li);

        let a = document.createElement('a');
        a.classList.add('page-link')
        a.setAttribute('href', '#')
        a.textContent = i + 1;
        a.addEventListener('click', function () {
            showPage(i + 1);
            let selected = document.getElementsByClassName('selected');
            selected[0].classList.remove('selected');
            a.classList.add('selected');
        });

        if (i == 0) {
            a.classList.add('selected')
        }
        a.setAttribute('id', 'page-' + (i + 1));
        li.appendChild(a);
    }

    let nextLi = document.createElement('li');
    nextLi.classList.add('page-item');

    ul.appendChild(nextLi);

    let nextA = document.createElement('a');
    nextA.classList.add('page-link')
    nextA.setAttribute('href', '#')
    nextA.textContent = 'Next';
    nextA.setAttribute('id', 'page-next')
    nextA.addEventListener('click', function () { nextPage(); });

    nextLi.appendChild(nextA);


}


function showPage(number) {
    let pages = document.getElementsByClassName('results');
    for (let i = 0; i < pages.length; i++) {
        pages[i].classList.add('hidden');
    }
    let page = document.getElementById('page' + number);
    page.classList.remove('hidden');
}

