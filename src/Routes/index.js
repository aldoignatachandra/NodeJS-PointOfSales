const express = require ('express');

const category = require ('./category');
const product = require ('./product');
const transaction = require ('./transaction');
const user = require ('./user');
const Authorization = require ('../Helpers/userAuth');

const Router = express.Router ();

//Message
Router.get('/', (req, res) => {
    res.json ({
        message: "Welcome to Point Of Sales RESTful API using nodeJS, ExpressJS and MySql, You can read the documentation at README.md",
        author: "Aldo Ignata Chandra",
        email: "aldoignatachandra@gmail.com",
        github: "github.com/aldoignatachandra"
    });
})

//Endpoint Router
Router.use ('/category', Authorization.userAuth, category);
Router.use ('/product', Authorization.userAuth, product);
Router.use ('/transaction', Authorization.userAuth, transaction);
Router.use('/user', user);

module.exports = Router;