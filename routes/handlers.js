// routing
const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    res.render('homepage.hbs', {
        style: 'index.css',
        title: 'Home'
    });
});


router.get('/about', (req, res) => {
    res.render('about', { 
        title: 'About us',
        style: 'about.css'
    });
});


router.get('/user_profile', (req, res) => {
    res.render('user_profile', {
        // to be changed later ? 
        title: 'User Profile',
        style: 'user_profile.css'
    });
});


router.get('/library_info', (req, res) => {
    res.render('library_info', {
        title: 'Library Info',
        style: 'library_info.css'
    });
});




module.exports = router;
