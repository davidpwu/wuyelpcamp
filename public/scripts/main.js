$(document).ready(function() 
{
    // Delete Campground Popup
    $(".delete_campground_button").click(function()
    {
        event.preventDefault();
        var linkURL = $(this).attr("action");
        var linkType = $(this).attr("method");
        swal(
            {
                title: "Are you sure?",
                text: "Once deleted, you can't erase the past...",
                icon: "warning",
                buttons: true,
                dangerMode: true
            })
            .then((toDelete) => 
            {
                if(toDelete)
                {
                    $.post(linkURL, {}, function(data, status) {});
                    $.ajax(
                        {
                            url: linkURL, 
                            type: linkType
                        })
                        .done(function(data) 
                        {
                            window.location.href = "/campgrounds";
                        });
                }
            });
    });
    
    // Delete Comment Popup
    $(".delete_comment_button").click(function()
    {
        event.preventDefault();
        var linkURL = $(this).attr("action");
        var linkType = $(this).attr("method");
        console.log(linkURL);
        swal(
            {
                title: "Are you sure?",
                text: "Once deleted, you can't erase the past...",
                icon: "warning",
                buttons: true,
                dangerMode: true
            })
            .then((toDelete) => 
            {
                if(toDelete)
                {
                    $.post(linkURL, {}, function(data, status) {});
                    $.ajax(
                        {
                            url: linkURL, 
                            type: linkType
                        })
                        .done(function(data) 
                        {
                            location.reload();
                        });
                }
            });
    });
    
    // Coming Later Popup
    $(".coming_later_button").click(function()
    {
        swal(
            {
                title: "Coming Later",
                icon: "warning",
                button: "OK"
            });
    });
    
    // Hide broken images
    $("img").on("error", function()
    {
        $(this).hide();
    });
    
    // $(".delete_button").click(function()
    // {
    //     event.preventDefault();
    //     var linkURL = $(this).attr("href");
    //     swal(
    //         {
    //             title: "Are you sure?",
    //             text: "Once deleted, you can't erase the past...",
    //             icon: "warning",
    //             buttons: true,
    //             dangerMode: true
    //         })
    //         .then((toDelete) => 
    //         {
    //             if(toDelete) 
    //             {
    //                 swal("...but you can write the future!",
    //                 {
    //                     icon: "success"
    //                 });
    //                 window.location.href = linkURL;
    //             }
    //         });
    // });
});