const express = require('express');

const router = express.Router();
const database = require('../controllers/database.js');

let signedIn = module.exports.signedIn;

router.get('/book_info/:isbn',
    (req, res, next) => {
        res.redirect('/book_info?isbn=' + req.params.isbn);
    }

);



router.get('/book_info',
    // (req, res, next) => {
    //     if (req.session.user) {
    //         signedIn = true;
    //     }
    //     else {
    //         signedIn = false;
    //     }
    //     next();
    // },
    (req, res, next) => {
        if (req.query['isbn']) {
            next();
        }
        else {
            res.redirect('/');
        }
    },
    (req, res, next) => {
        database.getBookCopies(req.query['isbn'], null,(err, book) => {
            if (err) {
                next(err);
            }
            else {
                res.locals.book = book[0];
            }
        });
        next();
    },
    (req, res, next) => {
        database.getLibraryIdOfBookByIsbn(req.query['isbn'], (err, libraryId) => {
            if (err) {
                next(err);
            }
            else {
                res.locals.libraries = libraryId[0];
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


