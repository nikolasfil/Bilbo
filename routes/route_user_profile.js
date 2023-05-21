const express = require('express');
const login = require('../controllers/login.js')

const database = require('../controllers/database.js');

const router = express.Router();

router.get('/user_profile', login.checkAuthentication, 
    (req, res, next) => {
        database.userDetails(req.session.email, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.locals.user = result;
                console.log(res.locals.user);
                next();
            }
        });
    },
    (req, res) => { 
        res.render('user_profile', {
            title: 'User Profile',
            style: 'user_profile.css',
            profile: res.locals.user,
            signedIn: req.session.signedIn
        });
    }
);


module.exports = router;


