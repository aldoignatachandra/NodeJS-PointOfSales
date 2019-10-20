const connection = require ('../Configs/connection');
const feature = require ('../Helpers/feature');
const { getMaxPage } = require('../Helpers/feature');
const { searchProduct } = require('../Helpers/feature');
const { sortBy } = require('../Helpers/feature');

const model = {
    getProduct: (req, page) => {

        let sql = `SELECT product.id, product.name as product_name, product.description, product.image,
                   category.name as category, product.price, product.added, product.updated, product.quantity 
                   FROM tb_product as product, tb_category as category WHERE product.category_id = category.id `;

        const query = searchProduct(req, sql);
        sql = sortBy(req, query.sql);
        const paging = `${sql} LIMIT ? OFFSET ?`;

        return new Promise ((resolve, reject) => {
            getMaxPage(page, query.search, "tb_product")
            .then (maxPage => {
                const infoPage = {
                    currentPage: page.page,
                    totalAllProduct: maxPage.total,
                    maxPage: maxPage.maxPage
                };
    
                connection.query(paging,
                    query.search == null ? [page.item, page.offset] : ['%' + query.search + '%', page.item, page.offset],
                    (err, response) => {
                        if (!err) {
                            resolve ({
                                infoPage,
                                response
                            });
                        }
                        else {
                            reject (err);
                        }
                    }
                );
            }).catch(err => {
                reject(err)
            });
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