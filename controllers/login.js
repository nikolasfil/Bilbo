
exports.checkAuthentication = (req, res, next) => {
    if (req.session.signedIn) {
        next();
    }
    else {
        res.redirect('/');
    }
}
