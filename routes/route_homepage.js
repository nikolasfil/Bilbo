const express = require('express');

const router = express.Router();
const database = require('../controllers/database.js');

let signedIn = module.exports.signedIn;


router.get('/',
    (req, res, next) => {
        database.getAllBooksLimit(6, function (err, books) {
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
    (req, res, next) => {
        database.getAllLibrariesLimit(6, function (err, libraries) {
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
    (req, res) => {

        res.render('homepage', {
            style: 'index.css',
            title: 'Home',
            signedIn: signedIn,
            booklist: res.locals.books,
            library: res.locals.libraries

        });
    });



router.get('/homepage', (req, res) => {
    res.redirect('/');
});


module.exports = router;


