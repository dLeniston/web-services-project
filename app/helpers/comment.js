var express     = require("express");
var router      = express.Router({mergeParams: true});
var Recipe  = require("../models/recipe");
var Comment     = require("../models/comment");
var middleware  = require("../middleware");