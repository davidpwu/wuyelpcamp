const express = require("express");
const router = express.Router({mergeParams: true});
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middleware = require("../middleware");

// Comments NEW Route
router.get("/new", middleware.isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err || !foundCampground) {
      req.flash("error", "Campground not found.");
      res.redirect("/campgrounds");
    } else {
      res.render("comments/new", {campground: foundCampground}); 
    }
  });
});

// Comments CREATE Route
router.post("/", middleware.isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err || !foundCampground) {
      req.flash("error", "Campground not found");
      res.redirect("/campgrounds");
    } else {
      const newComment = req.body.comment;
      Comment.create(newComment, function(err, createdComment)
      {
        if (err) {
          console.log(err);
        } else {
          createdComment.author.id = req.user._id;
          createdComment.author.username = req.user.username;
          createdComment.save();
          foundCampground.comments.push(createdComment);
          foundCampground.save();
          res.redirect("/campgrounds/" + req.params.id);
        }
      });
    }
  });
});

// Comments EDIT Route
router.get("/:comment_id/edit", middleware.isCommentCreator, function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err || !foundCampground) {
      req.flash("error", "Campground not found");
      res.redirect("/campgrounds");
    } else {
      Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err || !foundComment) {
          req.flash("error", "Comment not found");
          res.redirect("/campgrounds/" + req.params.id);
        } else {
          res.render("comments/edit", {
            comment: foundComment,
            campground: foundCampground
          });
        }
      });
    }
  });
});

// Comments UPDATE Route
router.put("/:comment_id", middleware.isCommentCreator, function(req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
    if (err) {
      res.redirect("/campgrounds/" + req.params.id);
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// Comments DESTROY Route
router.delete("/:comment_id", middleware.isCommentCreator, function(req, res) {
  Comment.findByIdAndRemove(req.params.comment_id, function(err) {
    if (err) {
      req.flash("error", "Could not delete comment");
      res.redirect("/campgrounds/" + req.params.id);
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

module.exports = router;
