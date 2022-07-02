const express = require('express');
const controller = require(`../controller/index`);
const {authenticateToken} = require('../middleware/verifyToken');
const cookieParser =  require('cookie-parser');


const router = express.Router();

router.use(express.static('public'));
router.use(express.json()); 
router.use(cookieParser());

router.get('/register', controller.users.signup_get);
router.post('/register', controller.users.signup_post);
// router.get('/login', login_get)
// router.post('/login', login_post)
// router.get('/logout', logout_get)

module.exports = router 