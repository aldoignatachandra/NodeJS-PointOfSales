const form = require ('./response');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || "170797";

//User Authoorization
module.exports.userAuth = (req, res, next) => {
    const getToken = req.headers['x-access-token'] || req.headers['authorization']
    console.log (req.headers);
    jwt.verify (getToken, secretKey, (err, decoded) => {
        if (err) {
            form.error (res, 400, err.message);
        } else {
            req.body.user_id = decoded.id;
            next ();
        }
    });
}