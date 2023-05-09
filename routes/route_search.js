const express = require('express');

const router = express.Router();
const helpers = require('../controllers/helpers.js');
const database = require('../controllers/database.js');
const sqlite3 = require('sqlite3').verbose();

let signedIn = module.exports.signedIn;


router.get('/all', (req, res) => {
    database.betterDatabase(function (err, books) {
        if (err) {
            console.log(err)
            res.status(500).send('Internal Server Error')
        }
        else {
            res.send(books);
        }
    })
});

router.get('/searchall', (req, res, next) => {

    database.getAllBooks(function (err, books) {
        if (err) {
            console.log(err)
            res.status(500).send('Internal Server Error')
        }
        else {
            res.locals.books = books;
        }
    });
    next();
},
    (req, res, next) => {

        if (req.query.search) {
            database.getBookByTitleLike(`%${req.query.search}%`, function (err, books) {
                if (err) {
                    console.log(err)
                    res.status(500).send('Internal Server Error')
                }
                else {
                    res.locals.books = books;
                }
            })
        }
        else {
            database.getAllBooks(function (err, books) {
                if (err) {
                    console.log(err)
                    res.status(500).send('Internal Server Error')
                }
                else {
                    res.locals.books = books;
                }
            })
        }
        next();
    },
    (req, res, next) => {
        database.getAllGenre(function (err, genreList) {
            if (err) {
                console.log(err)
                res.status(500).send('Internal Server Error')
            }
            else {
                res.locals.all_genre = genreList;
            }
        });
        next();
    },
    (req, res, next) => {
        database.getAllPublisher(function (err, publisherList) {
            if (err) {
                console.log(err)
                res.status(500).send('Internal Server Error')
            }
            else {
                res.locals.all_publisher = publisherList;
            }
        });
        next();
    },
    (req, res, next) => {

        database.getAllEdition(function (err, editionList) {
            if (err) {
                console.log(err)
                res.status(500).send('Internal Server Error')
            }
            else {
                res.locals.all_editionList = editionList;
            }
        });
        next();
    },
    (req, res, next) => {
        database.getAllLanguage(function (err, languageList) {
            if (err) {
                console.log(err)
                res.status(500).send('Internal Server Error')
            }
            else {
                res.locals.languageList = languageList;
            }
        });
        next();
    },
    (req, res, next) => {
        res.locals.availabilityList = [
            { name: 'Available' },
            { name: 'Available in more than a week' },
            { name: 'Available this week' },
            { name: 'All' }
        ]

        res.locals.genreList = [
            { name: 'Fantasy' },
            { name: 'Science' },
            { name: 'Horror' },
            { name: 'Comedy' },
            { name: 'Sci-fi' },
            { name: 'Fiction' }
        ]

        res.locals.publisherList = [
            { name: 'Tziola' },
            { name: 'Penguin' },
            { name: 'Harper Collins' },
            { name: 'Random House' },
            { name: 'Simon & Schuster' },
        ]

        res.locals.editionList = [
            { name: '1st' },
            { name: '2nd' },
            { name: '3rd' },
            { name: '>3rd' }
        ]

        next();
    },

    (req, res) => {
        res.render('search', {
            title: 'Search',
            genre: res.locals.genreList,
            all_genre: res.locals.all_genreList,

            availability: res.locals.availabilityList,

            publisher: res.locals.publisherList,
            all_publisherList: res.locals.all_publisherList,

            library: res.locals.libraryList,

            edition: res.locals.editionList,
            all_edition: res.locals.all_editionList,

            language: res.locals.languageList,

            signedIn: signedIn,
            searchBarValue: req.query.search,
            book: res.locals.books,

        });
    }
);



router.get('/search', (req, res) => {
    console.log("search")
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
    let all_genreList = database.databaseAllCommand(command);

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
    let all_publisherList = database.databaseAllCommand(command);

    let editionList = [
        { name: '1st' },
        { name: '2nd' },
        { name: '3rd' },
        { name: '> 3rd' }
    ]



    command = "Select distinct edition as name from BOOK where edition IS not NUll order by name"
    let all_editionList = database.databaseAllCommand(command);

    // command = `Select isbn,title,cover_image as photo from BOOK limit 6`;
    // let bookList = database.databaseAllCommand(command);

    if (req.query.search) {
        // command = `Select isbn,title,author,edition,publisher,release,genre,language,cover_image as photo from BOOK where title='${req.query.search}'`;
        command = `Select isbn,title,author,edition,publisher,release,genre,language,cover_image as photo from BOOK where title Like '%${req.query.search}%'`;
    }
    else {
        command = `Select isbn,title,author,edition,publisher,release,genre,language,cover_image as photo from BOOK`;

    }

    let bookList = database.databaseAllCommand(command);

    command = `Select id,name from LIBRARY  limit 6`;
    let libraryList = database.databaseAllCommand(command);

    command = `Select publisher as name from BOOK where name IS not NUll  limit 6`;
    publisherList = database.databaseAllCommand(command);

    command = "Select distinct language as name from BOOK where language IS not NUll limit 6";
    let languageList = database.databaseAllCommand(command);



    res.render('search', {
        title: 'Search',
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


