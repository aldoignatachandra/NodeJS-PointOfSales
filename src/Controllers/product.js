const productModel = require ('../Models/product');
const categoryModel = require ('../Models/category');
const form = require('../Helpers/response');
const { pagination } = require('../Helpers/feature');

const controller = {
    //Controller Get All Product
    getProduct: (req, res) => {
        const page = pagination(req);
        productModel.getProduct(req, page)
        .then (response => {
            if (response.length != 0) {
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

        //Chek All Field
        if (req.body.name == null || req.body.name == "") {return form.error (res, 400, "Product Name Cant Be Empty")}
        if (req.body.description == null || req.body.description == "") {return form.error (res, 400, "Description Cant Be Empty")}
        if (req.body.image == null || req.body.image == "") {return form.error (res, 400, "Image Cant Be Empty")}
        if (req.body.price < 0 ) {return form.error (res, 400, "Price Cannot Down Below 0")}
        if (req.body.quantity < 0 ) {return form.error (res, 400, "Quantity Cannot Down Below 0")}

        categoryModel.getCategoryById(req)
        .then (response => {
            if (response.length != 0) {
                productModel.getProductByName(req)
                .then(response =>{
                    if (response.length == 0) {
                        productModel.postProduct (req)
                        .then (response => {
                            productModel.getProductById (req, response.insertId)
                            .then(response => {
                                form.success (res, 200, response);
                            })
                            .catch(error => {form.error (res, 400, error)})
                        })
                        .catch (error => {
                            form.error (res, 400, error);
                        })
                    } else {
                        form.error (res, 400, "Product Name Is Already Exist");
                    }
                })
                .catch(error => {
                    form.error (res, 400, error);
                })
            } else {
                form.error (res, 400, "ID Category Not Found");
            }
        })
        .catch (error => {
            form.error (res, 400, error);
        })
    },
    //Controller Update Product By Id
    updateProduct: (req, res) => {

        //Chek All Field
        if (req.body.name == null || req.body.name == "") {return form.error (res, 400, "Product Name Cant Be Empty")}
        if (req.body.description == null || req.body.description == "") {return form.error (res, 400, "Description Cant Be Empty")}
        if (req.body.image == null || req.body.image == "") {return form.error (res, 400, "Image Cant Be Empty")}
        if (req.body.price < 0 ) {return form.error (res, 400, "Price Cannot Down Below 0")}
        if (req.body.quantity < 0 ) {return form.error (res, 400, "Quantity Cannot Down Below 0")}

        productModel.getProductById (req)
        .then (response => {
            if (response.length != 0) {
                productModel.getProductByName (req)
                .then(response => {
                    if (response.length != 0 && response[0].id != Number(req.params.id)) {
                        form.error (res, 400, "Product Name Already Exist");
                    } else {
                        productModel.checkCategory (req)
                        .then(response => {
                            if (response.length != 0) {
                                productModel.updateProduct (req)
                                .then (response => {
                                    productModel.getProductById (req, response.insertId)
                                    .then(response => {
                                        form.success (res, 200, response);
                                    })
                                    .catch(error => {form.error (res, 400, error)})
                                })
                                .catch (error => {
                                    form.error (res, 400, error);
                                })
                            } else {
                                form.error (res, 400, "Category Id Not Found");
                            }
                        })
                        .catch(error => {
                            form.error (res, 400, error);
                        })
                    }
                })
                .catch(error => {
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
        
        const id = req.params.id;

        productModel.getProductById (req)
        .then (response => {
            if (response.length > 0) {
                productModel.deleteProduct (req)
                .then (response => res.json({
                    status: 200,
                    id:id
                }))
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