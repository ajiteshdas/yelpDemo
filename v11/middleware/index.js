var Campground = require('../models/campground'),
    Comment = require('../models/comment');
// middleware go here

var middlewareObj = {};

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'You need to be logged in to do that');
    res.redirect('/login');
}

middlewareObj.checkCamgroundOwnership = async function (req, res, next) {
    if (req.isAuthenticated()) {
        try {
            let foundCamp = await Campground.findById(req.params.camp_id);
            if (foundCamp.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash('error', 'You do not have permission to do that!')
                res.redirect('back');
            }
        } catch (error) {
            req.flash('error', 'No campgrounds found');
            res.redirect('/');
        }

    } else {
        req.flash('error', 'You need to be logged in to do that')
        res.redirect('/login');
    }
}
middlewareObj.checkCommentOwnership = async function (req, res, next) {
    if (req.isAuthenticated()) {
        let foundComment = await Comment.findById(req.params.comment_id);
        if (foundComment.author.id.equals(req.user._id)) {
            next();
        } else {
            req.flash('error', 'You do not have permission to do that!')
            res.redirect('back');
        }
    } else {
        req.flash('error', 'You need to be logged in to do that')
        res.redirect('/login');
    }
}


module.exports = middlewareObj;