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
                req.session.signedIn = true;
                req.session.email = result.email;
                console.log(req.session.email);

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
                // alert('email already exists')
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
    req.session.destroy((err) => {
        console.log("session destroyed")
    })
    // make a pop up that displayes the text logedout
    // stays in the same page
    res.redirect(req.get('referer'));
});


// it is not needed 
router.get("/session", (req, res) => {
    const name = req.session.mySessionName;
    console.log(req.sessionID);
    res.send(`${name}:${req.sessionID}`)
})


module.exports = router;

