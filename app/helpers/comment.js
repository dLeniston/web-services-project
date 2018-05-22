const express     = require("express");
const router      = express.Router({mergeParams: true});
const Recipe  = require("../models/recipe");
const Comment     = require("../models/comment");
const middleware  = require("../middleware");

//Get new comment form
router.get('/new', middleware.isLoggedIn, async function(req, res, next){
    try{
    let recipe = await Recipe.findById(req.params.id);
    res.render('newComment', {recipe: recipe});
    }catch(err){
        return next(err);
    }
});

//Create new comment
router.post('/', middleware.isLoggedIn, async function(req, res, next){
    try{
        let recipe = await Recipe.findById(req.params.id);
        let comment = await Comment.create(req.body.comment);
        comment.author.id = req.user._id;
        comment.author.username = req.user.username;
        await comment.save();
        recipe.comments.push(comment);
        await recipe.save();
        res.redirect('/recipes/' + recipe._id);
    }catch(err){
        return next(err);
    }
});

//Get comment edit form
router.get('/:comment_id/edit', middleware.checkCommentOwnership, async function(req, res, next){
    try{
        let foundComment = await Comment.findById(req.params.comment_id);
        res.render('editComment', {recipe_id: req.params.id, comment: foundComment});
    }catch(err){
        return next(err);
    }
});

//Update a Comment
router.put('/:comment_id', middleware.checkCommentOwnership, async function(req, res, next){
    try{
        let updatedComment = await Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment);
        await updatedComment.save();
        res.redirect('/recipes/' + req.params.id);
    }catch(err){
        return next(err);
    }
});

//Delete a comment
router.delete('/:comment_id', middleware.checkCommentOwnership, async function(req, res, next){
    try{
        let foundRecipe = await Recipe.findById(req.params.id);
        await foundRecipe.comments.pull(req.params.comment_id);
        await foundRecipe.save();
        let foundComment = await Comment.findById(req.params.comment_id);
        await foundComment.remove();
        res.redirect("back");
    }catch(err){
        return next(err);
    }
});

module.exports = router;