const express = require ('express');
const categoryController = require ('../Controllers/category');

const Router = express.Router ();

//Request tb_category
Router.get ('/', categoryController.getCategory);
Router.get ('/:id', categoryController.getCategoryById);
Router.post ('/', categoryController.postCategory);
Router.put ('/:id', categoryController.updateCategory);
Router.delete ('/:id', categoryController.deleteCategory);

module.exports = Router;