const express = require('express');

const router = express.Router();

let signedIn = module.exports.signedIn;


router.get('/user_profile', (req, res) => {
    // if (!signedIn) {

    if (req.session.mySessionName ==undefined){
        res.redirect('/');
    }

    if (req.session.signedIn){
        res.render('user_profile', {
            // to be changed later ? 
            title: 'User Profile',
            style: 'user_profile.css',
            signedIn: signedIn
        });
    }
});


module.exports = router;


