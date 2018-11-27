var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    
    {
        name:"Blu camp",
        image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras congue velit urna, quis sollicitudin velit suscipit quis. Vestibulum cursus felis dapibus, iaculis turpis nec, fringilla massa. Duis nec tristique quam. Donec pharetra condimentum eleifend. Suspendisse efficitur tincidunt porttitor. Proin elementum eros nulla, eget fringilla elit lacinia at. Praesent vitae felis blandit, pellentesque ex et, ultricies est. Maecenas tincidunt ac lorem interdum fermentum. Mauris ultrices eu nisl vel fermentum. Sed pharetra eget turpis sed ultrices. Nunc tristique, mauris ut porta consequat, tellus nunc commodo diam, ut pellentesque ante ipsum vitae ligula. Suspendisse euismod dignissim libero, eu lacinia ex interdum sit amet. Mauris lobortis nec velit in faucibus. Curabitur non velit eget ligula tristique accumsan."
    },
    {
        name: "Love camp",
        image:"https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
        description: "Consectetur adipiscing elit. Cras congue velit urna, quis sollicitudin velit suscipit quis. Vestibulum cursus felis dapibus, iaculis turpis nec, fringilla massa. Duis nec tristique quam. Donec pharetra condimentum eleifend. Suspendisse efficitur tincidunt porttitor. Proin elementum eros nulla, eget fringilla elit lacinia at. Praesent vitae felis blandit, pellentesque ex et, ultricies est. Maecenas tincidunt ac lorem interdum fermentum. Mauris ultrices eu nisl vel fermentum. Sed pharetra eget turpis sed ultrices. Nunc tristique, mauris ut porta consequat, tellus nunc commodo diam, ut pellentesque ante ipsum vitae ligula. Suspendisse euismod dignissim libero, eu lacinia ex interdum sit amet. Mauris lobortis nec velit in faucibus. Curabitur non velit eget ligula tristique accumsan."
    },
        {
          name:"JamRock",
        image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg",
        description: "Dolor sit amet, consectetur adipiscing elit. Cras congue velit urna, quis sollicitudin velit suscipit quis. Vestibulum cursus felis dapibus, iaculis turpis nec, fringilla massa. Duis nec tristique quam. Donec pharetra condimentum eleifend. Suspendisse efficitur tincidunt porttitor. Proin elementum eros nulla, eget fringilla elit lacinia at. Praesent vitae felis blandit, pellentesque ex et, ultricies est. Maecenas tincidunt ac lorem interdum fermentum. Mauris ultrices eu nisl vel fermentum. Sed pharetra eget turpis sed ultrices. Nunc tristique, mauris ut porta consequat, tellus nunc commodo diam, ut pellentesque ante ipsum vitae ligula. Suspendisse euismod dignissim libero, eu lacinia ex interdum sit amet. Mauris lobortis nec velit in faucibus. Curabitur non velit eget ligula tristique accumsan."
    }
    
    ];

function seedDB(){
       //Remove all campgrounds
        Comment.remove();
        Campground.remove({}, function(err){
            if(err)
            {
                console.log(err);
            }
            console.log("removed campground!");
            
                //add a few camps
                data.forEach(function(seed){
                    Campground.create(seed, function(err, campground){
                        if(err){
                            console.log(err);
                        }else{
                            console.log("added a campground");
                            //create a comment
                            Comment.create(
                                {
                                    text: "This place needs internet like NOW",
                                    author: "Grace"
                                }, function(err, comment){
                                    if(err){
                                        console.log(err);
                                    }else{
                                        campground.comments.push(comment);
                                        campground.save();
                                        console.log("Created new comment");
                                    }
                                }
                                );
                        }
                    });
                });
            
        });
        
        //add a few comments
}

module.exports = seedDB;