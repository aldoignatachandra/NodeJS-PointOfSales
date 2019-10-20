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
    getCategoryById: req => {
        
        const param = req.params;
        const sql = 'SELECT * FROM tb_category WHERE id=?';
        
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
    postCategory: req => {

        const body = req.body;
        const sql = 'INSERT INTO tb_category SET name=?';

        return new Promise ((resolve, reject) => { 
            connection.query (sql, [body.name], (err, response) => {
                    if (!err) {
                        resolve (response);
                    } else {
                        reject (err);
                    }
                }
            );
        });    
    },
    updateCategory: req => {
        
        const param = req.params;
        const body = req.body;
        const sql = 'UPDATE tb_category SET name=? WHERE id=?';
        
        return new Promise ((resolve, reject) => { 
            connection.query (sql, [body.name,param.id], (err, response) => {
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

        const param = req.params;
        const sql = 'DELETE FROM tb_category WHERE id=?';

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
};

module.exports = model;