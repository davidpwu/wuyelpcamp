require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const app = express();

// Models
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const User = require("./models/user");

// Routes
const campgroundRoutes = require("./routes/campgrounds.js");
const commentRoutes = require("./routes/comments.js");
const indexRoutes = require("./routes/index.js");

// Database configuration
// const seedDB = require("./seeds");
// seedDB; // Seed the database
const databaseUrl = process.env.DATABASEURL;
mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

// Middleware configuration
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());
app.use(express.static(__dirname + "/public"));
app.use(require("express-session")({
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
app.use((req, res, next) => {
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
// Campground.create({
//   name: "Fujin",
//   image: "https://thumbs-prod.si-cdn.com/xdWc7VsNqkwMJzwIAn0_RB8W0aQ=/800x600/filters:no_upscale()/https://public-media.smithsonianmag.com/filer/20130829084021octopus.jpg"
// },
// (err, campground) => {
//   if(err) {
//     console.log("There was an error creating your campground");
//     console.log(err);
//   } else {
//     console.log(campground);
//   }
// });

app.listen(process.env.PORT, () => console.log(`YelpCamp has started on port ${process.env.PORT}`));
