const express = require ('express');
const category = require ('./category');
const product = require ('./product');
const transaction = require ('./transaction');

const Router = express.Router ();

//Endpoint Router
Router.use ('/category', category);
Router.use ('/product', product);
Router.use ('/transaction', transaction);

module.exports = Router;