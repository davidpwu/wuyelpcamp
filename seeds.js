var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Park 1",
        image: "https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&h=350",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh tortor id aliquet lectus proin nibh nisl. Scelerisque viverra mauris in aliquam sem fringilla ut morbi. Tincidunt dui ut ornare lectus sit amet est placerat in. In nisl nisi scelerisque eu ultrices. Scelerisque varius morbi enim nunc faucibus. Dapibus ultrices in iaculis nunc sed augue lacus viverra. Suscipit tellus mauris a diam maecenas sed enim. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque. Euismod in pellentesque massa placerat. Massa tincidunt dui ut ornare lectus. Mattis molestie a iaculis at erat pellentesque."
    },
    {
        name: "Park 2",
        image: "https://cdn57.androidauthority.net/wp-content/uploads/2017/10/android-authority-google-pixel-2-official-photos-3.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh tortor id aliquet lectus proin nibh nisl. Scelerisque viverra mauris in aliquam sem fringilla ut morbi. Tincidunt dui ut ornare lectus sit amet est placerat in. In nisl nisi scelerisque eu ultrices. Scelerisque varius morbi enim nunc faucibus. Dapibus ultrices in iaculis nunc sed augue lacus viverra. Suscipit tellus mauris a diam maecenas sed enim. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque. Euismod in pellentesque massa placerat. Massa tincidunt dui ut ornare lectus. Mattis molestie a iaculis at erat pellentesque."
    },
    {
        name: "Park 3",
        image: "https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg?auto=compress&cs=tinysrgb&h=350",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh tortor id aliquet lectus proin nibh nisl. Scelerisque viverra mauris in aliquam sem fringilla ut morbi. Tincidunt dui ut ornare lectus sit amet est placerat in. In nisl nisi scelerisque eu ultrices. Scelerisque varius morbi enim nunc faucibus. Dapibus ultrices in iaculis nunc sed augue lacus viverra. Suscipit tellus mauris a diam maecenas sed enim. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque. Euismod in pellentesque massa placerat. Massa tincidunt dui ut ornare lectus. Mattis molestie a iaculis at erat pellentesque."
    },
    {
        name: "Park 4",
        image: "https://image.freepik.com/free-photo/taking-photos-of-the-lake_1088-88.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh tortor id aliquet lectus proin nibh nisl. Scelerisque viverra mauris in aliquam sem fringilla ut morbi. Tincidunt dui ut ornare lectus sit amet est placerat in. In nisl nisi scelerisque eu ultrices. Scelerisque varius morbi enim nunc faucibus. Dapibus ultrices in iaculis nunc sed augue lacus viverra. Suscipit tellus mauris a diam maecenas sed enim. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque. Euismod in pellentesque massa placerat. Massa tincidunt dui ut ornare lectus. Mattis molestie a iaculis at erat pellentesque."
    }];

function seedDB()
{
    // Remove previous campgrounds
    Campground.remove({}, function(err)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            // Add new campgrounds
            // data.forEach(function(seed)
            //     {
            //         Campground.create(seed, function(err, createdCampground)
            //         {
            //             if(err)
            //             {
            //                 console.log(err);
            //             }
            //             else
            //             {
            //                 Comment.create(
            //                     {
            //                         text: "This place sucks actually.",
            //                         author: "Homer"
            //                     }, function(err, createdComment)
            //                     {
            //                         if(err)
            //                         {
            //                             console.log(err);
            //                         }
            //                         else
            //                         {
            //                             createdCampground.comments.push(createdComment);
            //                             createdCampground.save();
            //                         }
            //                     });
            //             }
            //         });    
            //     });
        }
    });
}

module.exports = seedDB();