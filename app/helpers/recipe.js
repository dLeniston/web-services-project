var express     = require("express");
var router      = express.Router();
var Recipe  = require("../models/recipe");
var Comment     = require("../models/comment");

module.exports = (app) => {
  app.use('/', router);
};

//Index - show recipes
router.get('/', (req, res) => {
  Recipe.find().then(function(recipes){
    //show all recipes on the index page
    res.render('index', {
      recipes: recipes
    }).catch(function(err){
      res.send(err);
    });
  });
});

//Get new recipe form
router.get("/new", (req, res) =>{
  res.render("newRecipe");
});

//New recipe post route
router.post('/', (req, res) => {
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

module.exports = router;