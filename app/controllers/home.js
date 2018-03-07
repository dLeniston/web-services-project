const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Recipe = mongoose.model('Recipe');
const User = mongoose.model('User');
const passport = require("passport");

module.exports = (app) => {
  app.use('/', router);
};

//--- INDEX ROUTE ---//
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

//--- RECIPE POST ROUTE ---//

//Get new recipe form
router.get("/new", isLoggedIn, (req, res) =>{
  res.render("newRecipe");
});

//New recipe post route
router.post('/recipes/new', isLoggedIn, (req, res) => {
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

//--- RECIPE SHOW ROUTE ---//

router.get("/recipe/:id", (req, res) =>{
  //find one recipe with correct id
  Recipe.findById(req.params.id).then(function(foundRecipe){
    //show the recipe that has been selecteds data on the show recipe view
    res.render("recipe", {recipe: foundRecipe});
  }).catch(function(err){
    res.send(err);
  });
});

//--- RECIPE EDIT ROUTES ---//

//Get edit form
router.get("/recipe/:id/edit", checkRecipeOwnership, (req, res) => {
  Recipe.findById(req.params.id).then(function(foundRecipe){
    //render the edit form with the form filled in with the recipe to be updated current data
    res.render("editRecipe", {recipe: foundRecipe});
  }).catch(function(err){
    res.send(err);
  });
});

//Find and update recipe
router.put("/recipe/:id", checkRecipeOwnership, (req, res) =>{
  //update the recipe
  Recipe.findByIdAndUpdate(req.params.id, req.body.recipe).then(function(updatedRecipe){
    //redirect to the updated recipes show page
    res.redirect("/recipe/" + req.params.id);
  }).catch(function(err){
    res.send(err);
  });
});

//--- RECIPE DELETE ROUTE ---//

router.delete("/recipe/:id", checkRecipeOwnership, (req, res) => {
  //delete recipe
  Recipe.findByIdAndRemove(req.params.id).then(function(){
    //redirect to index page
    res.redirect('/');
  }).catch(function(err){
    res.sendStatus(500, err);
  });
});

//--- LOGIN/LOGOUT/REGISTER ROUTES ---//

//Register form
router.get("/register", (req, res) => {
   res.render("register");
});

//Register logic
router.post("/register", (req, res) => {
  var newUser = new User({username:req.body.username});
  //Take information supplied by user and attempt to register account
  User.register(newUser, req.body.password, (err, user) => {
    if(err){
      //If theres and error, return user to register page and send message (NOTE: DONT FORGET TO HANDLE THIS)
      return res.render("register", {"error": err.message});
    }
      //If successful, authenticate new user using passport and redirect to index page 
      passport.authenticate("local")(req,res,function(){
        res.redirect("/");
      });
  });
});

//Login form
router.get("/login", (req, res) => {
   res.render("login");
});

//Login Logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }), function(req,res){
});

//Logout logic
router.get("/logout", (req, res) =>{
    req.logout();
    res.redirect("/");
});

//--- MIDDLEWARE ---//

//Logged in middleware

function isLoggedIn(req,res,next){
  //If the user is authenticated (i.e. logged on, proceed to "next")
    if(req.isAuthenticated()){
        return next();
    }
    //Otherwise redirect them to login page (NOTE: DISPLAY MESSAGE LETTING USER KNOW WHY THEY WERE REDIRECTED)
    res.redirect("/login");
}

//Check the ownership of a recipe object

function checkRecipeOwnership(req, res, next){
    if(req.isAuthenticated()){
        //Check if the user owns the recipe record
        Recipe.findById(req.params.id, function(err, foundRecipe){
            if(err){
                //res.send(err);
                res.redirect("back");
             }else{
                 //does user own campground?
                 if(foundRecipe.author.id.equals(req.user._id)){
                     next();
                 }else{
                     //res.send("You do not have permission");
                     res.redirect("back");
                 }
            }
        });
    }else{
        //res.send("error", "You need to be Logged In to do that");
        res.redirect("back");
    }
}
