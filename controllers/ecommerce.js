const model = require('../models/indexModel');
const { Op, QueryTypes  } = require("sequelize");
const sequelize = model.dbconfig;
const controller = {};

controller.jualProduk = async (req, res) => { 
    
    const kategori = await model.kategori_produk.findAll({attributes: [ 'id', 'nama']});

    res.render("e-commerce/jualProduk", { kategori, blogActive: "", forumActive: "", ecommerceActive:"active" });
}

controller.daftarBarang = async (req, res) => { 
    
    const kategori = await model.kategori_produk.findAll({attributes: [ 'id', 'nama']});

    res.render("e-commerce/daftarBarang", { kategori, blogActive: "", forumActive: "", ecommerceActive:"active" });
}

controller.pesananPelanggan = async (req, res) => { 
    
    const kategori = await model.kategori_produk.findAll({attributes: [ 'id', 'nama']});

    res.render("e-commerce/pesananPelanggan", { kategori, blogActive: "", forumActive: "", ecommerceActive:"active" });
}

controller.barangTerjual = async (req, res) => { 
    
    const kategori = await model.kategori_produk.findAll({attributes: [ 'id', 'nama']});

    res.render("e-commerce/barangTerjual", { kategori, blogActive: "", forumActive: "", ecommerceActive:"active" });
}

controller.riwayat = async (req, res) => { 
    
    const kategori = await model.kategori_produk.findAll({attributes: [ 'id', 'nama']});

    res.render("e-commerce/riwayat", { kategori, blogActive: "", forumActive: "", ecommerceActive:"active" });
}

controller.detailProduk= async (req, res) => { 
    
  const kategori = await model.kategori_produk.findAll({attributes: [ 'id', 'nama']});

  res.render("e-commerce/detailProduk", { kategori, blogActive: "", forumActive: "", ecommerceActive:"active" });
}

controller.detailPembayaran= async (req, res) => { 
    
  const kategori = await model.kategori_produk.findAll({attributes: [ 'id', 'nama']});

  res.render("e-commerce/detailPembayaran", { kategori, blogActive: "", forumActive: "", ecommerceActive:"active" });
}


controller.bayar= async (req, res) => { 
    
  const kategori = await model.kategori_produk.findAll({attributes: [ 'id', 'nama']});

  res.render("e-commerce/bayar", { kategori, blogActive: "", forumActive: "", ecommerceActive:"active" });

}

controller.upload_bukti= async (req, res) => { 
    
  const kategori = await model.kategori_produk.findAll({attributes: [ 'id', 'nama']});
  
  res.render("e-commerce/upload_bukti", { kategori, blogActive: "", forumActive: "", ecommerceActive:"active" });

}



controller.allCart= async (req, res) => { 
    
  const kategori = await model.kategori_produk.findAll({attributes: [ 'id', 'nama']});

  res.render("e-commerce/allCart", { kategori, blogActive: "", forumActive: "", ecommerceActive:"active" });
}

controller.getAllProduk = async (req, res) => {
    try {
      await model.produk
        .findAll({
          attributes: ['id','user_id','id_kategori','nama','gambar','deskripsi','rate','harga'],
          // group: ['id_kategori']
          // raw: true,
        })
        .then((result) => {
          if (result.length > 0) {
            res.render("e-commerce/allProduk", { items: result ,blogActive: "", forumActive: "", ecommerceActive:"active" });
            // res.status(200).json({
            //     message: 'mendapat data produk',
            //     data: result
            // })harga
          } else {
            res.status(404).json({
                message: "data tidak ada",
                data: [],
            });
          }
        });
    } catch (error) {
      res.status(404).json({
        message: error,
      });
    }
}



