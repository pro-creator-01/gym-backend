const express = require('express');
const router = express.Router();
const {createUser, getUsers, findUserById, update, remove, makePayment} =  require('../controllers/user');
const {requireSignIn, isAuth} =  require('../controllers/auth');

router.post('/users', requireSignIn, createUser);
router.get('/users', requireSignIn, getUsers);
router.param('userId', findUserById);
router.get('/users/:userId', requireSignIn, (req, res) => {
    res.json({
        user: req.profile
    });
});
router.put('/users/:userId', requireSignIn, update);
router.delete('/users/:userId', requireSignIn, remove);
router.put('/users/:userId/payment', requireSignIn, makePayment);


module.exports = router;