const productModel = require ('../Models/product');
const form = require('../Helpers/response');

const controller = {
    //Controller Get All Product
    getProduct: (req, res) => {
        productModel.getProduct(req)
        .then (response => {
            if (response.length > 0) {
                form.success (res, 200, response);
            } else {
                form.error (res, 400, "Cannot Found Product");
            }
        })
        .catch (error => {
            form.error (res, 400, error);
            console.log (error);
        })
    },
    //Controller Get Product By Id
    getProductById: (req, res) => {
        productModel.getProductById(req)
        .then (response => {
            if (response.length > 0) {
                form.success (res, 200, response);
            } else {
                form.error (res, 400, "Product ID Not Found");
            }
        })
        .catch (error => {
            form.error (res, 400, error);
        })
    },
    //Controller Post New Product
    postProduct: (req, res) => {
        productModel.getProductById(req)
        .then (response => {
            if (response.length > 0) {
                productModel.postProduct (req)
                .then (response => {
                    form.success (res, 200, response);
                })
                .catch (error => {
                    form.error (res, 400, error);
                })
            } else {
                form.error (res, 400, "ID Product Not Found");
            }
        })
        .catch (error => {
            form.error (res, 400, error);
        })
    },
    //Controller Update Product By Id
    updateProduct: (req, res) => {
        productModel.getProductById (req)
        .then (response => {
            if (response.length > 0) {
                productModel.updateProduct (req)
                .then (response => {
                    form.success (res, 200, response);
                })
                .catch (error => {
                    form.error (res, 400, error);
                })
            } else {
                form.error (res, 400, "ID Product Not Found");
            }
        })
        .catch (error => {
            form.error (res, 400, error);
        })
    },
    //Controller Delete Product By Id
    deleteProduct: (req, res) => {
        productModel.getProductById (req)
        .then (response => {
            if (response.length > 0) {
                productModel.deleteProduct (req)
                .then (response => {
                    form.success (res, 200, response);
                    console.log (response);
                })
                .catch (error => {
                    form.error (res, 400, error);
                })
            } else {
                form.error (res, 400, "ID Product Not Found");
            }
        })
        .catch (error => {
            form.error (res, 400, error);
        })
    }
}

module.exports = controller;