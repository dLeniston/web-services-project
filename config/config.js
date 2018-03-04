const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'recipeapi'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/recipeapi-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'recipeapi'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/recipeapi-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'recipeapi'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/recipeapi-production'
  }
};

module.exports = config[env];
