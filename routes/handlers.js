// routing
const express = require('express');
// const signedIn = require('..');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();
// use controllers/helpers.js
const helpers = require('../controllers/helpers.js');

let signedIn = module.exports.signedIn;



router.get('/', (req, res) => {

    let command = `Select isbn,title,cover_image as photo from BOOK `;
    let books = helpers.databaseAllCommand(command);

    command = `Select id,name as title,address,profile_picture as photo from LIBRARY `;
    let libraries = helpers.databaseAllCommand(command);

    res.render('homepage', {
        style: 'index.css',
        title: 'Home',
        signedIn: signedIn,
        booklist: books,
        library: libraries

    });
});






router.get('/user_profile', (req, res) => {
    if (!signedIn) {
        res.redirect('/');
    }

    res.render('user_profile', {
        // to be changed later ? 
        title: 'User Profile',
        style: 'user_profile.css',
        signedIn: signedIn
    });
});



router.get('/library_info/:id', 
    (req, res,next) => {
        console.log('Request URL:', req.originalUrl);
        next();
    }, (req, res,next) => {
        console.log('Request Type:', req.method);
        next();
    }, (req, res) => {
        res.redirect('/library_info?id='+req.params.id);
    }
);

router.get('/library_info', (req, res) => {
    
    let command = `Select * from LIBRARY where id=${req.query['id']}`;
    
    let libraries = helpers.databaseCommand(command);
    
    command = `Select b.isbn as isbn,b.title as title,b.cover_image as photo from BOOK as b join COPIES as c on c.book_isbn = b.isbn where c.library_id=${req.query['id']}`;
    let books = helpers.databaseAllCommand(command);

    res.render('library_info', {
        title: 'Library Info',
        style: 'library_info.css',
        signedIn: signedIn,
        library: libraries,
        book: books,
    });
});


// https://www.youtube.com/watch?v=_I6gP_nIFIA
router.get('/book_info/:isbn',
    (req, res, next) => {
        console.log('Request URL:', req.originalUrl);
        next();
    }, (req, res, next) => {
        console.log('Request Type:', req.method);
        next();
    },
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
        let libraries = helpers.databaseCommand(command);


        
        res.render('book_info', {
            title: 'Book Info',
            book: books,
            style: 'book_info.css',
            library: libraries,
            signedIn: signedIn
        });

        
        // console.log(db_rows.title);
        });

router.get('/search', (req, res) => {
    // more to be added later
    res.render('search', {
        title: 'Search',
        style: 'search.css',
        signedIn: signedIn,
        book: [
            {
                title: 'Programming Python',
                photo: 'img/card_book_2.png',
                description: 'This is a description 2',
                copies: '6'
            },
            {
                title: 'Java and Sql',
                photo: 'img/card_book_2.png',
                description: 'This is a description 2',
                copies: '6'
            },
            {
                title: 'Discovering SQL',
                photo: 'img/card_book_2.png',
                description: 'This is a description 2',
                copies: '6'
            },
            {
                title: 'HTML for the World Wide Web',
                photo: 'img/card_book_2.png',
                description: 'This is a description 2',
                copies: '6'
            },
            {
                title: 'CSS, DHTML, and Ajax, Fourth Edition',
                photo: 'img/card_book_2.png',
                description: 'This is a description 2',
                copies: '6'
            },
            {
                title: 'Practical symfony - Propel edition',
                photo: 'img/card_book_2.png',
                description: 'This is a description 2',
                copies: '6'
            },
        ],
    });
});


router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About us',
        style: 'about.css',
        signedIn: signedIn
    });
});

router.get('/contact', (req, res) => {
    res.redirect('/about');
});

router.get('/sign_in', (req, res) => {
    console.log(req.query)
    
    // stays in the same page 
    res.redirect(req.get('referer'));    
});


router.post('/sign_in', (req, res) => {
    console.log(req.body.email,req.body.psw);
    signedIn = true;

    // stays in the same page
    res.redirect(req.get('referer'));
});



router.get('/sign_out', (req, res) => {
    // console.log(req.body);
    signedIn = false;

    // stays in the same page
    res.redirect('/');
});


module.exports = router;
