const express     = require("express");
const router      = express.Router();
const middleware  = require("../middleware");
const Recipe  = require("../models/recipe");
const Comment     = require("../models/comment");

//Get new recipe form
router.get("/new", middleware.isLoggedIn, (req, res) =>{
  res.render("newRecipe");
});

//Create new recipe
router.post('/', middleware.isLoggedIn, async function(req, res, next){
    try{
      let recipe = await Recipe.create({
        name: req.body.name,
        img: req.body.img,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        created: req.body.created,
        author: {
          id: req.user._id,
          username: req.user.username
        }
      });
      await recipe.save();
      res.redirect('/');
    }catch(err){
      return next(err);
    }
});

//Show a the recipe page with selected recipe information
router.get('/:id', async function(req, res, next){
  try{
    let foundRecipe = await Recipe.findById(req.params.id).populate("comments");
    res.render('recipe', {recipe: foundRecipe});
  }catch(err){
    return next(err);
  }
});

//Get recipe edit form
router.get('/:id/edit', middleware.checkRecipeOwnership, async function(req, res, next){
  try{
    let foundRecipe = await Recipe.findById(req.params.id);
    await res.render('editRecipe', {recipe: foundRecipe});
  }catch(err){
    return next(err);
  }
});

//Update a recipe
router.put('/:id', middleware.checkRecipeOwnership, async function(req, res, next){
  try{
      let updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body.recipe);
      await updatedRecipe.save();
      res.redirect('/recipes/' + req.params.id);
  }catch(err){
    return next(err);
  }
});

//Delete a selected recipe
router.delete('/:id', middleware.checkRecipeOwnership, async function(req, res, next){
  try{
      let foundRecipe = await Recipe.findById(req.params.id);
      await foundRecipe.remove();
      res.redirect('/');
  }catch(err){
    return next(err);
  }
});

module.exports = router;