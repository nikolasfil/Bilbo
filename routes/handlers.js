// routing
const express = require('express');
// const signedIn = require('..');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();
// use controllers/helpers.js
const helpers = require('../controllers/helpers.js');
// const help = require('/controllers/helpers.js')

let signedIn = module.exports.signedIn;
// let signedIn = { signedIn };

// router.get('', (req, res) => {
//     res.redirect('/homepage');
//     });
    

// router.get('/homepage', (req, res) => {
//     res.render('homepage', {
//         style: 'index.css',
//         title: 'Home',
//         signedIn: signedIn,
//         // book : books,
//         book: [
//             {
//                 // helpers.databaseCommand("Select * from BOOK where title = 'Programming Python'"),  
            
//                 title: 'Programming Python',
//                 photo: 'img/card_book_1.png',
//                 description: 'This is a description',
//                 copies: '5'
//             },
//             {
//                 title: "Java and Sql",
//                 photo: 'img/card_book_2.png',
//                 description: 'This is a description',
//                 copies: '6'
//             },
//             {
//                 title: 'Discovering SQL',
//                 photo: 'img/card_book_2.png',
//                 description: 'This is a description',
//                 copies: '6'
//             },
//             {
//                 title: 'HTML for the World Wide Web',
//                 photo: 'img/card_book_2.png',
//                 description: 'This is a description',
//                 copies: '6'
//             },
//             {
//                 title: 'CSS, DHTML, and Ajax, Fourth Edition',
//                 photo: 'img/card_book_2.png',
//                 description: 'This is a description',
//                 copies: '6'
//             },
//             {
//                 title: 'Practical symfony - Propel edition',
//                 photo: 'img/card_book_2.png',
//                 description: 'This is a description',
//                 copies: '6'
//             },
//         ],
//         library: [
//             {
//                 title: 'Uni of Patras',
//                 photo: 'img/card_library_1.png',
//                 description: 'This is a description',
//                 id: '0'
//             },
//             {
//                 title: 'Not Uni of Patras',
//                 photo: 'img/card_library_2.png',
//                 description: 'This is a description',
//                 id: '2'
//             },
//             {
//                 title: 'Not Uni of Patras',
//                 photo: 'img/card_library_2.png',
//                 description: 'This is a description',
//                 id: '2'
//             },
//             {
//                 title: 'Not Uni of Patras',
//                 photo: 'img/card_library_2.png',
//                 description: 'This is a description',
//                 id: '2'
//             },
//             {
//                 title: 'Not Uni of Patras',
//                 photo: 'img/card_library_2.png',
//                 description: 'This is a description',
//                 id: '2'
//             },
//         ]

//     });
// });



