const transactionModel = require ('../Models/transaction');
const form = require('../Helpers/response');

//Recursive Function
const addOrder = (req, res) => {
    transactionModel.getOrderList (req)
    .then(response => {
        if (response.length == 0) {
            transactionModel.addOrder (req)
            .then(response => {
                form.success (res, 200, response);
                console.log (response);
            })
            .catch(error => {
                form.error (res, 400, error);
            })
        } else {
            req.body.order_list++;
            console.log (this);
            addOrder (req, res);
        }
    })
}

const controller = {
    //Controller Get All Stock Data
    getAddStockData: (req, res) => {
        transactionModel.getAddStockData ()
        .then (response => {
            if (response.length > 0) {
                form.success (res, 200, response);
            } else {
                form.error (res, 400, "Table Stock Is Empty");
            }
        })
        .catch (error => {
            form.error (res, 400, error);
        })
    },
    //Controller Get Stock Data By Id
    getAddStockDataById: (req, res) => {
        transactionModel.getAddStockDataById (req)
        .then (response => {
            if (response.length > 0) {
                form.success (res, 200, response);
            } else {
                form.error (res, 400, "ID Stock Not Found");
            }
        })
        .catch (error => {
            form.error (res, 400, error);
        })
    },
    //Controller Add Stock
    addStock: (req, res) => {
        transactionModel.addStock (req)
        .then (response => {
            form.success (res, 200, response);
        })
        .catch (error => {
            form.error (res, 400, error);
            console.log (400);
        })
    },
    //Controller Get All Order Data
    getOrderData: (req, res) => {
        transactionModel.getOrderData ()
        .then (response => {
            if (response.length > 0) {
                form.success (res, 200, response);
            } else {
                form.error (res, 400, "Table Order Is Empty");
            }
        })
        .catch (error => {
            form.error (res, 400, error);
        })
    },
    //Controller Get Order Data By Id
    getOrderDataById: (req, res) => {
        transactionModel.getOrderDataById (req)
        .then (response => {
            if (response.length > 0) {
                form.success (res, 200, response);
            } else {
                form.error (res, 400, "ID Order Not Found");
            }
        })
        .catch (error => {
            form.error (res, 400, error);
        })
    },
    //Controller Order Product
    addOrder
}

module.exports = controller;