# RecipeApp

This API was created as part of a project for a web services module using Node and Express. It includes a simple front-end implemented using EJS and 
Bootstrap with authentification being provided by *PassportJS*. It allows users to post their own recipes and add comments to others,
middleware has been implemented to manage the ownership and permissions allowed to users to edit/delete their own recipes and comments.
The configuration file is not included as part of this repository, an example config file can be found below.
You can visit the hosted app on [Heroku here](https://calm-bayou-87875.herokuapp.com/)


## Routing Table

|**Resource**                     |**Get**  	                        |**Post**   	    |**Put**   	       |**Delete**            |   	
|---	                          |---	                                |---	            |---	           |---	                  |
|/   	                          |Get Index Page(All Recipes)          |N/A   	            |N/A   	           |N/A                   |
|/register   	                  |Get Sign Up Page   	                |Sign Up User   	|N/A   	           |N/A                   |
|/login   	                      |Get Login Page   	                |Log In User   	    |N/A   	           |N/A                   |
|/logout   	                      |Logout User   	                    |N/A   	            |N/A   	           |N/A                   |
|/recipes/new                     |Get New Recipe Page   	            |N/A   	            |N/A   	           |N/A                   |
|/recipes/                        |N/A   	         	                |Create New Recipe  |N/A   	           |N/A                   |
|/recipes/:id/edit   	          |Get Edit Recipe Page                 |N/A   	            |N/A   	           |N/A                   |
|/recipes/:id   	              |Get a Recipe & Associated Comments   |N/A                |Update a Recipe   |Delete a Recipe       |
|/recipes/:id/comments/new   	  |Get New Comment Page   	            |N/A   	            |N/A   	           |N/A   	              |
|/recipes/:id/comments/   	      |N/A   	                            |Create New Comment |N/A   	           |N/A   	              |
|/recipes/:id/comments/:id/edit   |Get Edit Comment Page   	            |N/A   	            |N/A   	           |N/A   	              |
|/recipes/:id/comments/:id/       |N/A   	                            |N/A  	            |Update a Comment  |Delete a Comment   	  |

## Example Config File

If you wish to make use of this application, copy this configuration template and add your own database information. Save as config.js in the config folder found in the root directory.
*Fill in the parts enclosed with <> with your own information and select an option (development, test or production)*.

const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || **<development/test/production>**;

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'recipeapi'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/**<dev database>**'
  },

  test: {
    root: rootPath,
    app: {
      name: 'recipeapi'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/**<test database>**'
  },

  production: {
    root: rootPath,
    app: {
      name: 'recipeapi'
    },
    port: process.env.PORT || 3000,
    db: '**<production database>**'
  }
};

module.exports = config[env];