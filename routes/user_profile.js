const express = require('express');

const router = express.Router();
const helpers = require('../controllers/helpers.js');

let signedIn = module.exports.signedIn;


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


module.exports = router;


