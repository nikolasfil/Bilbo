const express = require('express');

const router = express.Router();

const database = require('../controllers/database.js');

router.get('/sign_in', (req, res) => {
    res.redirect(req.get('referer'));
});


router.post('/sign_in',
    (req, res) => {
        database.checkUser(req.body.email, req.body.psw, (err, result) => {
            if (err) {
                console.log(err);
                res.redirect(req.get('referer'));
            }
            else {
                if (!result ) {
                    req.session.alert_message = 'Wrong email or password';
                    // res.redirect(req.get('referer'));
                    res.redirect('/')
                }
                
                req.session.signedIn = true;
                req.session.email = result.email;
                // assigning message for the alert
                req.session.alert_message = 'You have successfully signed in';
                
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
                req.session.alert_message = err;
                res.redirect(req.get('referer'));
            }
            else {
                next();
            }

        });

    }, (req, res) => {
        database.addUser(req.body, (err, result) => {
            if (err) {
                console.log(err);
                // res.status(500).send('Internal Server Error');
                res.redirect(req.get('referer'));
            }
            else {
                // console.log(signedIn);
                req.session.signedIn = true;
                res.redirect(req.get('referer'));
            }
        });
    }
);



router.get('/sign_out', (req, res) => {
    // if (req.referer && req.referer == "user_profile") {
    req.session.destroy((err) => {
        console.log("session destroyed")
    })
    res.redirect('/')
    // }
    // res.redirect(req.get('referer'));
});


// it is not needed 
// router.get("/session", (req, res) => {
//     const name = req.session.mySessionName;
//     console.log(req.sessionID);
//     res.send(`${name}:${req.sessionID}`)
// })


module.exports = router;

