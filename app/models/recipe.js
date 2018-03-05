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

module.exports = mongoose.model('Recipe', recipeSchema);