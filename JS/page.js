

function createPages(number){
    let container = document.getElementById('results');

    for (let i=0; i<number; i++){
        let div = document.createElement('div');
        div.classList.add('results');
        div.setAttribute('id', 'page'+(i+1));
        if(i!=0){
            div.classList.add('hidden');
        }
        container.appendChild(div);
        // div.style.display = 'none';
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
    previousA.textContent = 'Previous';

    previousLi.appendChild(previousA);

    for (let i = 0; i < number; i++) {
        let li = document.createElement('li');
        li.classList.add('page-item');
        
        ul.appendChild(li);
        
        let a = document.createElement('a');
        a.classList.add('page-link')
        a.setAttribute('href', '#')
        a.textContent = i+1;
        
        if (i==0){
            a.classList.add('selected')
        }

        li.appendChild(a);
    }

    let nextLi = document.createElement('li');
    nextLi.classList.add('page-item');

    ul.appendChild(nextLi);

    let nextA = document.createElement('a');
    nextA.classList.add('page-link')
    nextA.setAttribute('href', '#')
    nextA.textContent = 'Next';

    nextLi.appendChild(nextA);


}
