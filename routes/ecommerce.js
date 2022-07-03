const express = require("express");
const controller = require(`../controllers/indexcontroller`);

const router = express.Router();

router.get("/", controller.ecommerce.getAllProduk)
router.get("/:id", controller.ecommerce.getProdukById)
router.post("/addProduk", controller.ecommerce.addProduk)
router.put("/updateProduk/:id", controller.ecommerce.updateProduk)
router.delete("/deleteProduk/:id", controller.ecommerce.deleteProduk)
router.get("/:id/getCart", controller.ecommerce.getAllCart)
router.post("/:id/cart/addCart", controller.ecommerce.addCart)
router.delete("/deleteCart/:id", controller.ecommerce.deleteCart)


module.exports = router;