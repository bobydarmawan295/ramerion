const express = require("express");
const router = express();
const controller = require(`../controllers/indexcontroller`);
const session = require('express-session');
const flash = require('connect-flash');

router.set("view engine", "ejs");

router.use(session({
    secret:'flashblog',
    saveUninitialized: true,
    resave: true
}));

router.use(flash());

router.use(function(req, res, next){
    res.locals.message = req.flash("success");
    next();
});
  
router.use(express.static("public"));

router.post("/register", controller.users.register);
router.post("/login", controller.users.login);
router.post("/logout", controller.users.logout);

router.get("/login", controller.users.tampillogin);
router.get("/register", controller.users.tampilregister);

module.exports = router;
