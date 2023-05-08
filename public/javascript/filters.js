// ------------------  Filters ------------------
let variable;

let filters = {};

function addFilterListeners() {

    let input = document.getElementsByClassName('form-check-input')
    // input.getElementByTagName('input')
    for (let i = 0; i < input.length; i++) {
        input[i].addEventListener('change', function () {
            if (this.checked) {
                addedFilter(this.id,this.classList[2]);
                
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




function addedFilter(filterName,filterType) {
    let container = document.getElementById('filter-selection')
    let div = document.createElement('div');
    div.classList.add('selected-filters');
    container.appendChild(div);
    let span = document.createElement('span');

    span.textContent = `${filterType}:${filterName}`;
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

function addShowMore(){

    // get all the buttons that show more, and add listeners to their div , to show it or to hide it
    // and change the button to show 
    let divs = document.getElementsByClassName('div-show-more');
    for (let i=0; i<divs.length; i++){
        let button = divs[i].getElementsByClassName('btn-show-more')[0];
        let list = divs[i].getElementsByClassName('scrollable-show-more')[0];
        button.addEventListener('click', function(){
            if (this.textContent == 'Show More'){

                this.textContent = 'Show Less';
                list.classList = 'd-flex flex-column justify-content-start scrollable-show-more'
            }
            else{
                this.textContent = 'Show More';
                list.classList = 'scrollable-show-more collapsed'
            }
        }
        )
    }   
}

function showMore(){

}