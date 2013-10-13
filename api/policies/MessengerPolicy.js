module.exports = function (req, res, next) {
    //console.log(req);
return next();
    //console.log('is authenticated: ',req.isAuthenticated());
    //if (req.isAuthenticated()) {
        var action = req.param('action');

        console.log('action: ', action);
        if( req.user.id === req.param('uid')){

          return next();
        }

   // }
//
    return res.send("You Must Be Logged In", 403);

};