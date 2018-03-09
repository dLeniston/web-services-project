const express = require('express');
const router      = express.Router();
const mongoose = require('mongoose');
const Recipe = mongoose.model('Recipe');
const Comment = mongoose.model('Comment');
const User = mongoose.model('User');
const passport = require("passport");

var indexRoutes = require("../helpers/index");
var recipeRoutes    = require("../helpers/recipe");
var commentRoutes       = require("../helpers/comment");
module.exports = (app) => {
  //app.use('/', router);
  app.use(indexRoutes);
  app.use("/recipes", recipeRoutes);
  app.use("/recipes/:id/comments", commentRoutes);
};

//--- COMMENTS ROUTES ---//

/*router.get("/recipe/:id/comments/new", isLoggedIn, (req, res) =>{
  Recipe.findById(req.params.id).then(function(recipe){
    res.render("newComment", {recipe: recipe});
  }).catch(function(err){
    res.sendStatus(500, err);
  });
});

//Comments Create
router.post("/recipe/:id/comments", isLoggedIn, function(req, res){
    Recipe.findById(req.params.id, function(err, recipe){
        if(err){
            console.log(err);
            res.redirect("/");
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    res.sendStatus(500, err);
                    console.log(err);
                }else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    recipe.comments.push(comment);
                    recipe.save();
                    console.log(comment);
                    res.redirect("/recipe/" + recipe._id);
                }
            });
        }
    });
});

//EDIT ROUTE

router.get("/recipe/:recipe_id/comments/:comment_id/edit", (req, res) => {
  Comment.findById(req.params.comment_id).then(function(foundComment){
    res.render("editComment", {recipe_id: req.params.id, comment: foundComment});
  }).catch(function(err){
    res.sendStatus(500, err);
  });
});*/