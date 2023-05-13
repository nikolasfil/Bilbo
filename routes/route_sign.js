const express = require('express');

const router = express.Router();

const database = require('../controllers/database.js');

const bcrypt = require('bcrypt');


// let signedIn = module.exports.signedIn;

router.get('/sign_in', (req, res) => {
    console.log(req.query)
    // stays in the same page 
    res.redirect(req.get('referer'));
});


router.post('/sign_in',
    (req, res, next) => {
        // else {
        //     console.log("session already exists");
        // }
        // res.redirect('/user_profile');
        next();
    }, (req, res) => {
        database.checkUser(req.body.email, req.body.psw, (err, result) => {
            if (err) {
                console.log(err);
                // res.status(500).send('Internal Server Error');
                res.redirect(req.get('referer'));
            }
            else {
                req.session.signedIn = true;
                // res. get to req referer
                res.redirect(req.get('referer'));
            }
        });
    }
);

router.post('/sign_up',

    (req, res, next) => {
        database.checkIfUserExists(req.body.email, (err, result) => {
            if (err) {
                console.log(err);
                // email already exists
                res.redirect(req.get('referer'));
            }
            else {
                next();
            }

        });

    }, (req, res) => {
        database.addUser(req.body.email, req.body.psw, (err, result) => {
            if (err) {
                console.log(err);
                // res.status(500).send('Internal Server Error');
                res.redirect(req.get('referer'));
            }
            else {
                req.session.signedIn = true;
                res.redirect(req.get('referer'));
            }
        });
    }
);



router.get('/sign_out', (req, res) => {
    // console.log(req.body);

    req.session.destroy((err) => {
        console.log("session destroyed")
    })
    // make a pop up that displayes the text logedout
    // stays in the same page
    
    res.redirect('/');
});


router.get("/session", (req, res) => {
    const name = req.session.mySessionName;
    console.log(req.sessionID);
    // if (name == undefined) {
    //     res.redirect('/');
    // }
    res.send(`${name}:${req.sessionID}`)
})


module.exports = router;


