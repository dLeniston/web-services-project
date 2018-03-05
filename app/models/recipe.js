var mongoose = require('mongoose');

var recipeSchema = new mongoose.Schema({
    name: {
        type: String
    },
    img: {
        type: String
    },
    ingredients: {
        type: String
    },
    instructions: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

var Recipe = mongoose.model('Recipe', recipeSchema);