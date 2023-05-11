const express = require('express');

const router = express.Router();


// let signedIn = module.exports.signedIn;

router.get('/sign_in', (req, res) => {
    console.log(req.query)

    // stays in the same page 
    res.redirect(req.get('referer'));
});


router.post('/sign_in', (req, res) => {
    console.log(req.body.email, req.body.psw);
    module.exports.signedIn = true;

    // stays in the same page
    res.redirect(req.get('referer'));
});



router.get('/sign_out', (req, res) => {
    // console.log(req.body);
    module.exports.signedIn = false;

    // stays in the same page
    res.redirect('/');
});



module.exports = router;


