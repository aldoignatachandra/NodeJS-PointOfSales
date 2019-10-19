const express = require ('express');
const productController = require ('../Controllers/product');

const Router = express.Router ();

//Request tb_product
Router.get ('/', productController.getProduct);
Router.get ('/:id', productController.getProductById);
Router.post ('/', productController.postProduct);
Router.put ('/:id', productController.updateProduct);
Router.delete ('/:id', productController.deleteProduct);

module.exports = Router;