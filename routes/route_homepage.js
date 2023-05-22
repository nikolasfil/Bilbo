const express = require('express');

const router = express.Router();
const database = require('../controllers/database.js');

const login = require('../controllers/login.js');


router.get('/',
    login.alerting,
    (req, res, next) => {
        // return the first 12 books in the database with the number of copies 
        database.getBookInfo(isbn=null,title=null,numOf=null,copies=true,filters=null,limit=12,offset=null, function (err, books) {
            if (err) {
                console.log(err)
                res.status(500).send('Internal Server Error')
            } else {
                res.locals.booklist = books;
                next();
            }
        })

    },
    (req, res, next) => {
        database.getLibraryInfo(null,6, function (err, libraries) {
            if (err) {
                console.log(err)
                res.status(500).send('Internal Server Error')
            }
            else {
                res.locals.library = libraries;
                next();
            }
        })
    },
    (req, res) => {
        res.render('homepage', {
            style: 'index.css',
            title: 'Home',
            signedIn: req.session.signedIn,
        });
    });



router.get('/homepage', (req, res) => {
    res.redirect('/');
});


module.exports = router;


