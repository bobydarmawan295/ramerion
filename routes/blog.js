const express = require("express");
const controller = require(`../controllers/indexcontroller`);

const router = express();
router.set("view engine", "ejs");
router.use(express.static("public"));


router.get("/", controller.blog.getAllBlog);
router.get("/:id", controller.blog.getBlogById);
router.post("/addBlog", controller.blog.addBlog);
router.put("/updateBlog/:id", controller.blog.updateBlog);
router.delete("/deleteBlog/:id", controller.blog.deleteBlog);
router.get("/comment/all", controller.blog.getAllComment);
router.post("/addComment", controller.blog.addBlogComment);
router.delete("/deleteComment/:id", controller.blog.deleteBlogComment);

module.exports = router;