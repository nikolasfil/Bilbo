const express = require('express');

const router = express.Router();

const database = require('../controllers/database.js');

let signedIn = module.exports.signedIn;


router.get('/fetch_books_all', (req, res) => {
    database.getAllBooks(null,function (err, books) {
        if (err) {
            console.log(err)
            res.status(500).send('Internal Server Error')
        }
        else {
            res.send(books);
        }
    })
});

router.get('/fetch_books/:title', (req, res) => {
    database.getBookByTitleLike(req.params.title, function (err, book) {
        if (err) {
            console.log(err)
            res.status(500).send('Internal Server Error')
        }
        else {
            res.send(book);
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
            database.getAllBooks(null,function (err, books) {
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
        // console.log(req.query.filters)
        if (req.query.filters) {
            res.locals.filters = JSON.stringify(JSON.parse(req.query.filters));
            // console.log(res.locals.filters)
        }
        else {
            res.locals.filters = '';
        }
        console.log(res.locals.filters)
        next();
    }, 

    (req, res, next) => {
        database.getAllAttribute('genre',function (err, attributeList) {
            if (err) {
                console.log(err)
                res.status(500).send('Internal Server Error')
            }
            else {
                res.locals.all_genreList = attributeList;
            }
        });
        next();
    },
    (req, res, next) => {
        database.getAllAttribute('publisher',function (err, publisherList) {
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

        database.getAllAttribute('edition',function (err, editionList) {
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
        database.getAllAttribute('language',function (err, languageList) {
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
        database.getAllAttribute('library',function (err, libraryList) {
            if (err) {
                console.log(err)
                res.status(500).send('Internal Server Error')
            }
            else {
                res.locals.libraryList = libraryList;
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
            stringFilters: res.locals.filters,
            // stringFilter: JSON.stringify(req.query.filters),

        });
    }
);



module.exports = router;


