var express = require("express"),
  router = express.Router({ mergeParams: true }),
  Campground = require("../models/campground"),
  Comment = require("../models/comment"),
  middleware = require('../middleware');

//Comments New
router.get("/new", middleware.isLoggedIn, async (req, res) => {
  // find campground by id
  try {
    let foundCamp = await Campground.findById(req.params.camp_id);
    res.render("comments/new", { campground: foundCamp });
  } catch (error) {
    req.flash('error', 'No campgrounds found');
    res.redirect('/');
  }
});

//Comments Create
router.post("/", middleware.isLoggedIn, async (req, res) => {
  //lookup campground using ID
  try {
    let campground = await Campground.findById(req.params.camp_id);
    let comment = await Comment.create(req.body);

    //add username and id to comment
    comment.author.id = req.user._id;
    comment.author.username = req.user.username;
    //save comment
    comment.save();
    campground.comments.push(comment);
    campground.save();
    req.flash('success', 'Comment added successfully');
    res.redirect('/campgrounds/' + campground._id);
  } catch (error) {
    req.flash('error', 'No campgrounds found');
    res.redirect('/');
  }
});

//EDIT - show edit form
router.get("/:comment_id/edit", middleware.checkCommentOwnership, async (req, res) => {
  try {
    let foundComment = await Comment.findById(req.params.comment_id);
    //add error and flash message here
    res.render('./comments/edit', { campground_id: req.params.camp_id, comment: foundComment })
  } catch (error) {
    req.flash('error', 'No campgrounds associated with the comment found');
    res.redirect('/');
  }
});

//UPDATE - PUT edit data form
router.put("/:comment_id", middleware.checkCommentOwnership, async (req, res) => {
  try {
    let data = { text: req.body.text };
    let updatedComment = await Comment.findByIdAndUpdate(req.params.comment_id, data);
    req.flash('success', 'Comment edited');
    res.redirect(`/campgrounds/${req.params.camp_id}`)
  } catch (error) {
    req.flash('error', 'No campgrounds associated with the comment found');
    res.redirect('/');
  }

});

//DESTROY - DELETE comment
router.delete('/:comment_id', middleware.checkCommentOwnership, async (req, res) => {
  try {
    await Comment.findByIdAndRemove(req.params.comment_id);
    req.flash('success', 'Comment deleted');
    res.redirect(`/campgrounds/${req.params.camp_id}`);
  } catch (error) {
    req.flash('error', 'No campgrounds associated with the comment found');
    res.redirect('/');
  }

})
//==============COMMENTS ROUTES END================//

module.exports = router;