var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// Campgrounds INDEX Route
router.get("/", function(req, res)
{
    Campground.find({}, function(err, allCampgrounds)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
    // res.render("campgrounds", {campgrounds: campgrounds});
    //res.send(campgrounds);
});

// Campgrounds NEW Route
router.get("/new", middleware.isLoggedIn, function(req, res)
{
    res.render("campgrounds/new");
});

// Campgrounds CREATE Route
router.post("/", middleware.isLoggedIn, function(req, res)
{
    var newCampground = req.body.campground;
    Campground.create(newCampground, function(err, createdCampground)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            createdCampground.author.id = req.user._id;
            createdCampground.author.username = req.user.username;
            createdCampground.save();
            res.redirect("/campgrounds");
        }
    });
});

// Campgrounds SHOW Route
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground)
    {
        if(err || !foundCampground)
        {
            req.flash("error", "Campground not found");
            res.redirect("/campgrounds");
        }
        else
        {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// Campgrounds EDIT Route
router.get("/:id/edit", middleware.isCampgroundCreator, function(req, res)
{
    Campground.findById(req.params.id, function(err, foundCampground)
    {
        if(err)
        {
            req.flash("error", "Campground not found");
            res.redirect("/campgrounds/" + req.params.id);
        }
        else
        {
            res.render("campgrounds/edit", {campground: foundCampground}); 
        }
    });
});

// Campgrounds UPDATE Route
router.put("/:id", middleware.isCampgroundCreator, function(req, res)
{
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground)
    {
        if(err)
        {
            req.flash("error", "Campground not found or updated");
            res.redirect("/campgrounds");
        }
        else
        {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// Campgrounds DESTROY Route
router.delete("/:id", middleware.isCampgroundCreator, function(req, res)
{
    Campground.findByIdAndRemove(req.params.id, function(err)
    {
        if(err)
        {
            req.flash("error", "Campground not found or removed");
            res.redirect("/campgrounds/" + req.params.id);
        }
        else
        {
            res.redirect("/campgrounds");   
        }
    }); 
});

module.exports = router;