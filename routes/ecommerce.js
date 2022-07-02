const express = require("express");
const router = express();
const controller = require(`../controllers/indexcontroller`);

router.set("view engine", "ejs");
router.use(express.static("public"));

router.get("/ecommerce", controller.ecommerce.tampilProduk)
router.get("/ecommerce/detail:id", controller.ecommerce.tampilDetailProduk)
router.get("/ecommerce/tampilKeranjang", controller.ecommerce.tampilKeranjang)

router.post("/ecommerce/tambahKeranjang", controller.ecommerce.tambahKeranjang)
router.post("/ecommerce/submitKeranjang", controller.ecommerce.submitKeranjang)

module.exports = router;