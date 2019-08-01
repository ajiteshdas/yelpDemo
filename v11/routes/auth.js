var express = require('express');
 router = express.Router(),
User = require('../models/user'),
passport = require('passport');
//AUTH Routes

//Registration logic
//GET registration form
router.get('/', (req, res) => {
  req.flash('info', 'Welcome to YelpCamp, sing up now to experience nature at its best!');
  res.render('register');
});

//POST data from register form and redirect
router.post("/", (req, res) => {
  var newUser = new User({
    username: req.body.username,
    email: req.body.email,
    gender: req.body.gender
  });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      req.flash('error', err.message);
      return res.redirect("register");
    }
    passport.authenticate("local")(req, res, () => {
      req.flash('success', `Welcome to YelpCamp ${user.username}`);
      res.redirect("/campgrounds");
    });
  });
});

module.exports = router;
