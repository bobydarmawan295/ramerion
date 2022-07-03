const express = require("express");
const controller = require(`../controllers/indexcontroller`);
const multer = require('multer')
const router = express();
router.set("view engine", "ejs");
router.use(express.static("public"));

const fileStorage = multer.diskStorage({
    destination: (req, res, cb) => {
      cb(null, './assets/')
    },
    filename: (req, file, cb) => {
      cb(null,file.originalname)
    }
  })
  
  const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || 
       file.mimetype === 'image/jpg' || 
       file.mimetype === 'image/jpeg') {
      cb(null, true)
    }else{
      cb(null, false)
    }
  
  }
  

router.get("/", controller.blog.getAllBlog);
router.get("/:id/getBlog", controller.blog.getBlogById);
router.get("/addBlog",controller.blog.getBlog);
router.post("/addBlog", controller.blog.addBlog);
router.put("/updateBlog/:id", controller.blog.updateBlog);
router.delete("/deleteBlog/:id", controller.blog.deleteBlog);
router.get("/comment/all", controller.blog.getAllComment);
router.post("/addComment", controller.blog.addBlogComment);
router.delete("/deleteComment/:id", controller.blog.deleteBlogComment);

module.exports = router;