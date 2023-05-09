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

router.get('/search',
    (req, res, next) => {

        if (req.query.search) {
            database.getBookByTitleLike(`%${req.query.search}%`, function (err, books) {
                if (err) {
                    console.log(err,`%${req.query.search}%`)
                    res.status(500).send('Internal Server Title Error ')
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
                    res.status(500).send('Internal Server Error All books')
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



module.exports = router;


