const express = require("express");
const router = express();
const controller = require(`../controllers/indexcontroller`);

router.set("view engine", "ejs");
router.use(express.static("public"));

router.post("/register", controller.users.register);
router.post("/login", controller.users.login);
router.post("/logout", controller.users.logout);

router.get("/login", controller.users.tampillogin);
router.get("/register", controller.users.tampilregister); //ntar di nonaktifkan

module.exports = router;
