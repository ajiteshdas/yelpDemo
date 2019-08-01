var express = require('express'),
  router = express.Router(),
  Campground = require('../models/campground'),
  Comment = require('../models/comment'),
  middleware = require('../middleware');

//=================CAMPGROUNDS ROUTES================//
//INDEX ROUTE - show all campgrounds
router.get('/', async (req, res, next) => {
  //All campgrounds from DB
  try {
    let allCampgrounds = await Campground.find({});
    res.render('./campgrounds/index', { campgrounds: allCampgrounds, title: 'YelpCamp' });
  } catch (error) {
    req.flash('error', 'Someting went wrong! Please try again...');
    res.redirect('/');
  }
});

//NEW - path to form to add new campground Note: this is the gateway for users using browsers and CREATE can be barred from here
router.get('/new', middleware.isLoggedIn, (req, res, next) => {
  res.render('./campgrounds/new', { title: 'Add new campground' });
});

//CREATE - add new campground to database and redirect Note contd.: But users can still use REST apps like Postman to create new without browser
router.post('/', middleware.isLoggedIn, async (req, res, next) => {
  //get data from form and add to camp array
  var name = req.body.name;
  var image = req.body.image;
  var price = req.body.price;
  var description = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var newCampground = { 'name': name, 'image': image, 'description': description, 'author': author, 'price': price };
  //create new campground and add to DB
  try {
    let newlyCreated = await Campground.create(newCampground);
    //redirect to campgrounds
    res.redirect('/campgrounds');
  } catch (error) {
    req.flash('error', 'No campgrounds found');
    res.redirect('/');
  }
});

//SHOW - show details about a campground
router.get('/:camp_id', async (req, res, next) => {
  //find campgorund with the id
  try {
    let foundCamp = await Campground.findById(req.params.camp_id).populate('comments').exec();
    res.render('./campgrounds/show', { campground: foundCamp, title: 'YelpCamp' });
  } catch (error) {
    req.flash('error', 'No campgrounds found');
    res.redirect('/');
  }
    
  
});

//EDIT - show edit form
router.get('/:camp_id/edit', middleware.checkCamgroundOwnership, async (req, res) => {
  try {
    let foundCamp = await Campground.findById(req.params.camp_id);
    res.render('./campgrounds/edit', { campground: foundCamp });
  } catch (error) {
    req.flash('error', 'No campgrounds found');
    res.redirect('/');
  }

});

//UPDATE - PUT edit data form
router.put('/:camp_id', middleware.checkCamgroundOwnership, async (req, res) => {
  try {
    let data = { name: req.body.name, image: req.body.image, description: req.body.description };
    let updatedCampground = await Campground.findByIdAndUpdate(req.params.camp_id, data);
    res.redirect(`/campgrounds/${req.params.camp_id}`)
  } catch (error) {
    req.flash('error', 'No campgrounds found');
    res.redirect('/');
  }
});

//DESTROY - DELETE campgorund
router.delete('/:camp_id', middleware.checkCamgroundOwnership, async (req, res) => {
  try {
    await Campground.findByIdAndRemove(req.params.camp_id);
  res.redirect('/campgrounds');
  } catch (error) {
    req.flash('error', 'No campgrounds found');
    res.redirect('/');
  }
  
})
//=================CAMPGROUNDS ROUTES END=============//

module.exports = router;