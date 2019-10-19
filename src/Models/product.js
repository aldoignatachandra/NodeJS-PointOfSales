const connection = require ('../Configs/connection');
const feature = require ('../Helpers/feature');

const model = {
    getProduct: (req) => {

        let sql = "SELECT * FROM tb_product";
        const page = feature.pagination (req);
        const sorting = feature.sortBy (req);
        const search = req.query.search;

        return new Promise ((resolve, reject) => {

            //Add Search Query
            if (search != null) {
                sql += ' WHERE name LIKE ?';
            } else {
                sql;
            }
            
            //Add SortBy Query
            if ((sorting.sortBy || sorting.orderBy) != null) {
                sql += sorting.sql;
            } 

            //Add Pagination Query
            const paging = `${sql} LIMIT ? OFFSET ?`;

            //Check Using Search Or Not
            if (search == null) {
                connection.query (paging, [page.item, page.offset], (err, response) => {
                    if (!err) {
                        resolve (response)
                    } else {
                        reject (err);
                    }
                })
            } else {
                connection.query (paging, ['%' + search + '%', page.item, page.offset], (err, response) => {
                    if (!err) {
                        resolve (response)
                    } else {
                        reject (err);
                    }
                });
            }
        });
    },
    getProductById: req => {

        const param = req.params;
        const sql = 'SELECT * FROM tb_product WHERE id=?';

        return new Promise ((resolve, reject) => {
            connection.query (sql, [param.id],(err, response) => {
                if (!err) {
                    resolve (response)
                } else {
                    reject (err);
                }
            });
        });
    },
    postProduct: req => {

        const body = req.body;
        const sql = 'INSERT INTO tb_product SET name=?, description=?, image=?, category_id=?, price=?, quantity=?';
        const checkCategory = 'SELECT id FROM tb_category WHERE id=?';

        return new Promise ((resolve, reject) => {
            connection.query (checkCategory, [body.category_id], (err, response) => {
                if (response.length > 0) {
                    connection.query (sql, 
                        [body.name, body.description, body.image, body.category_id, body.price, body.quantity],
                        (err, response) => {
                        if (!err) {
                            resolve (response)
                        } else {
                            reject (err);
                        }
                    });
                } else {
                    reject ('ID Category Not Found');
                }
            })
        });
    },
    updateProduct: req => {

        const param = req.params;
        const body = req.body;
        const checkCategory = 'SELECT id FROM tb_category WHERE id=?';
        const sql = 'UPDATE tb_product SET name=?, description=?, image=?, category_id=?, price=?, quantity=? WHERE id=?';

        return new Promise ((resolve, reject) => {
            connection.query (checkCategory, [body.category_id], (err, response) => {
                if (response.length != 0 && body.price >= 0 && body.quantity >= 0) {
                    connection.query (sql, 
                    [body.name, body.description, body.image, body.category_id, body.price, body.quantity, param.id],
                    (err, response) => {
                        if (!err) {
                            resolve (response)
                        } else {
                            reject (err);
                        }
                    })
                } else {
                    if (body.quantity < 0 || body.price < 0) {
                        reject ("Quantity / Price Cannot Down Below 0");
                    } else {
                        reject ("ID Category Not Found");
                    }
                    console.log (err);
                }
            })
        })
    },
    deleteProduct: req => {

        const param = req.params;
        const sql = 'DELETE FROM tb_product WHERE id=?';

        return new Promise ((resolve, reject) => {
            connection.query (sql, [param.id], (err, response) => {
                    if (!err) {
                        resolve (response);
                    } else {
                        reject (err);
                    }
                }
            );
        });
    }
}

module.exports = model;