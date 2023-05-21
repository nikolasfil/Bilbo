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
    (req, res, next) => {
        database.getAllBorrowingState(res.locals.user.id, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.locals.borrowing = result;
                console.log(res.locals.borrowing);
                next();
            }
        });
    },

    (req, res) => { 
        res.render('user_profile', {
            title: 'User Profile',
            style: 'user_profile.css',
            profile: res.locals.user,
            borrowing: res.locals.borrowing,
            signedIn: req.session.signedIn
        });
    }
);


module.exports = router;


