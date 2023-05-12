const express = require('express');

const router = express.Router();

const database = require('../controllers/database.js');

const bcrypt = require('bcrypt');

const flash = require('connect-flash');


// let signedIn = module.exports.signedIn;

router.get('/sign_in', (req, res) => {
    console.log(req.query)

    // stays in the same page 
    res.redirect(req.get('referer'));
});


router.post('/sign_in',
    (req, res, next) => {
        if (req.session.mySessionName == undefined) {
            req.session.mySessionName = 'sess';
            console.log("session created");
        }
        // else {
        //     console.log("session already exists");
        // }
        // res.redirect('/user_profile');
        next();
    }, (req, res) => {
        database.checkUser(req.body.email, req.body.psw, (err, result) => {
            if (err) {
                console.log(err);
                req.flash('error Internal Server Error');
                res.status(500).send('Internal Server Error');

            }
            else {
                if (result) {
                    req.session.signedIn = true;
                }
                else {
                    console.log(err);
                    res.redirect('/')
                }
            }
        });
    }
);



router.get('/sign_out', (req, res) => {
    // console.log(req.body);
    if (req.session.mySessionName == undefined) {
        res.redirect('/')
    }
    else {
        req.session.destroy((err) => {
            console.log("session destroyed")
        })
    }
    module.exports.signedIn = false;
    // make a pop up that displayes the text logedout
    // stays in the same page
    res.redirect('/');
});


router.get("/session", (req, res) => {
    const name = req.session.mySessionName;
    console.log(req.sessionID);
    if (name == undefined) {
        res.redirect('/');
    }
    res.send(`${name}:${req.sessionID}`)
})


module.exports = router;


