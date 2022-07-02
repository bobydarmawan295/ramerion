const express = require("express");
const router = express();
const controller = require(`../controllers/indexcontroller`);


router.set("view engine", "ejs");
router.use(express.static("public"));

router.get("/", controller.blog.getAllBlog)
router.get("/blog/:id", controller.blog.getBlogById)

module.exports = router;