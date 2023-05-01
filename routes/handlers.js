// routing
const express = require('express');
// const signedIn = require('..');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();


let signedIn = module.exports.signedIn;
// let signedIn = { signedIn };

router.get('/', (req, res) => {
    res.render('homepage', {
        style: 'index.css',
        title: 'Home',
        signedIn: signedIn,
        book: [
            {
                title: 'Polaroid',
                photo: 'img/card_book_1.png',
                description: 'This is a description',
                copies: '5'
            },
            {
                title: "Java and Sql",
                photo: 'img/card_book_2.png',
                description: 'This is a description 2',
                copies: '6'
            },
            {
                title: 'Book tile 2',
                photo: 'img/card_book_2.png',
                description: 'This is a description 2',
                copies: '6'
            },
            {
                title: 'Book tile 2',
                photo: 'img/card_book_2.png',
                description: 'This is a description 2',
                copies: '6'
            },
            {
                title: 'Book tile 2',
                photo: 'img/card_book_2.png',
                description: 'This is a description 2',
                copies: '6'
            },
            {
                title: 'Book tile 2',
                photo: 'img/card_book_2.png',
                description: 'This is a description 2',
                copies: '6'
            },
        ],
        library: [
            {
                title: 'Uni of Patras',
                photo: 'img/card_library_1.png',
                description: 'This is a description'
            },
            {
                title: 'Not Uni of Patras',
                photo: 'img/card_library_2.png',
                description: 'This is a description'
            },
            {
                title: 'Not Uni of Patras',
                photo: 'img/card_library_2.png',
                description: 'This is a description'
            },
            {
                title: 'Not Uni of Patras',
                photo: 'img/card_library_2.png',
                description: 'This is a description'
            },
            {
                title: 'Not Uni of Patras',
                photo: 'img/card_library_2.png',
                description: 'This is a description'
            },
        ]

    });
});


router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About us',
        style: 'about.css',
        signedIn: signedIn
    });
});



router.get('/user_profile', (req, res) => {
    res.render('user_profile', {
        // to be changed later ? 
        title: 'User Profile',
        style: 'user_profile.css',
        signedIn: signedIn
    });
});


router.get('/library_info', (req, res) => {
    res.render('library_info', {
        title: 'Library Info',
        style: 'library_info.css',
        signedIn: signedIn,
        book: [
            {
                title: 'Polaroid',
                photo: 'img/card_book_1.png',
                description: 'This is a description',
                copies: '5'
            },
            {
                title: 'Book tile 2',
                photo: 'img/card_book_2.png',
                description: 'This is a description 2',
                copies: '6'
            },
            {
                title: 'Book tile 2',
                photo: 'img/card_book_2.png',
                description: 'This is a description 2',
                copies: '6'
            },
            {
                title: 'Book tile 2',
                photo: 'img/card_book_2.png',
                description: 'This is a description 2',
                copies: '6'
            },
            {
                title: 'Book tile 2',
                photo: 'img/card_book_2.png',
                description: 'This is a description 2',
                copies: '6'
            },
            {
                title: 'Book tile 2',
                photo: 'img/card_book_2.png',
                description: 'This is a description 2',
                copies: '6'
            },
        ],
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

    },
    (req, res) => {

        res.render('book_info', {
         title: 'Book Info',
         booktitle: req.query['isbn'],
         style: 'book_info.css',
         signedIn: signedIn
     });
 }
    
);



router.get('/book_info', (req, res) => {

       res.render('book_info', {
        title: 'Book Info',
        booktitle: req.query['isbn'],
        style: 'book_info.css',
        signedIn: signedIn
    });
});

router.get('/search', (req, res) => {
    // more to be added later
    res.render('search', {
        title: 'Search',
        style: 'search.css',
        signedIn: signedIn,
        book: [
            {
                title: 'Polaroid',
                photo: 'img/card_book_1.png',
                description: 'This is a description',
                copies: '5'
            },
            {
                title: 'Book tile 2',
                photo: 'img/card_book_2.png',
                description: 'This is a description 2',
                copies: '6'
            },
            {
                title: 'Book tile 2',
                photo: 'img/card_book_2.png',
                description: 'This is a description 2',
                copies: '6'
            },
            {
                title: 'Book tile 2',
                photo: 'img/card_book_2.png',
                description: 'This is a description 2',
                copies: '6'
            },
            {
                title: 'Book tile 2',
                photo: 'img/card_book_2.png',
                description: 'This is a description 2',
                copies: '6'
            },
            {
                title: 'Book tile 2',
                photo: 'img/card_book_2.png',
                description: 'This is a description 2',
                copies: '6'
            },
            {
                title: 'Book tile 2',
                photo: 'img/card_book_2.png',
                description: 'This is a description 2',
                copies: '6'
            },
        ],
    });
});

// https://www.digitalocean.com/community/tutorials/nodejs-req-object-in-expressjs
// router.all('/sign', (req, res,next) => {
//     // console.log(req.path);
//     res.render('homepage',{
//         title: 'Signed int',
//     })

//     next();
// });

//     // alert(req.url);
//     let array = req.url.split("+")[1].split('/');
//     let url = ''
//     if(array.length ==4){
//         url='homepage'
//         console.log(array);
//     }
//     else{
//         url = array[3].split('?')[0];
//         // alert(url);
//         console.log(array);
//     }
//     res.render(url, {
//         title: 'Sign In',
//         style: url+'.css',
//         signedIn: true
//     });
// });

module.exports = router;
