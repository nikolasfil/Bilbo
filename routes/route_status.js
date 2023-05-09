const express = require('express');

const router = express.Router();
const helpers = require('../controllers/helpers.js');

let signedIn = module.exports.signedIn;

// it was causing problems so I disabled it from index.js 

router.get('*', (req, res) => {
    // check req status 
    
    res.redirect('/');
});




module.exports = router;


