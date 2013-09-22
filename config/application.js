
// using https://gist.github.com/theangryangel/5060446
// as an example
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// some static users
var users = [
    { id: 3, username: 'alberto', password: '123', email: 'contato@albertosouza.net' },
    { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' }
  , { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
];


// Use the LocalStrategy within Passport.
// Strategies in passport require a `verify` function, which accept
// credentials (in this case, a username and password), and invoke a callback
// with a user object. In the real world, this would query a database;
// however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
  function(email, password, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // Find the user by username. If there is no user with the given
      // username, or the password is not correct, set the user to `false` to
      // indicate failure and set a flash message. Otherwise, return the
      // authenticated `user`.
      findByEmail(username, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: __('Unknown email ') + username });
        }
        if (user.password != password) {
          return done(null, false, { message: __('Invalid password') });
        }
        return done(null, user);
      })
    });
  }
));

// Passport session setup.
// To support persistent login sessions, Passport needs to be able to
// serialize users into and deserialize users out of the session. Typically,
// this will be as simple as storing the user ID when serializing, and finding
// the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  console.log('passport serialize user')
  done(null, user.email);
});

passport.deserializeUser(function(email, done) {
  console.log('passport unserialize user')
  done(null, { email : email});
});

module.exports = {

  // Name of the application (used as default <title>)
  appName: "We",

  // Port this Sails application will live on
  port: 3000,

  // The environment the app is deployed in
  // (`development` or `production`)
  //
  // In `production` mode, all css and js are bundled up and minified
  // And your views and templates are cached in-memory.  Gzip is also used.
  // The downside?  Harder to debug, and the server takes longer to start.
  environment: 'development',

  // Logger
  // Valid `level` configs:
  //
  // - error
  // - warn
  // - debug
  // - info
  // - verbose
  //
  log: {
    level: 'verbose'
  },


  // Custom express middleware - we use this to register the passport middleware
  express : {
    customMiddleware : function(app){
      app.use(passport.initialize());
      app.use(passport.session());
    }
  }

};