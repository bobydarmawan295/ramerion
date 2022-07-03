const express = require("express");
const controller = require(`../controllers/indexcontroller`);

const router = express();
router.set("view engine", "ejs");
router.use(express.static("public"));

router.get("/", controller.ecommerce.getAllProduk)
router.get("/:id/produk", controller.ecommerce.getProdukById)
router.get("/jualProduk", controller.ecommerce.jualProduk)
router.get("/daftarBarang", controller.ecommerce.daftarBarang)
router.get("/pesananPelanggan", controller.ecommerce.pesananPelanggan)
router.get("/barangTerjual", controller.ecommerce.barangTerjual)
router.get("/riwayat", controller.ecommerce.riwayat)
router.post("/addProduk", controller.ecommerce.addProduk)
router.put("/updateProduk/:id", controller.ecommerce.updateProduk)
router.delete("/deleteProduk/:id", controller.ecommerce.deleteProduk)
router.get("/:id/getCart", controller.ecommerce.getAllCart)
router.post("/:id/cart/addCart", controller.ecommerce.addCart)
router.delete("/deleteCart/:id", controller.ecommerce.deleteCart)


module.exports = router;