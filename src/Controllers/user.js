const modelUser = require('../Models/user');
const form = require('../Helpers/response');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 170797;

//Check Regex For User Name
const isUsernameValid = username => {
    const checkRegex = /[_]*(?!.*\W).{5,12}/;
    return username.match(checkRegex) == null ? false : true;
};

//Check Regex For Password
const isPasswordValid = password => {
    const checkRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,12}/;
    return password.match(checkRegex) == null ? false : true;
};

const controller = {
    registerUser: (req, res) => {

        //Allowed Username
        if (req.body.username == "" || req.body.username == null) {
            return form.error (res, 400, "Username Cannot Be empty");
        } else if (!isUsernameValid (req.body.username)) {
            return form.error (res, 400, "Username must 5 - 12 character and not contains special character");
        }

        //Allowed Password
        if (req.body.password == "" || req.body.password == null) {
            return form.error (res, 400, "Password can't be empty");
        } else if (!isPasswordValid (req.body.password)){
            return form.error (res, 400, "Password must 5 - 12 character and contains at least one number, uppercase and lowercase");
        }

        //Allowed Role
        if (req.body.role == "" || req.body.role == null) {
            return form.error (res, 400, "User role can't be empty");
        }

        modelUser.registerUser(req)
        .then (response => {
            form.success (res, 200, "User created successfully");
        })
        .catch (error => {
            form.error (res, 400, error);
        })
    },
    loginUser: (req, res) => {

        if (req.body.username == null) return form.error(res, 400, "Username can't be empty");
        if (req.body.password == null) return form.error(res, 400, "Password can't be empty");

        modelUser.loginUser (req)
        .then (response => {
            if (response.length > 0) {
                if (bcrypt.compareSync (req.body.password, response[0].password)) {
                    const token = jwt.sign ({ id : response[0].id }, secretKey, { expiresIn: '7h' });
                    form.success (res, 200, {user_id: response[0].id, username: response[0].username, token: token})
                } else {
                    form.error (res, 400, "Password Incorrect");
                }
            } else {
                form.error (res, 400, "User Not Found");
            }
        })
        .catch (error => {
            form.error (res, 400, error);
        })
    }
}

module.exports = controller;