// const stringSimilarity = require('string-similarity');


function placeBooks(data) {
    let container = document.getElementById("results");
    container.innerHTML = "";
    let show = [];

    let data2 = (data) => {
        for (let i = 0; data.length; i++) {
            if (filters.length == 0) {
                break;
            }
            for (let f in filters) {
                console.log('f', f)
                // for (filter in f) {
                //     if (filter == data[i].f) {
                //         show.push(data[i]);
                //     }
                // }
            }
        }
        return data;
    }

    // console.log(data)

    for (let i = 0; i < data.length; i++) {

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

async function fetchAllBooksByTitle(title, filters) {
    let link ;
    if (title) {
        link = "/book/" + title;
    }
    else {
        link = '/all'
    }
    return await fetch(link).then((res) => {
        return res.json();
    }).then((data) => {
        // console.log(data);
        return data;
    }).catch(error => {
        console.log(error);
    });

}



async function placeAllBooksByTitle(title, filters) {
    let data = await fetchAllBooksByTitle(title, filters);
    placeBooks(data);

}



function json2string(filters) {
    return JSON.stringify(filters);
}




function checkSimilarities() {
    const objValues = Object.values(obj).map(value => value.toString());

    // Calculate string similarity scores
    const scores = stringSimilarity.findBestMatch(phrase, objValues);

    // Threshold for considering a match
    const threshold = 0.5;

    // Check if any score exceeds the threshold
    const hasMatch = scores.ratings.some(score => score.rating > threshold);

    if (hasMatch) {
        matches.push({
            file,
            object: obj,
            score: scores.bestMatch.rating
        });
    }
}


async function asyncFetchAllBooks(){
    let data = await fetch("/all")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data;
        }).catch(error => {
            console.log(error);
        });
    return data[0];
}

// !async function () {
//     let data = await fetch("https://raw.githubusercontent.com/IbrahimTanyalcin/LEXICON/master/lexiconLogo.png")
//         .then((response) => response.blob())
//         .then(data => {
//             return data;
//         })
//         .catch(error => {
//             console.error(error);
//         });

//         console.log(data);
// }();