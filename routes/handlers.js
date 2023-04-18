// routing
const express = require('express');
// const signedIn = require('..');
const router = express.Router();

let signedIn = module.exports.signedIn;
// let signedIn = { signedIn };

router.get('/', (req, res) => {
    res.render('homepage', {
        style: 'index.css',
        title: 'Home',
        signedIn: signedIn
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
        signedIn: signedIn
    });
});

router.get('/book_info', (req, res) => {
    // more to be added later
    res.render('book_info', {
        title: 'Book Info',
        style: 'book_info.css',
        signedIn: signedIn
    });
});

router.get('/search', (req, res) => {
    // more to be added later
    res.render('search', {
        title: 'Search',
        style: 'search.css',
        signedIn: signedIn
    });
});


// router.get('/sign_in+*', (req, res) => {
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
