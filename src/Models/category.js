const connection = require ('../Configs/connection');
const { getMaxPage } = require('../Helpers/feature');

const model = {
    getCategory: (req, page) => {
        const sql = 'SELECT * FROM tb_category';
        const paging = `${sql} LIMIT ? OFFSET ?`;

        return new Promise ((resolve, reject) => {
            getMaxPage (page, null, "tb_category")
            .then (maxPage => {
                const infoPage = {
                    currentPage: page.page,
                    totalAllCategories: maxPage.total,
                    maxPage: maxPage.maxPage
                };
                connection.query (paging, [page.item, page.offset], (err, response) => {
                    if (!err) {
                        resolve ({infoPage, response});
                    } else {
                        reject (err);
                    }
                });
            })
            .catch (error => {
                reject(error);
            })
        });
    },
    getCategoryById: (req, id) => {
        const category_id = req.params.id || req.body.category_id || id;
        const sql = 'SELECT * FROM tb_category WHERE id=?';
        
        return new Promise ((resolve, reject) => {  
            connection.query (sql, [category_id],(err, response) => {
                if (!err) {
                    resolve (response);
                } else {
                    reject (err);
                }
            });
        });
    },
    getCategoryByName: req => {   
        const name = req.body.name;
        const sql = 'SELECT name FROM tb_category WHERE name=?';

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
    checkCategoryId: req => {
        const id = req.body.id || req.params.id;
        const sql = 'SELECT category_id FROM tb_product WHERE tb_product.category_id = ?';

        return new Promise ((resolve, reject) => {
            connection.query (sql, [id],(err, response) => {
                if (!err) {
                    resolve (response);
                } else {
                    reject (err);
                }
            });
        });
    },
    postCategory: req => {
        const name = req.body.name;
        const sql = 'INSERT INTO tb_category SET name=?';

        return new Promise ((resolve, reject) => { 
            connection.query (sql, [name], (err, response) => {
                    if (!err) {
                        resolve (response);
                    } else {
                        reject (err);
                    }
                }
            );
        });    
    },
    updateCategory: (name, id) => {

        const sql = 'UPDATE tb_category SET name=? WHERE id=?';
        
        return new Promise ((resolve, reject) => { 
            connection.query (sql, [name, id], (err, response) => {
                    if (!err) {
                        resolve (response);
                    } else {
                        reject (err);
                    }
                }
            );
        });
    },
    deleteCategory: req => {
        const id = req.params.id;
        const sql = 'DELETE FROM tb_category WHERE id=?';

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
};

module.exports = model;