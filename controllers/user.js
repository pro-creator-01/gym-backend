const User = require('../models/user');
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.getUsers = (req, res) => {
    User.find().exec((err, users) => {
        if (err || !users) {
            return res.status(400).json({
                error: 'User not found'
            });
        } else {
            res.json({
                users
            });
        }
    })
}

exports.createUser = (req, res) => {
    const user = new User(req.body);

    const d = new Date();
    // Convert Time to Indian Timezone on the Frontend
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    // const nd = new Date(utc + (3600000*+5.5));
    // var ist =  nd.toLocaleString();

    const date = new Date(utc + (3600000*+5.5));
    user.startDate = date;
    user.startDay = date.getDate();

    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: errorHandler(err)
            });
        }

        res.json({
            user
        });
    });
};

exports.findUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        } else {
            req.profile = user;
            next();  
        }
    });
};

exports.update = (req, res) => {
    User.findOneAndUpdate(
            {_id: req.profile._id},
            {$set: req.body},
            {new: true},
            (err, user) => {
                if (err) {
                    return res.status(400).json({
                        error: 'You are not authorized to perform this action' 
                    })
                } else {
                    res.json(user);
                }
            }
        )
};

exports.remove = (req, res) => {
    User.remove(
        {_id: req.profile._id},
        (err, user) => {
                if (err) {
                    return res.status(400).json({
                        error: 'You are not authorized to perform this action' 
                    })
                } else {
                    res.send("Deleted User");
                }
            }
    )
}

exports.makePayment = async (req, res) => {
    const user = await User.findById(req.profile._id);
    const { remainingAmount } = req.body;

    user.lastPaymentDate = new Date();
    user.paymentPending = remainingAmount;
    
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: errorHandler(err)
            });
        }

        res.json({
            user
        });
    });
}