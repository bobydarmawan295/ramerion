const express = require("express");
const controller = require(`../controllers/indexcontroller`);
const multer = require('multer')
const path = require('path')
const router = express();
router.set("view engine", "ejs");
router.use(express.static("public"));

router.get("/", controller.kelola.home);


module.exports = router;