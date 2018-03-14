const express = require('express');
var router      = express.Router();
var indexRoutes = require("../helpers/index");
var recipeRoutes    = require("../helpers/recipe");
var commentRoutes       = require("../helpers/comment");
module.exports = (app) => {
  //app.use('/recipes', router);
  app.use(indexRoutes);
  app.use("/recipes", recipeRoutes);
  app.use("/recipes/:id/comments", commentRoutes);
};