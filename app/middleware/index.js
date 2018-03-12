var Recipe = require("../models/recipe");
var Comment = require("../models/comment");

var middlewareObj = {};

//Logged in middleware
middlewareObj.isLoggedIn = (req, res, next) =>{
    //check if user is logged in
    if(req.isAuthenticated()){
        //if they are, continue
        return next();
    }else{
        //otherwise redirect them to the login page
    res.redirect("/login");
    }
};

//Check users ownership of a recipe entry
middlewareObj.checkRecipeOwnership = (req, res, next) =>{
    //check if user is logged in 
    if(req.isAuthenticated()){
        //get the selected recipe
        Recipe.findById(req.params.id).then(function(foundRecipe){
            //check if recipe author id matches current user id
            if(foundRecipe.author.id.equals(req.user._id)){
                //if match, continue
                next();
            }else{
                //otherwise redirect back
                res.redirect("back");
            }
        }).catch(function(err){
            console.log(err);
            res.redirect("back");
        });
    }else{
        res.redirect("back");
    }
};

//Check users ownership of a comment
middlewareObj.checkCommentOwnership = (req, res, next) =>{
    //check if user is logged in
    if(req.isAuthenticated()){
        //get the selected comment
        Comment.findById(req.params.comment_id).then(function(foundComment){
            //check if comment author id matches current users id
            if(foundComment.author.id.equals(req.user._id)){
                //continue if match
                next();
            }else{
                //redirect back if not
                res.redirect("back");
            }
        }).catch(function(err){
            console.log(err);
            res.redirect("back");
        });
    }else{
        res.redirect("back");
    }
};

module.exports = middlewareObj;

