<h1 align="center">Point of Sales APP <br>-RESTful API-</h1>

# Overview

## Introduction

Point of Sales APP API is an API that allow the users to read product and category information data from database. Point of Sales APP API also allow users to read, create, update and delete a product and its category information into/from database.

There're some features included in the API which allow users to programmatically sort the product (based on name, category,date updated), add quantity or order a product, search a product by name and fetch a certain number of product from database.

This documentation outlines the Point of Sales APP API functionality.

## Built With
[![Express.js](https://img.shields.io/badge/express-4.17.1-yellow?style=rounded-square)](https://expressjs.com/en/starter/installing.html) [![Node.js](https://img.shields.io/badge/npm-6.9.0-greenstyle?rounded-square)](https://nodejs.org/) [![MySQL](https://img.shields.io/badge/mysql-2.17.1-blue?rounded-square)](https://www.npmjs.com/search?q=mysql) [![MySQL](https://img.shields.io/badge/body--parser-1.19.0-red?rounded-square)](https://www.npmjs.com/package/body-parser)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. <a href="https://expressjs.com/en/starter/installing.html">Express JS </a>
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## Getting Started

![node.js](https://www.javatpoint.com/js/nodejs/images/node-js-tutorial.png)

### Node.js
Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser.

Nodejs allow developers to use javascript to write command line tools and for **server side scripting**. Hence, Nodejs represent what we know about "Javascript Everywhere" Paradigm, which allow us to us javascript on both **client-side** and **server-side**. Nodejs use **V8** Javascript Engine, the same engine for Chrome and Chromium based browser used.

Nodejs was written in 2009 by Ryan Dahl, 13 years after the introduction of first server-side javascript environment which is **Netscape's LiveWire Pro Web**. Dahl write Nodejs based on his critic on the performance limitation of the most popular web server in 2009, Apache HTTP Server.

The initial release of Nodejs in 2009 supported only Linux and Mac OS X. Later in July 2011, the first Nodejs build supporting Windows was released.

![express](https://expressjs.com/images/express-facebook-share.png)

### Express.js
Express.js, or simply Express, is a web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs. It has been called the de facto standard server framework for Node.js.

The philosophy of Expressjs is to provide a small and robust tooling for HTTP servers. Making it a great solution for single page apps, website, hybrids, or public HTTP APIs. 

![restful api](https://s3.amazonaws.com/kinlane-productions/salesforce/salesforce-rest-api.png)

### RESTFul API
A RESTful API is an application program interface (API) that uses HTTP requests to GET, PUT, POST and DELETE data.

A RESTful API -- also referred to as a RESTful web service -- is based on representational state transfer (REST) technology, an architectural style and approach to communications often used in web services development.

Representational State Transfer is a software architectural style that defines a set of constraints to be used for creating Web services. Web services that conform to the REST architectural style, called RESTful Web services, provide interoperability between computer systems on the Internet.

RESTful API design was defined by Dr. Roy Fielding in his 2000 doctorate dissertation. In order to be a true RESTful API, a web service must adhere to the following six REST architectural constraints:

* Use of a uniform interface (UI). Resources should be uniquely identifiable through a single URL, and only by using the underlying methods of the network protocol, such as DELETE, PUT and GET with HTTP, should it be possible to manipulate a resource.
* Client-server based. There should be a clear delineation between the client and server. UI and request-gathering concerns are the client’s domain. Data access, workload management and security are the server’s domain. This loose coupling of the client and server enables each to be developed and enhanced independent of the other.
* Stateless operations. All client-server operations should be stateless, and any state management that is required should take place on the client, not the server.
* RESTful resource caching. All resources should allow caching unless explicitly indicated that caching is not possible.
* Layered system. REST allows for an architecture composed of multiple layers of servers.
* Code on demand. Most of the time a server will send back static representations of resources in the form of XML or JSON. However, when necessary, servers can send executable code to the client.

### HTTP Requests
All API requests are made by sending a secure HTTPS request using one of the following methods, depending on the action being taken:

- `GET` Get a resource or list of resources
- `POST` Create a resource
- `PUT/PATCH` Update a resource
- `DELETE` Delete a resource

### HTTP Response Codes

Each response will be returned with one of the following HTTP status codes:

| Code  | Status               | Description                                                                         |
| :---- | :------------------- | :---------------------------------------------------------------------------------- |
| `200` | `OK`                 | The request was successful                                                          |
| `400` | `Bad Request`        | There was a problem with the request (security, malformed, data validation, etc.)   |
| `401` | `Unauthorized`       | The supplied API credentials are invalid                                            |
| `403` | `Forbidden`          | The credentials provided do not have permission to access the requested resource    |
| `404` | `Not found`          | An attempt was made to access a resource that does not exist in the API             |
| `405` | `Method not allowed` | The resource being accessed doesn't support the method specified (GET, POST, etc.). |
| `500` | `Server Error`       | An error on the server occurred                                                     |

## Installation

## Getting Started
1.  Clone this repository
2.   `npm install`  to install node.js in CMD / Terminal
3.   `npm install express body-parser mysql` to install dependencies
4.   `npm install dotenv`
5.  If you don't understand about .env read [dotenv](https://www.npmjs.com/package/dotenv)
6. Make a new file **.env**
7. Turn on Web Server and MySQL, (Also can be done with third-party tools like XAMPP, WAMP, etc)
8. Setup the database.
9. Open **Postman** desktop application or Chrome web extension (Install **Postman** if you haven't yet)
10. Choose HTTP Method and enter the request URL.(i.e. localhost:3000/product)
11. Check all **Endpoints**

## Setup .env file
Open **.env** file on code editor and copy the code below :

```
SERVER_PORT = 3000

DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASSWORD = ''
DB_NAME = 'db_sales'
```

## Setup Database
You can write this code below on your Terminal with mysql cli or import it to **phpmyadmin**.

Create Database named **db_sales** :

```
CREATE DATABASE db_sales;
```

Create Table named **tb_category** :
```
CREATE TABLE 'tb_category' (
    id INT(55) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```
Create Table named **tb_product** :
```
CREATE TABLE 'tb_product' (
    id INT(55) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    image VARCHAR(255),
    category_id INT(55),
    quantity INT(55),
    added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    price INT(55)
);
```
Create Table named **tb_stock** :
```
CREATE TABLE 'tb_stock' (
    id INT(55) AUTO_INCREMENT PRIMARY KEY,
    product_id INT(55),
    addQuantity INT(55),
    date_added NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```
Create Table named **tb_order** :
```
CREATE TABLE 'tb_order' (
    id INT(55) AUTO_INCREMENT PRIMARY KEY,
    order_list INT(55),
    product_id INT(55),
    quantity INT(55),
    time_addTIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```
Create Trigger **add_Stock**
```
CREATE  TRIGGER  add_Stock
BEFORE  INSERT ON  tb_stock
BEGIN
	IF NOT EXISTS (SELECT * FROM tb_product WHERE id = NEW.product_id) THEN
    	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ID Product Not Found';
    ELSE
    	UPDATE tb_product SET quantity = NEW.addQuantity + quantity WHERE id = NEW.product_id;
    END IF;
END
```
Create Trigger **make_order**
```
CREATE  TRIGGER  check_product_transaction
BEFORE  INSERT ON  tb_order
BEGIN
	IF NOT EXISTS (SELECT * FROM tb_product WHERE id = NEW.product_id) THEN
    	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ID Product Not Found';
    ELSEIF
    	EXISTS (SELECT quantity FROM tb_product WHERE id = NEW.product_id AND (quantity = 0 OR quantity - NEW.quantity < 0)) 
        THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Out Of Stock';
    END IF;
END
```
Create Trigger **reduces_stock**
```
CREATE  TRIGGER  reduces_stock
AFTER INSERT ON  tb_order
    BEGIN
        UPDATE tb_product SET quantity = tb_product.quantity - NEW.quantity
        WHERE id = NEW.product_id;
    END
END
```
### HTTP Requests

All API requests are made by sending a secure HTTPS request using one of the following methods, depending on the action being taken:

-   `GET`  Get a resource or list of resources
-   `POST`  Create a resource
-   `PUT`  Update a resource
-   `DELETE`  Delete a resource

### HTTP Response Codes
| Code  | Status               | Description                                                                         |
| :---- | :------------------- | :---------------------------------------------------------------------------------- |
| `200` | `Succes`                 | The request was successful                                                          |
| `400` | `Error`        | There was a problem with the request    |
## Endpoints
### A. CRUD Category Endpoint
**1. Read All Category**
 -   **Request**  :  **`GET api/category`**
 -   **Response**  :
```
{
    "status": 200,
    "result": [
        {
            "id": 1,
            "name": "food",
            "added": "2019-10-18T14:08:35.000Z",
            "updated": "2019-10-18T14:24:54.000Z"
        },
        {
            "id": 2,
            "name": "drink",
            "added": "2019-10-18T14:08:51.000Z",
            "updated": "2019-10-18T14:08:51.000Z"
        },
        {
            "id": 3,
            "name": "snack",
            "added": "2019-10-18T14:08:55.000Z",
            "updated": "2019-10-18T14:08:55.000Z"
        },
        {
            "id": 4,
            "name": "dessert",
            "added": "2019-10-18T14:25:40.000Z",
            "updated": "2019-10-18T14:26:00.000Z"
        }
    ]
}
```
**2. Read a category**
 -   **Request**  :  **`GET api/category/:id`**
 -   **Response**  :
```
{
	"status": 200,
	"result": [
		{
			"id": 1,
            "name": "food",
            "added": "2019-10-18T14:08:35.000Z",
            "updated": "2019-10-18T14:24:54.000Z"
		}
	]
}
```
**3. Create a category**
 -   **Request**  :  **`POST api/category`**
 -   **Response**  :
```
{
    "status": 200,
    "result": "category successfully insert"
}
```
**4. Update a category** <br> (Need Verification by ID Category)

 -   **Request**  :  **`PUT api/category/:id`**
 -   **Response**  :
```
{
	"status": 200,
	"result": "Category successfully updated"
}
```
**5. Delete a category**
 -   **Request**  :  **`DELETE api/category/:id`**
 -   **Response**  :
```
{
	"status": 200,
	"result": "Category successfully delete"
}
```
### B. CRUD Product Endpoint
**1. Read all product**
 -   **Request**  :  **`GET api/product/`**
 -   **Response**  :
```
{
    "status": 200,
    "result": [
        {
            "id": 1,
            "name": "chimori",
            "description": "amazing yogurt",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR3YFOZibLXyfUDLG8AsKtM3UbePrRdhVePhhSmpCqofMJSD5Pt",
            "category_id": 2,
            "price": 10000,
            "added": "2019-10-18T14:32:31.000Z",
            "updated": "2019-10-18T15:16:17.000Z",
            "quantity": 100
        },
        {
            "id": 2,
            "name": "indomie",
            "description": "full of MSG",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTp7DN9EBsQVMrdAtW2NHkv-kYMvzXHiNhSO6L1YPyQFp9EOeZZ",
            "category_id": 1,
            "price": 1500,
            "added": "2019-10-18T14:33:22.000Z",
            "updated": "2019-10-18T14:33:22.000Z",
            "quantity": 100
        },
        {
            "id": 3,
            "name": "chitatos",
            "description": "same like indomie, full of MSG",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSI3AqLT0erVboizgInKjdvJkFEVHlilcFp7sTDYnQCyFYGBb6p",
            "category_id": 3,
            "price": 5000,
            "added": "2019-10-18T14:36:15.000Z",
            "updated": "2019-10-18T14:37:31.000Z",
            "quantity": 50
        }
    ]
}
```
**2. Read a product**
 -   **Request**  :  **`GET api/product/:id`**
 -   **Response**  :
```
{
    "status": 200,
    "result": [
        {
            "id": 1,
            "name": "chimori",
            "description": "amazing yogurt",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR3YFOZibLXyfUDLG8AsKtM3UbePrRdhVePhhSmpCqofMJSD5Pt",
            "category_id": 2,
            "price": 10000,
            "added": "2019-10-18T14:32:31.000Z",
            "updated": "2019-10-18T15:16:17.000Z",
            "quantity": 100
        }
}
```
**3. Create a product**
 -   **Request**  :  **`POST api/product`**
 -   **Response**  :
```
{
	"status": 200,
	"result": "New Product successfully insert"
}
```
**4. Update product**
 -   **Request**  :  **`PUT api/product/:id`**
 -   **Response**  :
```
{
	"status": 200,
	"result": "Product successfully update"
}
```
**5. Delete product**
 -   **Request**  :  **`DELETE api/product/:id`**
 -   **Response**  :
```
{
	"status": 200,
	"result": "Product successfully delete"
}
```
###  C. Search, Pagination, Sort in Product

 - **Search by name** `` Request : GET /product/?search=nasi ``
 - **Pagination in product** `` Request : GET product/?page=1&content=4 ``
 - **Sort name** `` Request : GET product/?order=name&sort=DESC ``
 - **Sort category** `` Request : GET product/?order=category&sort=ASC``
 - **Sort date update** `` Request : GET product/?order=date_update&sort=DESC ``

### Add / Reduce Product Order Below 0
**1. Add product**
-   **Request**  :  **`POST order/add`**
-   **Response**  :
```
{
	"status": 200,
	"data": "Product success added"
}
```
**2. Reduce product**
-   **Request**  :  **`POST order/reduce`**
-   **Response**  :
```
{
	"status": 200,
	"data": "Product success reduced"
}
```

### Support

For API support, please email aldoignatachandra@gmail.com