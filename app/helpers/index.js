const express     = require("express");
const router      = express.Router();
const User        = require("../models/user");
const Recipe      = require("../models/recipe");
const passport    = require("passport");

module.exports = (app) => {
  app.use('/', router);
};

//Get index page and populate with recipe objects
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

//Get register (sign up) form
router.get("/register", (req, res) => {
   res.render("register");
});

//Registration logic
router.post("/register", (req, res) => {
  let newUser = new User({username:req.body.username});
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

//Get login form
router.get("/login", (req, res) => {
   res.render("login");
});

//Login logic (using PassportJS)
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

module.exports = router;