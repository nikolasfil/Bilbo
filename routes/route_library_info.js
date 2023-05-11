const express = require('express');

const router = express.Router();
const helpers = require('../controllers/helpers.js');
const database = require('../controllers/database.js');

let signedIn = module.exports.signedIn;

router.get('/library_info/:id',
    (req, res) => {
        res.redirect('/library_info?id=' + req.params.id);
    }
);

router.get('/library_info', 
    (req, res, next) => { 
        if( req.query['id'] ) { 
            next();
        }
        else {
            res.redirect('/');
        }
    },
    (req, res, next) => {
        database.getLibraryById(req.query['id'], function (err, libraries) {
            if (err) {
                console.log(err)
                res.status(500).send('Internal Server Error')
            }
            else {
                res.locals.libraries = libraries;
            }
        })
        next();
    },

    (req, res, next) => {
        database.getBooksFromLibrary(req.query['id'],6, function (err, books) {
            if (err) {
                console.log(err)
                res.status(500).send('Internal Server Error')
            }
            else {
                res.locals.books = books;
            }
        })
        next();
    },
        

    (req, res) => {

    res.render('library_info', {
        title: 'Library Info',
        style: 'library_info.css',
        signedIn: signedIn,
        library: res.locals.libraries,
        book: res.locals.books,
    });
});


module.exports = router;


