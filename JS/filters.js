

addingFilters()
// addFilter('genre-filter','Test','test')

function addFilter(categoryId, filterCategory, filterList) {

    let container = document.getElementById(categoryId);
    let header = document.createElement('h3');
    header.textContent = filterCategory;
    container.appendChild(header);
    // header.innerHTML=filterCategory;

    
    
    for (let i = 0; i < filterList.length; i++) {
        
        let div = document.createElement('div');
        div.classList.add('form-check');
        container.appendChild(div);
        
        let input = document.createElement('input');
        input.classList.add('form-check-input');
        input.classList.add('filter-checkbox');

        input.setAttribute('type', 'checkbox');
        input.setAttribute('value', '');
        input.setAttribute('id',filterList[i]);

        div.appendChild(input);
        let label = document.createElement('label');
        label.classList.add('form-check-label');
        label.setAttribute('for', filterList[i]);
        label.textContent = filterList[i];
        div.appendChild(label);
    }



}


function addingFilters() {
    // alert('test');
    addFilter('genre-filter', 'Genre', ['Fantasy', 'Science', 'Horror','Comedy','Sci-fi']);
    // addFilter('author-filter', 'Author', ['J.K. Rowling', 'Stephen King', 'J.R.R. Tolkien', 'George R.R. Martin', 'J.R.R. Tolkien']);
    addFilter('availability-filter', 'Availability', ['Available', 'Available in more than a week','Available this week','All']);
    addFilter('edition-filter', 'Edition', ['1st Edition', '2nd Edition', '3rd Edition', 'Greater than 3rd Edition']);
    // addFilter('language-filter', 'Language', ['English', 'German', 'French', 'Spanish', 'Italian']);
    addFilter('publisher-filter', 'Publisher', ['Tziola', 'Gotsis', 'Hachette Livre', 'Random House', 'Simon & Schuster']);
    addFilter('library-filter', 'Library', ['Library 1', 'Library 2', 'Library 3', 'Library 4', 'Library 5']);
}

