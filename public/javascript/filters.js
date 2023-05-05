// ------------------  Filters ------------------




// addFilter('genre-filter','Test','test')

function addFilterListeners() {

    let input = document.getElementsByClassName('form-check-input')

    for (let i = 0; i < input.length; i++) {
        input[i].addEventListener('change', function () {
            if (this.checked) {
                addedFilter(this.id);
            }

            else {
                let container = document.getElementById('filter-selection');
                let divs = container.getElementsByClassName('selected-filters');
                for (let j = 0; j < divs.length; j++) {
                    if (divs[j].textContent == this.id) {
                        container.removeChild(divs[j]);
                    }
                }

            }
        });
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
    // <button type="button" class="btn-close" aria-label="Close"></button>
    let button = document.createElement('button');
    button.classList.add('btn-close');
    div.appendChild(button);
    // link bootstrap icons CDN in the html file


    div.addEventListener('click', function () {
        container.removeChild(div);
        let checkbox = document.getElementById(filterName);
        checkbox.checked = false;
    });
}

function addingFilters() {
    // alert('test');
    // addFilter('author-filter', 'Author', ['J.K. Rowling', 'Stephen King', 'J.R.R. Tolkien', 'George R.R. Martin', 'J.R.R. Tolkien']);
    // addFilter('availability-filter', 'Availability', ['Available', 'Available in more than a week', 'Available this week', 'All']);
    // addFilter('edition-filter', 'Edition', ['1st Edition', '2nd Edition', '3rd Edition', 'Greater than 3rd Edition']);
    // addFilter('language-filter', 'Language', ['English', 'German', 'French', 'Spanish', 'Italian']);
    // addFilter('publisher-filter', 'Publisher', ['Tziola', 'Gotsis', 'Hachette Livre', 'Random House', 'Simon & Schuster']);
    // addFilter('library-filter', 'Library', ['Library 1', 'Library 2', 'Library 3', 'Library 4', 'Library 5'], function () {
    //     let input = document.createElement('input');
    //     input.setAttribute('type', 'text');
    //     input.setAttribute('id', 'library-filter-input');
    //     input.setAttribute('placeholder', 'Search library or Region');
    //     return input;
    // });
    // addFilter('library-filter', 'Library', ['Library 1', 'Library 2', 'Library 3', 'Library 4', 'Library 5']);
}


// LIKE *TiTle* in books for database 

