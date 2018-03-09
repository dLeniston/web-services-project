var express     = require("express");
var router      = express.Router({mergeParams: true});
var Recipe  = require("../models/recipe");
var Comment     = require("../models/comment");
var middleware  = require("../middleware");

router.get("/new", middleware.isLoggedIn, (req, res) =>{
  Recipe.findById(req.params.id).then(function(recipe){
    res.render("newComment", {recipe: recipe});
  }).catch(function(err){
    res.sendStatus(500, err);
  });
});

//Comments Create
router.post("/", middleware.isLoggedIn, function(req, res){
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
                    res.redirect("/recipes/" + recipe._id);
                }
            });
        }
    });
});

//EDIT ROUTE
router.get("/:comment_id/edit", (req, res) => {
  Comment.findById(req.params.comment_id).then(function(foundComment){
    res.render("editComment", {recipe_id: req.params.id, comment: foundComment});
  }).catch(function(err){
    res.sendStatus(500, err);
  });
});

//UPDATE ROUTE
router.put("/:comment_id", (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment).then(function(updatedComment){
        res.redirect("/recipes/" + req.params.id);
    }).catch(function(err){
        res.sendStatus(500, err);
    });
});

module.exports = router;