const express = require("express");
const router = express();
const controller = require(`../controllers/indexcontroller`);


router.set("view engine", "ejs");
router.use(express.static("public"));

router.get("/", controller.blog.getAllBlog);
router.get("/:id", controller.blog.getBlogById);
router.post("/addBlog", controller.blog.addBlog);
router.put("/updateBlog/:id", controller.blog.updateBlog);
router.delete("/deleteBlog/:id", controller.blog.deleteBlog);
router.post("/addComment", controller.blog.tambahKomentarBlog);

module.exports = router;