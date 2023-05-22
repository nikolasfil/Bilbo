
exports.checkAuthentication = (req, res, next) => {
    if (req.session.signedIn) {
        next();
    }
    else {
        req.session.alert_message = 'You have to sign up in order to access this function';
        res.redirect('/');
    }
}


exports.alerting = (req, res,next) => {
    if (req.session.alert_message) {
        res.locals.message =req.session.alert_message;
        req.session.alert_message=null;
    }

    next();
}