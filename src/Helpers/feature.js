const connection = require ('../Configs/connection');

//Feature Pagination
module.exports.pagination = (req) => {
    let item = Number(req.query.item) || 10 //Default by 10; 
    let page = Number(req.query.page) || 1  //Default by 1;
    let offset = item * (page - 1);

    return {item, offset, page};
};

//Get Max Page For Pagination
module.exports.getMaxPage = (page, keyword, table) => {
    return new Promise((resolve, reject) => {
        if (keyword != null) table += " WHERE name LIKE ?"
        connection.query (`SELECT COUNT(*) as total FROM ${table}`, ['%' + keyword + '%'], (err, result) => {
            if (!err) {
                const maxPage = Math.ceil(result[0].total / page.item);

                if(maxPage >= page.page){
                    resolve({
                        total: result[0].total,
                        maxPage
                    });
                }else{
                    reject(`Only until page ${maxPage}`);
                }
            }
            else reject(err);
        });
    });
}

//Sort Product By
module.exports.sorting = (req, sql) => {
    let orderBy = req.query.orderBy;
    let sortBy = req.query.sortBy;

    if (orderBy == 'name') {
        sql += `ORDER BY product.name `;
    } else if (orderBy == 'category') {
        sql += `ORDER BY category.name `;
    } else if (orderBy == 'updated') {
        sql += `ORDER BY product.updated `;
    } else {
        sql += `ORDER BY product.id `;
    }

    if (orderBy != null) {
        if (sortBy == 'ASC' || sortBy == null) {
            sql += 'ASC';
        } else if (sortBy == 'DESC') {
            sql += 'DESC';
        }
    }

    return sql
}

//Search Product By
module.exports.searchProduct = (req, sql) => {
    const search = req.query.search;

    if (search != null) {
        sql += ` AND product.name LIKE ? `;
    } else {
        sql
    }

    return {
        sql,
        search
    };
}