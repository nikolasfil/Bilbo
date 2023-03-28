

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


}