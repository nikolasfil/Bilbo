const express = require('express');

const router = express.Router();
const helpers = require('../controllers/helpers.js');
const database = require('../controllers/database.js');

let signedIn = module.exports.signedIn;

router.get('/', (req, res) => {

    let command = `Select isbn,title,cover_image as photo from BOOK limit 6`;
    let books = database.databaseAllCommand(command);

    command = `Select id,name as title,address,profile_picture as photo from LIBRARY  limit 6`;
    let libraries = database.databaseAllCommand(command);

    res.render('homepage', {
        style: 'index.css',
        title: 'Home',
        signedIn: signedIn,
        booklist: books,
        library: libraries

    });
});

router.get('/homepage', (req, res) => {
    res.redirect('/');
});


module.exports = router;


