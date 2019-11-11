const categoryModel = require ('../Models/category');
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
            if (response.length != 0) {
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

        //Cannot Post Empty Category Name
        if (req.body.name == null || req.body.name == "") {
            return form.error (res, 400, "Category Name Cant Be Empty");
        }

        categoryModel.getCategoryByName (req)
        .then(response => {
            if (response.length == 0) {
                categoryModel.postCategory (req)
                .then (response => {
                    categoryModel.getCategoryById (req, response.insertId)
                    .then(response => {
                        form.success (res, 200, response);
                    })
                    .catch(error => {form.error (res, 400, error)})
                })
                .catch (error => {
                    form.error (res, 400, error);
                })
            } else {
                form.error (res, 400, "Category Name Already Exist");
            }
        })
        .catch(error => {
            form.error (res, 400, error);
        })
    },
    //Controller Update Category
    updateCategory: (req, res) => {
        
        const id = req.params.id
        const name = req.body.name

        //Check If Category Empty
        if (req.body.name == null || req.body.name == "") {
            return form.error (res, 400, "Category Name Cant Be Empty");
        }

        categoryModel.getCategoryById (req, id)
        .then(response => {
            if (response.length != 0) {
                categoryModel.getCategoryByName (req)
                .then(response => {
                    if (response.length == 0) {
                        categoryModel.updateCategory (name, id)
                        .then (response => res.json ({
                            status: 200,
                            response:{
                                name,
                                id
                            }
                        }))
                        .catch (error => {
                            form.error (res, 400, error);
                        })
                    } else {
                        form.error (res, 400, "Category Name Is Exist");
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
    },
    //Controller Delete Category
    deleteCategory: (req, res) => {

        const id = req.params.id;

        categoryModel.getCategoryById (req)
        .then(response => {
            if (response.length != 0) {
                categoryModel.checkCategoryId (req)
                .then(response => {
                    if (response.length == 0) {
                        categoryModel.deleteCategory (req)
                        .then (response => res.json({
                            status: 200,
                            id:id
                        }))
                        .catch (error => {
                            form.error (res, 400, error);
                        })
                    } else {
                        form.error (res, 400, "Category ID is being used By one or more product");
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