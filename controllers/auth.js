const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const bcrypt = require('bcrypt')

const Admin = require('../models/Admin');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.signIn = (req, res) => {
    const { username, password } = req.body;

    Admin.findOne({ username }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'Access Denied'
            });
        } else {

            bcrypt.compare(password, user.password).then((result) => {
                if(!result) {
                    return res.status(401).json({
                        error: "Email and password doesn't match."
                    });
                }

                const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);

                res.cookie('t', token, { expire: new Date() + 9999 })

                return res.json({
                    token
                });
            });
        }
    })
};

exports.signOut = (req, res) => {
    res.clearCookie('t');
    res.json({
        message: 'Signout success'
    });
};

exports.requireSignIn = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth',
    algorithms: ['HS256']
});