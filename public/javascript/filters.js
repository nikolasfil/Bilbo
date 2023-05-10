// ------------------  Filters ------------------
let variable;


function addFilterListeners(filters) {

    let checker = document.getElementsByClassName('form-check');

    for (let i = 0; i < checker.length; i++) {
        // get the input element of checker 
        let input = checker[i].getElementsByClassName('form-check-input')[0];
        
        input.addEventListener('change', function () {
            if (this.checked) {
                addedFilter(filters, this.id, this.classList[2]);

                // This was an attempt to have the filters dissapear fromt the show more and into the main one 
                // it worked but it didn't iterate through the list correctly
                // 
                // let container = document.getElementById(`${this.classList[2]}-filter-more`);
                // let mainfilters = document.getElementById(`${this.classList[2]}-filter`)

                // let container_form_check = container.getElementsByClassName('form-check')



                // for (let i =0 ; i< container_form_check.length ; i++) {
                //     let input = container_form_check[i].getElementsByClassName('form-check-input')[0];
                //     if (input.id == this.id) {
                //         mainfilters.appendChild(container_form_check[i]);
                //         container.removeChild(container_form_check[i]); 
                //         break;
                //     }
                // }

                // if (container.length == 0) {
                //     let button = document.getElementById(`btn-${this.classList[2]}-show-more`);
                //     button.style.display = 'none';
                // }

            }
            else {
                // remove the filter from the filters object
                filters[this.classList[2]].splice(filters[this.classList[2]].indexOf(this.id), 1);

                // remove the filter from the selected filters checker
                let container = document.getElementById('filter-selection');
                let divs = container.getElementsByClassName('selected-filters');

                for (let j = 0; j < divs.length; j++) {
                    if (divs[j].textContent == this.classList[2] + ':' + this.id) {
                        container.removeChild(divs[j]);
                    }
                }
            }
        });

        for (let j = 0; j < filters.length; j++) {
            console.log(filters[j]);        
        }
// 
    }
}



function addedFilter(filters, filterName, filterType) {
    let container = document.getElementById('filter-selection')
    let div = document.createElement('div');
    div.classList.add('selected-filters');
    container.appendChild(div);
    let span = document.createElement('span');

    span.textContent = `${filterType}:${filterName}`;
    if (filters[filterType] === undefined) {
        filters[filterType] = [];
    }
    filters[filterType].push(filterName);

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
        filters[filterType].splice(filters[filterType].indexOf(filterName), 1);

    });
}

// LIKE *TiTle* in books for database 

function addShowMore() {

    // get all the buttons that show more, and add listeners to their div , to show it or to hide it
    // and change the button to show 
    let divs = document.getElementsByClassName('div-show-more');
    for (let i = 0; i < divs.length; i++) {
        let button = divs[i].getElementsByClassName('btn-show-more')[0];
        let list = divs[i].getElementsByClassName('scrollable-show-more')[0];
        button.addEventListener('click', function () {
            if (this.textContent == 'Show More') {

                this.textContent = 'Show Less';
                list.classList = 'd-flex flex-column justify-content-start scrollable-show-more'
            }
            else {
                this.textContent = 'Show More';
                list.classList = 'scrollable-show-more collapsed'
            }
        }
        )
    }
}
