const express = require('express');
const router  = express.Router();
const indexRoutes = require("../helpers/index");
const recipeRoutes    = require("../helpers/recipe");
const commentRoutes       = require("../helpers/comment");
module.exports = (app) => {
  app.use(indexRoutes);
  app.use("/recipes", recipeRoutes);
  app.use("/recipes/:id/comments", commentRoutes);
};