controller.getProdukById= async (req, res) => {
    try {
      await model.produk
        .findOne({
          attributes: ['id','user_id','id_kategori','nama','gambar','deskripsi','rate','harga'],
          where: {
            id: req.params.id,
          },
        })
        .then((result) => {
          if (result) {
            res.render("blog/editProduk", { items: result,dasbordaktif: "", rpsaktif: "active"  });
          //   res.status(200).json({
          //     message: 'mendapat id produk',
          //     data: result
          // })
          } else {
            res.status(404).json({
              message: "data tidak ada",
              data: [],
            });
          }
        });
    } catch (error) {
      res.status(404).json({
        message: error,
      });
    }
  };

controller.addProduk = async (req, res) => {
    try {
        const { user_id,id_kategori,konten,nama,gambar,deskripsi,rate,harga} = req.body;
        await model.produk.create({
            user_id: user_id,
            id_kategori: id_kategori,
            nama: nama,
            deskripsi: deskripsi,
            rate: rate,
            harga
        });
        res.status(200).json({
          message: 'berhasil menambah produk',
      })
        //   res.redirect("/dosen/courses");
      } catch (error) {
        res.json({ message: error.message });
        // res.redirect("/dosen/add-course");
      }
  };

controller.updateProduk = async (req, res) => {
    try {
      const {  user_id,id_kategori,konten,nama,gambar,deskripsi,rate,harga} = req.body;
      await model.produk.update(
        {
          user_id: user_id,
          id_kategori: id_kategori,
          nama: nama,
          deskripsi: deskripsi,
          rate: rate,
          harga
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json({
        message: 'berhasil edit data',

    })
    } catch (error) {
      res.json({ message: error.message });
      // res.redirect("/dosen/add-course");
    }
  };
  
controller.deleteProduk = async (req, res) => {
    try {
      await model.produk.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        message: 'berhasil hapus data',

    })
    } catch (error) {
      res.json({ message: error.message });
    }
  };

controller.getAllCart = async function(req, res){
    try {
        await model.cart
          .findAll({
            attributes: ['id','user_id','produk_id','jumlah','status'],
          })
          .then((result) => {
            if (result) {
              // res.render("blog/allCart", { items: result,dasbordaktif: "", rpsaktif: "active"  });
              res.status(200).json({
                message: 'mendapat cart',
                data: result
            })
            } else {
              res.status(404).json({
                message: "data tidak ada",
                data: [],
              });
            }
          });
      } catch (error) {
        res.status(404).json({
          message: error,
        });
      }
    };
  
  controller.addCart = async (req, res) => {
      try {
          const { user_id,produk_id, jumlah, status} = req.body;
          await model.cart.create({
              user_id: user_id,
              produk_id: produk_id,
              jumlah: jumlah,
              status: status
          });
          res.status(200).json({
            message: 'berhasil menambah cart',
        })
          //   res.redirect("/dosen/courses");
        } catch (error) {
          res.json({ message: error.message });
          // res.redirect("/dosen/add-course");
        }
}

controller.deleteCart = async function(req, res){
    try {
        await model.cart.destroy({
          where: {
            id: req.params.id,
          },
        });
        res.status(200).json({
          message: 'berhasil hapus id',
      })
      } catch (error) {
        res.json({ message: error.message });
      }
}

controller.checkout= async function(req, res){      //checkout

    // try {
    //     const { id, user_id,} = req.body;
    //     await model.produk.create({
    //         user_id: user_id,
    //         id_kategori: id_kategori,
    //         konten: konten,
    //         nama: nama,
    //         gambar: gambar,
    //         deskripsi: deskripsi,
    //         rate: rate,
    //         harga
    //     });
    //     //   res.redirect("/dosen/courses");
    //   } catch (error) {
    //     res.json({ message: error.message });
    //     // res.redirect("/dosen/add-course");
    // }

}


// controller.tampilProduk= async function(req, res){
//     const ekomers = await model.produk.findAll({
//         attributes: ['id', 'name']
//     });
//     res.render("rpsadmin", { kurikulum ,dasbordaktif: "", rpsaktif: "active" });
// }


module.exports = controller;

