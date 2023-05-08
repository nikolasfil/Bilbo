const express = require('express');

const router = express.Router();
const helpers = require('../controllers/helpers.js');

let signedIn = module.exports.signedIn;

router.get('*', (req, res) => {
    res.redirect('/');
});


module.exports = router;


