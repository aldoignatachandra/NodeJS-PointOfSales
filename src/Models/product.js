const connection = require ('../Configs/connection');
const { getMaxPage } = require('../Helpers/feature');
const { searchProduct } = require('../Helpers/feature');
const { sortBy } = require('../Helpers/feature');

const model = {
    getProduct: (req, page) => {
        let sql = `SELECT product.id, category.id as category_id ,product.name as product_name, product.description, product.image,category.name as category, product.price, product.added, product.updated, product.quantity FROM tb_product as product, tb_category as category WHERE product.category_id = category.id `;
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
        const id = req.params.id;
        const sql = 'SELECT * FROM tb_product WHERE id=?';

        return new Promise ((resolve, reject) => {
            connection.query (sql, [id],(err, response) => {
                if (!err) {
                    resolve (response)
                } else {
                    reject (err);
                }
            });
        });
    },
    getProductByName: req => {
        const name = req.body.name;
        const sql = 'SELECT name FROM tb_product WHERE name=?';

        return new Promise ((resolve, reject) => {
            connection.query (sql, [name],(err, response) => {
                if (!err) {
                    resolve (response);
                } else {
                    reject (err);
                }
            });
        });
    },
    postProduct: req => {
        const name = req.body.name;
        const description = req.body.description;
        const image = req.body.image;
        const category_id = req.body.category_id;
        const price = req.body.price;
        const quantity = req.body.quantity;

        const sql = 'INSERT INTO tb_product SET name=?, description=?, image=?, category_id=?, price=?, quantity=?';

        return new Promise ((resolve, reject) => {
            connection.query (sql,[name, description, image, category_id, price, quantity],
                (err, response) => {
                if (!err) {
                    resolve (response)
                } else {
                    reject (err);
                }
            })
        });
    },
    checkCategory: req => {
        const sql = 'SELECT id FROM tb_category WHERE tb_category.id = ?';
        const category_id = req.body.category_id;

        return new Promise ((resolve, reject) => {
            connection.query (sql, [category_id],(err, response) => {
                if (!err) {
                    resolve (response)
                } else {
                    reject (err);
                }
            })
        })
    },
    updateProduct: req => {
        const id = req.params.id;
        const name = req.body.name;
        const description = req.body.description;
        const image = req.body.image;
        const category_id = req.body.category_id;
        const price = req.body.price;
        const quantity = req.body.quantity;

        const sql = 'UPDATE tb_product SET name=?, description=?, image=?, category_id=?, price=?, quantity=? WHERE id=?';

        return new Promise ((resolve, reject) => {
            connection.query (sql, [name, description, image, category_id, price, quantity, id],
            (err, response) => {
                if (!err) {
                    resolve (response)
                } else {
                    reject (err);
                }
            })
        })
    },
    deleteProduct: req => {
        const id = req.params.id;
        const sql = 'DELETE FROM tb_product WHERE id=?';

        return new Promise ((resolve, reject) => {
            connection.query (sql, [id], (err, response) => {
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