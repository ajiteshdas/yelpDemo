var express = require('express'),
  router = express.Router(),
  User = require('../models/user'),
  passport = require('passport');

//master controller
router.use('/campgrounds', require('./campgrounds'));
router.use('/campgrounds/:camp_id/comments', require('./comments'));
router.use('/register', require('./auth'));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('landing', { title: 'YelpCamp' });
});

//AUTH Routes

//LOGIN LOGIC
//GET login form
router.get('/login', (req, res) => {
  res.render('login');
});

//POST data from login form, Authenticate and then redirect
router.post('/login', passport.authenticate('local', {
  successRedirect: '/campgrounds',
  failureRedirect: '/login',
}), (req, err) => {
  res.render('/')
});

//Logout route
router.get('/logout', (req,res) =>{
  req.logout();
  console.log('User logged out');
  req.flash('success', `Successfully logged out`);
  res.redirect('/');
})

//============MIDDLE WARE==============//


module.exports = router;
