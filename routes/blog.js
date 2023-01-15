const express = require("express");
const controller = require(`../controllers/indexcontroller`);
const multer = require('multer')
const path = require('path')
const router = express();
router.set("view engine", "ejs");
router.use(express.static("public"));

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname,'../storage/'));
    },
    filename: (req, file, cb) => {
      console.log(file);
      cb(null,  Date.now().toString() +  file.originalname)
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

  const upload = multer({
    storage: fileStorage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  })
  

router.get("/", controller.blog.getAllBlog);
router.get("/detail-:id", controller.blog.getBlogById);
router.get("/addBlog",controller.blog.getBlog);
router.post("/addBlog", upload.single("gambar_blog") ,controller.blog.addBlog);
router.put("/updateBlog/:id", controller.blog.updateBlog);
router.delete("/deleteBlog/:id", controller.blog.deleteBlog);
router.get("/comment/all", controller.blog.getAllComment);
router.post("/addComment", controller.blog.addBlogComment);
router.delete("/deleteComment/:id", controller.blog.deleteBlogComment);

module.exports = router;