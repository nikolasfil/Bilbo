const express = require('express');
const login = require('../controllers/login.js')

const router = express.Router();

router.get('/user_profile', login.checkAuthentication, (req, res) => {

    res.render('user_profile', {
        title: 'User Profile',
        style: 'user_profile.css',
        signedIn: req.session.signedIn
    });
}
);


module.exports = router;


