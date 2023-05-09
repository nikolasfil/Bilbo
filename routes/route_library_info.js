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

router.get('/library_info', (req, res) => {

    let command = `Select * from LIBRARY where id=${req.query['id']}`;

    let libraries = database.databaseCommand(command);

    command = `Select b.isbn as isbn,b.title as title,b.cover_image as photo from BOOK as b join COPIES as c on c.book_isbn = b.isbn where c.library_id=${req.query['id']} limit 6`;
    let books = database.databaseAllCommand(command);

    res.render('library_info', {
        title: 'Library Info',
        style: 'library_info.css',
        signedIn: signedIn,
        library: libraries,
        book: books,
    });
});


module.exports = router;


