var Recipe = require("../models/recipe");
var Comment = require("../models/comment");

var middlewareObj = {};

//Logged in middleware

middlewareObj.isLoggedIn = function(req,res,next){
  //If the user is authenticated (i.e. logged on, proceed to "next")
    if(req.isAuthenticated()){
        return next();
    }
    //Otherwise redirect them to login page (NOTE: DISPLAY MESSAGE LETTING USER KNOW WHY THEY WERE REDIRECTED)
    res.redirect("/login");
};

middlewareObj.checkRecipeOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        //Check if the user owns the recipe record
        Recipe.findById(req.params.id, function(err, foundRecipe){
            if(err){
                //res.send(err);
                res.redirect("back");
             }else{
                 //does user own campground?
                 if(foundRecipe.author.id.equals(req.user._id)){
                     next();
                 }else{
                     //res.send("You do not have permission");
                     res.redirect("back");
                 }
            }
        });
    }else{
        //res.send("error", "You need to be Logged In to do that");
        res.redirect("back");
    }
}

module.exports = middlewareObj;

