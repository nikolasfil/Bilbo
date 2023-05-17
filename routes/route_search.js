const express = require('express');

const router = express.Router();

const database = require('../controllers/database.js');
const { type } = require('os');


router.post('/fetch_filters', (req, res) => {
    // database.getBookInfo(isbn=null, title=req.body.title, copies=true,filters=null, limit=null, function (err, books) {
    // console.log(req.body.filters)
    let filters = JSON.stringify(req.body.filters);
    database.getBookInfo(isbn = null, title = req.body.title, copies = true, filters, limit = null,offset=null, function (err, books) {

        if (err) {
            console.log(err)
            res.status(500).send('Internal Server Error')
        }
        else {
            // console.log(JSON.stringify(req.body.filters))

            res.send(books);
        }
    })
})


router.get('/fetch_books_all', (req, res) => {
    database.getBookInfo(ibsn = null, title = null, copies = true, filters = null, limit = null,offset=null, function (err, books) {
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
    database.getBookInfo(isbn = null, title = req.params.title, copies = true, filters = null, limit = null,offset=null, function (err, book) {
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
        // console.log(req.query.filters)
        if (req.query.filters) {
            res.locals.stringFilters = JSON.stringify(JSON.parse(req.query.filters));
            // console.log(res.locals.stringFilters)
        }
        else {
            res.locals.stringFilters = '';
        }
        // console.log(res.locals.stringFilters)
        next();
    },

    (req, res, next) => {
        database.getAllAttribute('genre', limit=4,offset=null, function (err, attributeList) {
            if (err) {
                console.log(err)
                res.status(500).send('Internal Server Error')
            }
            else {
                res.locals.genre = attributeList;
            }
        });
        next();
    },

    (req, res, next) => {
        database.getAllAttribute('genre', -1,4, function (err, attributeList) {
            if (err) {
                console.log(err)
                res.status(500).send('Internal Server Error')
            }
            else {
                res.locals.all_genre = attributeList;
            }
        });
        next();
    },
    
    (req, res, next) => {
        database.getAllAttribute('publisher',-1,4, function (err, publisherList) {
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
        database.getAllAttribute('publisher',4,null, function (err, publisherList) {
            if (err) {
                console.log(err)
                res.status(500).send('Internal Server Error')
            }
            else {
                res.locals.publisher = publisherList;
            }
        });
        next();
    },
    (req, res, next) => {

        database.getAllAttribute('edition', 4,null,function (err, editionList) {
            if (err) {
                console.log(err)
                res.status(500).send('Internal Server Error')
            }
            else {
                res.locals.edition = editionList;
            }
        });
        next();
    },

    (req, res, next) => {

        database.getAllAttribute('edition', -1,4 ,function (err, editionList) {
            if (err) {
                console.log(err)
                res.status(500).send('Internal Server Error')
            }
            else {
                res.locals.all_edition = editionList;
            }
        });
        next();
    },

    (req, res, next) => {
        database.getAllAttribute('language',null,null, function (err, languageList) {
            if (err) {
                console.log(err)
                res.status(500).send('Internal Server Error')
            }
            else {
                res.locals.language = languageList;
            }
        });
        next();
    },

    (req, res, next) => {
        database.getAllAttribute('library',null,null, function (err, libraryList) {
            if (err) {
                console.log(err)
                res.status(500).send('Internal Server Error')
            }
            else {
                res.locals.library = libraryList;
            }
        });
        next();
    },
    // (req, res, next) => {

    // },
    (req, res, next) => {
        res.locals.availability = [
            { name: 'Available' },
            { name: 'Available in more than a week' },
            { name: 'Available this week' },
            { name: 'All' }
        ]

        
        

        next();
    },

    (req, res) => {
        res.render('search', {
            title: 'Search',
            // genre: res.locals.genre,
            // all_genre: res.locals.all_genre,

            // availability: res.locals.availability,

            // publisher: res.locals.publisher,
            // all_publisherList: res.locals.all_publisher,

            // library: res.locals.library,

            // edition: res.locals.edition,
            // all_edition: res.locals.all_edition,

            // language: res.locals.language,

            signedIn: req.session.signedIn,
            searchBarValue: req.query.search,
            // book: res.locals.books,
            // stringFilters: res.locals.stringFilters,

        });
    }
);



module.exports = router;


