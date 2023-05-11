const express = require('express');

const router = express.Router();


// let signedIn = module.exports.signedIn;

router.get('/sign_in', (req, res) => {
    console.log(req.query)

    // stays in the same page 
    res.redirect(req.get('referer'));
});


router.post('/sign_in', (req, res) => {
    if(req.session.mySessionName==undefined){
        req.session.mySessionName = req.body.email;
        console.log("session created");
    }
    else{
        console.log("session already exists");
    }
    console.log(req.body.email, req.body.psw);
    module.exports.signedIn = true;

    // stays in the same page
    res.redirect(req.get('referer'));
});



router.get('/sign_out', (req, res) => {
    // console.log(req.body);
    if(req.session.mySessionName==undefined){
        res.redirect('/')
    }
    else {
        req.session.destroy((err)=> {
            console.log("session destroyed")
        })
    }
    module.exports.signedIn = false;
    // make a pop up that displayes the text logedout
    // stays in the same page
    res.redirect('/');
});


router.get("/session",(req,res)=>{
    const name = req.session.mySessionName;
    console.log(req.sessionID);
    if(name==undefined){
        res.redirect('/');
    }
    res.send(`${name}:${req.sessionID}`)
})


module.exports = router;


