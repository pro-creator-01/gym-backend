const express = require('express');
const router = express.Router();
const {signIn, signOut} = require('../controllers/auth');

router.post('/admin', signIn);
router.get('/signout', signOut);

module.exports = router;