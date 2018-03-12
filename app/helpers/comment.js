var express     = require("express");
var router      = express.Router({mergeParams: true});
var Recipe  = require("../models/recipe");
var Comment     = require("../models/comment");
var middleware  = require("../middleware");

//Get new comment form
router.get("/new", middleware.isLoggedIn, (req, res) =>{
  Recipe.findById(req.params.id).then(function(recipe){
    res.render("newComment", {recipe: recipe});
  }).catch(function(err){
    res.sendStatus(500, err);
  });
});

//Create new comment
router.post("/", middleware.isLoggedIn, (req, res) =>{
    Recipe.findById(req.params.id).then(function(recipe){
        Comment.create(req.body.comment).then(function(comment){
         comment.author.id = req.user._id;
         comment.author.username = req.user.username;
         //save comment
         comment.save();
         recipe.comments.push(comment);
         recipe.save();
         console.log(comment);
         res.redirect("/recipes/" + recipe._id);
        }).catch(function(err){
            res.sendStatus(500, err);
        });
    }).catch(function(err){
        console.log(err);
        res.redirect("/");
    });
});

//Get comment edit form
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
  Comment.findById(req.params.comment_id).then(function(foundComment){
    res.render("editComment", {recipe_id: req.params.id, comment: foundComment});
  }).catch(function(err){
    res.sendStatus(500, err);
  });
});

//Update a comment
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment).then(function(updatedComment){
        res.redirect("/recipes/" + req.params.id);
    }).catch(function(err){
        res.sendStatus(500, err);
    });
});

//Delete a comment
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id).then(function(){
        res.redirect("back");
    }).catch(function(err){
        res.sendStatus(500, err);
    });
});

module.exports = router;