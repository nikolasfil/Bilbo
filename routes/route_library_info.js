const express = require('express');

const router = express.Router();
const helpers = require('../controllers/helpers.js');
const database = require('../controllers/database.js');



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
        database.getLibraryInfo(req.query['id'],null, function (err, libraries) {
            if (err) {
                console.log(err)
                res.status(500).send('Internal Server Error')
            }
            else {
                console.log(JSON.stringify(libraries))
                res.locals.libraries = libraries;
            }
        })
        next();
    },

    (req, res, next) => {
        database.getBooksFromLibrary(req.query['id'],6, function (err, books) {
            if (err) {
                console.log(err)
                console.log('error')
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
        signedIn: req.session.signedIn,
        library: res.locals.libraries,
        book: res.locals.books,
    });
});


module.exports = router;


