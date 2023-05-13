
let database = require('model.js');

// exports.checkSession = function()

module.exports = {

    login: function(req,res){
        database.login(req.body.email,req.body.password,(err,result)=>{
            if(err){
                console.log(err);
                res.redirect(req.get('referer'));
            }
            else{
                req.session.signedIn = true;
                res.redirect(req.get('referer'));
            }
        });
    },

    logout: function(req,res){
        req.session.destroy();
        res.redirect(req.get('referer'));
    },

    checkAuthentication: function(req,res,next){
        if(req.session.signedIn){
            next();
        }
        else{
            res.redirect(req.get('referer'));
        }
    }

    
}