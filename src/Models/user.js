const bcrypt = require('bcrypt');
const connection = require ('../Configs/connection');
const salt = bcrypt.genSaltSync (10);

const model = {
    registerUser: (req) => {

        const body = req.body
        const pass = bcrypt.hashSync (body.password, salt);
        const sql = `INSERT INTO tb_user SET username = ?, password = ?, role = ?`;
        const value = [body.username, pass, body.role];

        return new Promise((resolve, reject) => {

            connection.query(sql, value, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(err);
                }
            });
        });
    },
    loginUser: (req) => {

        const sql = `SELECT * FROM tb_user WHERE username = ?`;
        const value = [req.body.username];

        return new Promise((resolve, reject) => {
            connection.query(sql, value, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(err);
                }  
            });
        });
    }  
};

module.exports = model;