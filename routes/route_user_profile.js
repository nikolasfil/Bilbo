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
                res.locals.profile = result;
                next();
            }
        });
    },
    (req, res, next) => {
        database.getAllBorrowingState(res.locals.profile.id, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.locals.borrowing = result;
                next();
            }
        });
    },
    (req, res) => { 
        res.render('user_profile', {
            title: 'User Profile',
            style: 'user_profile.css',
            signedIn: req.session.signedIn
        });
    }
);


module.exports = router;


