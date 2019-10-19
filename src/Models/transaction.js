const connection = require ('../Configs/connection');

const model = {
    //Add Quantity By ID
    //Can Multiple Add
    addStock: (req) => {

        const body = req.body;
        const sql = 'INSERT INTO tb_stock (product_id, addQuantity) VALUES ?';
        let value = [body.detailAddStock.map (item => [item.product_id, item.addQuantity])];

        return new Promise ((resolve, reject) => {
            connection.query (sql, value, (err, response) => {
                if (!err) {
                    resolve (response);
                } else {
                    reject (err);
                }   
            })
        })
    },
    //Get All Add Stock Data
    getAddStockData: () => {

        const sql = 'SELECT * FROM tb_stock';

        return new Promise ((resolve, reject) => {
            connection.query (sql, (err, response) => {
                if (!err) {
                    resolve (response);
                } else {
                    reject (err);
                }
            });
        });
    },
    //Get Add Stock Data By Id
    getAddStockDataById: (req) => {

        const param = req.params;
        const sql = 'SELECT * FROM tb_stock WHERE id=?';

        return new Promise ((resolve, reject) => {  
            connection.query (sql, [param.id],(err, response) => {
                if (!err) {
                    resolve (response);
                } else {
                    reject (err);
                }
            });
        });
    },
    //Get All Order Data
    getOrderData: () => {

        const sql = 'SELECT * FROM tb_order';

        return new Promise ((resolve, reject) => {
            connection.query (sql, (err, response) => {
                if (!err) {
                    resolve (response);
                } else {
                    reject (err);
                }
            });
        });
    },
    //Get Order Data By Id
    getOrderDataById: (req) => {

        const param = req.params;
        const sql = 'SELECT * FROM tb_order WHERE id=?';

        return new Promise ((resolve, reject) => {  
            connection.query (sql, [param.id],(err, response) => {
                if (!err) {
                    resolve (response);
                } else {
                    reject (err);
                }
            });
        });
    },
    getOrderList: (req) => {

        const body = req.body;
        const checkOrderList = 'SELECT * FROM tb_order WHERE order_list=?';
        const value = [body.order_list];

        return new Promise ((resolve, reject) => {
            connection.query (checkOrderList, value, (err, response) => {
                if (!err) {
                    resolve (response);
                } else {
                    reject (err);
                }   
            })
        })
    },
    //Add Quantity By ID
    //Can Multiple Add
    addOrder: (req) => {

        const body = req.body;
        const sql = 'INSERT INTO tb_order (order_list, product_id, quantity, price) VALUES ?';
        let value = [body.detailOrder.map (item => [body.order_list, item.product_id, item.quantity, item.price])];

        return new Promise ((resolve, reject) => {
            connection.query (sql, value, (err, response) => {
                if (!err) {
                    resolve (response);
                } else {
                    reject (err);
                }
            })
        })
    }
}

module.exports = model;