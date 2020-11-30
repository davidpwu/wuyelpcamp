const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const middleware = require("../middleware");

// Root
router.get("/", function(req, res) {
  res.render("landing");
});

// Auth Register Routes
router.get("/register", function(req, res) {
  res.render("register"); 
});

router.post("/register", function(req, res) {
  const newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      req.flash("error", err.message);
      return res.redirect("/register");
    }
    passport.authenticate("local")(req, res, function() {
      req.flash("success", "Welcome to YelpCamp, " + user.username);
      res.redirect("/campgrounds");
    });
  });
});

// Auth Login Routes
router.get("/login", function(req, res) {
  res.render("login"); 
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}), function(req, res) {});

// Auth Logout Route
router.get("/logout", function(req, res) {
  req.logout();
  req.flash("success", "You have logged out");
  res.redirect("/campgrounds");
});

// Catch-All
router.get("*", function(req, res) {
  res.send("Sorry! This page does not exist! :(");
});

module.exports = router;
