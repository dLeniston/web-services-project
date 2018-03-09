var express     = require("express");
var router      = express.Router();
var User        = require("../models/user");
var Recipe      = require("../models/recipe");
var passport    = require("passport");

module.exports = (app) => {
  app.use('/', router);
};

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

module.exports = router;