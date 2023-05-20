const express = require('express');

const router = express.Router();
const database = require('../controllers/database.js');


// redirects to book_info page with isbn as query
router.get('/book_info/:isbn',
    (req, res, next) => {
        res.redirect('/book_info?isbn=' + req.params.isbn);
    }
);


// returns a list of libraries that have the book with the given isbn
router.get('/map/:isbn',
    (req, res, next) => {
        // database.getLibraryLocations(req.params.isbn, (err, books) => {

        database.getLibraryIdOfBookByIsbn(req.params.isbn, (err, books) => {
            if (err) {
                console.log(err)
                res.status(500).send('Internal Server Error')
            } else {
                res.send(books);
            }
        })
    },
)


// returns a list of books that have the given title
router.get('/book_info',
    (req, res, next) => {
        if (req.query['isbn']) {
            next();
        }
        else {
            res.redirect('/');
        }
    },
    (req, res, next) => {
        // get book info
        database.getBookInfo(isbn = req.query['isbn'], title = null, numOf = false, copies = true, filters = null, limit = null, offset = null, (err, book) => {
            if (err) {
                console.log(err)
                res.status(500).send('Internal Server Error')
            } else {
                // assign the res.locals.book the first book in the list
                res.locals.book = book[0];
                next();
            }
        });
    },
    (req, res, next) => {
        // get library info
        database.getLibraryIdOfBookByIsbn(req.query['isbn'], (err, libraryInfo) => {
            if (err) {
                console.log(err)
                res.status(500).send('Internal Server Error')
            } else {
                res.locals.library = libraryInfo;
                next();
            }
        });
    },


    (req, res) => {
        res.render('book_info', {
            title: 'Book Info',
            style: 'book_info.css',
            signedIn: req.session.signedIn
        });
    });


module.exports = router;


