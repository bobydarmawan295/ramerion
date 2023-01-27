const express = require("express");
const controller = require(`../controllers/indexcontroller`);
const multer = require('multer')
const path = require('path')
const router = express();
router.set("view engine", "ejs");
router.use(express.static("public"));

const fileStorageBarang = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname,'../public/uploads/produk'));
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

  const uploadBarang = multer({
    storage: fileStorageBarang,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  })

router.get("/", controller.ecommerce.getAllProduk)
router.get("/:id/produk", controller.ecommerce.getProdukById)
router.get("/jualProduk", controller.ecommerce.jualProduk)
router.get("/:id/detailProduk", controller.ecommerce.detailProduk)
// router.get("/allCart", controller.ecommerce.allCart)
router.get("/detailPembayaran", controller.ecommerce.detailPembayaran)
router.get("/bayar", controller.ecommerce.bayar)
router.get("/upload_bukti", controller.ecommerce.upload_bukti)
router.get("/daftarBarang", controller.ecommerce.daftarBarang)
router.get("/pesananPelanggan", controller.ecommerce.pesananPelanggan)
router.get("/barangTerjual", controller.ecommerce.barangTerjual)
router.get("/riwayat", controller.ecommerce.riwayat)
router.post("/addProduk", uploadBarang.single("gambar_produk") , controller.ecommerce.addProduk)
router.put("/updateProduk/:id", controller.ecommerce.updateProduk)
router.delete("/deleteProduk/:id", controller.ecommerce.deleteProduk)
router.get("/:id/getCart", controller.ecommerce.getAllCart)
router.post("/:id/cart/addCart", controller.ecommerce.addCart)
router.delete("/deleteCart/:id", controller.ecommerce.deleteCart)


module.exports = router;