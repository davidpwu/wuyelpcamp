var express               = require("express"),
    app                   = express(),
    bodyParser            = require("body-parser"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    methodOverride        = require("method-override"),
    flash                 = require("connect-flash"),
    Campground            = require("./models/campground"),
    Comment               = require("./models/comment"),
    User                  = require("./models/user");
// var seedDB                = require("./seeds");
var campgroundRoutes      = require("./routes/campgrounds.js"),
    commentRoutes         = require("./routes/comments.js"),
    indexRoutes           = require("./routes/index.js");

// Some configuration
// seedDB; // Seed the database
var databaseUrl = process.env.DATABASEURL || "mongodb://localhost:27017/yelp_camp";
mongoose.connect(databaseUrl, {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());
app.use(express.static(__dirname + "/public"));
app.use(require("express-session")(
    {
        secret: "I don't even know Rusty!",
        resave: false,
        saveUninitialized: false
    }));

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Extra
app.use(function(req, res, next)
{
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// Require routes
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", indexRoutes);

// Create a sample campground
// Campground.create(
//     {
//         name: "Fujin",
//         image: "https://thumbs-prod.si-cdn.com/xdWc7VsNqkwMJzwIAn0_RB8W0aQ=/800x600/filters:no_upscale()/https://public-media.smithsonianmag.com/filer/20130829084021octopus.jpg"
//     }, 
//     function(err, campground)
//     {
//         if(err)
//         {
//             console.log("There was an error creating your campground");
//             console.log(err);
//         }
//         else
//         {
//             console.log(campground);
//         }
        
//     });

app.listen(process.env.PORT, process.env.IP, function()
{
    console.log("YelpCamp has started!");
});