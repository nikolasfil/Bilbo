

function placeBooks(data) {
    let container = document.getElementById("results");
    container.innerHTML = "";

    for (let i = 0; i < data.length; i++) {

        // if (filters != null) {
        //     if (filters.includes(data[i].genre)) {
        //         continue;
        //     }
        // }

        let div = document.createElement("div");
        div.className = "card-img-top";
        div.draggable = "false";

        let a = document.createElement("a");
        a.href = `/book_info/${data[i].isbn}`;
        a.className = "d-flex flex-column align-content-center";

        let img = document.createElement("img");
        img.className = "rounded-corners card-img-class";
        img.src = data[i].photo;
        img.alt = "photo";
        img.draggable = "false";

        let div2 = document.createElement("div");
        div2.className = "p-3";

        let h4 = document.createElement("h4");
        h4.innerHTML = `<strong>${data[i].title}</strong>`;

        let p = document.createElement("p");
        p.innerHTML = data[i].description;

        let p2 = document.createElement("p");
        p2.innerHTML = `Available Copies: ${data[i].copies}`;

        div2.appendChild(h4);
        div2.appendChild(p);
        div2.appendChild(p2);

        a.appendChild(img);
        a.appendChild(div2);

        div.appendChild(a);

        container.appendChild(div);



        // container.innerHTML += `<div class="card-img-top" draggable="false">
        // <a href="/book_info/${data[i].isbn}" class="d-flex flex-column align-content-center">
        //     <img class="rounded-corners card-img-class" src=${data[i].photo} alt="photo" draggable="false">
        //     <div class = "p-3">
        //         <h4><strong>${data[i].title}</strong></h4>
        //         <p>${data[i].description}</p>
        //         <p>Available Copies: ${data[i].copies}</p>
        //     </div>
        // </a>
        // </div>`
    }
}

function fetchAllBooks(filters) {

    fetch("/all")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data;
        }).then((data) => {
            placeBooks(data);
        });

}

function fetchAllBooksByTitle(title, filters) {
    // to be implemented for the search bar !!
    if (title) {

        fetch("/book/" + title).then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data);
            return data;
        }).then((data) => {
            placeBooks(data);
        });
    }
    else{
        fetchAllBooks(filters);
    }

}



function display(data, filters) {
    let result = [];
    for (let i = 0; i < data.length; i++) {
        console.log(data[i].genre);
        if (data[i].genre == 'Adventure Stories') {
            result.push(data[i]);
        }
    }
    return result;
}


function json2string(filters) {
    return JSON.stringify(filters);
}