const categoryModel = require ('../Models/category');
const productModel = require ('../Models/product');
const form = require('../Helpers/response');
const { pagination } = require('../Helpers/feature');

const controller = {
    //Controller Get All Category
    getCategory: (req, res) => {
        const page = pagination(req);
        categoryModel.getCategory (req, page)
        .then (response => {
            if (response.length != 0) {
                form.success (res, 200, response);
            } else {
                form.error (res, 400, "Table Category Is Empty");
            }
        })
        .catch (error => {
            form.error (res, 400, error);
        })
    },
    //Controller Get Category By Id
    getCategoryById: (req, res) => {
        categoryModel.getCategoryById (req)
        .then (response => {
            if (response.length > 0) {
                form.success (res, 200, response);
            } else {
                form.error (res, 400, "Category ID Not Found");
            }
        })
        .catch (error => {
            form.error (res, 400, error);
        })
    },
    //Controller Post Category
    postCategory: (req, res) => {
        categoryModel.postCategory (req)
        .then (response => {
            form.success (res, 200, response);
        })
        .catch (error => {
            form.error (res, 400, error);
        })
    },
    //Controller Update Category
    updateCategory: (req, res) => {
        categoryModel.getCategoryById (req)
        .then(response => {
            if (response.length > 0) {
                categoryModel.updateCategory (req)
                .then (response => {
                    form.success (res, 200, response);
                })
                .catch (error => {
                    form.error (res, 400, error);
                })
            } else {
                form.error (res, 400, "Category ID Not Found");
            }
        }).catch(error => {
            form.error (res, 400, error);
        })
    },
    //Controller Delete Category
    deleteCategory: (req, res) => {
        categoryModel.getCategoryById (req)
        .then(response => {
            if (response.length > 0) {
                productModel.getProductById (req)
                .then(response => {
                    if (response.length == 0) {
                        categoryModel.deleteCategory (req)
                        .then (response => {
                            form.success (res, 200, response);
                        })
                        .catch (error => {
                            form.error (res, 400, error);
                        })
                    } else {
                        form.error (res, 400, "Category ID is being used in the product table");
                    }
                })
                .catch(error => {
                    form.error (res, 400, error);
                })
            } else {
                form.error (res, 400, "Category ID Not Found");
            }
        }).catch(error => {
            form.error (res, 400, error);
        })
    }
}

module.exports = controller;