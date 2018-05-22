const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
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
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model('Recipe', recipeSchema);