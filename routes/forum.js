const express = require("express");
const router = express();
const controller = require(`../controllers/indexcontroller`);

router.set("view engine", "ejs");
router.use(express.static("public"));

router.get("/", controller.forum.getAllForum);
router.get("/:id", controller.forum.getForumById);
router.post("/addForum", controller.forum.addForum);
router.put("/updateForum/:id", controller.forum.updateForum)
router.delete("/deleteForum/:id", controller.forum.deleteForum);
router.get("/comment/all", controller.forum.getAllComment);
router.post("/addComment", controller.forum.addForumComment);
router.delete("/deleteComment/:id", controller.forum.deleteForumComment);

module.exports = router;