//Feature Pagination
module.exports.pagination = (req) => {
    let item = Number(req.query.item) || 5 //Default by 10; 
    let page = Number(req.query.page) || 1  //Default by 1;
    let offset = item * (page - 1);

    return {item, offset};
};

//Feature Sort
module.exports.sortBy = (req) => {
    const sortBy = req.query.sortBy;
    const orderBy = req.query.orderBy;
    let sql = "";

    if (sortBy == 'name') {
        sql += ' ORDER BY name';
    } else if (sortBy == 'category') {
        sql += ' ORDER BY category_name';
    } else if (sortBy == 'lastUpdated') {
        sql += ' ORDER BY updated';
    } else {
        sql += ' ORDER BY id';
    }

    if (sortBy != null) {
        if (orderBy == 'asc' || orderBy == null) {
            sql += ' ASC';
        } else if ('desc') {
            sql += ' DESC';
        }
    }

    return {sql, sortBy, orderBy};
}