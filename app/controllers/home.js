const express = require('express');
const router      = express.Router();
const mongoose = require('mongoose');
const Recipe = mongoose.model('Recipe');
const Comment = mongoose.model('Comment');
const User = mongoose.model('User');
const passport = require("passport");

var indexRoutes = require("../helpers/index");
var recipeRoutes    = require("../helpers/recipe");
var commentRoutes       = require("../helpers/comment");
module.exports = (app) => {
  //app.use('/', router);
  app.use(indexRoutes);
  app.use("/recipes", recipeRoutes);
  app.use("/recipes/:id/comments", commentRoutes);
};