const express = require('express');

const router = express.Router();
const helpers = require('../controllers/helpers.js');

let signedIn = module.exports.signedIn;

router.get('/book_info/:isbn',
    (req, res, next) => {
        res.redirect('/book_info?isbn=' + req.params.isbn);
    }

);



router.get('/book_info',

    (req, res) => {

        // let command = `Select * from BOOK where isbn = '${req.query['isbn']}'`;
        let command = `Select * from BOOK join COPIES on book_isbn=isbn where isbn='${req.query['isbn']}'`;

        // Select isbn,title,author,edition,publisher,release,language,summary,cover_image, copy_num, library_id from BOOK join COPIES on book_isbn = isbn 
        // Select * from BOOK join COPIES on book_isbn = isbn where isbn=9781118166321

        // this returns one book 
        let books = helpers.databaseCommand(command);
        command = `Select id,copy_num,name,location,address,phone,email,profile_picture,l.summary,working_hours from BOOK join COPIES on book_isbn=isbn  join LIBRARY as l on library_id=id  where isbn = '${req.query['isbn']}'`;
        // Select copy_num,name,location,address,phone,email,profile_picture,summary,working_hours from BOOK join COPIES on book_isbn=isbn  join LIBRARY on library_id=id  where isbn = '9781118166321'
        let lib = helpers.databaseCommand(command);
        let libraries = helpers.databaseCommand(command);



        res.render('book_info', {
            title: 'Book Info',
            book: books,
            style: 'book_info.css',
            library: lib,
            libs: libraries,
            signedIn: signedIn
        });

    });

module.exports = router;


