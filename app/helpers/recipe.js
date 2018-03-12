var express     = require("express");
var router      = express.Router();
var middleware  = require("../middleware");
var Recipe  = require("../models/recipe");
var Comment     = require("../models/comment");

//Get new recipe form
router.get("/new", middleware.isLoggedIn, (req, res) =>{
  res.render("newRecipe");
});

//Create new recipe
router.post('/', middleware.isLoggedIn, (req, res) => {
  //create recipe
  var name = req.body.name;
    var img = req.body.img;
    var ingredients = req.body.ingredients;
    var instructions = req.body.instructions;
    var created = req.body.created;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newRecipe = {name: name, img: img, ingredients: ingredients, instructions: instructions, created: created, author: author};
    //create the new recipe object and add to db
    Recipe.create(newRecipe)
    .then(function(newRecipe){
      //redirect to index
      res.redirect('/');
    }).catch(function(err){
      res.send(err);
    });
});

//Show a the recipe page with selected recipe information
router.get("/:id", (req, res) =>{
  //find one recipe with correct id
  Recipe.findById(req.params.id).populate("comments").exec(function(err, foundRecipe){
    if(err){
      res.setStatus(500, err);
    }else{
    //show the recipe that has been selecteds data on the show recipe view
    res.render("recipe", {recipe: foundRecipe});
    }
  });
});

//Get recipe edit form
router.get("/:id/edit", middleware.checkRecipeOwnership, (req, res) => {
  Recipe.findById(req.params.id).then(function(foundRecipe){
    //render the edit form with the form filled in with the recipe to be updated current data
    res.render("editRecipe", {recipe: foundRecipe});
  }).catch(function(err){
    res.send(err);
  });
});

//Update a recipe

router.put("/:id", middleware.checkRecipeOwnership, (req, res) =>{
  //update the recipe
  Recipe.findByIdAndUpdate(req.params.id, req.body.recipe).then(function(updatedRecipe){
    //redirect to the updated recipes show page
    res.redirect("/recipes/" + req.params.id);
  }).catch(function(err){
    res.sendStatus(500, err);
  });
});

//Delete a selected recipe

router.delete("/:id", middleware.checkRecipeOwnership, (req, res) => {
  //delete recipe
  Recipe.findByIdAndRemove(req.params.id).then(function(){
    //redirect to index page
    res.redirect('/');
  }).catch(function(err){
    res.sendStatus(500, err);
  });
});

module.exports = router;