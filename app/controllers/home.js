const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Recipe = mongoose.model('Recipe');

module.exports = (app) => {
  app.use('/', router);
};

//--- INDEX ROUTE ---//
router.get('/', (req, res) => {
  Recipe.find().then(function(recipes){
    res.render('index', {
      recipes: recipes
    }).catch(function(err){
      res.send(err);
    });
  });
});

//--- RECIPE POST ROUTE ---//

//Get new recipe form
router.get("/new", (req, res) =>{
  res.render("newRecipe");
});

//New recipe post route
router.post('/recipes/new', (req, res) => {
  //create recipe
  var name = req.body.name;
    var img = req.body.img;
    var ingredients = req.body.ingredients;
    var instructions = req.body.instructions;
    var created = req.body.created;
    var newRecipe = {name: name, img: img, ingredients: ingredients, instructions: instructions, created: created};
    Recipe.create(newRecipe)
    .then(function(newRecipe){
      res.redirect('/');
    }).catch(function(err){
      res.send(err);
    });
});

//--- RECIPE SHOW ROUTE ---//

router.get("/recipe/:id", (req, res) =>{
  //find one recipe with correct id
  Recipe.findById(req.params.id).then(function(foundRecipe){
    res.render("recipe", {recipe: foundRecipe});
  }).catch(function(err){
    res.send(err);
  });
});

//--- RECIPE EDIT ROUTES ---//

//Get edit form
router.get("/recipe/:id/edit", (req, res) => {
  Recipe.findById(req.params.id).then(function(foundRecipe){
    res.render("editRecipe", {recipe: foundRecipe});
  }).catch(function(err){
    res.send(err);
  });
});

//Find and update recipe
router.put("/recipe/:id", (req, res) =>{
  Recipe.findByIdAndUpdate(req.params.id, req.body.recipe).then(function(updatedRecipe){
    res.redirect("/recipe/" + req.params.id);
  }).catch(function(err){
    res.send(err);
  });
});

//--- RECIPE DELETE ROUTE ---//

router.delete("/recipe/:id", (req, res) => {
  Recipe.findByIdAndRemove(req.params.id).then(function(){
    res.redirect('/');
  }).catch(function(err){
    res.sendStatus(500, err);
  });
});

