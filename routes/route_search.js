const express = require('express');

const router = express.Router();
const helpers = require('../controllers/helpers.js');

let signedIn = module.exports.signedIn;


router.get('/search', (req, res) => {

    // https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_filter_list
    // more to be added later
    let command

    let genreList = [
        { name: 'Fantasy' },
        { name: 'Science' },
        { name: 'Horror' },
        { name: 'Comedy' },
        { name: 'Sci-fi' },
        { name: 'Fiction' },
    ]

    command = "Select distinct genre as name from BOOK where genre IS not NUll order by name"
    let all_genreList = helpers.databaseAllCommand(command);

    // remove the duplicates from the all List

    let availabilityList = [
        { name: 'Available' },
        { name: 'Available in more than a week' },
        { name: 'Available this week' },
        { name: 'All' }
    ]

    let publisherList = [
        { name: 'Tziola' },
        { name: 'Gotsis' },
        { name: 'Hachette Livre' },
        { name: 'Random House' },
        { name: 'Simon & Schuster' }
    ]

    command = "Select distinct publisher as name from BOOK where publisher IS not NUll order by name"
    let all_publisherList = helpers.databaseAllCommand(command);

    let editionList = [
        { name: '1st' },
        { name: '2nd' },
        { name: '3rd' },
        { name: '> 3rd' }]

    command = "Select distinct edition as name from BOOK where edition IS not NUll order by name"
    let all_editionList = helpers.databaseAllCommand(command);
    
    // command = `Select isbn,title,cover_image as photo from BOOK limit 6`;
    // let bookList = helpers.databaseAllCommand(command);

    if (req.query.search) {
        command = `Select isbn,title,author,edition,publisher,release,genre,language,cover_image as photo from BOOK where title=${req.query.search}`;
        // command = `Select isbn,title,author,edition,publisher,release,genre,language,cover_image as photo from BOOK where title Like *${req.query.search}*`;
    }
    else {
        command = `Select isbn,title,author,edition,publisher,release,genre,language,cover_image as photo from BOOK`;

    }

    let bookList = helpers.databaseAllCommand(command);


    command = `Select id,name from LIBRARY  limit 6`;
    let libraryList = helpers.databaseAllCommand(command);

    command = `Select publisher as name from BOOK where name IS not NUll  limit 6`;
    publisherList = helpers.databaseAllCommand(command);

    command = "Select distinct language as name from BOOK where language IS not NUll limit 6";
    let languageList = helpers.databaseAllCommand(command);



    res.render('search', {
        title: 'Search',
        style: 'search.css',
        genre: genreList,
        all_genre: all_genreList,
        
        availability: availabilityList,
        publisher: publisherList,
        all_publisher: all_publisherList,

        library: libraryList,
        edition: editionList,
        all_edition: all_editionList,

        language: languageList,

        signedIn: signedIn,
        searchBarValue: req.query.search,
        book: bookList
    });
});



module.exports = router;


