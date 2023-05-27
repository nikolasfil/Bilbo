
exports.checkAuthentication = (req, res, next) => {
    if (req.session.signedIn) {
        res.locals.signedIn = true;
        next();
    }
    else {
        req.session.alert_message = 'You have to sign up in order to access this function';
        res.redirect('/');
    }
}


exports.alerting = (req, res,next) => {
    if (req.session.alert_message && req.session.alert_message.length>0) {
        res.locals.message =req.session.alert_message;
        req.session.alert_message=null;
    }

    next();
}