
exports.checkAuthentication = (req, res, next) => {
    if (req.session.signedIn) {
        next();
    }
    else {
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