const express = require('express');
const router = express.Router();

const database = require('../controllers/database.js');
const login = require('../controllers/login.js');


/**
 * Router for homepage
 */
router.get('/',
    (req, res, next) => {
        // this is a static book list displaying 12 books
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
        // this is a static library list displaying a max of 6 libraries
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


