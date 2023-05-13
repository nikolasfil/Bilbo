const express = require('express');

const router = express.Router();

router.get('/user_profile', (req, res) => {
    // if (!signedIn) {

    // if (req.session.mySessionName ==undefined){
    //     res.redirect('/');
    // }

    if (req.session.signedIn){
        res.render('user_profile', {
            // to be changed later ? 
            title: 'User Profile',
            style: 'user_profile.css',
            signedIn: req.session.signedIn
        });
    }
    else {
        res.redirect('/')
    }
});


module.exports = router;


