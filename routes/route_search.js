const express = require('express');

const router = express.Router();
const helpers = require('../controllers/helpers.js');

let signedIn = module.exports.signedIn;


router.get('/search', (req, res) => {
    // more to be added later
    let genreList = [
        { name: 'Fantasy' },
        { name: 'Science' },
        { name: 'Horror' },
        { name: 'Comedy' },
        { name: 'Sci-fi' }
    ]

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

    let editionList = [
        { name: '1st' },
        { name: '2nd' },
        { name: '3rd' },
        { name: '> 3rd' }]


    let command = `Select isbn,title,cover_image as photo from BOOK limit 6`;
    let bookList = helpers.databaseAllCommand(command);

    command = `Select id,name from LIBRARY  limit 6`;
    let libraryList = helpers.databaseAllCommand(command);

    command = `Select publisher as name from BOOK where name IS not NUll  limit 6`;
    publisherList = helpers.databaseAllCommand(command);


    res.render('search', {
        title: 'Search',
        style: 'search.css',
        genre: genreList,
        availability: availabilityList,
        publisher: publisherList,
        library: libraryList,
        edition: editionList,

        signedIn: signedIn,
        book: bookList
    });
});



module.exports = router;