router.get('/', (req, res) => {

    // let titles = ["Programming Python","Java and Sql","Discovering SQL","HTML for the World Wide Web","CSS, DHTML, and Ajax, Fourth Edition","Practical symfony - Propel edition"]
    // let books = [];

    // let command = `Select * from BOOK where title = '${titles[0]}'`;
    // let rows = helpers.databaseCommand(command);
    // // let rows = help.databaseCommand(command);
    // console.log(rows);

    // console.log(helpers.databaseCommand(`Select title,cover_image from BOOK where title = '${titles[0]}'`));
    // for (let i = 0; i < titles.length; i++) {
    //     books.push(helpers.databaseCommand(`Select title,cover_image from BOOK where title = '${titles[i]}'`));
    // }
    
    // console.log(books)

    res.render('homepage', {
        style: 'index.css',
        title: 'Home',
        signedIn: signedIn,
        // book : books,
        book: [
            {
                // helpers.databaseCommand("Select * from BOOK where title = 'Programming Python'"),  
            
                title: 'Programming Python',
                photo: 'img/card_book_1.png',
                description: 'This is a description',
                copies: '5'
            },
            {
                title: "Java and Sql",
                photo: 'img/card_book_2.png',
                description: 'This is a description',
                copies: '6'
            },
            {
                title: 'Discovering SQL',
                photo: 'img/card_book_2.png',
                description: 'This is a description',
                copies: '6'
            },
            {
                title: 'HTML for the World Wide Web',
                photo: 'img/card_book_2.png',
                description: 'This is a description',
                copies: '6'
            },
            {
                title: 'CSS, DHTML, and Ajax, Fourth Edition',
                photo: 'img/card_book_2.png',
                description: 'This is a description',
                copies: '6'
            },
            {
                title: 'Practical symfony - Propel edition',
                photo: 'img/card_book_2.png',
                description: 'This is a description',
                copies: '6'
            },
        ],
        library: [
            {
                title: 'Uni of Patras',
                photo: 'img/card_library_1.png',
                description: 'This is a description',
                id: '0'
            },
            {
                title: 'Not Uni of Patras',
                photo: 'img/card_library_2.png',
                description: 'This is a description',
                id: '2'
            },
            {
                title: 'Not Uni of Patras',
                photo: 'img/card_library_2.png',
                description: 'This is a description',
                id: '2'
            },
            {
                title: 'Not Uni of Patras',
                photo: 'img/card_library_2.png',
                description: 'This is a description',
                id: '2'
            },
            {
                title: 'Not Uni of Patras',
                photo: 'img/card_library_2.png',
                description: 'This is a description',
                id: '2'
            },
        ]

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

router.get('/library/:id', 
    (req, res,next) => {
        console.log('Request URL:', req.originalUrl);

        res.locals.url = req.originalUrl;
        
        // let authData = (AuthData)context.Items["AuthData"];

        next();
    }, (req, res,next) => {
        console.log('Request Type:', req.method);
        console.log(res.locals.url);
        next();
    }, (req, res) => {
        res.redirect('/library?id='+req.params.id);
    }
);

router.get('/library', (req, res, next) => {



    
    let command = `Select * from LIBRARY where id=${req.query['id']}`;
    // let command = `Select * from BOOK where title= 'Java and Sql'`;
    
    let rows = helpers.databaseCommand(command);
    // console.log(req.query['id']);
    console.log(rows);
    // rows['location'] = rows['location'].replace(/,/g, '<br>');

    res.render('library_info', {
        title: 'Library Info',
        style: 'library_info.css',
        signedIn: signedIn,
        library: rows,
        book: [
            {
                title: 'Programming Python',
                photo: 'img/card_book_1.png',
                description: 'This is a description',
                copies: '5'
            },
            {
                title: 'Java and Sql',
                photo: 'img/card_book_2.png',
                description: 'This is a description',
                copies: '6'
            },
            {
                title: 'Discovering SQL',
                photo: 'img/card_book_2.png',
                description: 'This is a description',
                copies: '6'
            },
            {
                title: 'HTML for the World Wide Web',
                photo: 'img/card_book_2.png',
                description: 'This is a description',
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
    
    // let command = `Select * from LIBRARY where id=${req.query['id']}`;
    let command = `Select * from BOOK where title= 'Java and Sql'`;
    
    let rows = helpers.databaseCommand(command);
    // console.log(req.query['id']);
    console.log(rows);
    // rows['location'] = rows['location'].replace(/,/g, '<br>');

    res.render('library_info', {
        title: 'Library Info',
        style: 'library_info.css',
        signedIn: signedIn,
        library: rows,
        book: [
            {
                title: 'Programming Python',
                photo: 'img/card_book_1.png',
                description: 'This is a description',
                copies: '5'
            },
            {
                title: 'Java and Sql',
                photo: 'img/card_book_2.png',
                description: 'This is a description',
                copies: '6'
            },
            {
                title: 'Discovering SQL',
                photo: 'img/card_book_2.png',
                description: 'This is a description',
                copies: '6'
            },
            {
                title: 'HTML for the World Wide Web',
                photo: 'img/card_book_2.png',
                description: 'This is a description',
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



router.get('/book_info',

    (req, res) => {
        
        let command = `Select * from BOOK where title = '${req.query['isbn']}'`;
        
        let rows = helpers.databaseCommand(command);
        
        res.render('book_info', {
            title: 'Book Info',
            book: rows,
            style: 'book_info.css',
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
