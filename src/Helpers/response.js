const response = {
    success: (res, status, result) => {
        let form = {
            status,
            result
        };
        res.json (form);
    },
    error: (res, status, error) => {
        let form = {
            status,
            error
        };
        res.json (form);
    }
};

module.exports = response;