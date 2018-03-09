const express = require('express');

var indexRoutes = require("../helpers/index");
var recipeRoutes    = require("../helpers/recipe");
var commentRoutes       = require("../helpers/comment");
module.exports = (app) => {
  //app.use('/', router);
  app.use(indexRoutes);
  app.use("/recipes", recipeRoutes);
  app.use("/recipes/:id/comments", commentRoutes);
};