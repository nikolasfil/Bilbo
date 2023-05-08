// ------------------  Filters ------------------
let variable;

function addFilterListeners() {

    let input = document.getElementsByClassName('form-check-input')
    // input.getElementByTagName('input')
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


// LIKE *TiTle* in books for database 

