const express = require ('express');
const transactionController = require ('../Controllers/transaction');

const Router = express.Router ();

//Request tb_stock
Router.get ('/add', transactionController.getAddStockData);
Router.get ('/add/:id', transactionController.getAddStockDataById);
Router.post ('/add', transactionController.addStock);

//Request tb_order
Router.get ('/order', transactionController.getOrderData);
Router.get ('/order/:id', transactionController.getOrderDataById);
Router.post ('/order', transactionController.addOrder);

module.exports = Router;