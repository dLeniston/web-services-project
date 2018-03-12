var Recipe = require("../models/recipe");
var Comment = require("../models/comment");

var middlewareObj = {};

//Logged in middleware

middlewareObj.isLoggedIn = (req, res, next) =>{
    if(req.isAuthenticated()){
        return next();
    }else{
    res.redirect("/login");
    }
};

middlewareObj.checkRecipeOwnership = (req, res, next) =>{
    if(req.isAuthenticated()){
        Recipe.findById(req.params.id).then(function(foundRecipe){
            if(foundRecipe.author.id.equals(req.user._id)){
                next();
            }else{
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

middlewareObj.checkCommentOwnership = (req, res, next) =>{
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id).then(function(foundComment){
            if(foundComment.author.id.equals(req.user._id)){
                next();
            }else{
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

