// Page selector 

async function page_initilazation() {

    // console.log(window.gFilters,window.searchBarValue)
    let results, booksPerPage, numOfPages;

    document.getElementById('page-selector').innerHTML = ''

    results = await showResult();
    console.log(results)

    if (window.innerWidth <= 600) {
        window.booksPerPage = 18;
    } else {
        window.booksPerPage = 18;
    }
    numOfPages = Math.ceil(results / window.booksPerPage);

    if (numOfPages > 1) {
        // createPages(numOfPages); 
        pageNavigationCreation(numOfPages);
    }
    showPage(1);

}


function nextPage() {
    let pages = document.getElementsByClassName('page-link');
    let selected = document.getElementsByClassName('selected');

    for (let i = 1; i < pages.length - 2; i++) {
        if (selected[0].id === pages[i].id && i < pages.length - 1) {
            selected[0].classList.remove('selected');
            pages[i + 1].classList.add('selected');
            let page = pages[i + 1].textContent;
            showPage(page);
            break;
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
            break;
        }
    }
}

function pageNavigationCreation1(number = 2) {

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

function pageNavigationCreation(number = 2) {

    let container = document.getElementById('page-selector');
    container.classList.add('page-selector');
    let nav = document.createElement('nav');
    nav.setAttribute('aria-label', "Page navigation");

    container.appendChild(nav);

    let ul = document.createElement('ul');
    ul.classList.add('pagination');

    nav.appendChild(ul)

    createPageNavigationIcon(ul,'page-previous','Previous',function(){ previousPage();})


    // for (let i = 0 ; i<number;i++){
    //     createPageNavigationIcon(ul,`page-${i+1}`,`${i+1}`,function(){
    //         showPage(i+1)
    //         let selected = document.getElementsByClassName('selected');
    //         selected[0].classList.remove('selected');
    //         classList.add('selected');

    //     })

    //     if (i==0){
    //         classList.add('selected')
    //     }
        

    // }


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

    createPageNavigationIcon(ul,'page-next','Next',function(){ nextPage();})


}



function createPageNavigationIcon(container,id,content,command){

    let li = document.createElement('li');
    li.classList.add('page-item');
    container.appendChild(li);


    let itemA = document.createElement('a');
    itemA.classList.add('page-link')
    itemA.setAttribute('href', '#')
    itemA.setAttribute('id', id)
    itemA.textContent = content;
    itemA.addEventListener('click', command);

    li.appendChild(itemA);

    return itemA;

}


function showPage(number) {

    placeAllBooksByTitle(limit = window.booksPerPage, offset = (number - 1) * window.booksPerPage);
}



async function showResult() {
    let number = await fetchNumOfResults()
    return number
}
