const express = require('express');

const router = express.Router();
// const database = require('../controllers/database.js');



router.get('/book_info/:isbn',
    (req, res, next) => {
        res.redirect('/book_info?isbn=' + req.params.isbn);
    }

);



router.get('/map/:isbn',
    (req, res, next) => {
        database.getLibraryLocations(req.params.isbn, (err, books) => {
            if (err) {
                next(err);
            }
            else {
                // res.locals.libraryLocations = books;
                res.send(books);
            }
        })

    },
)


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
        //     // let requestData = {"isbn": req.query['isbn'], "title": null, "numOf": false, "copies": true, "filters": null, "limit": null, "offset": null};
        //     res.locals.requestData = {"isbn": req.query['isbn'], "copies": true};
        // },
        // (req, res, next) => {
        // database.getBoo(res.locals.requestData, (err, book) => {

        database.getBookInfo(isbn = req.query['isbn'], title = null, numOf = false, copies = true, filters = null, limit = null, offset = null, (err, book) => {
            if (err) {
                next(err);
            }
            else {
                res.locals.book = book[0];
                next();
            }
        });
    },
    (req, res, next) => {
        database.getLibraryIdOfBookByIsbn(req.query['isbn'], (err, libraryId) => {
            if (err) {
                next(err);
            }
            else {
                res.locals.libraries = libraryId;

            }
        });
        next();
    },


    (req, res) => {
        res.render('book_info', {
            title: 'Book Info',
            book: res.locals.book,
            style: 'book_info.css',
            library: res.locals.libraries,

            signedIn: req.session.signedIn
        });

    });


module.exports = router;


