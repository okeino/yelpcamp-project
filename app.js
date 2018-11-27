var bodyParser = require("body-parser"),
    Campground = require("./models/campground"),
    mongoose = require("mongoose"),
    express = require("express"),
    app = express(),
    Comment = require("./models/comment");
    //var seedDB = require("./seeds.js");
    //seedDB();
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost/yelp_camp",{useMongoClient: true})
    
    app.use(bodyParser.urlencoded({extended: true}));
    app.set("view engine", "ejs");
    app.use(express.static(__dirname + "/public"));


app.get("/", function(req, res){
    
    res.render("landing");
});

// INDEX ROUTE display a list of Campgrounds
app.get("/campgrounds", function(req, res){
    // get camp 
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    });
    
})

//CREATE ROUTE add a new campground to DB
app.post("/campgrounds", function(req, res){
    
    // get daat from form and add to array
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var newCampground = {name: name, image:image, description:desc};
   //Create a new campground and save to DB
   Campground.create(newCampground, function(err, newlyCreated){
        
        if(err){
            console.log(err);
        }else{
            // redirect back to camprounds page
           res.redirect("/campgrounds");
        }
       
   });
    
});

//NEW ROUTE display form to make a new campground
app.get("/campgrounds/new",function(req, res) {
    res.render("campgrounds/new");
})

//SHOW ROUTE display info for a single campground
app.get("/campgrounds/:id", function(req, res) {
    //find the campground with provided 
    
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
             // render show template with that campground
             res.render("campgrounds/show", {campground:foundCampground});
        }
    });
});

//======================================
//COMMENT ROUTES NESTED ROUTES
//======================================

app.get("/campgrounds/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground:campground});
        }
        
    });
    
});

app.post("/campgrounds/:id/comments", function(req, res){
    
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            //create new comment
            Comment.create(req.body.comment, function(err, newComment){
                if(err){
                    console.log(err);
                     res.redirect("/campgrounds");
                }else{
                    //connect new comment to campground
                    campground.comments.push(newComment);
                    campground.save();
                    //redirect campground show page
                    res.redirect("/campgrounds/"+campground._id);
                }
            });
            
        }
    });
    
    
    
});

//BELOW HERE IS WHERE WE START OUR SERVER

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server Has Started!");
})